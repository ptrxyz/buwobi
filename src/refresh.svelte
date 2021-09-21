<script>
    import Refresh from './assets/refresh.svg'
</script>

<button on:click>
    <span>Restart</span>
    <ico>
        <Refresh height="100%" />
    </ico>
</button>

<style lang="postcss" windi:global>
    button {
        @apply w-30 h-12 bg-emerald-500;
        box-shadow: 0px -5px 1px inset rgb(0 0 0 / 0.3);
        @apply rounded-lg text-white text-base;
        padding: 0px 0px 5px 0px;
        cursor: pointer;
        outline: none;
        border: none;

        font-family: 'BrutalType-Medium';
        @apply flex flex-row justify-center
            items-center gap-2;

        span {
            height: 36px;
            display: inline-flex;
            align-items: center;
            pointer-events: none;
        }
    }

    button:active {
        box-shadow: 0px 5px 1px inset rgb(0 0 0 / 0.3);
        padding: 5px 0px 0px 0px;
    }

    button :global(ico) {
        filter: invert(1);
        display: inline-block;
        width: 24px;
        height: 24px;
        pointer-events: none;
    }
</style>
