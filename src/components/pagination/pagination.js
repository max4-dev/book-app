import { DivComponent } from '../../common/div-component';
import './pagination.css';

export class Pagination extends DivComponent {
  #toPrev() {
    this.parentState.offset -= this.parentState.pageSize;
  }

  #toNext() {
    this.parentState.offset += this.parentState.pageSize;
  }

  constructor(parentState) {
    super();
    this.parentState = parentState;
  }

  render() {
    this.el.innerHTML = `
      <div class="pagination">
        ${
          this.parentState.offset >= this.parentState.pageSize
            ? '<button class="pagination__button prev">Предыдущая страница</button>'
            : ''
        }
        ${
          this.parentState.offset < this.parentState.numFound - this.parentState.pageSize
            ? '<button class="pagination__button next">Следующая страница</button>'
            : ''
        }
      </div>
    `;

    const prev = this.el.querySelector('.prev');
    const next = this.el.querySelector('.next');

    if (prev) {
      prev.addEventListener('click', this.#toPrev.bind(this));
    }
    if (next) {
      next.addEventListener('click', this.#toNext.bind(this));
    }

    return this.el;
  }
}
