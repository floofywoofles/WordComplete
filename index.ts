import { levenshteinDistance, getWordDistances, bubbleSort, isIncorrectlySpelledWord } from "./src/autocomplete";

const word = "Heee"
if (await isIncorrectlySpelledWord(word) === false) {
    console.log("Word is spelled correctly")
    process.exit(0);
}

const distances = bubbleSort(await getWordDistances(word))

console.log(distances.slice(0, 10));