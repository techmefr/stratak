<script lang="ts">
    import KeyboardListener from '../ui/components/KeyboardListener.svelte';
    import PracticeArea from '../ui/components/PracticeArea.svelte';
    import Keyboard from '../ui/components/Keyboard.svelte';
    import '../routes/layout.css';
</script>

<KeyboardListener />

<main class="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
    <div class="max-w-4xl w-full">
        <header class="mb-12">
            <h1 class="text-4xl font-bold tracking-tighter text-yellow-400">STRATAK</h1>
            <p class="text-gray-500">Progressive learning for custom keyboards</p>
        </header>

        <section class="w-full flex flex-col items-center">
            <PracticeArea />
            <Keyboard />
        </section>

        <footer class="mt-24 text-gray-600 text-sm">
            <p>Press any key to start typing • Minimalist Ergo-L Training</p>
        </footer>
    </div>
</main>
