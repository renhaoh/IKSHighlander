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

    final int MISSION_COL = 3;
    final int GRADE_COL = 2;
    final int ID_COL = 1;
    final String IGNORE_INPUT = "NONE";

    @Override
    public String generateRanking(String inputPath, int colNum, int numValues, String mission, String grade, String
        id) {
        String outputPath = "tmp/" + (FilenameUtils.getName(inputPath).split("\\.")[0]) + " " + colNum + ".txt";

        final FrequencyAnalyzer frequencyAnalyzer = new FrequencyAnalyzer();
        frequencyAnalyzer.setWordFrequenciesToReturn(numValues);
        frequencyAnalyzer.setMinWordLength(3);
        frequencyAnalyzer.setStopWords(ParseStopWords.getStopWords());
        frequencyAnalyzer.addNormalizer(new LowerCaseNormalizer());
        StringBuilder builder = new StringBuilder();
        generateInput(inputPath, outputPath, colNum, mission, grade, id);
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

    private void generateInput(String inputPath, String outputPath, int colNum, String mission, String grade, String
        id) {
        try {
            Reader in = new FileReader(inputPath);
            Iterable<CSVRecord> records = CSVFormat.EXCEL.parse(in);
            BufferedWriter writer = new BufferedWriter(new FileWriter(outputPath));
            for (CSVRecord record : records) {
                if ((mission.equals(IGNORE_INPUT) || mission.equals(record.get(MISSION_COL))) &&
                    (grade.equals(IGNORE_INPUT) || grade.equals(record.get(GRADE_COL))) &&
                    (id.equals(IGNORE_INPUT) || id.equals(record.get(ID_COL)))) {
                    writer.write(record.get(colNum) + "\n");
                }
            }
            writer.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
