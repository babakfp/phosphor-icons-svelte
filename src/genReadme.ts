import fs from "node:fs/promises"
import Case from "case"

const LIBRARY_ICONS_DIR = "./node_modules/@phosphor-icons/core/assets"

const weights = await fs.readdir(LIBRARY_ICONS_DIR)
const iconsPerWeight = (await fs.readdir(`${LIBRARY_ICONS_DIR}/${weights[0]}`))
    .length
const coreVersion: string = JSON.parse(
    await fs.readFile(
        "./node_modules/@phosphor-icons/core/package.json",
        "utf8",
    ),
).version

const readmeContent =
    `<!-- This file is auto-generated from ./src/README.md -->

`
    + (await fs.readFile("./src/README.md", "utf8"))
        .replace(
            "{{{iconsPerWeight}}}",
            new Intl.NumberFormat().format(iconsPerWeight),
        )
        .replaceAll(
            "{{{iconsTotal}}}",
            new Intl.NumberFormat().format(iconsPerWeight * weights.length),
        )
        .replace(
            "{{{weightNames}}}",
            `${weights.map((w) => "**" + Case.header(w) + "**").join(", ")}.`,
        )
        .replace("{{{weightsCount}}}", String(weights.length))
        .replace("{{{coreVersion}}}", coreVersion)

await fs.writeFile("./README.md", readmeContent)
