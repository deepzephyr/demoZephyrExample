import * as Repack from '@callstack/repack';
import rspack from '@rspack/core';
import {getSharedDependencies} from 'mobile-sdk';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {withZephyr} from 'zephyr-repack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USE_ZEPHYR = Boolean(process.env.ZC);

//  MobileCart: `MobileCart@https://t-android-developinit-deepti-kalra-mobilecart-demozep-742751-ze.zephyrcloud.app//MobileCart.container.js.bundle`,
//           MobileInventory: `MobileInventory@http://localhost:9001/${platform}/MobileInventory.container.js.bundle`,
//           MobileCheckout: `MobileCheckout@http://localhost:9002/${platform}/MobileCheckout.container.js.bundle`,
//           MobileOrders: `MobileOrders@http://localhost:9003/${platform}/MobileOrders.container.js.bundle`,

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
  return {
    mode,
    context: __dirname,
    entry: './index.js',
    resolve: {
      ...Repack.getResolveOptions(),
    },
    output: {
      uniqueName: 'mobile-host',
    },
    module: {
      rules: [
        ...Repack.getJsTransformRules(),
        ...Repack.getAssetTransformRules(),
      ],
    },
    plugins: [
      new Repack.RepackPlugin(),
      new Repack.plugins.ModuleFederationPluginV2({
        name: 'MobileHost',
        dts: false,
        remotes: {
          MobileCart: `MobileCart@https://deepti-kalra-8-mobilecart-demozephyrexample-deepz-60e3c9c1a-ze.zephyrcloud.app/MobileCart.container.js.bundle`,
          MobileInventory: `MobileInventory@https://deepti-kalra-10-mobileinventory-demozephyrexample-ab5f27f0c-ze.zephyrcloud.app/MobileInventory.container.js.bundle`,
          MobileCheckout: `MobileCheckout@https://deepti-kalra-6-mobilecheckout-demozephyrexample-d-bba36cfb7-ze.zephyrcloud.app/MobileCheckout.container.js.bundle`,
          MobileOrders: `MobileOrders@https://deepti-kalra-11-mobileorders-demozephyrexample-de-2e90186d3-ze.zephyrcloud.app/MobileOrders.container.js.bundle`,
        },
        shared: getSharedDependencies({eager: true}),
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
