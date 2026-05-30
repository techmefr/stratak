export interface KeyInfo {
    key: string;
    label: string;
    row: number;
    col: number;
    width?: number;
    isSplit?: boolean;
}

export interface Layer {
    id: number;
    name: string;
    keys: string[][]; // Matrix of keys
}

export interface KeyboardLayout {
    name: string;
    layers: Layer[];
}

export class KeymapParser {
    static parseVial(json: any): KeyboardLayout {
        // Simple mock parser for now
        // In a real scenario, this would transform Vial/QMK JSON into our KeyboardLayout
        return {
            name: json.name || 'Default Layout',
            layers: json.layers || []
        };
    }

    static getDefault3x5_3(): KeyboardLayout {
        // Standard 3x5+3 split layout (like Corne/Cheapino)
        const layer0: Layer = {
            id: 0,
            name: 'Base',
            keys: [
                ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
                ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'],
                ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/'],
                ['ESC', 'SPC', 'ENT'] // Thumbs
            ]
        };

        const layer1: Layer = {
            id: 1,
            name: 'Symbols',
            keys: [
                ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'],
                ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
                ['[', ']', '{', '}', '\\', '|', ';', ':', '\'', '"'],
                ['ESC', 'SPC', 'ENT']
            ]
        };

        return {
            name: 'Corne/Cheapino',
            layers: [layer0, layer1]
        };
    }
}
