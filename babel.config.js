module.exports = (api) => {

    // Cache this settings
    api.cache(true);

    return {
        babelrcRoots: ['.', 'packages/*']
    };
};
