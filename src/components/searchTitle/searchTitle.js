import { DivComponent } from '../../common/div-component';

export class SearchTitle extends DivComponent {
  constructor(numFound) {
    super();
    this.numFound = numFound;
  }

  render() {
    this.el.innerHTML = `
      <h2>Найдено книг: ${this.numFound}</h2>
    `;

    return this.el;
  }
}
