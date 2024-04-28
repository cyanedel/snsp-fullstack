import { Modal, Button } from 'react-bootstrap'

export default function CommonModal({show, msg, handleClose}){
  return(
    <Modal show={show} onHide={handleClose} backdrop="static">
    <Modal.Header><div className="text-center w-100 fw-bold fs-3">Notice</div></Modal.Header>
    <Modal.Body>{msg}</Modal.Body>
    <Modal.Footer className="d-flex justify-content-center">
      <Button variant="success" onClick={handleClose}>Done</Button>
    </Modal.Footer>
    </Modal>
  )
}