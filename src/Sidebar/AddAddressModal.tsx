import  "./Sidebar.scss"
// @ts-ignore
import data from "./data.tsx"
import {Button, Form, Modal} from "react-bootstrap";
import {useState} from "react";

const AddAddressModal = ({show, country, onHide,setMenu}) => {

    const [address, setAddress] = useState("")
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Введите адрес
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control size="lg" type="text" placeholder="адрес" value={address} onChange={(e) => setAddress(e.target.value)}/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => {
                    console.log(country)
                    onHide()
                    setMenu((state) =>{ return state.map(i => i.name !== country ? i : {name:i.name, addresses:[...i.addresses,address]})
                    })
                    setAddress("")}
                }
                >Добавить адрес</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddAddressModal
