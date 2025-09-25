import { describe, expect, test } from "bun:test"
import * as auto from "./autocomplete"

describe("Testing autocomplete", () => {
    test("asdfefjwiefj should be incorrect", async () => {
        const res: boolean = await auto.isIncorrectlySpelledWord("asdfefjwiefj");

        expect(res).toBe(true);
    })
    test("Hello should be correct", async () => {
        const res: boolean = await auto.isIncorrectlySpelledWord("Hello");

        expect(res).toBe(false);
    })
})