# Glassy Navbar - Full Code Explanation

This document provides a comprehensive, line-by-line explanation of the project's source code, detailing how the HTML structure and CSS styling work together to create the responsive Glassy Navbar.

---

## 📄 HTML (`index.html`)

The HTML file defines the structure of the webpage.

### Document Setup
```html
<!DOCTYPE html>
<html lang="en">
```
- **Line 1**: Declares the document type as HTML5.
- **Line 2**: Starts the root `html` element and sets the language to English (`en`) for accessibility and search engines.

### Head Section
The `<head>` contains metadata and links to external resources.

```html
<head>
    <meta charset="UTF-8" />
```
- **Line 5**: Sets character encoding to **UTF-8**, ensuring all text characters are displayed correctly.

```html
    <title>glassy Navbar</title>
```
- **Line 7**: Sets the title that appears in the browser tab.

```html
    <link rel="stylesheet" href="reset.css" />
    <link rel="stylesheet" href="style.css" />
```
- **Line 8-9**: Links to CSS files.
    - `reset.css`: Likely a file to reset browser default styles (if it exists).
    - `style.css`: Contains the custom styles for this navbar.

```html
    <meta name="description" content="glassy Navbar" />
    <meta name="keywords" content="glassy Navbar" />
    <meta name="author" content="sampatakumar" />
```
- **Line 10-12**: SEO (Search Engine Optimization) metadata.
    - `description`: Summary of the page.
    - `keywords`: Tags for search indexing.
    - `author`: Credits the developer.

```html
    <link rel="manifest" href="manifest.json" />
```
- **Line 13**: Links to the **Web App Manifest**, allowing the site to be installed as an app on devices.

```html
    <meta name="theme-color" content="#0f0f0f" />
    <meta name="msapplication-navbuttoncolor" content="#0f0f0f" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
```
- **Line 14-17**: Mobile and PWA (Progressive Web App) styling.
    - `theme-color`: Sets the browser address bar color on Android/Mobile to match the dark theme (`#0f0f0f`).
    - `msapplication-navbuttoncolor`: Windows Phone equivalent.
    - `apple-mobile-web-app-capable`: Allows "standalone" mode on iOS (hides browser UI).
    - `apple-mobile-web-app-status-bar-style`: Makes the iOS status bar blend in.

### Body Section
The `<body>` contains the visible content.

```html
<body>
    <!-- optimized by sampatakumar || design by Raul Dronca -->
    <noscript>Please enable JavaScript to use this website.</noscript>
```
- **Line 22**: A comment crediting the design and optimization.
- **Line 23**: Displays a message if the user has JavaScript disabled (since the bubble animation requires JS).

#### Navigation Structure
```html
    <div class="nav-wrap">
```
- **Line 25**: A wrapper container (`.nav-wrap`) that holds the entire navigation bar. This element creates the pill shape and background.

```html
        <div class="bubble active"></div>
        <div class="bubble hover"></div>
```
- **Line 26-27**: Two cosmetic `div` elements used for the "bubble" effects.
    - `.bubble.active`: The white oval that sits behind the currently active link.
    - `.bubble.hover`: The darker oval that follows the mouse cursor.

```html
        <nav class="nav">
            <a class="active" href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Projects</a>
            <a href="#">Contact</a>
        </nav>
    </div>
```
- **Line 28-33**: The actual semantic navigation.
    - `<nav>`: Semantic HTML tag for navigation links.
    - `<a>`: Anchor links. "Home" has the `active` class initially.

#### JavaScript
```html
    <script>
        const links = document.querySelectorAll("nav a");
        links.forEach((link) => {
            link.addEventListener("click", () => {
                links.forEach((l) => l.classList.remove("active"));
                link.classList.add("active");
            });
        });
    </script>
```
- **Line 37**: Selects all `<a>` elements inside the `<nav>`.
- **Line 38-43**: Loops primarily through each link.
    - Adds a `click` event listener.
    - When clicked, it removes the class `active` from **all** links.
    - Then adds the class `active` to the **clicked** link.
    - This triggers the CSS Anchor Positioning update (moving the white bubble).

---

## 🎨 CSS (`style.css`)

The CSS file handles the styling, layout, and responsiveness.

### Variables (`:root`)
```css
:root {
    --black: #0f0f0f;
    --gray: #3f3f3f;
    --white: #fff;
    --text-color: #fff;
    --bg-gradient-start: #141414;
    --bg-gradient-end: #242424;
}
```
- **Line 1-8**: Defines CSS variables. These are reusable color values that make it easy to change the theme in one place.

### Reset & Global Styles
```css
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
```
- **Line 11-17**: A CSS Reset.
    - `box-sizing: border-box`: Includes padding and border in the element's total width calculation (easier layout).
    - `margin` & `padding`: Removes browser defaults.

