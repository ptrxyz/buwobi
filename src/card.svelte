<script>
    export let state = 0
    export let caption = ''
    let winning = false

    export function jello() {
        winning = true
        setTimeout(() => {
            winning = false
        }, 300)
    }
</script>

<div on:click class:jello={winning == true} class:done={state === 1}>
    <span>{caption}</span>
</div>

<style lang="postcss" windi:global>
    :global(.jello) {
        animation: jello-vertical 0.5s both;
    }

    div span {
        cursor: pointer;
        user-select: none;
        padding-bottom: 4px;
        transition: padding 300ms ease-in-out;
        max-width: 100%;
        overflow-x: hidden;
        text-overflow: ellipsis;
        word-wrap: normal;
    }

    div {
        display: grid;
        align-items: center;
        justify-items: center;

        cursor: pointer;

        @apply rounded-md;
        @apply border-solid border-2 border-warm-gray-800 bg-warm-gray-100;
        @apply text-warm-gray-800 font-sans;
        @apply shadow-lg text-lg font-semibold text-center;
        box-shadow: 0px 4px 1px inset rgb(255 255 255 / 0.7),
            0px -4px 1px inset rgb(0 0 0 / 0.7);
        font-family: 'BrutalType-Medium', 'Din Next Rounded Lt Pro';

        -webkit-tap-highlight-color: transparent;

        background-size: 100% 200%;
        background-position-y: 0%;
        transition: all 300ms ease-in-out;
    }

    div {
        @apply w-32 h-32;
        @apply <sm:w-24 <sm:h-24 <sm:text-sm <sm:font-normal;
        @apply <xs:w-16 <xs:h-16 <xs:text-xs <xs:font-normal;
    }

    .done {
        @apply bg-blue-500 text-white border-warm-gray-800;
        box-shadow: 0px 4px 1px inset rgb(0 0 0 / 0.33),
            0px -4px 1px inset rgb(255 255 255 / 0.66);

        span {
            padding-bottom: 0px;
            padding-top: 4px;
        }
    }

    @keyframes jello-vertical {
        0% {
            transform: scale3d(1, 1, 1);
        }
        30% {
            transform: scale3d(0.875, 1.125, 1);
        }
        40% {
            transform: scale3d(1.125, 0.875, 1);
        }
        50% {
            transform: scale3d(0.925, 1.075, 1);
        }
        65% {
            transform: scale3d(1.05, 0.95, 1);
        }
        75% {
            transform: scale3d(0.95, 1.05, 1);
        }
        100% {
            transform: scale3d(1, 1, 1);
        }
    }
</style>
