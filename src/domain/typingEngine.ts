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
    private startTime: number | null = null;
    private endTime: number | null = null;

    constructor(text: string = '') {
        this.text = text;
    }

    setText(text: string) {
        this.text = text;
        this.currentIndex = 0;
        this.errors = 0;
        this.correct = 0;
        this.startTime = null;
        this.endTime = null;
    }

    processKey(key: string): { isCorrect: boolean; isFinished: boolean } {
        if (this.currentIndex >= this.text.length) {
            return { isCorrect: false, isFinished: true };
        }

        if (this.startTime === null) {
            this.startTime = Date.now();
        }

        const target = this.text[this.currentIndex];
        const isCorrect = key === target;

        if (isCorrect) {
            this.correct++;
            this.currentIndex++;
        } else {
            this.errors++;
        }

        const isFinished = this.currentIndex === this.text.length;
        if (isFinished && this.endTime === null) {
            this.endTime = Date.now();
        }

        return {
            isCorrect,
            isFinished
        };
    }

    getStats(): TypingStats {
        const total = this.correct + this.errors;
        const accuracy = total === 0 ? 100 : (this.correct / total) * 100;
        
        let wpm = 0;
        if (this.startTime !== null) {
            const end = this.endTime || Date.now();
            const elapsedMinutes = (end - this.startTime) / 60000;
            if (elapsedMinutes > 0) {
                wpm = (this.correct / 5) / elapsedMinutes;
            }
        }

        return {
            accuracy,
            wpm,
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
