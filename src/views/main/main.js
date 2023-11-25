import { AbstractView } from '../../common/view';
import onChange from 'on-change';
import { Header } from '../../components/header/header';
import { Search } from '../../components/search/search';
import { CardList } from '../../components/cardList/cardList';
import { Loading } from '../../components/loading/loading';
import { SearchTitle } from '../../components/searchTitle/searchTitle';
import { Pagination } from '../../components/pagination/pagination';

export class MainView extends AbstractView {
  state = {
    list: [],
    numFound: 0,
    loading: false,
    searchQuery: null,
    offset: 0,
    pageSize: 100,
  };

  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.state = onChange(this.state, this.stateHook.bind(this));
    this.setTitle('Поиск книг');
  }

  destroy() {
    onChange.unsubscribe(this.appState);
    onChange.unsubscribe(this.state);
  }

  async loadList(q, offset) {
    const res = await fetch(`https://openlibrary.org/search.json?q=${q}&offset=${offset}`);
    return res.json();
  }

  appStateHook(path) {
    if (path === 'favorites') {
      this.render();
    }
  }

  async getBooks() {
    this.state.loading = true;
    const data = await this.loadList(this.state.searchQuery, this.state.offset);
    this.state.list = data.docs;
    this.state.numFound = data.numFound;
    this.state.loading = false;
    return data;
  }

  async stateHook(path) {
    if (path === 'searchQuery') {
      await this.getBooks();
      this.state.offset = 0;
    }
    if (path === 'loading' || path === 'list') {
      this.render();
    }
    if (path === 'offset') {
      await this.getBooks();
    }
  }

  render() {
    this.app.innerHTML = '';

    const main = document.createElement('div');

    main.append(new Search(this.state).render());
    main.append(new SearchTitle(this.state.numFound).render());

    if (this.state.loading === true) {
      main.append(new Loading().render());
    } else {
      main.append(new CardList(this.appState, this.state).render());
      main.append(new Pagination(this.state).render());
    }

    this.app.append(main);

    this.renderHeader();
  }

  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }
}
