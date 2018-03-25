package hms.highlander.word.cloud;

import com.kennycason.kumo.CollisionMode;
import com.kennycason.kumo.WordFrequency;
import com.kennycason.kumo.bg.CircleBackground;
import com.kennycason.kumo.font.scale.SqrtFontScalar;
import com.kennycason.kumo.nlp.FrequencyAnalyzer;
import com.kennycason.kumo.nlp.normalize.LowerCaseNormalizer;
import hms.highlander.word.utilities.ParseStopWords;

import java.awt.*;
import java.io.IOException;
import java.util.List;

/**
 * Utilize library from https://github.com/kennycason/kumo
 */
public class WordCloudImpl implements WordCloud {

    @Override
    public void generateCloud(String inputPath, String outputPath, int width, int height) {
        final FrequencyAnalyzer frequencyAnalyzer = new FrequencyAnalyzer();
        frequencyAnalyzer.setWordFrequenciesToReturn(150);
        frequencyAnalyzer.setMinWordLength(3);
        frequencyAnalyzer.setStopWords(ParseStopWords.getStopWords());
        frequencyAnalyzer.addNormalizer(new LowerCaseNormalizer());

        try {
            final List<WordFrequency> wordFrequencies =
                frequencyAnalyzer.load(inputPath);

            final Dimension dimension = new Dimension(width, height);
            final com.kennycason.kumo.WordCloud wordCloud =
                new com.kennycason.kumo.WordCloud(dimension, CollisionMode.PIXEL_PERFECT);
            wordCloud.setPadding(1);
            wordCloud.setBackground(new CircleBackground(300));
            wordCloud.setFontScalar(new SqrtFontScalar(10, 40));
            wordCloud.build(wordFrequencies);
            wordCloud.writeToFile(outputPath);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

}
