# Cursor Animation - Code Explanation

This project creates a custom glowing cursor that follows the mouse (or touch) and changes colors. It also features a text animation where each letter changes color in a wave pattern.

---

## 📄 HTML (`index.html`)

The HTML defines the elements and handles the logic for the cursor movement.

### Structure
```html
<div class="cursor"></div>
```
- **Line 12**: A simple `div` that acts as our custom cursor. We style and move this element using CSS and JavaScript.

### JavaScript Logic
The script handles three main things: text splitting, cursor movement, and inactivity hiding.

#### 1. Text Animation Setup
```javascript
const text = document.querySelector("h1");
text.innerHTML = text.innerText
  .split("")
  .map((char, i) => `<span style="--i:${i}">${char}</span>`)
  .join("");
```
- **Line 15-19**:
    - Takes the text content of the `<h1>`.
    - Splits it into individual characters.
    - Wraps each character in a `<span>`.
    - Adds a custom CSS variable `--i` (index) to each span (e.g., `--i:0`, `--i:1`). This is used in CSS to create a staggered delay for the color animation.

#### 2. Mouse Movement
```javascript
document.addEventListener("mousemove", (e) => {
  let x = e.pageX;
  let y = e.pageY;
  cursor.style.left = x + "px";
  cursor.style.top = y + "px";
  cursor.style.display = "block";
  // ...
});
```
- **Line 29-38**:
    - Listens for the `mousemove` event.
    - Gets the cursor's coordinates (`e.pageX`, `e.pageY`).
    - Updates the `.cursor` element's `left` and `top` CSS properties to match the mouse position.

#### 3. Inactivity Logic
```javascript
function mouseStopped() {
  cursor.style.display = "none";
}

// Inside mousemove:
clearTimeout(timeout);
timeout = setTimeout(mouseStopped, 1000);
```
- **Line 25-27, 36-37**:
    - Every time the mouse moves, we clear any existing timer.
    - We set a new timer for 1 second (`1000` ms).
    - If the user *doesn't* move the mouse for 1 second, `mouseStopped` runs and hides the cursor.

#### 4. Touch Support
```javascript
document.addEventListener("touchmove", (e) => { ... }, { passive: true });
```
- **Line 46-59**: Similar logic for mobile devices using `touchmove` and `touchstart`, extracting coordinates from `e.touches[0]`.

---

## 🎨 CSS (`style.css`)

### Global Settings
```css
body {
  background: #000115;
  cursor: none;
  /* ... */
}
```
- **Line 8-16**:
    - Sets a dark background (`#000115`).
    - `cursor: none`: **Hides the default system cursor** so we only see our custom one.

### Text Animation
```css
h1 span {
  animation: animate 2s linear infinite;
  animation-delay: calc(0.1s * var(--i));
}
```
- **Line 29-35**:
    - Uses the `--i` variable we set in JS.
    - `animation-delay`: Multiplies the index by 0.1s.
        - 1st letter: 0s delay
        - 2nd letter: 0.1s delay
        - 3rd letter: 0.2s delay
    - This creates a wave effect where colors change sequentially across the word.

```css
@keyframes animate {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}
```
- **Line 37-44**: Rotates the hue of the text color through the entire color spectrum (0 to 360 degrees).

### Custom Cursor
```css
.cursor {
  position: fixed;
  background: #2696e8;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  pointer-events: none;
  box-shadow: 0 0 20px #2696e8, 0 0 60px #2696e8, 0 0 100px #2696e8;
  animation: colors 5s infinite;
}
```
- **Line 46-59**:
    - `position: fixed`: Keeps it relative to the viewport.
    - `pointer-events: none`: Ensures clicks pass *through* the custom cursor to elements behind it (like buttons or links).
    - `box-shadow`: Creates the glowing neon effect with multiple layers of shadow.
    - `animation: colors`: Slowly changes the glow color.

```css
.cursor:before {
  content: "";
  /* ... */
  transform: translate(-30%, -30%);
}
```
- **Line 85-95**: Adds a secondary, larger, and transparent circle around the main dot for extra visual flair.
