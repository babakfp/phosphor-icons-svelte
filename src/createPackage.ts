import { copy, emptyDir } from "@std/fs"

const ICON_COMPONENTS_DIR = "./kit"
const ICON_COMPONENTS_DIST_DIR = `${ICON_COMPONENTS_DIR}/dist`
const PACKAGE_DIR = "./package"
const PACKAGE_DIST_DIR = `${PACKAGE_DIR}/dist`

await emptyDir(PACKAGE_DIR)

await copy(ICON_COMPONENTS_DIST_DIR, PACKAGE_DIST_DIR)
await copy("./README.md", `${PACKAGE_DIR}/README.md`)
await copy("./LICENSE", `${PACKAGE_DIR}/LICENSE`)
await copy(ICON_COMPONENTS_DIR + "/CHANGELOG.md", `${PACKAGE_DIR}/CHANGELOG.md`)

const packageJsonContent = await Deno.readTextFile(
    `${ICON_COMPONENTS_DIR}/package.json`,
)

const packageJsonObject = JSON.parse(packageJsonContent)
delete packageJsonObject.scripts
delete packageJsonObject.devDependencies

const componentEntries = await Deno.readDir(
    `${ICON_COMPONENTS_DIR}/src/lib`,
)
packageJsonObject.exports = {}
for await (const entry of componentEntries) {
    packageJsonObject.exports[`./${entry.name}`] = {
        "svelte": `./dist/${entry.name}`,
        "types": `./dist/${entry.name}.d.ts`,
    }
}

await Deno.writeTextFile(
    `${PACKAGE_DIR}/package.json`,
    JSON.stringify(packageJsonObject, null, 4),
)
