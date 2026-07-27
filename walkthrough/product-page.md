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
* **Mobile Media Slider (Single Image & Bubble Dots)**:
  * On mobile screens (`< 990px`), the 2-column desktop grid is hidden (`display: none !important`).
  * A single-image touch slider (`.custom-product-media-mobile`) displays only **1 image at a time**.
  * Features horizontal swipe navigation (`scroll-snap-type: x mandatory`).
  * Includes pagination bubble dots (`.mobile-media-dots`) underneath the image that dynamically highlight the active image as the user swipes. Clicking any dot scrolls to that image.

### Right-Side: Sticky Product Information Cards
* **Sticky Positioning**: Styled with `position: sticky; top: 120px; align-self: start;` so the purchasing card remains pinned in view on desktop as the user scrolls past the left media images.
* **Seamless Un-sticking**: Once the scroll reaches the end of the left media images, the right info column un-sticks and scrolls up together with the page to reveal the recommendations section and footer.

#### Top Card (Purchasing Controls)
* **Title**: Product title set to **15px** (`.product-info-title`).
* **Pricing & Discount Badge**:
  * **Actual Price**: Rendered in **12px** bold primary text (`{{ price | money }}`).
  * **Compare-At Price**: Displayed in **12px** strikethrough text beside the actual price (`<s>{{ compare_at_price | money }}</s>`).
  * **Percentage Discount Badge**: Rendered as a **10px** red badge pill (`38% OFF`) whenever the discount percentage is $\ge 1\%$.
* **Dynamic Variant Size Selector**:
  * "SELECT SIZE" label and "Size Guide" button set to **10px**.
  * Size variant pills (`.variant-pill`) are dynamically fetched directly from `product.options_with_values` / `product.variants` for each individual product in Shopify.
  * Out-of-stock sizes render with a `.disabled` strikethrough state.
  * Selecting a size pill dynamically updates the hidden `input[name="id"]` for cart submission and updates variant prices dynamically.
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

### Merchant Setup Guide for "PEOPLE ALSO BUY"

#### 1. How to Setup Custom Related Products / Collection for a Specific Product
To show hand-picked recommended products for a specific product (e.g. showing matching cargo pants or jackets for a specific T-shirt):

* **Method A: Via Shopify Search & Discovery App (Recommended)**
  1. In Shopify Admin, go to **Apps** $\rightarrow$ **Shopify Search & Discovery**.
  2. Click **Recommendations** $\rightarrow$ **Product recommendations**.
  3. Search and select the target product (e.g. *Ascent T-Shirt*).
  4. Under **Complementary products** / **Related products**, click **Edit** and select the specific products you want to feature.
  5. Click **Save**.

* **Method B: Via Product Metafields in Shopify Admin**
  1. In Shopify Admin, go to **Products** and click the product you wish to customize.
  2. Scroll down to the **Metafields** section at the bottom of the product details page.
  3. Click on the **Related Products** metafield (`shopify--discovery--product_recommendation.related_products`).
  4. Select the custom products to display in the section.
  5. Click **Save**.

#### 2. How to Setup Default Collection for All Products (Fallback)
To set a global default collection (e.g. *All Products*, *Streetwear*, or *Best Sellers*) that automatically displays on any product page where no custom recommendations have been configured:

1. In Shopify Admin, go to **Online Store** $\rightarrow$ **Themes**.
2. Click **Customize** on your active theme (*gold-berg*).
3. In the top page selector dropdown, choose **Products** $\rightarrow$ **Default product**.
4. In the left-hand section panel, click on **`PEOPLE ALSO BUY`** (`Custom Collection Row`).
5. In the right-hand settings sidebar:
   - Under **Collection**, click **Select collection** and choose your default collection (e.g. *All Products* or *Featured Collection*).
   - Ensure **Product Source** is set to `Dynamic Related Products (Metafield)`. *(This tells the theme to check for product-specific custom recommendations first, and automatically fall back to your default collection if none are set).*
6. Click **Save** in the top-right corner.
