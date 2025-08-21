import fs from "node:fs/promises"
import Case from "case"
import { minify } from "html-minifier-terser"
import logUpdate from "log-update"
import { optimize } from "svgo"

const COMPONENT_SCRIPT = `<script lang="ts">const p: { class?: string } = $props()</script>`
export const svgToComponent = async (svg: string, iconName: string) => {
    const attrs = `{...p} data-phosphor-icon="${iconName}" aria-hidden="true" width="1em" height="1em" pointer-events="none" display="inline-block"`
    svg = svg.replace("<svg", `<svg ${attrs}`)

    const minScript = await minify(COMPONENT_SCRIPT, { minifyJS: true })

    return minScript + svg
}

const LIBRARY_ICONS_DIR = "./node_modules/@phosphor-icons/core/assets"
const COMPONENT_ICONS_DIR = "./kit/src/lib"

await fs.rm(COMPONENT_ICONS_DIR, { recursive: true, force: true })
await fs.mkdir(COMPONENT_ICONS_DIR, { recursive: true })

for (const weight of await fs.readdir(LIBRARY_ICONS_DIR)) {
    for (const file of await fs.readdir(`${LIBRARY_ICONS_DIR}/${weight}`)) {
        const iconName = file.slice(0, -4).replace(`-${weight}`, "")
        const componentName = `Icon${Case.pascal(`${iconName}-${weight}`)}`
        const componentFileName = `${componentName}.svelte`

        const iconContent = await fs.readFile(
            `${LIBRARY_ICONS_DIR}/${weight}/${file}`,
            "utf8",
        )

        await fs.writeFile(
            `${COMPONENT_ICONS_DIR}/${componentFileName}`,
            await svgToComponent(optimize(iconContent).data, iconName),
        )

        logUpdate(`Generating: ${componentFileName}`)
    }
}

logUpdate("Done!")
