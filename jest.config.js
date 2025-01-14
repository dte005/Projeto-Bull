const config = {
    verbose: false,
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js$',
    collectCoverage: true,
    collectCoverageFrom: ['./**/*.js'],
};

module.exports = config;