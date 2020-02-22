const path = require('path');

const root = path.resolve(__dirname, '..');

function base() {
    const args = [root].concat(Array.from(arguments));
    return path.resolve.apply(path, args);
}

module.exports = {
    root,
    client: base.bind(null, 'packages/client'),
    server: base.bind(null, 'packages/server'),
    dist: base.bind(null, 'dist')
};
