import logUpdate from "npm:log-update"
import { bold, blue, green } from "https://deno.land/std@0.123.0/fmt/colors.ts"
import { emptyDir } from "https://deno.land/std@0.206.0/fs/mod.ts"
import { pascalCase } from "https://deno.land/x/case@2.2.0/mod.ts"
import { convertToComponent } from "./utilities/convertToComponent.ts"
import { optimizeSvg } from "./utilities/optimizeSvg.ts"

const LIBRARY_ICONS_DIR = `${Deno.cwd()}/core/assets`
const COMPONENT_ICONS_DIR = `${Deno.cwd()}/kit/src/lib`

await emptyDir(COMPONENT_ICONS_DIR)

for await (const { name: weight } of Deno.readDir(LIBRARY_ICONS_DIR)) {
    for await (const { name: file } of Deno.readDir(
        `${LIBRARY_ICONS_DIR}/${weight}`
    )) {
        const iconName = file.slice(0, -4).replace(`-${weight}`, "")
        const componentName = `Icon${pascalCase(`${iconName}-${weight}`)}`
        const componentFileName = `${componentName}.svelte`

        const iconContent = await Deno.readTextFile(
            `${LIBRARY_ICONS_DIR}/${weight}/${file}`
        )

        await Deno.writeTextFile(
            `${COMPONENT_ICONS_DIR}/${componentFileName}`,
            await convertToComponent(optimizeSvg(iconContent), iconName)
        )

        logUpdate(`Generating: ${bold(blue(componentFileName))}`)
    }
}

logUpdate(bold(green("Done!")))
