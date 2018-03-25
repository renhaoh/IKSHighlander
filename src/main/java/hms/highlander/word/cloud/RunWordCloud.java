package hms.highlander.word.cloud;

public class RunWordCloud {

    public static void main(String[] args) {
        WordCloud cloud = new WordCloudImpl();
        cloud.generateCloud(args[0], args[1], Integer.parseInt(args[2]), Integer.parseInt(args[3]));
    }

}
