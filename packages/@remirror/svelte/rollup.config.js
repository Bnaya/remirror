import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import svelte from 'rollup-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';

import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    { file: pkg.module, format: 'es' },
    { file: pkg.main, format: 'umd', name: 'RemirrorSvelte' },
  ],
  plugins: [
    svelte({
      preprocess: sveltePreprocess(),
    }),
    resolve(),
    commonjs(),
    typescript(),
  ],
};
