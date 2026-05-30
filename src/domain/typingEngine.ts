export interface TypingStats {
    accuracy: number;
    wpm: number;
    errors: number;
    correct: number;
    total: number;
}

export class TypingEngine {
    private text: string = '';
    private currentIndex: number = 0;
    private errors: number = 0;
    private correct: number = 0;

    constructor(text: string = '') {
        this.text = text;
    }

    setText(text: string) {
        this.text = text;
        this.currentIndex = 0;
        this.errors = 0;
        this.correct = 0;
    }

    processKey(key: string): { isCorrect: boolean; isFinished: boolean } {
        if (this.currentIndex >= this.text.length) {
            return { isCorrect: false, isFinished: true };
        }

        const target = this.text[this.currentIndex];
        const isCorrect = key === target;

        if (isCorrect) {
            this.correct++;
            this.currentIndex++;
        } else {
            this.errors++;
        }

        return {
            isCorrect,
            isFinished: this.currentIndex === this.text.length
        };
    }

    getStats(): TypingStats {
        const total = this.correct + this.errors;
        return {
            accuracy: total === 0 ? 100 : (this.correct / total) * 100,
            wpm: 0, // TODO: Implement WPM calculation with timing
            errors: this.errors,
            correct: this.correct,
            total
        };
    }

    getCurrentIndex(): number {
        return this.currentIndex;
    }

    getTargetKey(): string | null {
        return this.currentIndex < this.text.length ? this.text[this.currentIndex] : null;
    }
}
