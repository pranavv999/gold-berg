# Reusable Product Collection Row User Manual

A generic, highly customizable section to display rows of products on the homepage. It features a clean white container, customizable rounded corners, and interactive product image sliders inside the cards.

---

## 1. Shopify Customizer Settings

The merchant can customize the following settings directly inside the Shopify Theme Editor (Customizer) for each instance of this section:

| Setting | ID | Type | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Collection Name Override** | `title` | Text | None | Overrides the default collection title on the top-left. If left blank, uses the selected Collection's actual title. |
| **Collection** | `collection` | Collection | None | Selects the Shopify Collection to pull products from. |
| **Container corner radius** | `container_radius` | Range Slider | `24`px | Controls the roundness of the white background panel corners (from `0px` full square to `40px` rounded). |

---

## 2. Walkthrough & Specifications

### Container
* **White Panel**: Renders as a white panel block overlaying the background, wrapping the product row.
* **Margins**: Stretches horizontally to keep a constant margin from the browser edges:
  * **Desktop**: Spaced exactly **24px** from the left and right browser edges.
  * **Mobile**: Spaced exactly **12px** from the left and right browser edges to maximize display size on small screens.
* **Rounded Corners**: Controllable from the Customizer via range slider setting `--container-radius`.

### Header Area
* **Collection Title**: Left-aligned, displays the collection title or override text.
* **Discover More Button**: Right-aligned pill button with a black fill background and white text linking directly to the collection page.

### Product Card Layout (Desktop View)
* Displays a row of **4 equal-sized product cards**.
* **Tall Aspect Ratio**: Built with a 3:4 aspect ratio (`0.75` height proportion) to ensure product cards look elegant and tall as the container expands.
* **Hover Image Slider**:
  * Hovering over any card reveals navigation arrows (Left/Right) on the side edges of the image box.
  * Nav arrows feature a premium glassmorphic background (`rgba(255, 255, 255, 0.1)` with `blur(4px)` backdrop-filter) and white icons.
  * Clicking these arrows slides through the product's available images.
* **Pagination Dots**:
  * Tiny indicators at the bottom-center of the image box display active states.
  * The indicator background is styled with a matching glassmorphic design (`rgba(255, 255, 255, 0.1)` with `blur(4px)` backdrop-filter).
  * The active slide dot is styled as a filled gray dot.
* **Card Details**:
  * Product Name: Left-aligned beneath the image.
  * Pricing: Left-aligned under the name, displaying "From $[Price]" and a struck-through comparison price if it is on sale.

