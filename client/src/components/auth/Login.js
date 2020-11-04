import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import { Container, Form, Button } from 'react-bootstrap';

const Login = props => {

    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const { setAlert } = alertContext;
    const { login, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }

        if (error === 'Invalid Credentials') {
            setAlert(error, 'danger');
            clearErrors();
        }
        //eslint-disable-next-line
    }, [error, isAuthenticated, props.history])


    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault();
        if (email === '' || password === '') {
            setAlert('Please fill in all fields', 'danger');
        } else {
            login({
                email,
                password
            })
        }
    }

    return (
        <Container>
            <h1>Account <span className="text-primary">Login</span></h1>
            <Form onSubmit={onSubmit}>

                <Form.Group>
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control type="email" name="email" value={email} onChange={onChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control type="password" name="password" value={password} onChange={onChange} />
                </Form.Group>

                <Button variant="primary" type="submit" value="Login" block>Login</Button>
            </Form>
        </Container>
    )
}

export default Login;