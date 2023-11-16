export const LIBRARY_ICONS_DIR = Deno.cwd() + "/core/assets"
export const OPTIMIZED_ICONS_DIR = Deno.cwd() + "/optimized"
export const COMPONENT_ICONS_DIR = Deno.args.includes("--build-components")
    ? Deno.cwd() + "/dist"
    : Deno.cwd() + "/sveltekit/src/lib"
