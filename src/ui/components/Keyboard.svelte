<script lang="ts">
    import { KeymapParser } from '../../domain/keymapParser';
    import { appState } from '../states/appState.svelte';

    const layout = KeymapParser.getDefault3x5_3();
    let currentLayer = $derived(layout.layers[appState.currentLayer]);

    function isKeyActive(key: string) {
        return appState.activeKey === key.toUpperCase();
    }
</script>

<div class="flex flex-col items-center gap-4 mt-12 p-8 bg-gray-900/50 rounded-2xl border border-white/5">
    <div class="flex gap-4 mb-4">
        {#each layout.layers as layer, i}
            <button 
                onclick={() => appState.currentLayer = i}
                class="px-3 py-1 rounded text-xs font-bold transition-colors"
                class:bg-yellow-400={appState.currentLayer === i}
                class:text-black={appState.currentLayer === i}
                class:bg-gray-800={appState.currentLayer !== i}
                class:text-gray-500={appState.currentLayer !== i}
            >
                {layer.name}
            </button>
        {/each}
    </div>

    <div class="flex gap-12">
        <!-- Left Half -->
        <div class="grid grid-cols-5 gap-1.5">
            {#each currentLayer.keys.slice(0, 3) as row}
                {#each row.slice(0, 5) as key}
                    <div 
                        class="w-12 h-12 flex items-center justify-center rounded-md border text-sm font-bold transition-all duration-75"
                        class:bg-yellow-400={isKeyActive(key)}
                        class:text-black={isKeyActive(key)}
                        class:border-yellow-400={isKeyActive(key)}
                        class:bg-gray-800={!isKeyActive(key)}
                        class:text-gray-400={!isKeyActive(key)}
                        class:border-gray-700={!isKeyActive(key)}
                    >
                        {key}
                    </div>
                {/each}
            {/each}
        </div>

        <!-- Right Half -->
        <div class="grid grid-cols-5 gap-1.5">
            {#each currentLayer.keys.slice(0, 3) as row}
                {#each row.slice(5, 10) as key}
                    <div 
                        class="w-12 h-12 flex items-center justify-center rounded-md border text-sm font-bold transition-all duration-75"
                        class:bg-yellow-400={isKeyActive(key)}
                        class:text-black={isKeyActive(key)}
                        class:border-yellow-400={isKeyActive(key)}
                        class:bg-gray-800={!isKeyActive(key)}
                        class:text-gray-400={!isKeyActive(key)}
                        class:border-gray-700={!isKeyActive(key)}
                    >
                        {key}
                    </div>
                {/each}
            {/each}
        </div>
    </div>

    <!-- Thumb Clusters -->
    <div class="flex gap-16 mt-4">
        <div class="flex gap-1.5">
            {#each currentLayer.keys[3].slice(0, 2) as key}
                <div 
                    class="w-14 h-12 flex items-center justify-center rounded-md border text-xs font-bold transition-all duration-75"
                    class:bg-yellow-400={isKeyActive(key)}
                    class:text-black={isKeyActive(key)}
                    class:bg-gray-800={!isKeyActive(key)}
                    class:text-gray-400={!isKeyActive(key)}
                    class:border-gray-700={!isKeyActive(key)}
                >
                    {key}
                </div>
            {/each}
        </div>
        <div class="flex gap-1.5">
            {#each currentLayer.keys[3].slice(2, 3) as key}
                <div 
                    class="w-14 h-12 flex items-center justify-center rounded-md border text-xs font-bold transition-all duration-75"
                    class:bg-yellow-400={isKeyActive(key)}
                    class:text-black={isKeyActive(key)}
                    class:bg-gray-800={!isKeyActive(key)}
                    class:text-gray-400={!isKeyActive(key)}
                    class:border-gray-700={!isKeyActive(key)}
                >
                    {key}
                </div>
            {/each}
        </div>
    </div>
</div>
