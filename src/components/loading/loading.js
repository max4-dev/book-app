import { DivComponent } from '../../common/div-component';
import './loading.css';

export class Loading extends DivComponent {
  constructor() {
    super();
  }

  render() {
    this.el.classList.add('loading');
    return this.el;
  }
}