```css
@media (prefers-reduced-motion: no-preference) {
    html { interpolate-size: allow-keywords; }
}
```
- **Line 20-24**: Enables smooth transitions for keywords (like `auto`) for users who haven't disabled motion.

```css
body {
    background-color: var(--black);
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    /* ...typography... */
}
```
- **Line 26-39**: Body styling.
    - `height: 100vh`: Takes up full viewport height.
    - `display: flex; align-items: center; justify-content: center`: Precisely centers the navbar in the middle of the screen.

### Navigation Wrapper (`.nav-wrap`)
```css
.nav-wrap {
    border: 1px solid var(--gray);
    width: fit-content;
    max-width: 95vw;
    margin: 0 auto;
    border-radius: 500px;
    position: relative;
    box-shadow: inset 10px 0 10px black;
    background: linear-gradient(0deg, var(--bg-gradient-start), var(--bg-gradient-end));
    transform-style: preserve-3d;
}
```
- **Line 90-103**: Main container styles.
    - `border-radius: 500px`: Creates the "pill" shape.
    - `box-shadow`: Adds inner shadow for the "glassy" depth effect.
    - `background`: Subtle dark gradient.

```css
.nav-wrap:after {
    content: "";
    display: block;
    position: absolute;
    inset: -5px;
    background: linear-gradient(180deg, var(--gray), #212121);
    border-radius: 500px;
    z-index: -1;
    pointer-events: none;
}
```
- **Line 105-115**: A pseudo-element (`:after`) that creates a second border/layer *behind* the main navbar (`z-index: -1`). It is 5px larger (`inset: -5px`) to create a frame effect.

### Navigation Links (`.nav`)
```css
.nav {
    width: fit-content;
    anchor-name: --nav;
    margin: 6.7px;
    /* ...flex & scrolling settings... */
}
```
- **Line 117-129**: The container for links.
    - `anchor-name: --nav`: **Crucial Property**. It defines this element as an anchor named `--nav` for the positioning API.

```css
.nav a {
    z-index: 10;
    position: relative;
    display: inline-block;
    padding: 20px 50px;
    color: white;
    text-decoration: none;
    transition: color 0.2s ease;
}
```
- **Line 135-145**: Style for individual links.
    - `z-index: 10`: Ensures the text is above the bubbles.
    - `padding`: Defines the clickable size.

```css
.nav a.active {
    anchor-name: --active;
    color: black;
}
```
- **Line 155-158**: Style for the active link.
    - `anchor-name: --active`: Defines **this specific link** as the anchor `--active`. The white bubble will snap to this exact element.
    - `color: black`: Text turns black to contrast with the white bubble.

```css
.nav a:hover:before {
    anchor-name: --nav;
}
```
- **Line 160-162**: Updates anchor naming on hover (likely intended to guide the hover bubble).

### Bubbles (Anchor Positioning)
This uses the modern **CSS Anchor Positioning API**.

```css
.bubble {
    background: white;
    top: anchor(top);
    right: anchor(right);
    bottom: anchor(bottom);
    left: anchor(left);
    position: absolute;
    transition: all 0.2s;
    border-radius: 500px;
    pointer-events: none;
}
```
- **Line 164-176**: Shared bubble styles.
    - `top: anchor(top)`, etc.: Tells the element to stretch its edges to match the edges of its **assigned anchor**.
    - `transition`: Makes the movement smooth.

```css
.bubble.active {
    position-anchor: --active;
    z-index: 2;
    background: linear-gradient(180deg, #f2f2f2, #b3b3b3);
    box-shadow: inset 0 2px 7px #fff;
}
```
- **Line 178-183**: The White Bubble (Active state).
    - `position-anchor: --active`: Connects this bubble to the link with class `.active`. As the class moves (via JS), this bubble follows.

```css
.bubble.hover {
    z-index: 1;
    background: linear-gradient(180deg, var(--gray), #212121);
    position-anchor: --nav;
}
```
- **Line 185-190**: The Hover Bubble.
    - `position-anchor: --nav`: Connects to `nav` by default (or hovered item logic). Note: For a true following hover effect purely in CSS without extra JS, this usually requires determining which specific link is hovered, but here it defaults to the nav container anchor.

### Responsive Design
Media queries adjust layout for smaller screens.

```css
@media (max-width: 1024px) { ... }
```
- **Line 200-212 (Tablets)**:
    - Reduces font size to `24px`.
    - Tightens padding to `15px 30px`.

```css
@media (max-width: 768px) { ... }
```
- **Line 215-239 (Mobile)**:
    - Font size `18px`.
    - Padding `12px 20px`.
    - Changes `border-radius` to `50px` (smaller curves for smaller elements).

```css
@media (max-width: 480px) { ... }
```
- **Line 242-266 (Small Mobile)**:
    - Font size `16px`.
    - Navbar width set to `90%` of screen.
    - `.nav` set to `justify-content: space-between` to spread links evenly.
    - Minimal padding (`10px`).
