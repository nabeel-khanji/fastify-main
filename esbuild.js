import esbuild from "esbuild"
import dotenv from "dotenv"
import ms from "ms"
import fs from "fs"
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
dotenv.config()

const isDev = process.env.MODE == "dev"
/**
 * build server and mico-server
 */
esbuild.build({
    incremental: true,
    keepNames: isDev,
    bundle: true,
    format: "esm",
    entryPoints: ["Server.ts"],
    platform: "node",
    external: ["./node_modules/*"],
    watch: isDev,
    outdir: "dist",
    // outfile:"dist/Server.js",
    sourcemap: isDev ? "inline" : undefined,
    target: "esNext",
    define: {
        DEBUG: process.env.MODE == "dev",

    },
    minify: !isDev,
    treeShaking: !isDev,
})
const files = fs.readdirSync(__dirname + "queue")
console.log(files)
esbuild.build({
    incremental: true,
    keepNames: isDev,
    bundle: true,
    format: "esm",
    entryPoints: files.map(item => `queue/${item}`),
    platform: "node",
    external: ["./node_modules/*"],
    watch: isDev,
    outdir: "dist/queue",
    // outfile:"dist/Server.js",
    sourcemap: isDev ? "inline" : undefined,
    target: "esNext",
    define: {
        DEBUG: process.env.MODE == "dev",

    },
    minify: !isDev,
    treeShaking: !isDev,
})