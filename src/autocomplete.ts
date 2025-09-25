type Output = {
    distance: number,
    word: string
}

const MAXDISTANCE = 50;

function levenshteinDistance(s1: string, s2: string, maxDistance: number = MAXDISTANCE): number {
    const m = s1.length;
    const n = s2.length;

    if (Math.abs(m - n) > maxDistance) return maxDistance + 1;
    if (m === 0) return n > maxDistance ? maxDistance + 1 : n;
    if (n === 0) return m > maxDistance ? maxDistance + 1 : m;

    if (m < n) return levenshteinDistance(s2, s1, maxDistance);

    let prev = new Array<number>(n + 1).fill(0);
    let curr = new Array<number>(n + 1).fill(0);

    for (let j = 0; j <= n; j++) {
        prev[j] = j;
        if (prev[j]! > maxDistance) return maxDistance + 1;
    }

    for (let i = 1; i <= m; i++) {
        curr[0] = i;
        if (curr[0] > maxDistance) return maxDistance + 1;

        for (let j = 1; j <= n; j++) {
            const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
            curr[j] = Math.min(
                prev[j]! + 1,
                curr[j - 1]! + 1,
                prev[j - 1]! + cost
            );

            // Early exit if this cell exceeds max
            if (curr[j]! > maxDistance) return maxDistance + 1;
        }

        [prev, curr] = [curr, prev];
        curr.fill(0);
    }

    return prev[n]!;
}

async function getWordDistances(word: string): Promise<Output[]> {
    // if (await isIncorrectlySpelledWord(word) === false) return [];

    const file = await Bun.file("/usr/share/dict/words");

    if (!file.exists()) {
        throw new Error("/usr/share/dict/words does not exist")
    }

    // if ((await file.text()).split("\n").indexOf(word) > -1) {
    //     return []
    // }

    const words: string[] = (await file.text()).split("\n");

    const distances: Output[] = []

    words.map((value) => {
        const w = value.toLowerCase();
        if (w.startsWith(word.at(0)!.toLowerCase())) {
            const out: Output = {
                distance: levenshteinDistance(word, w!),
                word: w!
            }

            if (out.distance <= 3)
                distances.push(out);
        }
    })

    return distances;
}

function bubbleSort(arr: Array<any>): Array<any> {
    const sorted = arr;

    for (let i = 0; i < arr.length - 1; ++i) {
        let swapped = false;
        for (let j = 0; j < arr.length - i - 1; ++j) {
            if (arr[j].distance > arr[j + 1].distance) {
                const temp = sorted[j];
                sorted[j] = sorted[j + 1];
                sorted[j + 1] = temp;
                swapped = true;
            }
        }

        if (!swapped) break;
    }

    return sorted;
}

async function isIncorrectlySpelledWord(word: string): Promise<boolean> {
    try {
        return (await isWordInDict(word)) || (await getWordDistances(word)).at(0)!.word.toLowerCase() === word.toLowerCase() ? false : true
    } catch (e) {
        return true;
    }
}

async function isWordInDict(word: string): Promise<boolean> {
    // Ugly one liner
    return (((await Bun.file("/usr/share/dict/words").text()).toLowerCase()).split("\n").indexOf(word.toLowerCase()) > -1) ? true : false;
}

export { levenshteinDistance, getWordDistances, bubbleSort, isIncorrectlySpelledWord }