import { useContext } from "react";
import {Toast, ToastContainer} from "react-bootstrap";
import { AuthContext } from "../contexts/authContext";


export default function Notification() {
    
    const {notification, setNotification} = useContext(AuthContext)

    return (
        <ToastContainer position="top-end" className="mt-3 position-fixed">
            <Toast show={notification.show}
                   delay={notification.delay}  
                   autohide
                   
                   bg={notification.type}
                   style={{
                       ...((notification.type === "success" || notification.type === "danger") && { color: "white" })
                   }}
                   onClose={() => setNotification({...notification, show:false})}>
                <Toast.Header>
                    <strong className="me-auto">{notification.title}</strong>
                    <small>1 seg atrás</small>
                </Toast.Header>
                <Toast.Body>{notification.text}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}