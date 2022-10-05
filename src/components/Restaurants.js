import React from "react";
import { Card, Grid, GridColumn, Rating } from "semantic-ui-react";
import { Link } from "react-router-dom";
import LazyImage from "./LazyImage";

const Restaurants = ({ restaurants }) => {
  return (
    <div>
      <Grid centered columns={2} stackable>
        {restaurants &&
          restaurants.length > 0 &&
          restaurants.map((data) => {
            const res = data.restaurant;
            if (!res) return null;
            return (
              <GridColumn key={"res-" + res.id}>
                <Link to={"/" + res.location.city_id + "/restaurant/" + res.id}>
                  <Card raised fluid style={{ height: "100%" }}>
                    <Card.Content>
                      <LazyImage floated="left" src={res.thumb} size="tiny" rounded />
                      {/* <Image floated="left" size="tiny" src={res.thumb} rounded /> */}
                      <Card.Header>{res.name}</Card.Header>
                      <Card.Meta>{res.location.locality}</Card.Meta>
                      <Card.Meta>{res.timings}</Card.Meta>
                      <Card.Description></Card.Description>
                      <Rating color="yellow" maxRating={5} defaultRating={res.user_rating.aggregate_rating} disabled />
                    </Card.Content>
                  </Card>
                </Link>
              </GridColumn>
            );
          })}
      </Grid>
    </div>
  );
};

export default Restaurants;
