import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';

export default {
    entry: 'server/app.js',
    format: 'cjs',
    external: ['fs'],
    plugins: [
        resolve({ preferBuiltins: true }),
        commonjs(),
        json()
    ],
    dest: 'dist/server.js'
};
