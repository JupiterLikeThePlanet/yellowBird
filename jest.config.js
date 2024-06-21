module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    testMatch: [
      '<rootDir>/src/**/*.test.tsx',  // Matches any .test.tsx files in src directory
      '<rootDir>/src/**/*.test.ts'    // Matches any .test.ts files in src directory
    ],
    testPathIgnorePatterns: ["/node_modules/", "/\\._/"], // Ignore system files
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  };
  