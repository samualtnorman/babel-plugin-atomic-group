#!rollup --config
import babelPresetEnv from "@babel/preset-env"
import babelPresetTypescript from "@babel/preset-typescript"
import { babel } from "@rollup/plugin-babel"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import terser from "@rollup/plugin-terser"
import { here } from "babel-plugin-here"
import { cpus } from "os"
import { findFiles } from "./node_modules/@samual/lib/findFiles.js"
import packageConfig from "./package.json" assert { type: "json" }

const SOURCE_FOLDER = "src"
const MINIFY = true

const externalDependencies = []

if ("dependencies" in packageConfig)
	externalDependencies.push(...Object.keys(packageConfig.dependencies))

if ("optionalDependencies" in packageConfig)
	externalDependencies.push(...Object.keys(packageConfig.optionalDependencies))

export default findFiles(SOURCE_FOLDER).then(foundFiles => /** @type {import("rollup").RollupOptions} */ ({
	input: Object.fromEntries(
		foundFiles
			.filter(path => path.endsWith(".ts") && !path.endsWith(".d.ts") && !path.endsWith(".test.ts"))
			.map(path => [ path.slice(SOURCE_FOLDER.length + 1, -3), path ])
	),
	output: { dir: "dist", chunkFileNames: "[name]-.js", generatedCode: "es2015", interop: "auto", compact: MINIFY },
	plugins: [
		babel({
			babelHelpers: "bundled",
			extensions: [ ".ts" ],
			presets: [
				[ babelPresetEnv, { targets: { node: "18" } } ],
				[ babelPresetTypescript, { allowDeclareFields: true } ]
			],
			plugins: [ here() ]
		}),
		nodeResolve({ extensions: [ ".ts" ] }),
		MINIFY && terser(/** @type {Parameters<typeof terser>[0] & { maxWorkers: number }} */ ({
			keep_classnames: true,
			keep_fnames: true,
			compress: { passes: Infinity },
			maxWorkers: Math.floor(cpus().length / 2)
		}))
	],
	external:
		source => externalDependencies.some(dependency => source == dependency || source.startsWith(`${dependency}/`)),
	preserveEntrySignatures: "allow-extension",
	strictDeprecations: true
}))
