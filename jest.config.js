module.exports = {
    displayName: '@riskie/server',
    transform: {
        "^.+\\.ts$": "babel-jest",
    },
    setupFilesAfterEnv: ['<rootDir>/tests/framework.setup.js'],
};
