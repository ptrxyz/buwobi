<script>
    import md5 from 'md5'
    import confetti from 'canvas-confetti'
    import Card from './card.svelte'
    import Modal from './modal.svelte'
    import Refresh from './refresh.svelte'
    import { fetchWords, sampleWords } from './lib/functions.js'

    async function getWordSample() {
        someWords = sampleWords(await fetchWords(link))
        localStorage.setItem(`words-${lnkHash}`, JSON.stringify(someWords))
        gameState.celebrating = false
        gameState.wonAlready = false
    }

    function toggle(word) {
        if (word.word == '') return
        word.state = word.state == 1 ? 0 : 1
        someWords[word.id] = word
        checkWinning(word.id)
    }

    function checkWinning(wid) {
        const widx = someWords.findIndex((word) => word.id == wid)
        const crow = Math.floor(widx / 4)
        const ccol = widx % 4

        const id = (row, col) => row * 4 + col
        const isOn = (row, col) => someWords[id(row, col)].state == 1

        // array with 1..4
        let otf = [...Array(4).keys()]

        // check for row and column wins
        let rowwin = otf.every((col) => isOn(crow, col))
        let colwin = otf.every((row) => isOn(row, ccol))

        // check for diagonal wins
        let d1win = crow == ccol ? otf.every((i) => isOn(i, i)) : false
        let d2win = 3 - crow == ccol ? otf.every((i) => isOn(3 - i, i)) : false

        // loop over all elements and if it's matching a wincon, let it wobble.
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (
                    (rowwin && row == crow) ||
                    (colwin && col == ccol) ||
                    (d1win && row == col) ||
                    (d2win && 3 - row == col)
                ) {
                    someWords[id(row, col)].element.jello()
                }
            }
        }

        gameState.celebrating =
            (rowwin || colwin || d1win || d2win) && !gameState.wonAlready
    }

    const deeplink =
        new URLSearchParams(window.location.search).get('wl') ||
        'ptrxyz/ec3f64d93c6de364bf93f22e9fc5daa6/raw/e478486c5f412728354b556513dabfe8b9cd633d/gistfile1.txt'
    const link = `https://gist.githubusercontent.com/${deeplink}`
    const lnkHash = md5(link)

    let gameState = {
        loading: false,
        celebrating: false,
        winDialog: undefined,
        wonAlready: false,
    }

    let someWords = JSON.parse(localStorage.getItem(`words-${lnkHash}`)) || []

    if (someWords.length == 0) {
        getWordSample()
    }

    $: {
        if (gameState.celebrating) {
            const fire = () => {
                confetti({
                    particleCount: 100,
                    startVelocity: 20,
                    spread: 270,
                    origin: {
                        x: Math.random() * 0.3 + 0.35,
                        // since they fall down, start a bit higher than random
                        y: Math.random() * 0.25 + 0.1,
                    },
                })
            }
            setTimeout(fire, Math.random() * 100 + 100)
            setTimeout(fire, Math.random() * 100 + 200)
            setTimeout(fire, Math.random() * 100 + 300)
            if (gameState.winDialog) gameState.winDialog.open()
            gameState.wonAlready = true
        } else {
            if (gameState.winDialog) gameState.winDialog.hide()
        }
    }
</script>

<main
    class="min-h-full min-w-full bg-dark-100 flex items-center justify-around"
>
    <Modal bind:this={gameState.winDialog} />
    <div>
        <div class="flex flex-row items-center justify-end pr-2">
            <div class="lower">
                <Refresh on:click={getWordSample} />
            </div>
        </div>
        <grid
            class="isolate relative inline-grid grid-cols-4 grid-rows-4 gap-4 border-solid border-warm-gray-800 p-4 bg-warm-gray-400 shadow-xl rounded-lg"
        >
            {#each someWords as word, i (word.id)}
                <Card
                    caption={word.word}
                    state={word.state}
                    on:click={() => {
                        toggle(word)
                    }}
                    bind:this={someWords[i].element}
                />
            {/each}
        </grid>
    </div>
</main>

<style lang="postcss" windi:global>
    .lower {
        transform: translateY(42px);
        z-index: 0;
        transition: transform 300ms ease-in-out;

        &:hover {
            transform: translateY(0px);
        }
    }
</style>
