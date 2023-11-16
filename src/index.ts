import { generateOptimizedSvgs } from "./utilities/generateOptimizedSvgs.ts"
import { generateComponents } from "./utilities/generateComponents.ts"

if (Deno.args.includes("--build-optimized-svgs")) {
    await generateOptimizedSvgs()
}

if (Deno.args.includes("--build-component-svgs")) {
    await generateComponents()
}
