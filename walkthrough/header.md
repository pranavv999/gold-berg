# Custom Glassmorphic Header

A premium, custom glassmorphic navigation header designed for **Sober Animal**. It floats fixed at the top of the viewport directly overlaying the hero section banner, transitioning to a floating pill shape upon scrolling.

---

## Shopify Admin Settings

The merchant can customize the following settings directly inside the Shopify Theme Editor (Customizer):

| Setting | ID | Type | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Color Scheme** | `color_scheme` | Color Scheme | `scheme-1` | Selects the background/text color schema colors used by the header elements. |
| **Logo Width** | `logo_width` | Range Slider | `150px` | Controls the display width of the logo image/text (from `50px` to `250px` in `10px` steps). |
| **Glass Opacity** | `glass_opacity` | Range Slider | `80%` | Controls the translucency opacity of the glassmorphic background container (from `0%` completely transparent to `100%` solid color). |
| **Scrolled Border Radius** | `glass_radius` | Range Slider | `16px` | Controls the corner border-radius when the header is in its floating scrolled state (from `0px` for sharp square corners to `40px` for fully rounded pill shape). |

---

## Desktop Behavior

* **Unscrolled State (At the Top)**:
  * The header touches the top, left, and right edges of the browser window.
  * The height is fixed at `72px` with a horizontal padding of `32px`.
  * The logo is centered, the hamburger button is on the left, and the search, profile, and cart elements are on the right.
* **Scrolled State**:
  * As soon as the scroll position passes `10px`, the wrapper smoothly transitions by adding margins: `16px` from the top, and `24px` from the left and right.
  * The header corners round dynamically to the value set by the **Scrolled Border Radius** customizer slider.
  * The hero image background scrolls underneath and is visible through the transparent margins.

---

## Mobile Behavior

* **Unscrolled State (At the Top)**:
  * The header spans full width (touching top, left, right edges) to maximize screen area.
  * The height is slightly slimmer (`64px`) with a horizontal padding of `16px`.
* **Scrolled State**:
  * Upon scrolling past `10px`, the margins transition smoothly: `10px` from the top, and `12px` from the left and right.
  * The header height scales down to `56px` with custom rounded corners based on the **Scrolled Border Radius** settings.
  * Cart pill text scales down to maintain space efficiency.
