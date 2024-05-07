/* eslint-disable no-console, import/no-unresolved, import/no-extraneous-dependencies */
import { vanillaExtractPlugin } from "@vanilla-extract/esbuild-plugin";
import autoprefixer from "autoprefixer";
import * as esbuild from "esbuild";
import { replace } from "esbuild-plugin-replace";
import postcss from "postcss";
import prefixSelector from "postcss-prefix-selector";
import readdir from "recursive-readdir-files";
import { stylusLoader } from "esbuild-stylus-loader";
const isWatching = process.argv.includes("--watch");
const isCssMinified = process.env.MINIFY_CSS === "true";

const getAllEntryPoints = async (rootPath) =>
  (await readdir(rootPath))
    .map(({ path }) => path)
    .filter(
      (path) =>
        /\.tsx?$/.test(path) &&
        !path.endsWith(".css.ts") &&
        !path.includes(".test.")
    );

const baseBuildConfig = {
  banner: {
    js: '"use client";', // Required for Next 13 App Router
  },
  bundle: true,
  format: "esm",
  loader: {
    ".png": "dataurl",
    ".svg": "dataurl",
  },
  platform: "browser",
  plugins: [
    stylusLoader(),
    {
      name: "make-all-packages-external",
      setup(build) {
        // let filter = /^[^./]|^\.[^./]|^\.\.[^/]/; // Must not start with "/" or "./" or "../"
        let filter = /^(@zypher-game\/ui)|^[^./]|^\.[^./]|^\.\.[^/]/;
        build.onResolve({ filter }, (args) => ({
          external: true,
          path: args.path,
        }));
      },
    },
  ],
  splitting: true, // Required for tree shaking
};

const mainBuild = esbuild.build({
  ...baseBuildConfig,
  entryPoints: ["./src/index.ts"],
  outdir: "dist",
  watch: isWatching
    ? {
        onRebuild(error, result) {
          if (error) console.error("main build failed:", error);
          else console.log("main build succeeded:", result);
        },
      }
    : undefined,
});

Promise.all([mainBuild])
  .then(() => {
    if (isWatching) {
      console.log("watching...");
    }
  })
  .catch(() => process.exit(1));
