import { minify } from "html-minifier-terser"

const script = `<script lang="ts">
    let { class: class_ }: { class?: string } = $props()
</script>`

export const convertToComponent = async (svg: string, iconName: string) => {
    const attrs =
        `class={class_} data-phosphor-icon="${iconName}" aria-hidden="true" width="1em" height="1em" pointer-events="none" display="inline-block"`
    svg = svg.replace("<svg", `<svg ${attrs}`)

    const minScript = await minify(script, { minifyJS: true })

    return minScript + svg
}
