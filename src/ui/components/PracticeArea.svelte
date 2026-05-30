<script lang="ts">
    import { appState } from '../states/appState.svelte';

    const words = $derived(appState.text.split(''));
</script>

<div class="relative font-mono text-3xl leading-relaxed select-none">
    <div class="flex flex-wrap text-gray-500">
        {#each words as char, i}
            <span 
                class="relative transition-colors duration-150"
                class:text-white={i < appState.currentIndex}
                class:text-red-500={false} 
            >
                {#if i === appState.currentIndex}
                    <span class="absolute left-0 bottom-0 w-0.5 h-full bg-yellow-400 animate-pulse"></span>
                {/if}
                {char === ' ' ? '\u00A0' : char}
            </span>
        {/each}
    </div>

    {#if appState.isFinished}
        <div class="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700 animate-fade-in">
            <p class="text-xl text-yellow-400 font-bold">Finished!</p>
            <p class="text-gray-300">Accuracy: {appState.accuracy.toFixed(1)}%</p>
            <p class="text-gray-300">Errors: {appState.errors}</p>
            <button 
                onclick={() => appState.reset()}
                class="mt-4 px-4 py-2 bg-yellow-400 text-black rounded font-bold hover:bg-yellow-500 transition-colors"
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
