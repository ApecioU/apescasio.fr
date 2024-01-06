"use strict";

/* This script is loaded on EVERY page, so keep it as lightweight
 * as possible. No application logic should be implemented here! */

/**
 * The ficlab save element
 *
 * @since 1.0.0
 */
class FiclabSaveElement extends HTMLElement {
    /** @since 1.0.0 */
    constructor() {
        super();
        this.addEventListener("click", (ev) => {
            this.dispatchEvent(new Event("ficlab", { bubbles: true }));
        });
    }
}
window.customElements.define("ficlab-save", FiclabSaveElement);
