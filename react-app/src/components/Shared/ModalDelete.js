import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';

const ModalDelete = ({ handleDeleteArticle }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="danger" onClick={handleShow} className="delete" size="sm">
        Delete
        </Button>
      <Styles>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Article</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you really want to delete it?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={handleDeleteArticle}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Styles>
    </>
  );
}

const Styles = styled.div`
    .modal{
      top: 16rem !important;
    }
  `;

export default ModalDelete;