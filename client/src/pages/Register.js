import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useAuthentication } from "../context/LoginProvider";

export default function Register() {
  const { createUser } = useAuthentication();

  return (
    <Container>
      <h1>Create Account</h1>
      <Row>
        <Col>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              createUser(
                e.target[0].value,
                e.target[1].value,
                e.target[2].value,
                e.target[3].value,
                e.target[4].value
              );
            }}
          >
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="firstName" placeholder="first name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="lastName" placeholder="last name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Create Account
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
