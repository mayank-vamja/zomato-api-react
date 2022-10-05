import React from "react";
import { Grid, GridColumn, Header, Segment, Divider, Container, GridRow, Button } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import Restaurants from "../../components/Restaurants";
import Collections from "../../components/Collections";
import { useHistory, Link } from "react-router-dom";
import SearchDropDown from "../../components/SearchDropDown";
import { ACTIONS } from "../../constants";
import { getCitiesOptions, getLocationOptions, getRestaurantOptions, initLocation } from "./utils";

const Homepage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { searching, cities, locations, filteredRestaurants, locationDetails, collections, currentLocation } = useSelector((s) => s);
  if (!currentLocation) initLocation(dispatch);
  const cityOptions = getCitiesOptions(cities);
  const locationOptions = getLocationOptions(locations);
  const restaurantOptions = getRestaurantOptions(filteredRestaurants);

  const onCityChange = (e, jsonData) => {
    let data = JSON.parse(jsonData.value);
    dispatch({ type: ACTIONS.SEARCH_FOR_LOCATIONS, payload: data.name });
    dispatch({ type: ACTIONS.GET_LOCATION_DETAILS, payload: { name: data.name, entity_type: "city", entity_id: data.id } });
    dispatch({ type: ACTIONS.GET_COLLECTIONS, payload: { entity_id: data.id } });
  };

  const onLocationSelect = (e, jsonData) => {
    let data = JSON.parse(jsonData.value);
    dispatch({ type: ACTIONS.SEARCH_FOR_CITIES, payload: data.cityName });
    dispatch({ type: ACTIONS.GET_LOCATION_DETAILS, payload: { name: data.cityName, entity_type: data.entity_type, entity_id: data.entity_id } });
    dispatch({ type: ACTIONS.GET_COLLECTIONS, payload: { entity_id: data.entity_id } });
  };

  const onRestaurantSelect = (e, jsonData) => {
    let data = JSON.parse(jsonData.value);
    history.push("/" + currentLocation.entity_id + "/restaurant/" + data.id);
  };

  const onRestaurantSearch = (e) => {
    if (e.target.value.trim() === "a") return;
    dispatch({
      type: ACTIONS.GET_FILTERED_RESTAURANTS,
      payload: { params: `entity_id=${currentLocation.entity_id}&entity_type=${currentLocation.entity_type}&q=${e.target.value}` }
    });
  };

  const headerSegment = (
    <Segment basic textAlign="center">
      <Header as="h1" style={{ color: "white" }}>
        <Header.Content>Zomatofy</Header.Content>
        <Header.Subheader style={{ color: "white" }}>Search from zomato</Header.Subheader>
      </Header>
      <Grid textAlign="center">
        <GridColumn mobile={16} tablet={6} computer={5}>
          <SearchDropDown
            icon="search"
            loading={searching}
            id="select-city"
            placeholder="select City"
            defaultValue={JSON.stringify({ id: 11, name: "Ahmedabad" })}
            options={cityOptions}
            onChange={onCityChange}
            onSearchChange={(e) => dispatch({ type: "SEARCH_FOR_CITIES", payload: e.target.value })}
          />
        </GridColumn>
        <GridColumn mobile={16} tablet={10} computer={11}>
          <SearchDropDown
            id="search-locarion"
            placeholder="Select Delivery Location"
            options={locationOptions}
            onChange={onLocationSelect}
            onSearchChange={(e) => dispatch({ type: "SEARCH_FOR_LOCATIONS", payload: e.target.value })}
            wrapSelection={true}
          />
        </GridColumn>
        <GridColumn mobile={16} tablet={10} computer={10}>
          <SearchDropDown
            id="search-restaurants"
            placeholder="Search Restaurants"
            icon="search"
            loading={searching}
            options={restaurantOptions}
            selectOnBlur={false}
            onChange={onRestaurantSelect}
            onSearchChange={onRestaurantSearch}
          />
        </GridColumn>
        <GridRow>
          {currentLocation && (
            <Link to={"/" + currentLocation.entity_id + "/" + currentLocation.entity_type + "/advancesearch"}>
              <Button color="yellow" animated="fade">
                <Button.Content visible>Advance Search</Button.Content>
                <Button.Content hidden>Click to go</Button.Content>
              </Button>
            </Link>
          )}
        </GridRow>
      </Grid>
    </Segment>
  );

  return (
    <>
      <div className="bg-zomatofy">{headerSegment}</div>
      <Collections collections={collections} currentLocation={currentLocation} />
      <Container textAlign="center">
        {locationDetails && (
          <>
            <Header as="h2">
              <Divider />
              Best Rated restaurants
              <Divider />
            </Header>
            <Restaurants restaurants={locationDetails.best_rated_restaurant} />
          </>
        )}
      </Container>
    </>
  );
};

export default Homepage;
