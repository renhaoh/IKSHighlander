package hms.highlander.word.rankings;

public interface FrequencyRanking {

    /**
     * Calculates the most frequently seen words
     * @param inputPath path of csv
     * @param colNum column number to analyze (0-indexed)
     * @param numValues number of values to generate
     * @param mission mission name to analyze; input NONE to ignore
     * @param grade student grade level; input NONE to ignore
     * @param id student id; input NONE to ignore
     * @return String representing comma-delimited values in the form of "word:frequency"
     */
    void generateRanking(String inputPath, int colNum, int numValues, String mission, String grade, String id);
}
