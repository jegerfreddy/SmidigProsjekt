import React, { FC } from "react";
import { ICreateEventItem } from "../../Interfaces/ICreateEventItem";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const CreateEventItem: FC<ICreateEventItem> = ({ handleChange, eventTitle, option1, option2, option3, option4 }) => {
    return (
        <Container className="create-event-container border border-dark rounded mt-5">
            <h3 className="text-center my-3">New Event</h3>
            <Row className="justify-content-center mb-3">
                <Col xs={12} md={8}>
                    <input
                        name="eventTitle-input"
                        value={eventTitle}
                        placeholder="Event Title"
                        className="form-control mb-3"
                        onChange={(e) => { handleChange(e.target) }}
                        type="text"
                    />
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs={6} md={3} className="mb-4">
                    <Card>
                        <Card.Body className="text-center">
                            <input
                                name="option-1"
                                value={option1}
                                placeholder="Option 1"
                                className="form-control"
                                onChange={(e) => { handleChange(e.target) }}
                                type="text"
                            />
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={6} md={3} className="mb-4">
                    <Card>
                        <Card.Body className="text-center">
                            <input
                                name="option-2"
                                value={option2}
                                placeholder="Option 2"
                                className="form-control"
                                onChange={(e) => { handleChange(e.target) }}
                                type="text"
                            />
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={6} md={3} className="mb-4">
                    <Card>
                        <Card.Body className="text-center">
                            <input
                                name="option-3"
                                value={option3}
                                placeholder="Option 3"
                                className="form-control"
                                onChange={(e) => { handleChange(e.target) }}
                                type="text"
                            />
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={6} md={3} className="mb-4">
                    <Card>
                        <Card.Body className="text-center">
                            <input
                                name="option-4"
                                value={option4}
                                placeholder="Option 4"
                                className="form-control"
                                onChange={(e) => { handleChange(e.target) }}
                                type="text"
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default CreateEventItem;
