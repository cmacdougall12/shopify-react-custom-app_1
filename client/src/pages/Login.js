import React from "react";
import api from "../api";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export default function Login() {
  const verifyUser = (email, password) => {
    console.log(email);
    console.log(password);
  };

  return (
    <Container>
      <h1>Login</h1>
      <Row>
        <Col>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              verifyUser(e.target.email.value, e.target.password.value);
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
