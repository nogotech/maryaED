import * as esbuild from "esbuild";

const isWatch = process.argv.includes("--watch");

const buildOptions = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  outdir: "dist",
  format: "cjs",
  platform: "node",
  sourcemap: true,
  target: ["es2020"],
  logLevel: "info",
};

const ctx = await esbuild.context(buildOptions);

if (isWatch) {
  await ctx.watch();
  console.log("👀 Watching for changes...");
} else {
  await ctx.rebuild();
  await ctx.dispose();
}
