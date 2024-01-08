import logUpdate from "log-update"
import { bold, blue, green } from "std/fmt/colors.ts"
import { emptyDir } from "std/fs/mod.ts"
import { pascalCase } from "case"
import { convertToComponent } from "./utilities/convertToComponent.ts"
import { optimizeSvg } from "./utilities/optimizeSvg.ts"

const LIBRARY_ICONS_DIR = "./core/assets"
const COMPONENT_ICONS_DIR = "./kit/src/lib"

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
