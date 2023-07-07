/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
import type { Config } from "jest";

export default {
    transform: {
        "^.+\\.(t|j)sx?$": "ts-jest",
    },
    testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    testEnvironment: "jsdom",
    modulePathIgnorePatterns: ["/dist"],
} as Config;
