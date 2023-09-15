import { babel } from "@rollup/plugin-babel"
import babelPluginHere from "babel-plugin-here"

export default /** @type {Parameters<typeof import("vitest/config").defineConfig>[0]} */ ({
	plugins: [ babel({ extensions: [ ".ts" ], plugins: [ babelPluginHere() ] }) ]
})
