export const readSvgInner = async (filepath: string) => {
    const svg = await Deno.readTextFile(filepath)
    return svg.replace(/<svg.*?>/g, "").replace(/<\/svg>/g, "")
}
