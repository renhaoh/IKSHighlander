package hms.highlander.word.cloud;

public class CreateWC {

    public static void main(String[] args) {
        WordCloud wordCloud = new WordCloudImpl();
        wordCloud.generateCloud(args[0], Integer.parseInt(args[1]), Integer.parseInt(args[2]), args[3]);
    }
}
