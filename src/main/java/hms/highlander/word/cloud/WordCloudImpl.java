package hms.highlander.word.cloud;

import com.kennycason.kumo.CollisionMode;
import com.kennycason.kumo.WordFrequency;
import com.kennycason.kumo.bg.CircleBackground;
import com.kennycason.kumo.font.scale.SqrtFontScalar;
import com.kennycason.kumo.nlp.FrequencyAnalyzer;
import com.kennycason.kumo.nlp.normalize.CharacterStrippingNormalizer;
import com.kennycason.kumo.nlp.normalize.LowerCaseNormalizer;
import hms.highlander.word.utilities.ParseStopWords;

import java.awt.*;
import java.io.IOException;
import java.util.List;
import java.util.regex.Pattern;

/**
 * Utilize library from https://github.com/kennycason/kumo
 */
public class WordCloudImpl implements WordCloud {
    private static final int WIDTH = 600;
    private static final int HEIGHT = 600;
    private static final String OUTPUT_PATH = "static/nonjs/wordcloud/wordcloud/cloud.png";
    private static final String INPUT_PATH = "static/nonjs/wordcloud/wordcloud/responses.txt";
    private static final int NUM_WORDS = 300;

    @Override
    public void generateCloud() {
        final FrequencyAnalyzer frequencyAnalyzer = new FrequencyAnalyzer();
        frequencyAnalyzer.setWordFrequenciesToReturn(NUM_WORDS);
        frequencyAnalyzer.setMinWordLength(3);
        frequencyAnalyzer.setStopWords(ParseStopWords.getStopWords());
        frequencyAnalyzer.addNormalizer(new LowerCaseNormalizer());
        frequencyAnalyzer.addNormalizer(new CharacterStrippingNormalizer(Pattern.compile("\\.|:|;|\\(|\\)|\"|,|\\?|," +
            "|!|<|>|[0-9]+/") ,""));

        try {
            final List<WordFrequency> wordFrequencies =
                frequencyAnalyzer.load(INPUT_PATH);

            final Dimension dimension = new Dimension(WIDTH, HEIGHT);
            final com.kennycason.kumo.WordCloud wordCloud =
                new com.kennycason.kumo.WordCloud(dimension, CollisionMode.PIXEL_PERFECT);
            wordCloud.setPadding(1);
            wordCloud.setBackground(new CircleBackground(300));
            wordCloud.setFontScalar(new SqrtFontScalar(10, 40));
            wordCloud.build(wordFrequencies);
            wordCloud.writeToFile(OUTPUT_PATH);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

}
