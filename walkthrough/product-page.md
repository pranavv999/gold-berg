# Custom Product Details Page User Manual

This manual details the sections, customizer settings, and visual layouts of the custom product details page.

---

## 1. MAIN SECTION (`custom-main-product.liquid`)

### Left-Side: Parallax Media Scroll Columns
* **Grid Proportion**: Occupies exactly **65%** of the product grid container width, leaving the remaining **35%** (minus gutters) to the right-side information columns.
* **Crop Prevention (Adaptive Heights)**: The aspect ratio of the main media column is dynamically computed in CSS as exactly the native aspect ratio of the product's featured photo:
  `aspect-ratio: var(--product-image-aspect, 1);`
  Combined with tracks sized to `150%` of container height, slides sized to `33.333%` (exactly `50%` of container height), a narrow **`8px` gap**, and **`object-fit: cover`** image scaling, this shows exactly **two rows of images side-by-side** that are perfectly aligned on the top and bottom with zero crop margins.
* **Layout Grid**: The media column is sticky on desktop (`100vh` height minus header offset) and divided into two equal-width columns.
* **Opposite Scrolling Parallax**:
  * Displays a 3-slide track on each column (Left track loops I1 -> I2 -> I1; Right track loops I3 -> I4 -> I3) for a seamless vertical loop.
  * Symmetrically translates Left track UP (0% to -33.333% of track height) and Right track DOWN (-33.333% to 0% of track height) as the user scrolls, showing dynamic opposite parallax movements while keeping the rows perfectly aligned at the endpoints.
* **Hover Interaction**: Hovering and scrolling inside the media container propagates the scroll events to the viewport naturally.

### Right-Side: Product Information Cards

#### Top Card (Purchasing Controls)
* **Title & Save Icon**: Displays product title on the left and an interactive save/bookmark toggle SVG icon on the right.
* **Pricing**: Displays the product price directly below the header.
* **Variant Size Selector**:
  * Displays a grid of pill buttons mapping sizes (XXXS, XXS, XS, S, M, L, XL, XXL, XXXL).
  * Clicking any pill marks it as selected (dark background fill with white text) and updates the active state.
  * A "Size Guide" text button on the right opens size measurements.
* **CTA Buttons**:
  * Outline CTA button "ADD TO BAG" (asynchronously submits cart form).
  * Solid dark CTA button "BUY NOW" (links to checkout).

#### Bottom Card (Tabbed Specifications)
* **Horizontal Tabs Navigation**: Features three tab headers: "Details & Description", "Washcare", and "Shipping". The active tab is styled with bold text and a bottom underline.
* **Tab Panel Content**:
  * **Details & Description**: Renders fabric specs list (100% cotton, 260 gsm weight, puff print, oversize fit) and the product description HTML block with active links.
  * **Washcare**: Renders fabric wash instructions (Reverse wash only, do not iron, steam iron recommended).
  * **Shipping**: Renders standard shipping and return conditions.

---

## 2. PEOPLE ALSO BUY SECTION (`custom-collection-row.liquid`)

* **Carousel Row**: Reuses the `custom-collection-row` carousel block styled in a white panel with rounded corners.
* **Source Settings**:
  * `Dynamic Related Products (Metafield)`: Loads dynamically from the product's metafield reference (`shopify--discovery--product_recommendation.related_products.value`).
  * If the metafield is unconfigured or empty for the current product, it falls back to the collection selected in settings.
* **No Discover More Button**: The "Discover more" button on the top-right is disabled inside `templates/product.json` to keep the layout focused on shopping recommendations.
