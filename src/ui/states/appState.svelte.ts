import { TypingEngine } from '../../domain/typingEngine';

class AppState {
    engine = new TypingEngine('Hello world! Welcome to Stratak.');
    
    // Reactive state
    currentIndex = $state(0);
    accuracy = $state(100);
    errors = $state(0);
    isFinished = $state(false);
    text = $state('Hello world! Welcome to Stratak.');

    constructor() {
        this.engine.setText(this.text);
    }

    handleKey(key: string) {
        if (this.isFinished) return;

        const result = this.engine.processKey(key);
        const stats = this.engine.getStats();

        this.currentIndex = this.engine.getCurrentIndex();
        this.accuracy = stats.accuracy;
        this.errors = stats.errors;
        this.isFinished = result.isFinished;
    }

    reset(newText?: string) {
        if (newText) this.text = newText;
        this.engine.setText(this.text);
        this.currentIndex = 0;
        this.accuracy = 100;
        this.errors = 0;
        this.isFinished = false;
    }
}

export const appState = new AppState();
