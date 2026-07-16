# Hero Banner (Image Banner)

The primary showcase banner component used at the top of the homepage to introduce the brand visual assets.

---

## Shopify Admin Settings

The merchant can customize the following settings directly inside the Shopify Theme Editor (Customizer):

| Setting | ID | Type | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Image Height** | `image_height` | Select Dropdown | `extra-large` | Controls the vertical height of the banner. Options include:<br>• **Adapt to first image**: Sizes to the image aspect ratio.<br>• **Small**: Compact layout.<br>• **Medium**: Mid-sized layout.<br>• **Large**: Tall layout.<br>• **Extra large**: Full viewport height (`100vh` / `100dvh`) scaling dynamically on both mobile and desktop screens. |
| **First Image** | `image` | Image Picker | None | The primary background image. |
| **Second Image** | `image_2` | Image Picker | None | The secondary background image (creates a split vertical banner on desktop). |
| **Overlay Opacity** | `image_overlay_opacity` | Range Slider | `0%` | Controls the darkness level of the overlay on top of the images to enhance text readability (from `0%` transparent to `100%` solid dark overlay). |
| **Desktop Position** | `desktop_content_position` | Select Dropdown | `bottom-center` | Aligns the content card within the banner layout on both desktop and mobile screens (top-left, middle-center, bottom-right, etc.). |
| **Desktop Style** | `show_text_box` | Checkbox | `true` | Toggles the display of the background card background wrapper on desktop screens. |

### Heading & Button Sub-block Settings
* **Default Heading Size**: Set to **Small** (`h2`) by default for both mobile and desktop views to maintain layout tidiness.
* **Button Section Layout**: The buttons are designed as flat link labels:
  * **No Box Borders**: Backgrounds, outline border boxes, and padding margins are removed.
  * **Underline Border-Bottom**: Renders a border-bottom under the link text of the same color as the text (`currentColor`).
  * **Button Font Size**: A range slider setting (`button_font_size`) is available inside the Buttons block settings to customize the button label size from `12px` to `30px`, defaulting to `15px`.

---

## Desktop Behavior

* **Extra-Large Height**:
  * Selecting **Extra large** applies `min-height: 100vh` (and `100dvh` for supported browsers).
  * The banner dynamically resizes to fill exactly 100% of the viewport height, starting immediately beneath the glass header overlay.
  * The image cover scales and centers automatically.
* **Layout Positioning**:
  * The content card defaults to the bottom-center of the screen.

---

## Mobile Behavior

* **Layout Positioning**:
  * The text content and flat button links default to the **bottom-center** layout (rather than centering vertically on the screen) to match desktop aesthetics.
  * Spaced with a bottom padding of `3rem` to keep the content floating elegantly above the browser viewports.
* **Extra-Large Height**:
  * On mobile viewports, the height adapts dynamically utilizing `100dvh` (Dynamic Viewport Height).
  * This automatically accounts for mobile address/search bar expansion and contraction, preventing layout shifting or text clipping.
  * If the text card is stacked below the image, the image block itself scales to `100vh` height.
