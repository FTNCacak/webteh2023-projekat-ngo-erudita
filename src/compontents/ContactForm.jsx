import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import styles from "./ContactForm.module.scss";
import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name.trim()) formErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email is not valid';
    }
    if (!formData.message.trim()) formErrors.message = 'Message is required';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Form submitted successfully!');
        setFormData({ name: '', email: '', message: '' }); // Reset form fields
      } else {
        alert('Failed to submit the form.');
      }
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="name">
          <Form.Label>Ime i prezime</Form.Label>
          <Form.Control type="text" placeholder="Vaše ime i prezime" value={formData.name} onChange={handleChange} isInvalid={!!errors.name} />
          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Vaš email" value={formData.email} onChange={handleChange} isInvalid={!!errors.email} />
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="message">
        <Form.Label>Poruka</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Unesite Vašu poruku..." value={formData.message} onChange={handleChange} isInvalid={!!errors.message} />
        <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default ContactForm;
