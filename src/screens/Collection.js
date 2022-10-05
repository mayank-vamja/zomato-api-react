import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Image, Header, Divider, Container } from "semantic-ui-react";
import Restaurants from "../components/Restaurants";

const Collection = (props) => {
  const { entity_id } = useParams();
  const { entity_type } = useParams();
  const { id } = useParams();
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const collection = props.location.state.collection;
  const filteredRestaurants = useSelector((s) => s.filteredRestaurants);
  if (!loaded) {
    dispatch({ type: "GET_FILTERED_RESTAURANTS", payload: { params: `entity_id=${entity_id}&entity_type=${entity_type}&collection_id=${id}` } });
    setLoaded(true);
  }
  return (
    <Container>
      {collection && (
        <div style={{ padding: "10px" }}>
          <Header as="h2" color="blue">
            <Image bordered circular src={collection.image_url} size="tiny" avatar />
            <Header.Content>{collection.title}</Header.Content>
            <Header.Subheader>{collection.description}</Header.Subheader>
          </Header>
          <Divider color="blue" />
        </div>
      )}
      {filteredRestaurants && filteredRestaurants.restaurants && <Restaurants restaurants={filteredRestaurants.restaurants} />}
    </Container>
  );
};

export default Collection;
