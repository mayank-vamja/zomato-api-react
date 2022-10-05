import React from "react";
import { Menu, Segment, Sticky, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const currentLocation = useSelector((s) => s.currentLocation);
  return (
    <Sticky>
      <Segment inverted={true} basic color="blue" raised>
        <Menu style={{ border: "none" }} pointing secondary inverted={true}>
          <Link to="/">
            <Menu.Item name="Zomatofy" active>
              Zomatofy
              {currentLocation && (
                <Label size="tiny" as="a" color="teal" floating>
                  {currentLocation.name || "Ahmedabad"}
                </Label>
              )}
            </Menu.Item>
          </Link>
          <Menu.Item inverted pointing secondary></Menu.Item>
        </Menu>
      </Segment>
    </Sticky>
  );
};

export default Header;
