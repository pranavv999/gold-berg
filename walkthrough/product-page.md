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
* **Title**: Product title set to **15px** (`.product-info-title`).
* **Pricing & Discount Badge**:
  * **Actual Price**: Rendered in **12px** bold primary text (`{{ price | money }}`).
  * **Compare-At Price**: Displayed in **12px** strikethrough text beside the actual price (`<s>{{ compare_at_price | money }}</s>`).
  * **Percentage Discount Badge**: Rendered as a **10px** red badge pill (`38% OFF`) whenever the discount percentage is $\ge 1\%$.
* **Variant Size Selector**:
  * "SELECT SIZE" label and "Size Guide" button set to **10px**.
  * Size variant pills (XXXS to XXXL) set to **10px**.
* **CTA Buttons**: "ADD TO BAG" and "BUY NOW" buttons set to **10px** (`.cta-btn`).
* **Tab Headers & Content**:
  * "Details & Description", "Washcare", and "Shipping" tab headers set to **11px**.
  * All inner tab content (headings, paragraphs, lists, links) forced to **11px** with a consistent font-family (`var(--font-body-family)`).

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
