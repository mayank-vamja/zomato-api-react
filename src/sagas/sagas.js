import { put } from "redux-saga/effects";
import { callApi } from "../api";
import { API_BASE_URL } from "../constants";

function* handleApi(url, response_action, failure_action) {
  try {
    const response = yield callApi("GET", url);
    response.code && response.code !== 200
      ? yield put({ type: failure_action, payload: { error: response } })
      : yield put({ type: response_action, payload: { response } });
  } catch (error) {
    yield put({ type: failure_action, payload: { error } });
  }
}

export function* searchCities({ payload }) {
  yield handleApi(API_BASE_URL + "cities?q=" + payload, "CITIES_RESPONSE", "FAILURE");
}
export function* searchLocations({ payload }) {
  yield handleApi(API_BASE_URL + "locations?count=10&query=" + payload, "LOCATIONS_RESPONSE", "FAILURE");
}
export function* getLocationDetails({ payload }) {
  yield handleApi(API_BASE_URL + "/location_details?entity_id=" + payload.entity_id + "&entity_type=" + payload.entity_type, "LOCATION_DETAILS", "FAILURE");
}
export function* getRestaurantDetails({ payload }) {
  yield handleApi(API_BASE_URL + "restaurant?res_id=" + payload, "RESTAURANT_DETAILS", "FAILURE");
}
export function* getCollections({ payload }) {
  yield handleApi(API_BASE_URL + "collections?city_id=" + payload.entity_id, "COLLECTIONS", "FAILURE");
}
export function* filterRestaurants({ payload }) {
  yield handleApi(API_BASE_URL + "search?" + payload.params, "FILTERED_RESTAURANTS", "FAILURE");
}
export function* getEstablishments({ payload }) {
  yield handleApi(API_BASE_URL + "establishments?city_id=" + payload, "ESTABLISHMENTS", "FAILURE");
}
export function* getCuisines({ payload }) {
  yield handleApi(API_BASE_URL + "cuisines?city_id=" + payload, "CUISINES", "FAILURE");
}
export function* getReviews({ payload }) {
  yield handleApi(API_BASE_URL + "reviews?res_id=" + payload, "REVIEWS", "FAILURE");
}
