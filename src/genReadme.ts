import { upperFirstCase } from "https://deno.land/x/case@2.2.0/mod.ts"

const LIBRARY_ICONS_DIR = `${Deno.cwd()}/core/assets`

let iconsCount = 0
const weights: string[] = []
const coreVersion = JSON.parse(
    await Deno.readTextFile(`${Deno.cwd()}/core/package.json`)
).version

for await (const { name: weight } of Deno.readDir(LIBRARY_ICONS_DIR)) {
    weights.push(weight)
}

for await (const _ of Deno.readDir(`${LIBRARY_ICONS_DIR}/${weights[0]}`)) {
    iconsCount += 1
}

const readmeContent =
    `<!-- This file is auto-generated from ./src/README.md -->

` +
    (await Deno.readTextFile("./src/README.md"))
        .replace("--iconsCount--", "`" + iconsCount + "`")
        .replace(
            "--weights--",
            weights.map(w => "`" + upperFirstCase(w) + "`").join(" ")
        )
        .replace("--coreVersion--", "`" + coreVersion + "`")

Deno.writeTextFile(`./README.md`, readmeContent)