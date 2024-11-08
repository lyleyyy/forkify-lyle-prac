import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup is reurnedif render=false
   * @this {Object} View instance
   * @author Lyle
   * @todo Finish implementation
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this.#clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    // compare new and old markup, change text in old markup where it is updated
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // update text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // update attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  #clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner = function () {
    const markup = `<div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>`;

    this.#clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>`;

    this.#clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `<div class="message">
                      <div>
                        <svg>
                          <use href="${icons}#icon-smile"></use>
                        </svg>
                      </div>
                      <p>${message}</p>
                    </div>`;

    this.#clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  // _generateMarkup() {
  //   return `
  //   <figure class="recipe__fig">
  //     <img src="${this._data.image}" alt="${
  //     this._data.title
  //   }" class="recipe__img" />
  //     <h1 class="recipe__title">
  //       <span>${this._data.title}</span>
  //     </h1>
  //   </figure>

  //   <div class="recipe__details">
  //     <div class="recipe__info">
  //       <svg class="recipe__info-icon">
  //         <use href="${icons}#icon-clock"></use>
  //       </svg>
  //       <span class="recipe__info-data recipe__info-data--minutes">${
  //         this._data.cookingTime
  //       }</span>
  //       <span class="recipe__info-text">minutes</span>
  //     </div>
  //     <div class="recipe__info">
  //       <svg class="recipe__info-icon">
  //         <use href="${icons}#icon-users"></use>
  //       </svg>
  //       <span class="recipe__info-data recipe__info-data--people">${
  //         this._data.servings
  //       }</span>
  //       <span class="recipe__info-text">servings</span>

  //       <div class="recipe__info-buttons">
  //         <button class="btn--tiny btn--increase-servings">
  //           <svg>
  //             <use href="${icons}#icon-minus-circle"></use>
  //           </svg>
  //         </button>
  //         <button class="btn--tiny btn--increase-servings">
  //           <svg>
  //             <use href="${icons}#icon-plus-circle"></use>
  //           </svg>
  //         </button>
  //       </div>
  //     </div>

  //     <div class="recipe__user-generated">
  //       <svg>
  //         <use href="${icons}#icon-user"></use>
  //       </svg>
  //     </div>
  //     <button class="btn--round">
  //       <svg class="">
  //         <use href="${icons}#icon-bookmark-fill"></use>
  //       </svg>
  //     </button>
  //   </div>

  //   <div class="recipe__ingredients">
  //     <h2 class="heading--2">Recipe ingredients</h2>
  //     <ul class="recipe__ingredient-list">
  //     ${this._data.ingredients
  //       .map(ingredient => this._generateMarkupIngredient(ingredient))
  //       .join('')}
  //     </ul>
  //   </div>

  //   <div class="recipe__directions">
  //     <h2 class="heading--2">How to cook it</h2>
  //     <p class="recipe__directions-text">
  //       This recipe was carefully designed and tested by
  //       <span class="recipe__publisher">${
  //         this._data.publisher
  //       }</span>. Please check out
  //       directions at their website.
  //     </p>
  //     <a
  //       class="btn--small recipe__btn"
  //       href="${this._data.sourceUrl}"
  //       target="_blank"
  //     >
  //       <span>Directions</span>
  //       <svg class="search__icon">
  //         <use href="${icons}#icon-arrow-right"></use>
  //       </svg>
  //     </a>
  //   </div>
  //   `;
  // }
}
