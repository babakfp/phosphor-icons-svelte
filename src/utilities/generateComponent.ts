import pMap from "npm:p-map"
import logUpdate from "npm:log-update"
import { pascalCase } from "https://deno.land/x/case@2.2.0/mod.ts"
import { bold, blue } from "https://deno.land/std@0.123.0/fmt/colors.ts"
import { OPTIMIZED_ICONS_DIR, COMPONENT_ICONS_DIR } from "../constants.ts"
import { componentTemplate } from "./componentTemplate.ts"
import { readSvgInner } from "./readSvgInner.ts"
import { getComponentTsTemplate } from "./getComponentTsTemplate.ts"

export const generateComponent = async (svgName: string, weights: string[]) => {
    const svgNameNoSuffix = svgName.slice(0, -4)

    const iconWeights = await pMap(weights, async weight => {
        const fileName =
            weight === "regular"
                ? svgNameNoSuffix
                : `${svgNameNoSuffix}-${weight}`

        const svgInner = await readSvgInner(
            `${OPTIMIZED_ICONS_DIR}/${weight}/${fileName}.svg`
        )

        return { weight, svgInner }
    })

    const componentName = pascalCase(svgNameNoSuffix)

    await Deno.writeTextFile(
        `${COMPONENT_ICONS_DIR}/Icon${componentName}.svelte`,
        componentTemplate(iconWeights, svgName, svgNameNoSuffix, componentName)
    )

    if (Deno.args.includes("--build-components")) {
        await Deno.writeTextFile(
            `${COMPONENT_ICONS_DIR}/Icon${componentName}.svelte.d.ts`,
            getComponentTsTemplate(
                componentName,
                weights.map(weight => `"${weight}"`)
            )
        )
    }

    logUpdate(`Generating: ${bold(blue(`Icon${componentName}`))}`)
}
