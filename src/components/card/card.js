import { DivComponent } from '../../common/div-component';
import './card.css';

export class Card extends DivComponent {
  constructor(appState, cardState) {
    super();

    this.appState = appState;
    this.cardState = cardState;
  }

  #addToFavorites() {
    this.appState.favorites.push(this.cardState);
    localStorage.setItem('favorites', JSON.stringify(this.appState.favorites));
  }

  #deleteFromFavorites() {
    this.appState.favorites = this.appState.favorites.filter(
      (card) => card.key !== this.cardState.key,
    );
    localStorage.setItem('favorites', JSON.stringify(this.appState.favorites));
  }

  render() {
    this.el.classList.add('card');
    const existInFavorites = this.appState.favorites.find((b) => b.key === this.cardState.key);
    this.el.innerHTML = `
      <div class="card__image">
        <img src="https://covers.openlibrary.org/b/olid/${
          this.cardState.cover_edition_key
        }-M.jpg" alt="Обложка" />
      </div>
      <div class="card__content">
      <div class="card__tag">
          ${this.cardState.subject_key ? this.cardState.subject_key[0] : 'Не задано'}
        </div>
        <div class="card__name">
          ${this.cardState.title}
        </div>
        <div class="card__author">
          ${this.cardState.author_name ? this.cardState.author_name[0] : 'Не задано'}
        </div>
        <div class="card__footer">
          <button class="button__add ${existInFavorites ? 'button__active' : ''}">
            ${
              existInFavorites
                ? '<img src="/static/images/favorites.svg" />'
                : '<img src="/static/images/favorite-white.svg" />'
            }
          </button>
        </div>
      <div/>
    `;

    this.el.querySelector('.button__add').addEventListener('click', (event) => {
      event.preventDefault();
      if (existInFavorites) {
        return this.#deleteFromFavorites();
      }
      this.#addToFavorites();
    });

    return this.el;
  }
}
