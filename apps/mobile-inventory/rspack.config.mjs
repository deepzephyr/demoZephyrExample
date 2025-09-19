import * as Repack from '@callstack/repack';
import rspack from '@rspack/core';
import {getSharedDependencies} from 'mobile-sdk';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {withZephyr} from 'zephyr-repack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STANDALONE = Boolean(process.env.STANDALONE);
//const USE_ZEPHYR = Boolean(process.env.ZC);
const USE_ZEPHYR = 1;

/**
 * More documentation, installation, usage, motivation and differences with Metro is available at:
 * https://github.com/callstack/repack/blob/main/README.md
 *
 * The API documentation for the functions and plugins used in this file is available at:
 * https://re-pack.dev
 */

/**
 * Webpack configuration.
 * You can also export a static object or a function returning a Promise.
 *
 * @param env Environment options passed from either Webpack CLI or React Native Community CLI
 *            when running with `rnef start/bundle`.
 */
const config = env => {
  const {mode, platform} = env;
// MobileCart: `MobileCart@http://localhost:9000/${platform}/MobileCart.container.js.bundle`,
  return {
    mode,
    context: __dirname,
    entry: './index.js',

    resolve: {
      ...Repack.getResolveOptions(),
    },
    output: {
      uniqueName: 'mobile-inventory',
    },
    optimization: {
  splitChunks: false,
},
experiments: {
  lazyCompilation: false,
},
    module: {
      rules: [
        ...Repack.getJsTransformRules(),
        ...Repack.getAssetTransformRules({inline: !STANDALONE}),
      ],
    },
    plugins: [
      new Repack.RepackPlugin(),
      new Repack.plugins.ModuleFederationPluginV2({
        name: 'MobileInventory',
        filename: 'MobileInventory.container.js.bundle',
        dts: false,
        remotes: {
          MobileCart: `MobileCart@https://deepti-kalra-8-mobilecart-demozephyrexample-deepz-60e3c9c1a-ze.zephyrcloud.app/MobileCart.container.js.bundle`,
        },
        exposes: STANDALONE
          ? undefined
          : {
              './HomeScreen': './src/screens/HomeScreen',
              './ProductDetailsScreen': './src/screens/ProductDetailsScreen',
            },
        shared: getSharedDependencies({eager: STANDALONE}),
      }),
      new rspack.IgnorePlugin({
        resourceRegExp: /^@react-native-masked-view/,
      }),
      new Repack.plugins.HermesBytecodePlugin({
        enabled: mode === 'production',
        test: /\.(js)?bundle$/,
        exclude: /index.bundle$/,
      }),
    ],
  };
};

export default USE_ZEPHYR ? withZephyr()(config) : config;
