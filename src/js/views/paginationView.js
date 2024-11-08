import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1)
      return this._generateMarkupBtn('next', currentPage);

    // Last Page
    if (currentPage === numPages && numPages > 1)
      return this._generateMarkupBtn('prev', currentPage);

    // Other Page
    if (currentPage < numPages)
      return `${this._generateMarkupBtn(
        'prev',
        currentPage
      )}${this._generateMarkupBtn('next', currentPage)}`;

    // Page 1, and there are NO other pages
    return '';
  }

  _generateMarkupBtn(btnDirection, currentPage) {
    return `
    <button data-goto="${
      (btnDirection === 'next' && currentPage + 1) ||
      (btnDirection === 'prev' && currentPage - 1)
    }" class="btn--inline pagination__btn--${btnDirection}">
      <span>Page ${
        (btnDirection === 'next' && currentPage + 1) ||
        (btnDirection === 'prev' && currentPage - 1)
      }</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-${
      (btnDirection === 'next' && 'right') ||
      (btnDirection === 'prev' && 'left')
    }"></use>
      </svg>
    </button>`;
  }
}

export default new PaginationView();
