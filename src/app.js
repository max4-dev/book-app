import { Favorites } from './views/favorites/favorites';
import { MainView } from './views/main/main';

class App {
  routes = [
    { path: '', view: MainView },
    { path: '#favorites', view: Favorites },
  ];

  appState = {
    favorites: [],
  };

  constructor() {
    window.addEventListener('hashchange', this.route.bind(this));
    this.getFavorites();
    this.route();
  }

  getFavorites() {
    this.appState.favorites = JSON.parse(localStorage.getItem('favorites'));
  }

  route() {
    if (this.currentView) {
      this.currentView.destroy();
    }

    const view = this.routes.find((route) => route.path === location.hash).view;
    this.currentView = new view(this.appState);
    this.currentView.render();
  }
}

new App();
