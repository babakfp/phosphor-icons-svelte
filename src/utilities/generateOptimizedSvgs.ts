import { optimize } from "npm:svgo"
import logUpdate from "npm:log-update"
import { bold, blue, green } from "https://deno.land/std@0.123.0/fmt/colors.ts"
import { emptyDir } from "https://deno.land/std@0.206.0/fs/mod.ts"
import { ensureDir } from "https://deno.land/std@0.207.0/fs/ensure_dir.ts"
import { LIBRARY_ICONS_DIR, OPTIMIZED_ICONS_DIR } from "../constants.ts"

export const generateOptimizedSvgs = async () => {
    await emptyDir(OPTIMIZED_ICONS_DIR)

    for await (const { name: weight } of Deno.readDir(LIBRARY_ICONS_DIR)) {
        for await (const { name: file } of Deno.readDir(
            `${LIBRARY_ICONS_DIR}/${weight}`
        )) {
            const iconContent = await Deno.readTextFile(
                `${LIBRARY_ICONS_DIR}/${weight}/${file}`
            )

            const { data } = optimize(iconContent)

            await ensureDir(`${OPTIMIZED_ICONS_DIR}/${weight}`)

            await Deno.writeTextFile(
                `${OPTIMIZED_ICONS_DIR}/${weight}/${file}`,
                data
            )

            logUpdate(`Generating: ${bold(blue(`${weight}/${file}`))}`)
        }
    }

    logUpdate(bold(green("Successfully has generated optimized SVGs!")))
}
