import React from "react";
import "./Sidebar.module.scss";
import { Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";

interface Props {
  type: string;
  show: boolean;
  countryID?: string;
  onHide: () => void;
  text: string;
  addFunc: any;
}
const AddModal: React.FC<Props> = ({
  type,
  show,
  countryID,
  onHide,
  addFunc,
  text,
}) => {
  const [name, setName] = useState("");
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{text}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          size="lg"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            if (type === "state") {
              addFunc(name);
            } else {
              addFunc(countryID, name);
            }
          }}
        >
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddModal;
