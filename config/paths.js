const path = require('path');

const root = path.resolve(__dirname, '..');

function base() {
    const args = [root].concat(Array.from(arguments));
    return path.resolve.apply(path, args);
}

module.exports = {
    root,
    base: base.bind(null, './'),
    dist: base.bind(null, 'dist')
};
