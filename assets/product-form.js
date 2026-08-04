if (!customElements.get('product-form')) {
  customElements.define(
    'product-form',
    class ProductForm extends HTMLElement {
      constructor() {
        super();

        this.form = this.querySelector('form');
        this.variantIdInput = this.form ? this.form.querySelector('[name=id]') : null;
        if (this.variantIdInput) this.variantIdInput.disabled = false;
        if (this.form) this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
        this.cart = document.querySelector('cart-drawer') || document.querySelector('cart-notification');
        this.submitButton = this.querySelector('[type="submit"]');
        if (this.submitButton) {
          this.submitButtonText = this.submitButton.querySelector('span');
          if (document.querySelector('cart-drawer')) this.submitButton.setAttribute('aria-haspopup', 'dialog');
        }

        this.hideErrors = this.dataset.hideErrors === 'true';
      }

      onSubmitHandler(evt) {
        evt.preventDefault();
        if (this.submitButton && this.submitButton.getAttribute('aria-disabled') === 'true') return;

        this.cart = document.querySelector('cart-drawer') || this.cart || document.querySelector('cart-notification');

        this.handleErrorMessage();

        if (this.submitButton) {
          this.submitButton.setAttribute('aria-disabled', true);
          this.submitButton.classList.add('loading');
        }
        const spinner = this.querySelector('.loading__spinner');
        if (spinner) spinner.classList.remove('hidden');

        const config = fetchConfig('javascript');
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
        delete config.headers['Content-Type'];

        const formData = new FormData(this.form);
        if (this.cart && typeof this.cart.getSectionsToRender === 'function') {
          formData.append(
            'sections',
            this.cart.getSectionsToRender().map((section) => section.id)
          );
          formData.append('sections_url', window.location.pathname);
          if (typeof this.cart.setActiveElement === 'function') {
            this.cart.setActiveElement(document.activeElement);
          }
        }
        config.body = formData;

        const variantId = formData.get('id');
        const quantity = parseInt(formData.get('quantity')) || 1;
        const linesUpdateDeferred = this.createCartLinesUpdateEvent(variantId, quantity);

        fetch('/cart/add.js', config)
          .then((response) => response.json())
          .then((response) => {
            if (response.status) {
              publish(PUB_SUB_EVENTS.cartError, {
                source: 'product-form',
                productVariantId: variantId,
                errors: response.errors || response.description,
                message: response.message,
              });
              this.handleErrorMessage(response.description);
              this.dispatchCartErrorEvent(response.description || response.message, 'INVALID');
              linesUpdateDeferred?.reject(new Error(response.description || response.message));

              if (this.submitButton) {
                const soldOutMessage = this.submitButton.querySelector('.sold-out-message');
                if (!soldOutMessage) return;
                this.submitButton.setAttribute('aria-disabled', true);
                if (this.submitButtonText) this.submitButtonText.classList.add('hidden');
                soldOutMessage.classList.remove('hidden');
              }
              this.error = true;
              return;
            }

            this.resolveCartLinesUpdate(linesUpdateDeferred);

            const startMarker = CartPerformance.createStartingMarker('add:wait-for-subscribers');
            if (!this.error)
              publish(PUB_SUB_EVENTS.cartUpdate, {
                source: 'product-form',
                productVariantId: variantId,
                cartData: response,
              }).then(() => {
                CartPerformance.measureFromMarker('add:wait-for-subscribers', startMarker);
              });
            this.error = false;

            const cartDrawer = document.querySelector('cart-drawer');
            if (cartDrawer) {
              if (typeof cartDrawer.renderContents === 'function') {
                cartDrawer.renderContents(response);
              } else if (typeof cartDrawer.open === 'function') {
                cartDrawer.open();
              }
            } else {
              const cartIcon = document.querySelector('#cart-icon-bubble');
              if (cartIcon) cartIcon.click();
            }
          })
          .catch((e) => {
            console.error(e);
            this.dispatchCartErrorEvent(e.message || 'Network error', 'SERVICE_UNAVAILABLE');
            linesUpdateDeferred?.reject(e);
          })
          .finally(() => {
            if (this.submitButton) this.submitButton.classList.remove('loading');
            if (this.cart && this.cart.classList.contains('is-empty')) this.cart.classList.remove('is-empty');
            if (!this.error && this.submitButton) this.submitButton.removeAttribute('aria-disabled');
            const spinner = this.querySelector('.loading__spinner');
            if (spinner) spinner.classList.add('hidden');

            CartPerformance.measureFromEvent("add:user-action", evt);
          });
      }

      handleErrorMessage(errorMessage = false) {
        if (this.hideErrors) return;

        this.errorMessageWrapper =
          this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper');
        if (!this.errorMessageWrapper) return;
        this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');

        this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

        if (errorMessage) {
          this.errorMessage.textContent = errorMessage;
        }
      }

      toggleSubmitButton(disable = true, text) {
        if (disable) {
          this.submitButton.setAttribute('disabled', 'disabled');
          if (text) this.submitButtonText.textContent = text;
        } else {
          this.submitButton.removeAttribute('disabled');
          this.submitButtonText.textContent = window.variantStrings.addToCart;
        }
      }

      createCartLinesUpdateEvent(variantId, quantity) {
        const { CartLinesUpdateEvent } = window.StandardEvents || {};
        if (!CartLinesUpdateEvent) return null;

        const deferred = CartLinesUpdateEvent.createPromise();
        this.dispatchEvent(
          new CartLinesUpdateEvent({
            action: 'add',
            context: 'product',
            lines: [{ merchandiseId: variantId, quantity }],
            promise: deferred.promise,
          })
        );
        return deferred;
      }

      resolveCartLinesUpdate(deferred) {
        if (!deferred) return;
        const { CartLinesUpdateEvent } = window.StandardEvents || {};
        if (!CartLinesUpdateEvent) return;

        const pendingCartDataPromise = typeof CartItems !== 'undefined'
          ? CartItems.fetchCartData()
          : fetch(`${routes.cart_url}.json`).then((response) => response.json());

        pendingCartDataPromise
          .then((cart) => {
            if (!cart?.currency) return deferred.reject(new Error('Missing currency in cart response'));
            deferred.resolve({ cart: CartLinesUpdateEvent.createCartFromAjaxResponse(cart) });
          })
          .catch((e) => deferred.reject(e));
      }

      dispatchCartErrorEvent(message, code) {
        const { CartErrorEvent } = window.StandardEvents || {};
        if (!CartErrorEvent) return;
        this.dispatchEvent(new CartErrorEvent({ error: message, code }));
      }
    }
  );
}

