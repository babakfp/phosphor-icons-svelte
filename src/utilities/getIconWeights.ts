import { OPTIMIZED_ICONS_DIR } from "../constants.ts"

export const getIconWeights = async () => {
    const weights: string[] = []
    for await (const { name } of Deno.readDir(OPTIMIZED_ICONS_DIR)) {
        weights.push(name)
    }
    return weights
}
