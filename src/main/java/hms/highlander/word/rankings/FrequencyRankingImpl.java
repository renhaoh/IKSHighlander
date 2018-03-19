package hms.highlander.word.rankings;

import com.kennycason.kumo.WordFrequency;
import com.kennycason.kumo.nlp.FrequencyAnalyzer;
import com.kennycason.kumo.nlp.normalize.LowerCaseNormalizer;
import hms.highlander.word.utilities.ParseStopWords;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.apache.commons.io.FilenameUtils;

import java.io.*;
import java.util.List;

public class FrequencyRankingImpl implements FrequencyRanking {

    @Override
    public String generateRanking(String inputPath, int colNum, int numValues) {
        String outputPath = "tmp/" + (FilenameUtils.getName(inputPath).split("\\.")[0]) + ".txt";

        final FrequencyAnalyzer frequencyAnalyzer = new FrequencyAnalyzer();
        frequencyAnalyzer.setWordFrequenciesToReturn(numValues);
        frequencyAnalyzer.setMinWordLength(3);
        frequencyAnalyzer.setStopWords(ParseStopWords.getStopWords());
        frequencyAnalyzer.addNormalizer(new LowerCaseNormalizer());
        StringBuilder builder = new StringBuilder();
        generateInput(inputPath, outputPath, colNum);
        try {
            final List<WordFrequency> wordFrequencies =
                frequencyAnalyzer.load(outputPath);
            for (WordFrequency freq : wordFrequencies) {
                builder.append(freq.getWord()).append(":").append(freq.getFrequency()).append(",");
            }
            if (builder.length() > 0) {
                builder.setLength(builder.length() - 1);
            }
            return builder.toString();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return builder.toString();
    }

    private void generateInput(String inputPath, String outputPath, int colNum) {
        try {
            Reader in = new FileReader(inputPath);
            Iterable<CSVRecord> records = CSVFormat.EXCEL.parse(in);
            BufferedWriter writer = new BufferedWriter(new FileWriter(outputPath));
            for (CSVRecord record : records) {
                writer.write(record.get(colNum) + "\n");
            }
            writer.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
