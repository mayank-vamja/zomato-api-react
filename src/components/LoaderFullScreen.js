import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const LoaderFullScreen = (props) => {
  return (
    <Dimmer.Dimmable inverted="true" dimmed={true} blurring={props.loading}>
      <Dimmer active={props.loading}>
        <Loader>Loading</Loader>
      </Dimmer>
      {props.children}
    </Dimmer.Dimmable>
  );
};

export default LoaderFullScreen;
