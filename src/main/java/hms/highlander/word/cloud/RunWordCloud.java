package hms.highlander.word.cloud;

public class RunWordCloud {

    public static void main(String[] args) {
        WordCloud cloud = new WordCloudImpl();
        cloud.generateCloud();
    }

}
