# Custom Product Details Page User Manual

This manual details the sections, customizer settings, and visual layouts of the custom product details page.

---

## 1. MAIN SECTION (`custom-main-product.liquid`)

### Left-Side: 2-Column Product Media Grid
* **Grid Proportion**: Occupies exactly **65%** of the product grid container width, leaving the remaining **35%** (minus gutters) to the right-side purchasing column.
* **Image Arrangement**:
  * **Column 1 (Left)**: Displays all product images in sequential order (`I1, I2, I3, I4 ... IN`).
  * **Column 2 (Right)**: Displays all product images in reverse order (`IN ... I4, I3, I2, I1`).
* **Zero Cropping Guarantee**:
  * Every image element is styled with `width: 100%; height: auto; display: block;` with no fixed height capping or overflow clipping, guaranteeing 100% complete, uncropped product photos across both columns.
* **Standard Scroll Behavior**: Both columns scroll naturally together in the standard document scroll flow.

### Right-Side: Sticky Product Information Cards
* **Sticky Positioning**: Styled with `position: sticky; top: 120px; align-self: start;` so the purchasing card remains pinned in view on desktop as the user scrolls past the left media images.
* **Seamless Un-sticking**: Once the scroll reaches the end of the left media images, the right info column un-sticks and scrolls up together with the page to reveal the recommendations section and footer.

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
