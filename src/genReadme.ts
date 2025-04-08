import { upperFirstCase } from "case"

const LIBRARY_ICONS_DIR = "./core/assets"

let iconsPerWeight = 0
const weights: string[] = []
const coreVersion: string = JSON.parse(
    await Deno.readTextFile("./core/package.json"),
).version

for await (const { name: weight } of Deno.readDir(LIBRARY_ICONS_DIR)) {
    weights.push(weight)
}

for await (const _ of Deno.readDir(`${LIBRARY_ICONS_DIR}/${weights[0]}`)) {
    iconsPerWeight += 1
}

const readmeContent = `<!-- This file is auto-generated from ./src/README.md -->

` +
    (await Deno.readTextFile("./src/README.md"))
        .replace(
            "{{{iconsPerWeight}}}",
            new Intl.NumberFormat().format(iconsPerWeight),
        )
        .replaceAll(
            "{{{iconsTotal}}}",
            new Intl.NumberFormat().format(
                iconsPerWeight * weights.length,
            ),
        )
        .replace(
            "{{{weightNames}}}",
            `${
                weights.map((w) => "**" + upperFirstCase(w) + "**").join(", ")
            }.`,
        )
        .replace("{{{weightsCount}}}", String(weights.length))
        .replace("{{{coreVersion}}}", coreVersion)

Deno.writeTextFile(`./README.md`, readmeContent)
