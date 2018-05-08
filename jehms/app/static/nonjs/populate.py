import psycopg2
import csv

conn = psycopg2.connect("dbname=iks user=iks")
cur = conn.cursor()

# Populate pre database from csv generated in goog.py
with open('./pre.csv', newline='', encoding="utf-8") as csvfile:
	reader = csv.reader(csvfile)
	i = 0 # ugh, apparently inserts from psycopg2 don't work with auto-incrementing id's
	for row in reader:
		cur.execute("INSERT INTO pre_responses VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", (i, row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[10]))
		i += 1
	conn.commit()

cur.close()
conn.close()

