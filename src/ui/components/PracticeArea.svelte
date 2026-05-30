<script lang="ts">
    import { appState } from '../states/appState.svelte';

    const words = $derived(appState.text.split(''));
</script>

<div class="relative font-mono text-3xl leading-relaxed select-none">
    <div class="flex gap-8 mb-6 text-sm font-bold tracking-widest text-gray-700">
        <div>
            <span class="text-gray-500">WPM</span>
            <span class="ml-2 text-yellow-400">{appState.wpm.toFixed(0)}</span>
        </div>
        <div>
            <span class="text-gray-500">ACC</span>
            <span class="ml-2 text-yellow-400">{appState.accuracy.toFixed(0)}%</span>
        </div>
    </div>

    <div class="flex flex-wrap text-gray-500">
        {#each words as char, i}
            <span 
                class="relative transition-colors duration-150"
                class:text-white={i < appState.currentIndex}
                class:text-red-500={i === appState.currentIndex && appState.hasError} 
            >
                {#if i === appState.currentIndex}
                    <span 
                        class="absolute left-0 bottom-0 w-0.5 h-full transition-colors duration-75"
                        class:bg-yellow-400={!appState.hasError}
                        class:bg-red-500={appState.hasError}
                        class:animate-pulse={!appState.hasError}
                    ></span>
                {/if}
                {char === ' ' ? '\u00A0' : char}
            </span>
        {/each}
    </div>

    {#if appState.isFinished}
        <div class="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700 animate-fade-in">
            <p class="text-xl text-yellow-400 font-bold">Finished!</p>
            <div class="grid grid-cols-2 gap-4 mt-2">
                <div>
                    <p class="text-gray-500 text-xs uppercase tracking-widest">WPM</p>
                    <p class="text-2xl text-white font-mono">{appState.wpm.toFixed(0)}</p>
                </div>
                <div>
                    <p class="text-gray-500 text-xs uppercase tracking-widest">Accuracy</p>
                    <p class="text-2xl text-white font-mono">{appState.accuracy.toFixed(1)}%</p>
                </div>
                <div>
                    <p class="text-gray-500 text-xs uppercase tracking-widest">Errors</p>
                    <p class="text-2xl text-white font-mono">{appState.errors}</p>
                </div>
            </div>
            <button 
                onclick={() => appState.reset()}
                class="mt-6 px-4 py-2 bg-yellow-400 text-black rounded font-bold hover:bg-yellow-500 transition-colors w-full"
            >
                Restart
            </button>
        </div>
    {/if}
</div>

<style>
    @keyframes fade-in {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
        animation: fade-in 0.3s ease-out forwards;
    }
</style>
