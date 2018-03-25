package hms.highlander.word.rankings;

public class RunFrequencyRank {

    public static void main(String[] args) {
        FrequencyRanking rank = new FrequencyRankingImpl();
        rank.generateRanking(args[0], Integer.parseInt(args[1]), Integer.parseInt(args[2]), args[3], args[4], args[5]);
    }
}
