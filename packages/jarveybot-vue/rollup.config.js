// Plugins
import json from '@rollup/plugin-json';
import url from '@rollup/plugin-url';
import image from '@rollup/plugin-image';
import {terser} from "rollup-plugin-terser";
import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import jsx from 'acorn-jsx';
import commonjs from '@rollup/plugin-commonjs';
import scss from 'rollup-plugin-scss';
// Configuration data
import pkg from './package.json';

function insertMinPostfix(stringToUpdate) {
    return stringToUpdate.includes('.js') ? stringToUpdate.replace('.js', '.min.js') : stringToUpdate;
}

function capitalize(stringToCapitalize) {
    return stringToCapitalize.charAt(0).toUpperCase() + stringToCapitalize.slice(1);
}

function generateLegalJsId(illegalJsId) {
    return capitalize(illegalJsId.replace(/(-\w)/g, (matches) => matches[1].toUpperCase()));
}

// Configuration
const knownExtensions = ['.js', '.jsx', '.ts', '.tsx'];

const babelConfig = {
    exclude: 'node_modules/**'
};

module.exports = {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
        },
        {
            file: insertMinPostfix(pkg.main),
            format: 'cjs',
            plugins: [terser()]
        },
        {
            file: pkg.browser,
            format: 'umd',
            name: generateLegalJsId(pkg.name),
        },
        {
            file: insertMinPostfix(pkg.browser),
            format: 'umd',
            name: generateLegalJsId(pkg.name),
            plugins: [terser()]
        },
        {
            file: pkg.module,
            format: 'esm'
        },
        {
            file: insertMinPostfix(pkg.module),
            format: 'esm',
            plugins: [terser()]
        },
    ],
    acornInjectPlugins: [
        jsx(),
    ],
    plugins: [
        json(),
        url(),
        image(),
        resolve(),
        babel(babelConfig),
        typescript({
            typescript: require('typescript'),
        }),
        commonjs({extensions: knownExtensions}),
        scss({output: `dist/${pkg.name}.css`})
    ]
};
