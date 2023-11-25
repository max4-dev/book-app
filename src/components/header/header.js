import { DivComponent } from '../../common/div-component';
import './header.css';

export class Header extends DivComponent {
  constructor(appState) {
    super();
    this.appState = appState;
  }

  render() {
    this.el.classList.add('header');
    this.el.innerHTML = `
      <div>
        <img src="/static/images/logo.svg" alt="Логотип" />
      </div>
      <div class="menu">
        <a class="menu__item menu__search ${
          location.hash === '' ? 'menu__item--active' : ''
        }" href="">
          <img src="/static/images/search.svg" alt="Поиск" />
          Поиск книг
        </a>
        <a class="menu__item ${
          location.hash === '#favorites' ? 'menu__item--active' : ''
        }" href="#favorites">
          <img src="/static/images/favorites.svg" alt="Избранное" />
          Избранное
          <div class="menu__counter">
            ${this.appState.favorites.length}
          </div>
        </a>
      </div>
    `;

    return this.el;
  }
}
