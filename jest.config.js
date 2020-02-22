module.exports = {
    projects: [
        '<rootDir>/packages/*',
        {
            runner: 'jest-runner-eslint',
            displayName: 'ESLint',
            testMatch: ['<rootDir>/packages/**/*.js'],
        },
        {
            runner: 'jest-runner-stylelint',
            displayName: 'stylelint',
            testMatch: ['<rootDir>/packages/client/**/*.js'],
        },
    ]
};
