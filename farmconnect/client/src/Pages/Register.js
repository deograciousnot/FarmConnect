import React, { useState } from 'react';
import { Form, Button, Col, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { registerUser } from '../services/userData';
import SimpleSider from '../components/Siders/SimpleSider';
import '../components/Register/Register.css';

function Register({ history }) {
    const [loading, setLoading] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState({
        name: '',
        gender: 'not specified',
        phoneNumber: '',
        email: '',
        password: '',
        repeatPassword: ''
    });

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }

    const handleSubmitReg = (e) => {
        e.preventDefault();
        if (userData.password !== userData.repeatPassword) {
            setError('Passwords do not match');
            setAlertShow(true);
            return;
        }
        setLoading(true);
        registerUser(userData)
            .then(res => {
                if (!res.error) {
                    history.push('/auth/login')
                } else {
                    setError(res.error);
                    setAlertShow(true);
                }
            }).catch(err => {
                console.error('error from register: ', err);
                setError('An unexpected error occurred');
                setAlertShow(true);
            }).finally(() => {
                setLoading(false);
            });
    }

    return (
        <>
            <SimpleSider />
            <div className="container auth-form">
                <h1 className="auth-heading">Sign Up</h1>
                <Form className="col-lg-8" onSubmit={handleSubmitReg}>
                    {alertShow &&
                        <Alert variant="danger" onClose={() => setAlertShow(false)} dismissible>
                            <p>{error}</p>
                        </Alert>
                    }
                    <Form.Row>
                        <Form.Group controlId="forName" className="col-lg-8">
                            <Form.Label>Name *</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Enter your name" onChange={handleChanges} value={userData.name} required />
                            <Form.Text muted>
                                The name can be your real one or a username.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridGender" className="col-lg-4">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control as="select" name="gender" onChange={handleChanges} value={userData.gender}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="not specified">Not Specified</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group className="col-lg-12">
                            <Form.Label>Phone Number *</Form.Label>
                            <Form.Control type="text" name="phoneNumber" placeholder="Enter your phone number" onChange={handleChanges} value={userData.phoneNumber} required />
                            <Form.Text muted>
                                Phone Number should be a valid BG number.
                            </Form.Text>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="formBasicEmail" className="col-lg-12">
                            <Form.Label>Email address *</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter your email" onChange={handleChanges} value={userData.email} required />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="formBasicPassword" className="col-lg-6">
                            <Form.Label>Password *</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Enter your password" onChange={handleChanges} value={userData.password} required />
                            <Form.Text muted>
                                Your password must be 8-20 characters long
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="col-lg-6">
                            <Form.Label>Repeat Password *</Form.Label>
                            <Form.Control type="password" name="repeatPassword" placeholder="Repeat your password" onChange={handleChanges} value={userData.repeatPassword} required />
                        </Form.Group>
                    </Form.Row>
                    {loading ?
                        <Button className="col-lg-12 btnAuth" variant="dark" disabled >
                            Please wait... <Spinner animation="border" />
                        </Button>
                        :
                        <Button variant="dark" className="col-lg-12 btnAuth" type="submit">Sign Up</Button>
                    }
                    <p className="bottom-msg-paragraph">Already have an account? <Link to="/auth/login">Sign In</Link>!</p>
                </Form>
            </div>
        </>
    )
}

export default Register;
