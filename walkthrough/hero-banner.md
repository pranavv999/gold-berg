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
| **Desktop Position** | `desktop_content_position` | Select Dropdown | `middle-center` | Aligns the content card within the banner layout (top-left, middle-center, bottom-right, etc.). |
| **Desktop Style** | `show_text_box` | Checkbox | `true` | Toggles the display of the background card background wrapper on desktop screens. |

---

## Desktop Behavior

* **Extra-Large Height**:
  * Selecting **Extra large** applies `min-height: 100vh` (and `100dvh` for supported browsers).
  * The banner dynamically resizes to fill exactly 100% of the viewport height, starting immediately beneath the glass header overlay.
  * The image cover scales and centers automatically.

---

## Mobile Behavior

* **Extra-Large Height**:
  * On mobile viewports, the height adapts dynamically utilizing `100dvh` (Dynamic Viewport Height).
  * This automatically accounts for mobile address/search bar expansion and contraction, preventing layout shifting or text clipping.
  * If the text card is stacked below the image, the image block itself scales to `100vh` height.
