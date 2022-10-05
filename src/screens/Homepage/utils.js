import React from "react";
import { Header } from "semantic-ui-react";
import { ACTIONS, API_BASE_URL } from "../../constants";
import { callApi } from "../../api";

const defaultCitiesOption = [{ key: 11, value: JSON.stringify({ id: 11, name: "Ahmedabad" }), text: "Ahmedabad" }];

export const getCitiesOptions = (cities) =>
  cities
    ? cities.map((data) => {
        return {
          key: data.id,
          value: JSON.stringify({ id: data.id, name: data.name }),
          text: data.name,
          image: { avatar: false, src: data.country_flag_url }
        };
      })
    : defaultCitiesOption;

export const getLocationOptions = (locations) =>
  locations &&
  locations.map((data) => {
    return {
      key: data.entity_id,
      value: JSON.stringify({
        entity_id: data.entity_id,
        entity_type: data.entity_type,
        name: data.title,
        cityName: data.city_name
      }),
      text: data.title,
      content: <Header as="h4" icon="map marker" content={data.title} subheader={data.country_name} />
    };
  });

export const getRestaurantOptions = (filteredRestaurants) =>
  filteredRestaurants &&
  filteredRestaurants.restaurants &&
  filteredRestaurants.restaurants.map((data) => {
    return {
      key: data.restaurant.id,
      value: JSON.stringify(data.restaurant),
      text: `${data.restaurant.name}, ${data.restaurant.location.locality_verbose}`,
      content: <Header icon="map marker alternate" content={data.restaurant.name} subheader={data.restaurant.location.locality_verbose} />
    };
  });

export const getPosition = (options) => new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, options));

export const initLocation = (dispatch) => {
  getPosition()
    .then((position) => {
      callApi("GET", API_BASE_URL + "cities?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude).then((data) => {
        if (data.code && data.code !== 200) dispatch({ type: ACTIONS.FAILURE, payload: { error: data } });
        else dispatch({ type: ACTIONS.CITIES_RESPONSE, payload: { response: data } });
      });
      console.log(position);
    })
    .catch((err) => {
      // console.error(err.message);
    });

  dispatch({ type: ACTIONS.SEARCH_FOR_LOCATIONS, payload: "Ahmedabad" });
  dispatch({ type: ACTIONS.GET_LOCATION_DETAILS, payload: { entity_type: "city", entity_id: 11 } });
  dispatch({ type: ACTIONS.GET_COLLECTIONS, payload: { entity_id: 11 } });
};
