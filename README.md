<!-- This file is auto-generated from ./src/README.md -->

<img src="https://github.com/phosphor-icons/core/raw/main/meta/phosphor-mark-tight-yellow.png" width="128" align="right" />

# Phosphor Icons Svelte

**Phosphor Icons Svelte** is a set of components designed for utilizing
[**Phosphor Icons**](https://phosphoricons.com) within the
[**Svelte**](https://svelte.dev) framework.

- Icons count: `1512` / per weight
- Weights: `Bold` `Duotone` `Fill` `Light` `Regular` `Thin`
- Supported [Core](https://github.com/phosphor-icons/core) version:
  `2.1.1`

[![NPM](https://img.shields.io/npm/v/phosphor-icons-svelte?style=for-the-badge&label=NPM&color=%23cb0000)](https://www.npmjs.com/package/phosphor-icons-svelte "View on NPM")
[![Core](https://img.shields.io/npm/v/%40phosphor-icons/core?style=for-the-badge&label=Latest%20Core&color=%23ffd171)](https://www.npmjs.com/package/@phosphor-icons/core "Latest version - View on NPM")

> [!IMPORTANT]
> The latest version of this package is not compatible with Svelte 4. Please use
> the version `1.1.2` for Svelte 4 compatibility.

> [!NOTE]
> If the supported and the latest Core versions shown in the README didn't
> match, and this library wasn't up-to-date, please create an issue and let me
> know.

## Installation

```cmd
pnpm add -D phosphor-icons-svelte
```

## Usage

```svelte
<script>
    // heart (Regular)
    import IconHeartRegular from "phosphor-icons-svelte/IconHeartRegular.svelte"

    // heart-break (Bold)
    import IconHeartBreakBold from "phosphor-icons-svelte/IconHeartBreakBold.svelte"
</script>

<!-- heart (Regular) -->
<IconHeartRegular />

<!-- heart-break (Bold) -->
<IconHeartBreakBold />
```

### Props

Only a single prop (`class`) is supported for styling purposes.

#### `class`

```svelte
<IconHeartRegular class="icon-heart-regular" />
```

### Default styles

The following are the default styles applied to all of the SVG elements.

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

#### `width: 1em` and `height: 1em`

The CSS `em` unit is relative to the `font-size` of the element (`2em` means 2
times the size of the current font size).

#### `fill: currentColor`

By setting the
[`fill`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill)
property to
[`currentColor`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword),
you inherit its value from
[`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color) property.

#### `pointer-events: none`

Icons are visual elements, nothing more. So, there is no reason to keep them
interactable. Using
[`pointer-events: none`](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events#none)
on the icon will prevent all pointer interactions.

#### `display: inline-block`

Helps in various styling scenarios.

### Default attributes

The following are the default attributes added to all of the SVG elements.

#### `data-phosphor-icon="icon-name"`

Use this to flip/mirror the icons when their normal orientation isn't accurate
for RTL languages.

```css
[dir="rtl"] [data-phosphor-icon="heart"] {
    transform: scaleX(-1);
}
```

#### [`aria-hidden="true"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden)

Icons are visual elements, nothing more. So, there is no reason to keep them
visible to screen readers.

## FAQ

### Why did I build this?

- TypeScript support.
- Built with accessibility in mind.
- Improved performance and developer experience.

### Why syntax is ugly?

Let's say we have the following two syntaxes:

Syntax 1 (NOT VALID) - Good looking syntax:

```svelte
<script>
    import { Heart, HeartBreak } from "phosphor-icons-svelte"
</script>

<Heart />
<HeartBreak weight="bold" />
```

Syntax 2 - Ugly syntax:

```svelte
<script>
    import IconHeartRegular from "phosphor-icons-svelte/IconHeartRegular.svelte"
    import IconHeartBreakBold from "phosphor-icons-svelte/IconHeartBreakBold.svelte"
</script>

<IconHeartRegular />
<IconHeartBreakBold />
```

The first syntax looks nice, but there are some problems with it!
[**Phosphor Icons**](https://phosphoricons.com) has more than 7K icons; This
means when a single icon is imported (using the first syntax), in reality, all
of the icons are being imported! This slows down your site's performance and
loading time significantly (only during development). To solve this issue, this
library only allows importing the icons individually.

What about combining all weights into a single component? Well, a similar issue
happens in this case too. This time it happens in both development and
production environments!

What about the `Icon` prefix? The `Icon` prefix prevents naming collisions with
other components.
