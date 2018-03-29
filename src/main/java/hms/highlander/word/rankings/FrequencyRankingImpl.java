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
    public void generateRanking(String inputPath, int colNum, int numValues, String mission, String grade, String
        id) {
        String tmpPath = "tmp/" + (FilenameUtils.getName(inputPath).split("\\.")[0]) + " " + colNum + ".txt";
        String outputPath = "output/" + (FilenameUtils.getName(inputPath).split("\\.")[0]) + " " + colNum + ".txt";

        final FrequencyAnalyzer frequencyAnalyzer = new FrequencyAnalyzer();
        frequencyAnalyzer.setWordFrequenciesToReturn(numValues);
        frequencyAnalyzer.setMinWordLength(3);
        frequencyAnalyzer.setStopWords(ParseStopWords.getStopWords());
        frequencyAnalyzer.addNormalizer(new LowerCaseNormalizer());
        generateInput(inputPath, tmpPath, colNum, mission, grade, id);

        try {
            BufferedWriter writer = new BufferedWriter(new FileWriter(outputPath, false));
            final List<WordFrequency> wordFrequencies =
                frequencyAnalyzer.load(tmpPath);
            System.out.println(wordFrequencies.size());
            for (WordFrequency freq : wordFrequencies) {
                writer.write(freq.getWord() + ":" + freq.getFrequency() + "\n");
            }
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void generateInput(String inputPath, String outputPath, int colNum, String mission, String grade, String
        id) {
        try {
            Reader in = new FileReader(inputPath);
            Iterable<CSVRecord> records = CSVFormat.EXCEL.parse(in);
            BufferedWriter writer = new BufferedWriter(new FileWriter(outputPath, false));
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
