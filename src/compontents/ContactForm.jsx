import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
// import styles from "./ContactForm.module.scss";
import React, { useState } from 'react';
import useHttpPost from "../Hooks/useHttpPost";
import { Alert } from 'react-bootstrap';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({ status: '', message: '' });

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

  const { postData } = useHttpPost('contact');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    postData(formData)
      .then((response) => {
        // Assuming response contains success status or message
        setSubmitStatus({ status: 'success', message: 'Vaša poruka je uspešno poslata' });
        setFormData({ name: '', email: '', message: '' }); // Reset form fields
      })
      .catch((error) => {
        // Handle submission error
        setSubmitStatus({ status: 'error', message: 'Poruka nije poslata' });
        console.error('Form submission error:', error);
      });
  };

  return (
    <>
      {submitStatus.status && (
        <Alert variant={submitStatus.status === 'success' ? 'success' : 'danger'}>
          {submitStatus.message}
        </Alert>
      )}
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
    </>
  );
};

export default ContactForm;