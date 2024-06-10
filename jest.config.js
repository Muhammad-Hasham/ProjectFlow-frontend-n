// jest.config.js
module.exports = {
  setupFilesAfterEnv: ['./setupTests.js'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Transform files using babel-jest
    },
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy" // Helps Jest handle non-JS files like CSS imports
    },
    testEnvironment: 'jsdom', // Simulates a browser environment

    transformIgnorePatterns: [
        "<rootDir>/node_modules/(?!axios)" // Adjust pattern as necessary
      ],
  };
  
  