// Global submit handler fallback for any product form on the page
document.addEventListener('submit', function(evt) {
  const form = evt.target;
  if (!form || !form.action || !form.action.includes('/cart/add') || form.dataset.handledByGlobal) return;
  if (form.closest('product-form')) return; // Handled by ProductForm element

  form.dataset.handledByGlobal = 'true';
  evt.preventDefault();
  evt.stopPropagation();

  const formData = new FormData(form);
  const cartDrawer = document.querySelector('cart-drawer');

  if (cartDrawer && typeof cartDrawer.getSectionsToRender === 'function') {
    const sections = cartDrawer.getSectionsToRender().map(s => s.id);
    formData.append('sections', sections.join(','));
    formData.append('sections_url', window.location.pathname);
  } else {
    formData.append('sections', 'cart-drawer,cart-icon-bubble');
  }

  fetch('/cart/add.js', {
    method: 'POST',
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: formData
  })
  .then(res => res.json())
  .then(response => {
    delete form.dataset.handledByGlobal;
    if (response.status) {
      alert(response.description || response.message || 'Error adding to cart');
      return;
    }

    const drawer = document.querySelector('cart-drawer');
    if (drawer) {
      if (typeof drawer.renderContents === 'function') {
        drawer.renderContents(response);
      } else if (typeof drawer.open === 'function') {
        drawer.open();
      }
    } else {
      const cartIcon = document.querySelector('#cart-icon-bubble');
      if (cartIcon) cartIcon.click();
    }
  })
  .catch(err => {
    delete form.dataset.handledByGlobal;
    console.error('Error adding to cart:', err);
  });
}, true);
