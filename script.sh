#!/bin/bash

# Output folder for analysis
mkdir -p "output"
# Craete input folder. Put csv files here
mkdir -p "input"
# Create temporary folder
mkdir "tmp"
echo "Creating shadow jar..."
# Create complete shadow jar
./gradlew shadowJar
echo "Done creating shadow jar"

if ["$1" == "wordCloud"]
then
	echo "Creating word cloud..."
	# Run wordCloud data
	# sample paramters: input/survey_response.csv output/cloud.png 600 600
	java -cp build/libs/hms.highlander-1.0-all.jar hms.highlander.word.cloud.RunWordCloud $2 $3 $4 $5
	echo "Done creating word cloud"
elif ["$1" == "rank"]
then
	echo "Running frequency analysis...."
	# Run analysis for frequency
	# sample paramters: input/survey_response.csv 5 10 NONE 7 NONE
	java -cp build/libs/hms.highlander-1.0-all.jar hms.highlander.word.rankings.RunFrequencyRank $2 $3 $4 $5 $6 $7
	echo "Done running frequency analysis...."
else
	echo "Incorrect Input"
fi


echo "Done"
rm -fr "tmp"