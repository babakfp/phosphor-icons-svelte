import { optimize } from "svgo"

export const optimizeSvg = (svg: string) => {
    return optimize(svg).data
}
