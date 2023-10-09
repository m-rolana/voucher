module.exports = (api) => {
    const isTest = api.env('test');
    // You can use isTest to determine what presets and plugins to use.

    if (!isTest) {
        return {};
    }

    return {
        presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
        plugins: [
            ['@babel/plugin-proposal-decorators', { version: 'legacy' } ],
            ['@babel/plugin-transform-flow-strip-types'],
            ['@babel/plugin-proposal-class-properties', {loose: true}],
            "babel-plugin-transform-typescript-metadata",
        ]
    };
};
