import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Cookies from "universal-cookie";
import config from '../../config';

const cookies = new Cookies();
const cx = classNames.bind(styles);

export default function Login() {
    // initial state
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();

        // set configurations
        const configuration = {
        method: "post",
        url: "http://localhost:4000/api/login",
        data: {
            username,
            password,
        },
        };

        // make the API call
        axios(configuration)
            .then((result) => {
            // set the cookie
                cookies.set("TOKEN", result.data.token, {
                    path: "/",
                });
                // redirect user to the auth page
                navigate(config.routes.auth);

                setLogin(true);
                })
            .catch((error) => {
                error = new Error();
            });
    };

    return (
        <>
            <Form onSubmit={(e) => handleSubmit(e)}>
                {/* username */}
                <Form.Group controlId="formBasicEmail" className={cx('form-group')}>
                    <Form.Label>Tên đăng nhập:</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                        placeholder="Enter username"
                    />
                </Form.Group>

                {/* password */}
                <Form.Group controlId="formBasicPassword" className={cx('form-group')}>
                    <Form.Label>Mật khẩu:</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </Form.Group>
                {/* submit button */}
                <Button
                    className={cx('btn-submit-login')}
                    variant="danger"
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                >
                    Đăng nhập
                </Button>
                
                {/* display success message */}
                {login ? (
                <p className={cx('form-text-message')}>You Are Logged in Successfully!</p>
                ) : (
                <p className={cx('form-text-message')}>You Are Not Logged in!</p>
                )}
            </Form>
        </>
    );
}