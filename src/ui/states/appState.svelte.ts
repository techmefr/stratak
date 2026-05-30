import { TypingEngine } from '../../domain/typingEngine';
import { KeymapParser, type KeyboardLayout } from '../../domain/keymapParser';

class AppState {
    engine = new TypingEngine('Hello world! Welcome to Stratak.');
    
    // Reactive state
    currentIndex = $state(0);
    accuracy = $state(100);
    errors = $state(0);
    wpm = $state(0);
    isFinished = $state(false);
    text = $state('Hello world! Welcome to Stratak.');
    activeKey = $state<string | null>(null);
    currentLayer = $state(0);
    hasError = $state(false);
    layout = $state<KeyboardLayout>(KeymapParser.getDefault3x5_3());

    constructor() {
        this.engine.setText(this.text);
    }

    setLayout(newLayout: KeyboardLayout) {
        this.layout = newLayout;
        this.currentLayer = 0;
    }

    handleKeyDown(key: string) {
        this.activeKey = key.toUpperCase();
        this.handleKey(key);
    }

    handleKeyUp() {
        this.activeKey = null;
    }

    handleKey(key: string) {
        if (this.isFinished) return;

        const result = this.engine.processKey(key);
        const stats = this.engine.getStats();

        this.currentIndex = this.engine.getCurrentIndex();
        this.accuracy = stats.accuracy;
        this.errors = stats.errors;
        this.wpm = stats.wpm;
        this.isFinished = result.isFinished;
        this.hasError = !result.isCorrect;
    }

    reset(newText?: string) {
        if (newText) this.text = newText;
        this.engine.setText(this.text);
        this.currentIndex = 0;
        this.accuracy = 100;
        this.errors = 0;
        this.wpm = 0;
        this.isFinished = false;
        this.hasError = false;
    }
}

export const appState = new AppState();
