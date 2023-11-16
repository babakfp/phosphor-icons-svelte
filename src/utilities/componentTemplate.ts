const getSvgOnlinePreviewLinkAsComment = (name: string, weight: string) => {
    const fileName = weight === "regular" ? name : `${name}-${weight}`
    return `<!-- https://github.com/phosphor-icons/core/blob/main/assets/${weight}/${fileName} -->`
}

const getSvelteTemplateConditionText = (i: number, weight: string) => {
    if (i === 0) {
        return `{#if weight === "${weight}"}`
    }
    return `
    {:else if weight === "${weight}"}`
}

export const componentTemplate = (
    iconWeights: { weight: string; svgInner: string }[],
    svgName: string,
    svgNameNoSuffix: string,
    componentName: string
) => {
    const justWeights = iconWeights.map(iw => `"${iw.weight}"`)
    return `<script lang="ts">
    /**
     * @description This prop can be safely removed if you're using \`"regular"\` as the value.
     * @default "regular"
    */
    export let weight: ${justWeights.join(" | ")} = "regular"
    /** Use \`:global()\` to make your scoped classes to work. */
    export let _class = ""
    /** Use \`:global()\` to make your scoped classes to work. */
    export { _class as class }
    /** Toggle to \`true\` to horizontally flip the icon. This can be handy in RTL languages where the default icon orientation might not be suitable. */
    export let flip = false
</script>

<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    {...$$restProps}
    class={_class || undefined}
    style:transform={flip ? "scaleX(-1)" : undefined}
    data-svg-name="${svgNameNoSuffix}"
    data-svg-weight={weight}
    data-component-name="${componentName}"
>
    <slot/>
    <rect width="256" height="256" fill="none" />
    ${iconWeights
        .map(
            ({ weight, svgInner }, i) =>
                `${getSvelteTemplateConditionText(i, weight)}
        ${getSvgOnlinePreviewLinkAsComment(svgName, weight)}
        ${svgInner}`
        )
        .join("")} 
    {/if}
</svg>

<style>
    svg {
        fill: currentColor;
        width: 1em;
        height: 1em;
        pointer-events: none;
        display: inline-block;
    }
</style>
`
}
