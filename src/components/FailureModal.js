import React from "react";
import { Modal, Button } from "semantic-ui-react";
import { useSelector } from "react-redux";

const refreshPage = () => document.location.reload(true);

const FailureModal = () => {
  const failure = useSelector((s) => s.failure);
  return (
    <div>
      <Modal open={failure ? true : false} closeOnEscape={false} closeOnDimmerClick={false}>
        <Modal.Header>An Error Occurred</Modal.Header>
        <Modal.Content>
          <p>Please click on Retry or try again after sometime.</p>
          <p>{failure && failure.message && failure.message}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => refreshPage()} negative>
            Retry
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default FailureModal;
