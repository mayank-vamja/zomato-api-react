import React, { useState } from "react";
import { Segment, Header, Grid, GridColumn, Accordion, Icon, Checkbox, Input, Visibility, Dimmer, Loader, Container } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Restaurants from "../components/Restaurants";
import { ACTIONS } from "../constants";

const AdvanceSearch = () => {
  const dispatch = useDispatch();
  const { entity_id, entity_type } = useParams();
  const { searching, filteredRestaurants, currentLocation, categories, cuisines, restaurants, establishments } = useSelector((s) => s);

  const [selectedCategories, changeCategories] = useState([]);
  const [init, setInit] = useState(false);
  const [selectedEstablishments, changeEstablishments] = useState([]);
  const [selectedCuisines, changeCuisines] = useState([]);
  const [currentParams, setCurrentParams] = useState();
  const [resLoading, setResLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState();

  const filterToggle = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeFilter === index ? -1 : index;
    setActiveFilter(newIndex);
  };

  if (!init) {
    dispatch({ type: ACTIONS.GET_ESTABLISHMENTS, payload: entity_id });
    dispatch({ type: ACTIONS.GET_CUISINES, payload: entity_id });
    setInit(true);
  }

  if (!currentLocation) {
    dispatch({ type: ACTIONS.GET_LOCATION_DETAILS, payload: { entity_type: entity_type, entity_id: entity_id } });
    dispatch({ type: ACTIONS.GET_COLLECTIONS, payload: { entity_id: 11 } });
  }

  const searchRestaurants = (val) => {
    if (val.trim() === "a") return;
    let params = `entity_id=${currentLocation.entity_id}&q=${val}&entity_type=${currentLocation.entity_type}`;
    if (selectedCuisines.length > 0) params = params + `&cuisines=${selectedCuisines.join(",")}`;
    if (selectedEstablishments.length > 0) params = params + `&establishment_type=${selectedEstablishments.join(",")}`;
    if (selectedCategories.length > 0) params = params + `&category=${selectedCategories.join(",")}`;
    setCurrentParams(params);
    dispatch({ type: ACTIONS.CLEAR_FILTERED_RESTAURANTS });
    dispatch({ type: ACTIONS.GET_FILTERED_RESTAURANTS, payload: { params } });
    setResLoading(true);
  };

  const selectFilter = (d, state, setState) => {
    if (state && !state.includes(d.value)) {
      setState([...state, d.value]);
    } else {
      let arr = [...state];
      arr.splice(arr.indexOf(d.value), 1);
      setState(arr);
    }
    searchRestaurants(document.getElementById("res-query").value);
  };

  const selectCategories = (e, d) => selectFilter(d, selectedCategories, changeCategories);
  const selectEstablishments = (e, d) => selectFilter(d, selectedEstablishments, changeEstablishments);
  const selectCuisines = (e, d) => selectFilter(d, selectedCuisines, changeCuisines);

  // {
  //   if (selectedCategories && !selectedCategories.includes(d.value)) {
  //     changeCategories([...selectedCategories, d.value]);
  //   } else {
  //     let arr = [...selectedCategories];
  //     arr.splice(arr.indexOf(d.value), 1);
  //     changeCategories(arr);
  //   }
  // }

  // {
  //   if (selectedEstablishments && !selectedEstablishments.includes(d.value)) {
  //     changeEstablishments([...selectedEstablishments, d.value]);
  //   } else {
  //     let arr = [...selectedEstablishments];
  //     arr.splice(arr.indexOf(d.value), 1);
  //     changeEstablishments(arr);
  //   }
  // };

  // {
  //   if (selectedCuisines && !selectedCuisines.includes(d.value)) {
  //     changeCuisines([...selectedCuisines, d.value]);
  //   } else {
  //     let arr = [...selectedCuisines];
  //     arr.splice(arr.indexOf(d.value), 1);
  //     changeCuisines(arr);
  //   }
  // };

  const onRestaurantsScrolled = (e, { calculations }) => {
    let temp = restaurants.length * 20 + 1;
    if (calculations.bottomVisible && filteredRestaurants.results_found > temp) {
      let params = currentParams + `&start=${temp}`;
      dispatch({ type: ACTIONS.GET_FILTERED_RESTAURANTS, payload: { params } });
      setResLoading(true);
    } else {
      setResLoading(false);
    }
  };

  return (
    <>
      <div className="bg-zomatofy">
        <Segment basic textAlign="center">
          <Header as="h1" style={{ color: "white" }}>
            <Header.Content>Zomatofy</Header.Content>
            <Header.Subheader style={{ color: "white" }}>Advance Search</Header.Subheader>
          </Header>
          <Container>
            <Input
              id="res-query"
              loading={searching}
              fluid
              placeholder="Search Restaurants"
              icon={<Icon name="search" inverted circular link />}
              onChange={(e) => searchRestaurants(e.target.value)}
            />
          </Container>
        </Segment>
      </div>
      <Container>
        <Grid className="vertically padded">
          <GridColumn computer={4} tablet={4} mobile={16}>
            <Accordion styled fluid>
              <Accordion.Title active>Filters</Accordion.Title>
              <Accordion.Title active={activeFilter === 0} index={0} onClick={filterToggle}>
                <Icon name="dropdown" />
                Categories
              </Accordion.Title>
              <Accordion.Content active={activeFilter === 0}>
                {categories.map((data, i) => (
                  <div key={"cat-" + i}>
                    <Checkbox checked={selectedCategories.includes(data.id)} value={data.id} label={<label>{data.name}</label>} onChange={selectCategories} />
                  </div>
                ))}
              </Accordion.Content>
              <Accordion.Title active={activeFilter === 1} index={1} onClick={filterToggle}>
                <Icon name="dropdown" />
                Establishments
              </Accordion.Title>
              <Accordion.Content active={activeFilter === 1}>
                {establishments &&
                  establishments.establishments &&
                  establishments.establishments.map(({ establishment }, i) => (
                    <div key={"est-" + i}>
                      <Checkbox
                        checked={selectedEstablishments.includes(establishment.id)}
                        value={establishment.id}
                        label={<label>{establishment.name}</label>}
                        onChange={selectEstablishments}
                      />
                    </div>
                  ))}
              </Accordion.Content>
              <Accordion.Title active={activeFilter === 2} index={2} onClick={filterToggle}>
                <Icon name="dropdown" />
                Cuisines
              </Accordion.Title>
              <Accordion.Content active={activeFilter === 2}>
                {cuisines &&
                  cuisines.cuisines &&
                  cuisines.cuisines.map(({ cuisine }, i) => (
                    <div key={"cui-" + i}>
                      <Checkbox
                        checked={selectedCuisines.includes(cuisine.cuisine_id)}
                        value={cuisine.cuisine_id}
                        label={<label>{cuisine.cuisine_name}</label>}
                        onChange={selectCuisines}
                      />
                    </div>
                  ))}
              </Accordion.Content>
            </Accordion>
          </GridColumn>
          <GridColumn computer={12} tablet={12} mobile={16}>
            {filteredRestaurants && restaurants.length > 0 && (
              <>
                <Visibility onUpdate={onRestaurantsScrolled}>
                  {restaurants.map((data, i) => (
                    <Restaurants restaurants={data.restaurants} />
                  ))}
                </Visibility>
                <Segment basic>
                  <Dimmer inverted active={resLoading}>
                    <Loader indeterminate></Loader>
                  </Dimmer>
                  <div style={{ height: "100px" }}></div>
                </Segment>
              </>
            )}
          </GridColumn>
        </Grid>
      </Container>
    </>
  );
};

export default AdvanceSearch;
