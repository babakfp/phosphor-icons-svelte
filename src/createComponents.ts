import fs from "node:fs/promises"
import util from "node:util"
import Case from "case"
import logUpdate from "log-update"
import { convertToComponent } from "./utilities/convertToComponent.ts"
import { optimizeSvg } from "./utilities/optimizeSvg.ts"

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
            await convertToComponent(optimizeSvg(iconContent), iconName),
        )

        logUpdate(
            util.styleText(
                ["bold", "blue"],
                `Generating: ${componentFileName}`,
            ),
        )
    }
}

logUpdate(util.styleText(["bold", "green"], "Done!"))
