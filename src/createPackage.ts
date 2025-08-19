import fs from "node:fs/promises"

const ICON_COMPONENTS_DIR = "./kit"
const ICON_COMPONENTS_DIST_DIR = `${ICON_COMPONENTS_DIR}/dist`
const PACKAGE_DIR = "./package"
const PACKAGE_DIST_DIR = `${PACKAGE_DIR}/dist`

await fs.rm(PACKAGE_DIR, { recursive: true, force: true })
await fs.mkdir(PACKAGE_DIR, { recursive: true })

await fs.cp(ICON_COMPONENTS_DIST_DIR, PACKAGE_DIST_DIR, { recursive: true })
await fs.cp("./README.md", `${PACKAGE_DIR}/README.md`, { recursive: true })
await fs.cp("./LICENSE", `${PACKAGE_DIR}/LICENSE`, { recursive: true })
await fs.cp(
    `${ICON_COMPONENTS_DIR}/CHANGELOG.md`,
    `${PACKAGE_DIR}/CHANGELOG.md`,
    { recursive: true },
)

const packageJsonContent = await fs.readFile(
    `${ICON_COMPONENTS_DIR}/package.json`,
    "utf8",
)

const packageJsonObject = JSON.parse(packageJsonContent)
delete packageJsonObject.scripts
delete packageJsonObject.devDependencies

const componentEntries = await fs.readdir(`${ICON_COMPONENTS_DIR}/src/lib`)
packageJsonObject.exports = {}
for (const name of componentEntries) {
    packageJsonObject.exports[`./${name}`] = {
        svelte: `./dist/${name}`,
        types: `./dist/${name}.d.ts`,
    }
}

await fs.writeFile(
    `${PACKAGE_DIR}/package.json`,
    JSON.stringify(packageJsonObject, null, 4),
)
