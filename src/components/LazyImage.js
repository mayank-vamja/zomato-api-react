import React from "react";
import { Placeholder, Image } from "semantic-ui-react";
import { useState } from "react";

const LazyImage = (props) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <>
      <Placeholder floated={props.floated} style={imgLoaded ? { display: "none", width: "80px", height: "80px" } : {}}>
        <Placeholder.Image style={{ width: "80px", height: "80px" }} />
      </Placeholder>
      <Image
        floated={props.floated}
        style={imgLoaded ? { background: "#AAA", minWidth: "80px", minHeight: "80px" } : { display: "none" }}
        src={props.src}
        size={props.size}
        rounded={props.rounded}
        onLoad={() => setImgLoaded(true)}
        onError={() => setImgLoaded(true)}
      />
    </>
  );
};

export default LazyImage;
