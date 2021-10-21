import React from "react";
import api from "../api";
import { useAuthentication } from "../context/LoginProvider";

import { Form, Button, Container, Row, Col } from "react-bootstrap";

export default function Login() {
  const {authenticateUser} = useAuthentication();

  return (
    <Container>
      <h1>Login</h1>
      <Row>
        <Col>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              authenticateUser(e.target[0].value, e.target[1].value);
            }}
          >
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
