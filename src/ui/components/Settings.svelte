<script lang="ts">
    import { appState } from '../states/appState.svelte';
    import { KeymapParser } from '../../domain/keymapParser';

    let isOver = $state(false);

    async function handleFile(file: File) {
        const text = await file.text();
        try {
            const json = JSON.parse(text);
            const layout = KeymapParser.parseVial(json);
            appState.setLayout(layout);
            alert(`Layout "${layout.name}" loaded successfully!`);
        } catch (e) {
            console.error(e);
            alert('Failed to parse keymap JSON.');
        }
    }

    function onDrop(e: DragEvent) {
        e.preventDefault();
        isOver = false;
        const file = e.dataTransfer?.files[0];
        if (file) handleFile(file);
    }

    function onFileSelect(e: Event) {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) handleFile(file);
    }
</script>

<div class="mt-12 w-full max-w-md">
    <label 
        class="relative group cursor-pointer"
        ondragover={(e) => { e.preventDefault(); isOver = true; }}
        ondragleave={() => isOver = false}
        ondrop={onDrop}
    >
        <div 
            class="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl transition-all duration-200 {isOver ? 'border-yellow-400 bg-yellow-400/5' : 'border-gray-800 hover:border-gray-700'}"
        >
            <svg class="w-8 h-8 mb-3 text-gray-500 group-hover:text-gray-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p class="text-sm text-gray-400 font-medium">
                <span class="text-white font-bold">Upload keymap.json</span> or drag & drop
            </p>
            <p class="text-xs text-gray-600 mt-1">Vial / QMK exported configuration</p>
        </div>
        <input type="file" class="hidden" accept=".json" onchange={onFileSelect} />
    </label>
</div>
