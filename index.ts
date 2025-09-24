import { levenshteinDistance, getWordDistances, bubbleSort } from "./src/autocomplete";

const word = "word"
const distances = bubbleSort(await getWordDistances(word))

let out = [];

for (let i = 0; i < distances.length; ++i) {
    if (distances[i]!.word.toLowerCase().startsWith(word.toLowerCase())) {
        out.push(distances[i])
    }
}

if (!out.length) {
    out = distances.slice(0, 10);
}

console.log(out);