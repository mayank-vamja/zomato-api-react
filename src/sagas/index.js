import { all, takeLatest } from "redux-saga/effects";
import * as SAGA from "./sagas";
import { ACTIONS } from "../constants";

export default function* appSaga() {
  yield all([
    takeLatest(ACTIONS.SEARCH_FOR_CITIES, SAGA.searchCities),
    takeLatest(ACTIONS.SEARCH_FOR_LOCATIONS, SAGA.searchLocations),
    takeLatest(ACTIONS.GET_LOCATION_DETAILS, SAGA.getLocationDetails),
    takeLatest(ACTIONS.GET_RESTAURANT, SAGA.getRestaurantDetails),
    takeLatest(ACTIONS.GET_COLLECTIONS, SAGA.getCollections),
    takeLatest(ACTIONS.GET_REVIEWS, SAGA.getReviews),
    takeLatest(ACTIONS.GET_FILTERED_RESTAURANTS, SAGA.filterRestaurants),
    takeLatest(ACTIONS.GET_ESTABLISHMENTS, SAGA.getEstablishments),
    takeLatest(ACTIONS.GET_CUISINES, SAGA.getCuisines)
  ]);
}
