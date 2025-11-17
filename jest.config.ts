import nextJest from "next/jest";

const createJestConfig = nextJest({ dir: "./" });

const customConfig = {
  testPathIgnorePatterns: ["<rootDir>/tests/e2e/"],
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/tests/setupTests.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
};

export default createJestConfig(customConfig);
