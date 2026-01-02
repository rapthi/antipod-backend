module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx'],
    testMatch: ['**/*.(test|spec).ts'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
        }
    }
}