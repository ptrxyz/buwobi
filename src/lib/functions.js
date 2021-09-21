
function sampleArray(array) {
    return array[Math.floor(Math.random() * array.length)]
}

async function fetchWords(link) {
    console.log('Fetching words...')
    try {
        const response = await fetch(link)
        if (!response.ok) {
            throw ("Could not get wordlist.")
        }
        const text = await response.text()
        return text.split('\n').filter((x) => x.trim().length > 0)
    } catch (reason) {
        console.log({ reason })
        return []
    }
}

function sampleWords(words) {
    let someWords = []
    for (let i = 0; i < 16; i++) {
        someWords = [
            ...someWords,
            {
                id: Math.random() * 1000000000000,
                word: sampleArray(words),
                element: undefined,
                winning: false,
                state: 0,
            },
        ]
    }
    return someWords
}

export { sampleWords, fetchWords }