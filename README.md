# Gapminder: Linear and Logarithmic Views

## Overview

This D3 Loves React learning exercise compares two simultaneous views of the same Gapminder dataset: one with a logarithmic GDP scale and one with a linear GDP scale. It builds on earlier lessons in SVG, D3 scales, reusable axis components, and reusable React/D3 chart components.

## Live demo

[View the visualization](https://unguisdraconis.github.io/gapminder2/)

## Why two charts?

An earlier `gapminder` exercise used a logarithmic GDP scale. After that implementation was functional, Jeremiah recognized that the linear representation also communicated useful information. Because `gapminder2` was intended as a static visualization, both versions are shown simultaneously rather than hidden behind an interactive toggle.

The two views are complementary: their purpose is to show how scale choice changes how the same data are perceived, not to present either scale as universally better.

## Reusable component design

The same `BubblePlot` component is rendered twice, with `scaleType` as the key differing prop. The data, dimensions, y- and radius-scale logic, color mapping, labels, legends, annotations, and SVG rendering are otherwise shared. `AxisTop` and `AxisLeft` provide reusable axis components.

## Encoding

- **X position:** GDP per capita, shown once with a logarithmic scale and once with a linear scale
- **Y position:** life expectancy
- **Bubble size:** population
- **Bubble color:** continent

## Data

The prepared dataset was supplied through the D3 Loves React course from [the course's `gapminder.js` module](https://www.react-graph-gallery.com/data/gapminder.js). The local copy contains 142 records and matches the current course data apart from an apparent correction of one country-name typo, from `United ys` to `United States`.

This repository does not claim that Jeremiah acquired, cleaned, selected, or prepared the upstream dataset. The exercise retains its source attribution: World Bank material from GAPMINDER.ORG, CC-BY license. The exact upstream snapshot and year are not recorded.

## Color and visual design

The continent colors use a five-color subset of the Okabe–Ito palette. Jeremiah had begun using this palette in R visualizations and carried that accessibility-aware color choice into the `gapminder` and `gapminder2` D3 exercises.

The light theme, substantial white space, restrained grids, and straightforward typography are intentional. They support screen viewing while preserving the idea of a printable static chart. The palette choice is one accessibility consideration, not a claim of formal accessibility conformance.

## Responsiveness and learning progression

The charts use fixed SVG dimensions and flex wrapping, demonstrating an early attempt at responsiveness. Later projects adopted more flexible `viewBox`- and percentage-based sizing, reflecting the responsive-layout techniques taught later in the course.

Preserving this implementation documents the progression from the responsive techniques used at this stage to those learned later.

## AI / course context

Built as part of Yan Holtz's D3 Loves React course. Claude Opus 4.6 was used for software scaffolding—the automated generation of the application's fundamental code structure. Jeremiah King developed and refined the visualization, including the reusable chart and axis composition, the simultaneous linear/logarithmic comparison, layout, and visual-design decisions.

## Accessibility

The visualization uses an Okabe–Ito-derived palette and gives the logarithmic and linear charts distinct semantic names and descriptions. Position and bubble size provide quantitative encodings beyond the continent color categories.

This remains an early static learning artifact. It has not undergone formal accessibility testing, and bubble-level exact values rely on native SVG title behavior rather than keyboard interaction.

## Local use

```text
npm ci
npm run dev
npm run lint
npm run build
```

## Limitations

- The exact upstream snapshot and year of the course-provided data are not recorded.
- Fixed SVG dimensions reflect the responsive techniques used at this stage.
- Bubble-level exact values rely on native SVG title behavior.
- No formal accessibility or print validation has been completed.
