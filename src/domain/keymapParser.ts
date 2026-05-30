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
        if (!json) throw new Error('Invalid JSON');

        const name = json.name || 'Custom Layout';
        const layers: Layer[] = [];

        if (json.layers && Array.isArray(json.layers)) {
            json.layers.forEach((layerData: any, index: number) => {
                // Vial/QMK layers are often flat arrays or nested
                // We'll try to reconstruct a 3x5+3 or similar if we can, 
                // but for now let's just take what's there.
                
                let keys: string[][] = [];
                if (Array.isArray(layerData) && Array.isArray(layerData[0])) {
                    // Already nested
                    keys = layerData.map(row => row.map(k => String(k)));
                } else if (Array.isArray(layerData)) {
                    // Flat array, let's assume a default split width (e.g. 10 per row)
                    const rowWidth = 10;
                    for (let i = 0; i < layerData.length; i += rowWidth) {
                        keys.push(layerData.slice(i, i + rowWidth).map(k => String(k)));
                    }
                }

                layers.push({
                    id: index,
                    name: `Layer ${index}`,
                    keys
                });
            });
        }

        return { name, layers };
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
