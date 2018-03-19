package hms.highlander.word.rankings;

public interface FrequencyRanking {

    /**
     * Calculates the most frequently seen words
     * @param inputPath path of csv
     * @param colNum column number to analyze (0-indexed)
     * @param numValues number of values to generate
     * @return String representing comma-delimited values in the form of "word:frequency"
     */
    String generateRanking(String inputPath, int colNum, int numValues);
}
