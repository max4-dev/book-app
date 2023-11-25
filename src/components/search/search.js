import { DivComponent } from '../../common/div-component';
import './search.css';

export class Search extends DivComponent {
  constructor(state) {
    super();
    this.state = state;
  }

  search() {
    const value = this.el.querySelector('input').value;
    this.state.searchQuery = value;
  }

  render() {
    this.el.classList.add('search');
    this.el.innerHTML = `
      <div class="search__wrapper">
        <input class="search__input" type="text" placeholder="Найти книгу или автора..." value="${
          this.state.searchQuery ? this.state.searchQuery : ''
        }" />
        <img src="/static/images/search.svg" />
      </div>
      <button aria-label="Искать">
        <img src="/static/images/search-white.svg" alt="Тконка поиска" />
      </button>
    `;

    this.el.querySelector('button').addEventListener('click', this.search.bind(this));
    this.el.querySelector('input').addEventListener('keydown', (event) => {
      if (event.code === 'Enter') {
        this.search();
      }
    });

    return this.el;
  }
}
