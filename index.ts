import { levenshteinDistance, getWordDistances, bubbleSort } from "./src/autocomplete";

const word = "Hel"
const distances = bubbleSort(await getWordDistances(word))

let out = [];

for (let i = 0; i < distances.length; ++i) {
    if (word.toLowerCase() === distances[i]!.word.toLowerCase()) {
        break;
    }
    if (distances[i]!.word.toLowerCase().startsWith(word.toLowerCase())) {
        out.push(distances[i])
    }
}


if (!out.length && word.toLowerCase()) {
    out = distances.slice(0, 10);
}

console.log(out);