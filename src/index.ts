import type { PluginObj } from "@babel/core"
import { RegExpParser, parseRegExpLiteral } from "@eslint-community/regexpp"

const regexParser = new RegExpParser

export const atomicGroup = (): PluginObj => ({
	name: `babel-plugin-atomic-group`,
	visitor: {
		RegExpLiteral(path) {
			const ast = regexParser.parsePattern(path.node.pattern)

			console.log(ast)
		}
	}
})

export default atomicGroup
