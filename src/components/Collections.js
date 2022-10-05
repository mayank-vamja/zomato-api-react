import React from "react";
import { Container, Card, Grid, GridColumn, Header, Divider, Reveal, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Collections = ({ collections, currentLocation }) => {
  return (
    <div>
      <Container textAlign="center">
        {collections && collections.collections && (
          <Header as="h2">
            <Divider />
            Collections
            <Header.Subheader>Explore curated lists of top restaurants, cafes, pubs, and bars in - {currentLocation.name}, based on trends</Header.Subheader>
            <Divider />
          </Header>
        )}
        <Grid columns={3} stackable>
          {collections &&
            collections.collections &&
            collections.collections.map((data, i) => {
              const collection = data.collection;
              return (
                <GridColumn key={"col-" + i}>
                  <Reveal animated="move up">
                    <Reveal.Content visible style={{ width: "100%" }}>
                      <div style={{ width: "100%", padding: "4px" }}>
                        <Card
                          raised
                          fluid
                          style={{
                            background: "linear-gradient(rgba(4,125,197,.3), rgba(0,212,255,.3)), url('" + collection.image_url + "')",
                            backgroundSize: "cover",
                            height: "140px",
                            overflow: "hidden"
                          }}
                        >
                          <Card.Content className="white text">
                            <Card.Header>{collection.title}</Card.Header>
                            <Card.Meta>{"Restaurants : " + collection.res_count}</Card.Meta>
                            <Card.Description>{collection.description}</Card.Description>
                          </Card.Content>
                        </Card>
                      </div>
                    </Reveal.Content>
                    <Reveal.Content hidden>
                      <Link
                        to={{
                          pathname: "/" + currentLocation.entity_id + "/" + currentLocation.entity_type + "/collection/" + collection.collection_id,
                          state: { collection }
                        }}
                      >
                        <div style={{ width: "100%", padding: "4px" }}>
                          <Card raised fluid style={{ height: "140px", overflow: "hidden" }}>
                            <Card.Content className="white text">
                              <Card.Header>{collection.title}</Card.Header>
                              <Card.Meta>{"Restaurants : " + collection.res_count}</Card.Meta>
                              <Card.Description>
                                <Button primary>Go</Button>
                              </Card.Description>
                            </Card.Content>
                          </Card>
                        </div>
                      </Link>
                    </Reveal.Content>
                  </Reveal>
                  {/* </Card> */}
                </GridColumn>
              );
            })}
        </Grid>
      </Container>
    </div>
  );
};

export default Collections;
