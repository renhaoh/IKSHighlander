
from __future__ import print_function
import httplib2
import os
import copy
import re

from apiclient import discovery
from oauth2client import client
from oauth2client import tools
from oauth2client.file import Storage

try:
    import argparse
    flags = argparse.ArgumentParser(parents=[tools.argparser]).parse_args()
except ImportError:
    flags = None

# If modifying these scopes, delete your previously saved credentials
# at ~/.credentials/sheets.googleapis.com-python-quickstart.json
SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly'
CLIENT_SECRET_FILE = 'client_secret.json'
APPLICATION_NAME = 'Google Sheets API Python Quickstart'


def get_credentials():
    """Gets valid user credentials from storage.

    If nothing has been stored, or if the stored credentials are invalid,
    the OAuth2 flow is completed to obtain the new credentials.

    Returns:
        Credentials, the obtained credential.
    """
    home_dir = os.path.expanduser('~')
    credential_dir = os.path.join(home_dir, '.credentials')
    if not os.path.exists(credential_dir):
        os.makedirs(credential_dir)
    credential_path = os.path.join(credential_dir,
                                   'sheets.googleapis.com-python-quickstart.json')

    store = Storage(credential_path)
    credentials = store.get()
    if not credentials or credentials.invalid:
        flow = client.flow_from_clientsecrets(CLIENT_SECRET_FILE, SCOPES)
        flow.user_agent = APPLICATION_NAME
        if flags:
            credentials = tools.run_flow(flow, store, flags)
        else: # Needed only for compatibility with Python 2.6
            credentials = tools.run(flow, store)
        print('Storing credentials to ' + credential_path)
    return credentials



def preParse(raw):
    fieldHeads = raw[0]
    new = []
    for row in raw[1:]:
        newRow = []
        newRow.append(row[0].replace("/", "-")) # postgres readable date

        cleanID = re.sub('[^0-9]', '', row[1])
        if cleanID != '':
            newRow.append(int(re.sub('[^0-9]', '', row[1]))) # remove non-digits
        else:
            newRow.append(0) # no digits in id...

        newRow.append(int(row[2][0])) # remove 'th'
        newRow.append(row[3]) # mission title
        newRow.append(int(row[4])) # r/o 5

        for const in range(5, 10): # short answer, no parsing necessary
            newRow.append(row[const])

        if (row[10].lower() == "yes"):
            newRow.append(True)
        else:
            newRow.append(False)

        new.append(newRow)
    return new

def postParse(raw):
    pass

def main():
    credentials = get_credentials()
    http = credentials.authorize(httplib2.Http())
    discoveryUrl = ('https://sheets.googleapis.com/$discovery/rest?'
                    'version=v4')
    service = discovery.build('sheets', 'v4', http=http,
                              discoveryServiceUrl=discoveryUrl)

    preSpreadsheetId = '1eLyS9W-NRlRZ_2CPcJKcZjdaS4LVi8a-R0x-UW_8ewg'
    preRange = 'Sheet1!A:K'
    preResult = service.spreadsheets().values().get(
        spreadsheetId=preSpreadsheetId, range=preRange).execute()
    preValues = preResult.get('values', [])

    # postSpreadsheetId = ''
    # postRange = 'Sheet1!'
    # postResult = service.spreadsheets().values().get(
    #     spreadsheetId=postSpreadsheetId, range=postRange).execute()
    # postValues = postResult.get('values', [])
    if not preValues:
        print('No data found.')
    else:
        clean = preParse(copy.deepcopy(preValues))



if __name__ == '__main__':
    main()
