<script lang="ts">
    import { onMount } from 'svelte';
    import { appState } from '../states/appState.svelte';

    function handleKeyDown(event: KeyboardEvent) {
        // Prevent default behavior for some keys to avoid scrolling etc.
        if (event.key === ' ' || event.key.length === 1) {
            // event.preventDefault();
        }

        // We only care about single characters for now
        if (event.key.length === 1) {
            appState.handleKey(event.key);
        }
    }

    onMount(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    });
</script>

<!-- This component doesn't render anything -->
