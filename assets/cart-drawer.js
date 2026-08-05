class CartDrawer extends HTMLElement {
  constructor() {
    super();

    this.addEventListener('keyup', (evt) => evt.code === 'Escape' && this.close());
    this.querySelector('#CartDrawer-Overlay').addEventListener('click', this.close.bind(this));
    this.setHeaderCartIconAccessibility();
  }

  setHeaderCartIconAccessibility() {
    const cartLink = document.querySelector('#cart-icon-bubble');
    if (!cartLink) return;

    cartLink.setAttribute('role', 'button');
    cartLink.setAttribute('aria-haspopup', 'dialog');
    cartLink.addEventListener('click', (event) => {
      event.preventDefault();
      this.open(cartLink);
    });
    cartLink.addEventListener('keydown', (event) => {
      if (event.code.toUpperCase() === 'SPACE') {
        event.preventDefault();
        this.open(cartLink);
      }
    });
  }

  open(triggeredBy) {
    if (triggeredBy) this.setActiveElement(triggeredBy);
    const cartDrawerNote = this.querySelector('[id^="Details-"] summary');
    if (cartDrawerNote && !cartDrawerNote.hasAttribute('role')) this.setSummaryAccessibility(cartDrawerNote);
    
    this.classList.add('animate', 'active');
    document.body.classList.add('overflow-hidden');

    this.addEventListener(
      'transitionend',
      () => {
        const containerToTrapFocusOn = this.classList.contains('is-empty')
          ? this.querySelector('.drawer__inner-empty')
          : document.getElementById('CartDrawer');
        const focusElement = this.querySelector('.drawer__inner') || this.querySelector('.drawer__close');
        if (containerToTrapFocusOn && focusElement) {
          trapFocus(containerToTrapFocusOn, focusElement);
        }
      },
      { once: true },
    );

    this.querySelector('cart-drawer-items')?.dispatchViewEvent();
  }

  close() {
    this.classList.remove('active');
    removeTrapFocus(this.activeElement);
    document.body.classList.remove('overflow-hidden');
  }

  setSummaryAccessibility(cartDrawerNote) {
    cartDrawerNote.setAttribute('role', 'button');
    cartDrawerNote.setAttribute('aria-expanded', 'false');

    if (cartDrawerNote.nextElementSibling.getAttribute('id')) {
      cartDrawerNote.setAttribute('aria-controls', cartDrawerNote.nextElementSibling.id);
    }

    cartDrawerNote.addEventListener('click', (event) => {
      event.currentTarget.setAttribute('aria-expanded', !event.currentTarget.closest('details').hasAttribute('open'));
    });

    cartDrawerNote.parentElement.addEventListener('keyup', onKeyUpEscape);
  }

  renderContents(parsedState) {
    this.classList.remove('is-empty');
    if (parsedState && parsedState.id) this.productId = parsedState.id;

    const fetchCartUrl = window.routes ? window.routes.cart_url : '/cart';
    return fetch(`${fetchCartUrl}?section_id=cart-drawer`)
      .then((res) => res.text())
      .then((html) => {
        const parsed = new DOMParser().parseFromString(html, 'text/html');
        const newDrawer = parsed.querySelector('#CartDrawer');
        const currentDrawer = document.querySelector('#CartDrawer');
        if (newDrawer && currentDrawer) {
          currentDrawer.innerHTML = newDrawer.innerHTML;
        }

        const parsedCartDrawer = parsed.querySelector('cart-drawer');
        if (!parsedCartDrawer || !parsedCartDrawer.classList.contains('is-empty')) {
          this.classList.remove('is-empty');
        }

        const cartBubble = document.querySelector('#cart-icon-bubble');
        const cartCountEl = document.querySelector('#cart-count-value');
        fetch(`${fetchCartUrl}.js`)
          .then(r => r.json())
          .then(cart => {
            if (cartBubble) cartBubble.classList.toggle('is-empty', cart.item_count === 0);
            if (cartCountEl) {
              cartCountEl.textContent = cart.item_count;
              cartCountEl.classList.toggle('hidden', cart.item_count === 0);
            }
          })
          .catch(() => {});

        this.open();
      })
      .catch((e) => {
        console.error('Cart drawer refresh error:', e);
        this.classList.remove('is-empty');
        this.open();
      });
  }

  getSectionInnerHTML(html, selector = '.shopify-section') {
    return new DOMParser().parseFromString(html, 'text/html').querySelector(selector).innerHTML;
  }

  getSectionsToRender() {
    return [
      {
        id: 'cart-drawer',
        selector: '#CartDrawer',
      },
      {
        id: 'cart-icon-bubble',
      },
    ];
  }

  getSectionDOM(html, selector = '.shopify-section') {
    return new DOMParser().parseFromString(html, 'text/html').querySelector(selector);
  }

  setActiveElement(element) {
    this.activeElement = element;
  }
}

customElements.define('cart-drawer', CartDrawer);

class CartDrawerItems extends CartItems {
  getSectionsToRender() {
    return [
      {
        id: 'CartDrawer',
        section: 'cart-drawer',
        selector: '.drawer__inner',
      },
      {
        id: 'cart-icon-bubble',
        section: 'cart-icon-bubble',
        selector: '.shopify-section',
      },
    ];
  }
}

customElements.define('cart-drawer-items', CartDrawerItems);
