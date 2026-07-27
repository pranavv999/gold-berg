# Enhanced Policy Pages Documentation & Layout Guide

This document details the layout architecture, typography scale, and responsive side watermark framing for all Shopify Policy Pages (Refund Policy, Privacy Policy, Terms of Service, Shipping Policy, Contact Information).

---

## 1. Page Template & Wrapper Architecture

* **Global Route Interceptor**:
  Configured in [layout/theme.liquid](file:///Users/pranavsonawane/Desktop/SOBER%20ANIMAL/my-custom-theme/gold-berg/layout/theme.liquid). When `request.page_type == 'policy'` or `request.path contains '/policies/'`, the page content is wrapped in `.custom-policy-page-wrapper`.
* **Universal Application**:
  Automatically applies to every policy configured under Shopify Admin (`Settings -> Policies`).

---

## 2. Typography Scale System

* **Font-Family**: Shares the identical body and heading font families (`var(--font-body-family)` and `var(--font-heading-family)`) as the homepage and product page.
* **Desktop Font Sizes**:
  1. **Main Policy Title**: **18px** (`.shopify-policy__title h1`). Bold uppercase styling with `letter-spacing: 0.05em`.
  2. **Section Headers**: **15px** (`.shopify-policy__body h2, h3, h4`). Styled with `font-weight: 600` and comfortable top/bottom margins.
  3. **Body Text / Paragraphs / Lists**: **12px** (`.shopify-policy__body p, li, span`). Styled with `line-height: 1.8` for optimal readability.

---

## 3. Desktop View (Side Watermarks & Margins)

* **Left Policy Side Image (SOBER)**:
  * Fixed on the left margin (`left: 40px; top: 100px; bottom: 40px;`). Displays Image #1 (`SOBER`).
* **Right Policy Side Image (ANIMAL)**:
  * Fixed on the right margin (`right: 40px; top: 100px; bottom: 40px;`). Displays Image #2 (`ANIMAL`).
* **Merchant Theme Customizer Setup**:
  * Added image pickers `Left Policy Side Image (SOBER)` and `Right Policy Side Image (ANIMAL)` in **Theme Customizer -> Theme Settings -> Policy Pages Side Images** so merchants can update or change the side images at any time.
* **Center Policy Container**:
  * `max-width: 760px` with equal left and right margins (`margin: 0 auto`).
  * Content is left-aligned (`text-align: left`) with `padding: 120px 40px 80px 40px`.

---

## 4. Mobile View (< 750px)

* **Watermark Removal**:
  The side brand watermarks (`SOBER` and `ANIMAL`) are hidden (`display: none !important`) on mobile screens to prevent clutter.
* **Auto Font Scaling**:
  * **Main Title**: **16px**
  * **Section Headers**: **14px**
  * **Body Text**: **11px**
* **Mobile Container Padding**:
  * `padding: 90px 20px 40px 20px` to fit mobile viewports smoothly.
