import {Toast, ToastContainer} from "react-bootstrap";

export default function Notification({show, setShow, type, title, text, delay}) {
    
    return (
        <ToastContainer position="top-end" className="mt-3 position-fixed">
            <Toast show={show}
                   delay={delay}  
                   autohide
                   
                   bg={type}
                   style={{
                       ...((type === "success" || type === "danger") && { color: "white" })
                   }}
                   onClose={() => setShow(false)}>
                <Toast.Header>
                    <strong className="me-auto">{title}</strong>
                    <small>1 seg atrás</small>
                </Toast.Header>
                <Toast.Body>{text}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}