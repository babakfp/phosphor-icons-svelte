import { optimize } from "npm:svgo@3.0.4"

export const optimizeSvg = (svg: string) => {
    return optimize(svg).data
}
