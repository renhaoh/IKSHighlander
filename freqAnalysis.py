import csv

firstChoiceJobs = {}
secondChoiceJobs = {}
allChoiceJobs = {}

firstReasons = {}
secondReasons = {}

def clean(row):
	res = []
	for field in row:
		word = ""
		for c in field:
			if c in ".,":
				continue
			if ord(c) < 128:
				word += c
		res.append(word)
	return res


def parse(row):
	# clean non-ascii characters
	row = clean(row)

	# (first choice) get count of jobs
	firstChoiceJobs[row[5]] = firstChoiceJobs.get(row[5], 0) + 1

	# get word frequencies in reasons for job
	rowWords = row[6].split(" ")
	for word in rowWords:
		firstReasons[word] = firstReasons.get(word, 0) + 1

	# (second choice) get count of jobs
	secondChoiceJobs[row[7]] = secondChoiceJobs.get(row[7], 0) + 1



with open('job1.csv', encoding="utf-8") as c:
	reader = csv.reader(c)
	ignoreFirst = True
	for row in reader:
		if ignoreFirst:
			ignoreFirst = False
			continue
		else:
			parse(row)

# print(jobs)
# print(firstChoiceJobs)
def printFreqWords(d, minWordSize, minCount):
	for word in d.keys():
		if len(word) >= minWordSize and d[word] >= minCount:
			print(word, end=": ")
			print(d[word])

def getAllJobChoiceCounts():
	# get all job choice counts
	# TODO: consider if a job isn't ever chosen
	for job in firstChoiceJobs.keys():
		allChoiceJobs[job] = firstChoiceJobs[job] + secondChoiceJobs[job]

getAllJobChoiceCounts()

print("first choice job choices:")
print("------------")
printFreqWords(firstChoiceJobs, 0, 0)
print()
print("second choice job choices:")
print("------------")
printFreqWords(secondChoiceJobs, 0, 0)
print()
print("all job choices:")
print("------------")
printFreqWords(allChoiceJobs, 0, 0)