# Phosphor Icons Svelte

**Phosphor Icons Svelte** is a set of components designed for utilizing [**Phosphor Icons**](https://phosphoricons.com) within the [**Svelte**](https://svelte.dev) framework.

## Installation

### NPM

```
npm i -D phosphor-icons-svelte
```

### PNPM

```
pnpm add -D phosphor-icons-svelte
```

### Yarn

```
yarn add -D phosphor-icons-svelte
```

## Usage

```svelte
<script>
    import IconHeartRegular from "phosphor-icons-svelte/IconHeartRegular.svelte"
    import IconHeartBreakRegular from "phosphor-icons-svelte/IconHeartBreakRegular.svelte"
</script>

<IconHeartRegular />
<IconHeartBreakRegular />
```

### Weights

```svelte
<script>
    import IconHeartBold from "phosphor-icons-svelte/IconHeartBold.svelte"
    import IconHeartDuotone from "phosphor-icons-svelte/IconHeartDuotone.svelte"
    import IconHeartFill from "phosphor-icons-svelte/IconHeartFill.svelte"
    import IconHeartLight from "phosphor-icons-svelte/IconHeartLight.svelte"
    import IconHeartRegular from "phosphor-icons-svelte/IconHeartRegular.svelte"
    import IconHeartThin from "phosphor-icons-svelte/IconHeartThin.svelte"
</script>
```

### Default Styles

```svelte
<style>
    svg {
        width: 1em;
        height: 1em;
        fill: currentColor;
        pointer-events: none;
        display: inline-block;
    }
</style>
```

### Default Attributes

Includes default attributes `data-icon="icon-name"` and `aria-hidden="true"`.

### Add Attributes/Props

```svelte
<IconHeartRegular attribute="value" />
```

Exceptions: `data-icon`, `aria-hidden`, `xmlns`, `fill`, `viewBox`.

## FAQ

### Why did I build this?

-   TypeScript support.
-   Accessibility in mind.
-   Enhanced performance and Developer Experience.

### Import syntax

Syntax One:

```svelte
<script>
    import { Heart } from "phosphor-icons-svelte"
</script>

<Heart />
<Heart weight="bold" />
```

Syntax Two:

```svelte
<script>
    import IconHeartRegular from "phosphor-icons-svelte/IconHeartRegular.svelte"
    import IconHeartBold from "phosphor-icons-svelte/IconHeartBold.svelte"
</script>

<IconHeartRegular />
<IconHeartBold />
```

Which one would you choose? I would choose the first one, however, there are some issues with that syntax!

[**Phosphor Icons**](https://phosphoricons.com) has more than 7K icons; This means when you import a single icon using the first syntax, you are actually loading them all! This results in slowing down your site's performance and loading time (during development) significantly (though it's not an issue in production)!

What about combining all weights into a single component? Well, a similar issue happens in this case too. How it happens in both development and production environments!

To tackle this, the library's API is designed to allow the individual importation of each component. This approach improves the developer experience (DX) and helps maintain better performance in development.

What about the `Icon` prefix? The `Icon` prefix prevents naming collisions with other components.

### Attributes

#### `data-icon="<icon-name>"`

You can use this, for example, to globally flip/mirror the icons for RTL sites.

```css
[dir="rtl"] [data-icon="<icon-name>"] {
    transform: scaleX(-1);
}
```

#### `aria-hidden="true"`

Icons are visual elements, nothing more; So there is no reason to keep them visible to screen readers.

### Styles

#### `pointer-events: none`

Icons are visual elements, nothing more; So there is no reason to keep them interactable.

#### `fill: currentColor`

Inherit the text color of the parent element for consistent styling.

#### `width: 1em` and `height: 1em`

Inherit the text size of the parent element for scalability.

#### `display: inline-block`

Assists in various styling scenarios.
