<!-- This file is auto-generated from ./src/README.md -->

# Phosphor Icons Svelte

<img src="https://github.com/phosphor-icons/homepage/raw/master/.github/logo.png" width="128" align="right" />

**Phosphor Icons Svelte** is a collection of components designed to integrate
[**Phosphor Icons**](https://phosphoricons.com) into the
[**Svelte**](https://svelte.dev) framework.

- **1,512** icons per weight, and **9,072** icons in
  total.
- **6** weights: **Bold**, **Duotone**, **Fill**, **Light**, **Regular**, **Thin**.

> [!NOTE]
> The latest release is based on
> [`@phosphor-icons/core@2.1.1`](https://github.com/phosphor-icons/core).
> If the versions don't match, feel free to open an issue.

## Installation

```
pnpm add -D phosphor-icons-svelte
```

> [!IMPORTANT]
> This package targets newer versions of Svelte and no longer supports Svelte 4
> or earlier. If you're using an older version, install `1.1.2` instead.
>
> ```
> pnpm add -D phosphor-icons-svelte@1.1.2
> ```

## Usage

```svelte
<script>
    import IconHeartRegular from "phosphor-icons-svelte/IconHeartRegular.svelte"
    import IconHeartBreakBold from "phosphor-icons-svelte/IconHeartBreakBold.svelte"
</script>

<IconHeartRegular />
<IconHeartBreakBold />
```

### Props

Only the `class` prop is available for styling.

#### `class`

```svelte
<IconHeartRegular class="icon-heart-regular" />
```

### Default Styles

Here are the default attributes applied to all SVG elements.

```
width="1em"
height="1em"
fill="currentColor"
pointer-events="none"
display="inline-block"
```

#### `width="1em"` and `height="1em"`

The `em` unit in CSS is relative to the element's `font-size` (e.g., `2em` is
twice the size of the current font size).

#### `fill="currentColor"`

Setting the
[`fill`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill)
property to
[`currentColor`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword)
inherits its value from the
[`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color) property.

#### `pointer-events="none"`

Since icons are purely visual, there's no need to make them interactive. The
[`pointer-events: none`](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events#none)
property prevents any pointer interactions.

#### `display="inline-block"`

This helps in various styling scenarios.

### Default Attributes

Here are the default attributes applied to all SVG elements.

#### `data-phosphor-icon="icon-name"`

This attribute is used to flip/mirror icons when their default orientation isn't
suitable for RTL languages.

```css
[dir="rtl"] [data-phosphor-icon="heart"] {
    transform: scaleX(-1);
}
```

#### [`aria-hidden="true"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden)

Icons are visual elements, so they don't need to be visible to screen readers.

## FAQ

### Why was this built?

- TypeScript support.
- Accessibility considerations.
- Improved performance and developer experience.

### Why is the syntax considered ugly?

Consider the following two syntaxes:

**Pretty syntax** (invalid):

```svelte
<script>
    import { Heart, HeartBreak } from "phosphor-icons-svelte"
</script>

<Heart />
<HeartBreak weight="bold" />
```

**Ugly syntax**:

```svelte
<script>
    import IconHeartRegular from "phosphor-icons-svelte/IconHeartRegular.svelte"
    import IconHeartBreakBold from "phosphor-icons-svelte/IconHeartBreakBold.svelte"
</script>

<IconHeartRegular />
<IconHeartBreakBold />
```

The first syntax may seem appealing, but it causes issues!
[**Phosphor Icons**](https://phosphoricons.com) includes a total of
9,072 icons; importing just one icon (using the first syntax) results
in all icons being imported. This can significantly slow down your site's
performance and loading time during development. To address this, this library
restricts you to importing icons individually.

What about combining all weights into a single component? This can cause a
similar issue, affecting both development and production environments!
Sometimes, tooling can remove unnecessary parts at build time, but this is not
always guaranteed.

What about the `Icon` prefix? The `Icon` prefix helps avoid naming collisions
with other components.

## CHANGELOG

[/kit/CHANGELOG.md](/kit/CHANGELOG.md).
