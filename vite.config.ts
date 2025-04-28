import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import eslint from 'vite-plugin-eslint2';
import stylelint from 'vite-plugin-stylelint';
import autoImport from 'unplugin-auto-import/vite';
import components from 'unplugin-vue-components/vite';
import { ElementPlusResolver, VueUseComponentsResolver } from 'unplugin-vue-components/resolvers';

import postCssPxToRem from 'postcss-pxtorem';
import autoprefixer from 'autoprefixer';

// https://vite.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
  plugins: [
    vue({
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    }),
    vueJsx(),
    vueDevTools(),
    autoImport({
      vueTemplate: true,
      imports: ['vue', 'vue-router', 'pinia'],
      resolvers: [ElementPlusResolver()],
      dts: './types/auto-imports.d.ts',
    }),
    components({
      dts: './types/components.d.ts',
      resolvers: [ElementPlusResolver(), VueUseComponentsResolver()],
      extensions: ['vue', 'tsx'],
    }),
    eslint({
      fix: true,
    }),
    stylelint({
      fix: true,
    }),
  ],
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          // 自适应，px>rem转换
          rootValue: 16, // 1rem的大小
          propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
        }),
        autoprefixer({
          // 自动添加前缀
          overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8'],
        }),
      ],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
