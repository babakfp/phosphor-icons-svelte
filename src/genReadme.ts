import { upperFirstCase } from "case"

const LIBRARY_ICONS_DIR = "./core/assets"

let iconsCount = 0
const weights: string[] = []
const coreVersion = JSON.parse(
    await Deno.readTextFile("./core/package.json"),
).version

for await (const { name: weight } of Deno.readDir(LIBRARY_ICONS_DIR)) {
    weights.push(weight)
}

for await (const _ of Deno.readDir(`${LIBRARY_ICONS_DIR}/${weights[0]}`)) {
    iconsCount += 1
}

const iconsTotalCount = iconsCount * weights.length

const readmeContent = `<!-- This file is auto-generated from ./src/README.md -->

` +
    (await Deno.readTextFile("./src/README.md"))
        .replace("--iconsCount--", "`" + iconsCount + "`")
        .replaceAll("--iconsTotalCount--", String(iconsTotalCount))
        .replace(
            "--weights--",
            weights.map((w) => "`" + upperFirstCase(w) + "`").join(", ") + ".",
        )
        .replace("--coreVersion--", "`" + coreVersion + "`")

Deno.writeTextFile(`./README.md`, readmeContent)
