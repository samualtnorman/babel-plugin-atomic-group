import { transformAsync } from "@babel/core"
import { test } from "vitest"
import { atomicGroup } from "."

test(`works`, async () => {
	await transformAsync(`/a(?>bc|b)c/`, { plugins: [ atomicGroup ] })
	// await transformAsync(`/a(?=(bc|b))\\1c/`, { plugins: [ atomicGroup ] })
})
