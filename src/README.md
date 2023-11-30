# Phosphor Icons Svelte

**Phosphor Icons Svelte** is a set of components designed for utilizing [**Phosphor Icons**](https://phosphoricons.com) within the [**Svelte**](https://svelte.dev) framework.

-   Icons count: --iconsCount-- / per weight
-   Weights: --weights--
-   [Core](https://github.com/phosphor-icons/core) version: --coreVersion--

## Installation

```
pnpm add -D phosphor-icons-svelte
```

## Usage

Icon `heart`:

```svelte
<script>
    import IconHeartRegular from "phosphor-icons-svelte/IconHeartRegular.svelte"
</script>

<IconHeartRegular />
```

Icon `heart-break`:

```svelte
<script>
    import IconHeartBreakRegular from "phosphor-icons-svelte/IconHeartBreakRegular.svelte"
</script>

<IconHeartBreakRegular />
```

### Props

Only the `class` prop is supported.

```svelte
<IconHeartRegular class="icon-heart-regular" />
```

### Default styles

These are the styles that are applied to the SVG element by default.

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

#### `pointer-events: none`

Icons are visual elements, nothing more. So, there is no reason to keep them interactable. Using [`pointer-events: none`](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events#none) on the icon will prevent all pointer interactions.

#### `fill: currentColor`

By setting the icon's [`fill`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill) property to [`currentColor`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword), you inherit the value of the parent element's [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color) property, effectively using it to color the icon.

#### `width: 1em` and `height: 1em`

The CSS `em` sizing unit is relative to the value of the `font-size` property of the element. Meaning, if the set `font-size` to `20px`, the `width` and `height` of the icon will be `20px` too. If no `font-size` is set on the element, it will inherit the size from the parent element.

#### `display: inline-block`

Assists in various styling scenarios.

### Default attributes

These are the attributes that are added to the SVG element by default.

#### `data-phosphor-icon="icon-name"`

Use this to flip/mirror the icons when their normal orientation isn't accurate for RTL languages.

```css
[dir="rtl"] [data-phosphor-icon="icon-name"] {
    transform: scaleX(-1);
}
```

#### [`aria-hidden="true"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden)

Icons are visual elements, nothing more. So, there is no reason to keep them visible to screen readers.

## FAQ

### Why did I build this?

-   TypeScript support.
-   Built with accessibility in mind.
-   Improved performance and developer experience.

### Import syntax

Syntax 1 (not valid):

```svelte
<script>
    import { Heart } from "phosphor-icons-svelte"
</script>

<Heart />
<Heart weight="bold" />
```

Syntax 2:

```svelte
<script>
    import IconHeartRegular from "phosphor-icons-svelte/IconHeartRegular.svelte"
    import IconHeartBold from "phosphor-icons-svelte/IconHeartBold.svelte"
</script>

<IconHeartRegular />
<IconHeartBold />
```

The first syntax looks nice, but there are some problems with it!

[**Phosphor Icons**](https://phosphoricons.com) has more than 7K icons; This means when you import a single icon using the first syntax, you are actually loading them all! This results in slowing down your site's performance and loading time (during development) significantly (though it's not an issue in production)!

What about combining all weights into a single component? Well, a similar issue happens in this case too. This time it happens in both development and production environments!

To solve this, this library only allows importing the icons individually.

What about the `Icon` prefix? The `Icon` prefix prevents naming collisions with other components.
