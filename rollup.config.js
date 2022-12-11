import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

var config = {
    format: 'umd',
    moduleName: '@joaherrerama/openeojs',
    test: /\.m?js/,
    resolve: {
      fullySpecified: false,
    },
    plugins: [
        nodeResolve({
            jsnext: true
        }),
    // due to https://github.com/rollup/rollup/wiki/Troubleshooting#name-is-not-exported-by-module
        commonjs({
          exclude: 'node_modules/**',
            namedExports: { './node_module/invariant.js': ['default'] }
        }),
        babel({
            exclude: 'node_modules/**'
        }),
        uglify({
          compress: {
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            warnings: false
          }
        })
    ]
}

export default config