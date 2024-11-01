import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/EncryptCompress.ts',
  output: [
    {
      file: 'dist/encrypt-compress-json.umd.cjs',
      format: 'umd',
      name: 'EncryptCompressJson'
    },
    {
      file: 'dist/encrypt-compress-json.js',
      format: 'es'
    }
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json'
    }),
    resolve(),
    commonjs()
  ],
  external: ['crypto-js']
}; 