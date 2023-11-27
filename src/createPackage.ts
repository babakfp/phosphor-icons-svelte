import { copy } from "https://deno.land/std@0.208.0/fs/copy.ts"
import { emptyDir } from "https://deno.land/std@0.206.0/fs/mod.ts"

const ICON_COMPONENTS_DIR = `${Deno.cwd()}/kit`
const ICON_COMPONENTS_DIST_DIR = `${ICON_COMPONENTS_DIR}/dist`
const PACKAGE_DIR = `${Deno.cwd()}/package`
const PACKAGE_DIST_DIR = `${PACKAGE_DIR}/dist`

await emptyDir(PACKAGE_DIR)

await copy(ICON_COMPONENTS_DIST_DIR, PACKAGE_DIST_DIR)
await copy(Deno.cwd() + "/README.md", `${PACKAGE_DIR}/README.md`)
await copy(Deno.cwd() + "/LICENSE", `${PACKAGE_DIR}/LICENSE`)

const packageJsonContent = await Deno.readTextFile(
    `${ICON_COMPONENTS_DIR}/package.json`
)

const packageJsonObject = JSON.parse(packageJsonContent)
delete packageJsonObject.scripts
delete packageJsonObject.devDependencies

await Deno.writeTextFile(
    `${PACKAGE_DIR}/package.json`,
    JSON.stringify(packageJsonObject, null, 4)
)
