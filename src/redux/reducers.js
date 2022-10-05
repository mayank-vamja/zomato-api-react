import { ACTIONS } from "../constants";

const initialState = {
  loading: false,
  searching: false,
  cities: null,
  locations: null,
  restaurantDetails: null,
  filteredRestaurants: null,
  currentLocation: null,
  locationDetails: null,
  collections: null,
  cuisines: null,
  establishments: [],
  restaurants: [],
  categories: [
    { id: 1, name: "Delivery" },
    { id: 2, name: "Dine-out" },
    { id: 3, name: "Nightlife" },
    { id: 4, name: "Catching-up" },
    { id: 5, name: "Takeaway" },
    { id: 6, name: "Cafes" },
    { id: 7, name: "Daily Menus" },
    { id: 8, name: "Breakfast" },
    { id: 9, name: "Lunch" },
    { id: 10, name: "Dinner" },
    { id: 11, name: "Pubs & Bars" },
    { id: 13, name: "Pocket Friendly Delivery" },
    { id: 14, name: "Clubs & Lounges" }
  ]
};
const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTIONS.SEARCH_FOR_CITIES:
      return { ...state, searching: true };
    case ACTIONS.SEARCH_FOR_LOCATIONS:
      return { ...state, searching: true };
    case ACTIONS.CITIES_RESPONSE:
      return { ...state, cities: payload.response.location_suggestions, searching: false };
    case ACTIONS.LOCATIONS_RESPONSE:
      return { ...state, locations: payload.response.location_suggestions, searching: false };
    case ACTIONS.GET_LOCATION_DETAILS:
      return { ...state, currentLocation: payload, loading: false };
    case ACTIONS.LOCATION_DETAILS:
      return { ...state, locationDetails: payload.response, loading: false };
    case ACTIONS.GET_RESTAURANT:
      return { ...state, loading: true, restaurantDetails: null };
    case ACTIONS.RESTAURANT_DETAILS:
      return { ...state, restaurantDetails: payload.response, loading: false };
    case ACTIONS.CLEAR_RESTAURANT_DETAILS:
      return { ...state, restaurantDetails: null };
    case ACTIONS.GET_COLLECTIONS:
      return { ...state, loading: true, collections: null };
    case ACTIONS.COLLECTIONS:
      return { ...state, collections: payload.response, loading: false };
    case ACTIONS.GET_REVIEWS:
      return { ...state, loading: true, reviews: null };
    case ACTIONS.REVIEWS:
      return { ...state, reviews: payload.response, loading: false };
    case ACTIONS.CLEAR_FILTERED_RESTAURANTS:
      return { ...state, filteredRestaurants: null, restaurants: [] };
    case ACTIONS.GET_FILTERED_RESTAURANTS:
      return { ...state, searching: true };
    case ACTIONS.FILTERED_RESTAURANTS:
      let temp = state.restaurants;
      if (payload.response && payload.response.restaurants && payload.response.restaurants.length > 0) temp = [...state.restaurants, payload.response];
      return { ...state, filteredRestaurants: payload.response, searching: false, restaurants: temp };
    case ACTIONS.GET_ESTABLISHMENTS:
      return { ...state, loading: true, establishments: null };
    case ACTIONS.ESTABLISHMENTS:
      return { ...state, establishments: payload.response, loading: false };
    case ACTIONS.GET_CUISINES:
      return { ...state, loading: true, cuisines: null };
    case ACTIONS.CUISINES:
      return { ...state, cuisines: payload.response, loading: false };
    case ACTIONS.FAILURE:
      return { ...state, failure: payload.error };
    default:
      return state;
  }
};

export default rootReducer;
