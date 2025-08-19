/** @type {import("prettier").Config} */
export default {
    semi: false,
    tabWidth: 4,
    experimentalTernaries: true,
    experimentalOperatorPosition: "start",
    plugins: ["@ianvs/prettier-plugin-sort-imports"],
}
