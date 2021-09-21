<script>
    import { fade } from 'svelte/transition'
    import Winning from './assets/tiny-winning.svelte'
    import Sunburst from './assets/sunburst.svelte'

    export let isOpen = false
    export let dimmed = true

    export function open() {
        isOpen = true
        dimmed = true
    }

    export function hide() {
        isOpen = false
        dimmed = false
    }
</script>

<div
    class="dim"
    class:dimOn={dimmed}
    on:click={() => {
        hide()
    }}
/>
<div class="modal" class:open={isOpen}>
    {#if isOpen}
        <div class="submodal"><Sunburst /></div>
        <div class="submodal">
            <div class="subwin">
                <span class="title">Thanks for playing!</span>
                <span class="text"
                    >Please tell the speaker to tone it down. It's definitly too
                    many buzzwords...&#x1F605;</span
                >
            </div>
        </div>
        <div class="submodal shadow-svg"><Winning /></div>
    {/if}
    <!-- <div class="relative"> 
        {#if isOpen}
            <Winning w="100%" />
            <div class="info">
                <div class="button">Keep on playing!</div>
            </div> 
        {/if}
    </div> -->
</div>

<style lang="postcss" windi:global>
    .subwin {
        @apply w-64 px-8 pt-12 pb-8 flex flex-col items-center;
        @apply bg-light-100 rounded shadow-lg;
        transform: translateY(100%);
        font-family: 'BrutalType-Medium', 'Din Next Rounded Lt Pro';

        .title {
            @apply font-bold;
            display: block;
        }

        .text {
            @apply mt-3;
            font-family: 'BrutalType-Regular';
        }
    }

    .submodal {
        @apply absolute w-full h-full;
        display: grid;
        align-items: center;
        justify-items: center;
    }

    :global(.shadow-svg > svg) {
        filter: drop-shadow(0px 5px 10px rgb(0 0 0 / 0.3));
    }

    .dim {
        position: fixed;
        @apply w-full h-full opacity-0 inset-0;
        @apply bg-dark-800;
        transition: opacity 500ms ease-in-out;
        pointer-events: none;
        z-index: 100;
    }

    .dimOn {
        @apply opacity-80;
        transition: opacity 500ms ease-in-out;
        pointer-events: all;
    }

    .modal {
        @apply w-screen-2xl 
        position: absolute;
        z-index: 110;
        transition: all 200ms ease-in-out;
        transform: scale(0.8, 0.8);
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        aspect-ratio: 1;
        display: grid;
        align-items: center;
        justify-items: center;
    }

    .open {
        transform: scale(1, 1);
        opacity: 1;
        visibility: visible;
        /* animation: swirl-in-fwd 0.6s ease-out both; */
    }

    :global(#sunburst) {
        animation: swirl-in-fwd 6s ease-out both;
        transform-origin: 50% 50%;
    }

    :global(#trophy) {
        animation: swirl-in-fwd 0.6s ease-out both;
        transform-origin: 50% 50%;
    }

    :global(#crown_left) {
        animation: crown 0.4s ease-in both;
        transform-origin: 50% 50%;
        animation-delay: 500ms;
    }

    :global(#crown_right) {
        animation: crown 0.4s ease-in both;
        transform-origin: 50% 50%;
        animation-delay: 750ms;
    }

    :global(#banner_w_text) {
        animation: swing-in-top-fwd 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275)
            both;
        transform-origin: 50% 50%;
    }

    /* 
    .info {        
        z-index: 1
    }
    */

    @keyframes swing-in-top-fwd {
        0% {
            transform: rotateX(-100deg);
            transform-origin: top;
            opacity: 0;
        }
        100% {
            transform: rotateX(0deg);
            transform-origin: top;
            opacity: 1;
        }
    }

    @keyframes crown {
        0% {
            transform: scale(0);
            opacity: 0;
        }
        29% {
            transform: scale(0);
            opacity: 0;
        }
        30% {
            transform: scale(0.6);
            opacity: 0;
        }
        90% {
            transform: scale(1.1);
            opacity: 1;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }

    @keyframes swirl-in-fwd {
        0% {
            transform: rotate(-540deg) scale(0.6);
            opacity: 0;
        }
        100% {
            transform: rotate(0) scale(1);
            opacity: 1;
        }
    }
</style>
