package hms.highlander.word.cloud;

public interface WordCloud {

    /**
     * Generates a circular WordCloud.
     * @param outputPath output path for .png file
     * @param width 1200 recommended
     * @param height 1200 recommended
     * @param inputPath path of text to analyze
     */
    void generateCloud(String outputPath, int width, int height, String inputPath);

}
