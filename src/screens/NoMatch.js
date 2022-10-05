import React from "react";
import { Icon, Segment, Header, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <>
      <Segment inverted basic style={{ height: "100vh", width: "100%", margin: "0", position: "fixed", top: "0" }}>
        <Header as="h1" icon textAlign="center">
          <Icon name="exclamation triangle" circular />
          <Header.Content>404: Page You are looking is not found</Header.Content>
          <Link to="/">
            <Button>Go to Home</Button>
          </Link>
        </Header>
      </Segment>
    </>
  );
};

export default NoMatch;
