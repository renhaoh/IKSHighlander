package hms.highlander.word.cloud;

public interface WordCloud {

    /**
     * Generates a circular WordCloud.
     * @param inputPath path of text to analyze
     * @param outputPath output path for .png file
     * @param width 600 recommended
     * @param height 600 recommended
     */
    void generateCloud(String inputPath, String outputPath, int width, int height);

}
