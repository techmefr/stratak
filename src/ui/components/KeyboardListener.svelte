<script lang="ts">
    import { onMount } from 'svelte';
    import { appState } from '../states/appState.svelte';

    function handleKeyDown(event: KeyboardEvent) {
        // We only care about single characters for now
        if (event.key.length === 1) {
            appState.handleKeyDown(event.key);
        }
    }

    function handleKeyUp() {
        appState.handleKeyUp();
    }

    onMount(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    });
</script>

<!-- This component doesn't render anything -->
