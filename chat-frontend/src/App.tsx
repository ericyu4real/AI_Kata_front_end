import "./App.css";
import Chat from "./components/Chat";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import { Col, Container, Row } from "react-bootstrap";

function App() {
    return (
        <>
                <Container className="gradient" fluid>
                    <Row>
                        <Col></Col>
                        <Col className="p-0 vh-100 p-2" sm="10" md="8" lg="6">
                            <div className="h-100 d-flex flex-column shadow chat-container p-0 bg-light">
                                <Navigation />
                                <Chat />
                            </div>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
        </>
    );
}

export default App;
