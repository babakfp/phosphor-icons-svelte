import { minify } from "html-minifier-terser"

const script = `<script lang="ts">
    export let _class = ""
    export { _class as class }
</script>`

const style = `<style>
    svg {
        width: 1em;
        height: 1em;
        fill: currentColor;
        pointer-events: none;
        display: inline-block;
    }
</style>`

export const convertToComponent = async (svg: string, iconName: string) => {
    svg = svg.replace('fill="currentColor" ', "") // Removing this because it's redundant.
    const attrs = `class={_class} data-phosphor-icon="${iconName}" aria-hidden="true"`
    svg = svg.replace("<svg", `<svg ${attrs}`)

    const minStyle = await minify(style, { minifyCSS: true })
    const minScript = await minify(script, { minifyJS: true })

    return minScript + svg + minStyle
}
