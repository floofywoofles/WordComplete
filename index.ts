import { levenshteinDistance, getWordDistances, bubbleSort } from "./src/autocomplete";

const distances = await getWordDistances("Hello")
console.log(bubbleSort(distances))
