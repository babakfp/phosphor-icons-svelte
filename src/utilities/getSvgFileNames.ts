import { OPTIMIZED_ICONS_DIR } from "../constants.ts"

export const getSvgFileNames = async () => {
    const regularSvgNames: string[] = []

    for await (const { name } of Deno.readDir(
        `${OPTIMIZED_ICONS_DIR}/regular`
    )) {
        regularSvgNames.push(name)
    }

    return regularSvgNames
}
