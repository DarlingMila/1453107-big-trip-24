import { nanoid } from 'nanoid';

import { render, remove, RenderPosition } from '../framework/render.js';
import { UserAction, UpdateType, BLANK_TRIP_POINT } from '../const.js';
import TripPointEditView from '../view/trip-point-edit-view.js';


export default class NewTripPointPresenter {

  #tripPointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #tripPointEditComponent = null;

  #destinationsModel = null;
  #offersModel = null;

  constructor({ tripPointListContainer, onDataChange, onDestroy, destinationsModel, offersModel }) {
    this.#tripPointListContainer = tripPointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    if (this.#tripPointEditComponent !== null) {
      return;
    }

    this.#tripPointEditComponent = new TripPointEditView({
      tripPoint: BLANK_TRIP_POINT,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick
    });

    render(this.#tripPointEditComponent, this.#tripPointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#tripPointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#tripPointEditComponent);
    this.#tripPointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (tripPoint) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: nanoid(), ...tripPoint}
    );

    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
