import pMap from "npm:p-map"
import logUpdate from "npm:log-update"
import { emptyDir } from "https://deno.land/std@0.206.0/fs/mod.ts"
import { bold, green } from "https://deno.land/std@0.123.0/fmt/colors.ts"
import { COMPONENT_ICONS_DIR } from "../constants.ts"
import { getIconWeights } from "./getIconWeights.ts"
import { generateComponent } from "./generateComponent.ts"
import { getSvgFileNames } from "./getSvgFileNames.ts"

export const generateComponents = async () => {
    const weights = await getIconWeights()

    await emptyDir(COMPONENT_ICONS_DIR)

    let countGeneratedComponents = 0

    await pMap(
        await getSvgFileNames(),
        async name => {
            await generateComponent(name, weights)
            countGeneratedComponents += 1
        },
        { concurrency: weights.length - 1 }
    )

    logUpdate(
        bold(
            green(
                `Successfully has generated ${countGeneratedComponents} component${
                    countGeneratedComponents > 1 ? "s" : ""
                }!`
            )
        )
    )
}
