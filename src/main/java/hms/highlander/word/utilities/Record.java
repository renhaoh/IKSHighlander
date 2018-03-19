package hms.highlander.word.utilities;

public class Record implements Comparable<Record> {
    String word;
    long frequency;

    public Record(String word, long frequency) {
        this.word = word;
        this.frequency = frequency;
    }

    public long getFrequency() {
        return frequency;
    }

    public String getWord() {
        return word;
    }

    @Override
    public int compareTo(Record record) {
        return (int) (record.frequency - frequency);
    }

    @Override
    public String toString() {
        return "[word=" + word + ",frequency=" + frequency + "]";
    }

}
