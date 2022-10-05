import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Rating, Image, Container, Feed, Icon, Label, Segment, Grid, GridColumn } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import LazyImage from "../components/LazyImage";
import { ACTIONS } from "../constants";

const Restaurant = (props) => {
  const { id } = useParams();
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const res = useSelector((s) => s.restaurantDetails);
  const reviews = useSelector((s) => s.reviews);
  if (!loaded) {
    dispatch({ type: ACTIONS.CLEAR_RESTAURANT_DETAILS });
    dispatch({ type: ACTIONS.GET_RESTAURANT, payload: id });
    dispatch({ type: ACTIONS.GET_REVIEWS, payload: id });
    setLoaded(true);
  }
  return (
    <Segment basic>
      {res && (
        <Container>
          <Card fluid>
            <Card.Content>
              <Image floated="left" size="tiny" src={res.thumb} />
              <Card.Header>{res.name}</Card.Header>
              <a href={"https://www.google.com/maps?q=" + res.location.latitude + "," + res.location.longitude} target="blank">
                <Card.Meta>{res.location.locality}</Card.Meta>
                <Card.Meta>
                  <Icon name="map marker alternate" />
                  {res.location.address}
                </Card.Meta>
              </a>
              <Card.Meta>{"Timings : " + res.timings}</Card.Meta>

              <Card.Description>
                {res.user_rating.aggregate_rating + " "}
                <Rating maxRating={5} defaultRating={res.user_rating.aggregate_rating} disabled />
                <p>{"AVG COST FOR TWO : " + res.average_cost_for_two}</p>
                <Label color="blue">
                  <Label.Detail>{res.cuisines}</Label.Detail>
                </Label>
              </Card.Description>
            </Card.Content>
          </Card>
          <div>
            <Segment>
              <Label as="a" color="blue" ribbon>
                Highlights
              </Label>
              {res.highlights.map((data, i) => (
                <Label key={"h-" + i} size="mini" color={i % 2 ? "teal" : "yellow"}>
                  {data}
                </Label>
              ))}
            </Segment>
          </div>

          <Grid padded>
            <GridColumn computer={8} tablet={8} mobile={16}>
              <Segment>
                <Label as="a" color="red" ribbon>
                  Photos
                </Label>

                <Feed>
                  {res.photos &&
                    res.photos.map((data, i) => (
                      <Feed.Event key={i}>
                        <Feed.Label>
                          <Image src={data.photo.user.profile_image} size="mini" />
                        </Feed.Label>
                        <Feed.Content>
                          <Feed.Summary>
                            <Feed.User>{data.photo.user.name}</Feed.User>
                            <Feed.Date>{data.photo.friendly_time}</Feed.Date>
                          </Feed.Summary>
                          <Feed.Extra>
                            <LazyImage src={data.photo.url} size="medium" rounded />
                          </Feed.Extra>
                          <Feed.Meta>{data.photo.caption}</Feed.Meta>
                          <Feed.Meta>
                            <Icon name="like" />
                            {data.photo.likes_count || 0 + " Likes"}
                          </Feed.Meta>
                        </Feed.Content>
                      </Feed.Event>
                    ))}
                </Feed>
              </Segment>
            </GridColumn>
            <GridColumn computer={8} tablet={8} mobile={16}>
              <Segment>
                <Label as="a" color="green" ribbon>
                  Reviews
                </Label>
                <Feed>
                  {reviews &&
                    reviews.user_reviews.map((data, i) => (
                      <Feed.Event key={"review-" + i}>
                        <Feed.Label>
                          <Image src={data.review.user.profile_image} size="mini" />
                        </Feed.Label>
                        <Feed.Content>
                          <Feed.Summary>
                            <Feed.User>{data.review.user.name}</Feed.User>
                            <Feed.Date>{data.review.review_time_friendly}</Feed.Date>
                          </Feed.Summary>
                          <Feed.Extra>
                            <Feed.Meta>
                              <span>{data.review.rating_text}</span>
                              <Rating icon="star" disabled maxRating={5} defaultRating={data.review.rating} />
                            </Feed.Meta>
                            <p>{data.review.review_text}</p>
                          </Feed.Extra>
                          <Feed.Meta>
                            <Icon name="like" />
                            {data.review.likes || 0 + " Likes"}
                          </Feed.Meta>
                        </Feed.Content>
                      </Feed.Event>
                    ))}
                </Feed>
              </Segment>
            </GridColumn>
          </Grid>
        </Container>
      )}
    </Segment>
  );
};

export default Restaurant;
