import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

const NoTripPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no future events now',
};


function createNoTripEventsTemplate(filterType) {
  const noTripPointTextValue = NoTripPointsTextType[filterType];

  return (`
    <p class="trip-events__msg">${noTripPointTextValue}</p>
  `);
}


export default class NoTripPointsView extends AbstractView {

  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoTripEventsTemplate(this.#filterType);
  }
}
