export const getComponentTsTemplate = (
    componentName: string,
    weights: string[]
) => {
    return `import { SvelteComponent } from "svelte"
declare const __propDef: {
    props: {
        [x: string]: any
        weight?: ${weights.join(" | ")} | undefined
        class?: string | undefined
        flip?: boolean | undefined
    }
    events: {
        [evt: string]: CustomEvent<any>
    }
    slots: {
        default: {}
    }
}
export type ${componentName}Props = typeof __propDef.props
export type ${componentName}Events = typeof __propDef.events
export type ${componentName}Slots = typeof __propDef.slots
export default class ${componentName} extends SvelteComponent<
    ${componentName}Props,
    ${componentName}Events,
    ${componentName}Slots
> {}
export {}
`
}
