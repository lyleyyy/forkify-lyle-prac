import View from './View.js';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)';

  _overlay = document.querySelector('.overlay');
  _window = document.querySelector('.add-recipe-window');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerToggleWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerToggleWindow() {
    // this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    // this._btnOpen.addEventListener('click', () => {
    //   this._window.classList.toggle('hidden');
    //   this._overlay.classList.toggle('hidden');
    // });

    [this._btnOpen, this._btnClose].forEach(btn =>
      btn.addEventListener('click', () => {
        this.toggleWindow();
      })
    );
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();
      const dataArr = [...new FormData(this._parentElement)];
      const data = Object.fromEntries(dataArr);
      //   console.log(data);
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
