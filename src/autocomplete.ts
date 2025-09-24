type Output = {
    distance: number,
    word: string
}

function levenshteinDistance(s: string, t: string): number {
    const m: number = s.length;
    const n: number = t.length;

    if (m === undefined) {
        return -1;
    }

    if (n === undefined) {
        return -1;
    }

    let matrix: number[][] = Array(m).fill([]).map(() => Array(n).fill(0));

    for (let j = 0; j < n; ++j) {
        matrix[0]![j] = j;
    }

    for (let i = 0; i < m; ++i) {
        matrix[i]![0] = i;
    }

    for (let i = 1; i < m; ++i) {
        for (let j = 1; j < n; ++j) {
            let cost: number;
            if (s[i - 1] === t[j - 1]) {
                cost = 0;
            } else {
                cost = 1;
            }

            matrix[i]![j] = Math.min(
                matrix[i - 1]![j]! + 1,
                matrix[i]![j - 1]! + 1,
                matrix[i - 1]![j - 1]! + cost
            )
        }
    }

    return (matrix[m - 1]![n - 1]!);
}

async function getWordDistances(word: string): Promise<Output[]> {
    const file = await Bun.file("/usr/share/dict/words");

    if (!file.exists()) {
        throw new Error("/usr/share/dict/words does not exist")
    }

    if ((await file.text()).split("\n").indexOf(word) > -1) {
        return []
    }

    const words: string[] = (await file.text()).split("\n");

    const distances: Output[] = []

    words.map((value) => {
        const w = value.toLowerCase();
        const out: Output = {
            distance: levenshteinDistance(word, w!),
            word: w!
        }

        if (out.distance <= 3)
            distances.push(out);
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

export { levenshteinDistance, getWordDistances, bubbleSort }