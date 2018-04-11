#!/bin/bash

echo "Creating word cloud..."
# Run wordCloud data
# Input file must be called responses.txt and in the wordcloud folder
# Writes output to wordcloud/cloud.png
java -cp build/libs/hms.highlander-1.0-all.jar hms.highlander.word.cloud.RunWordCloud
echo "Done creating word cloud"
