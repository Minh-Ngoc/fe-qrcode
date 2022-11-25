import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { Form, Button } from "react-bootstrap";
import axios from "axios";
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Cookies from "universal-cookie";
import config from '../../config';

//Library react toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cookies = new Cookies();
const cx = classNames.bind(styles);

export default function Login() {

    useEffect(() => {
        document.title = "Đăng nhập"
     }, []);

    const [modal, setModal] = useState(false);
    // initial state
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();

        if(!username || !password) {
            return toast.error("Vui lòng nhập đầy đủ thông tin!", {
                    position: toast.POSITION.TOP_RIGHT
            })
        }

        // set configurations
        const configuration = {
            method: "post",
            url: "http://localhost:3000/api/login",
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

                setTimeout(() => { 
                    setModal(toast.success(`Xin chào ${result.data.user.ten}`, {
                      position: toast.POSITION.TOP_RIGHT,
                    }))
                }, 100);
                
                setTimeout(() => { 
                    navigate(config.routes.auth, { state: {
                            userId: result.data.userId, 
                            user: result.data.user.ten,
                            } 
                        }
                    );
                }, 2000);
                // redirect user to the auth page

                setLogin(true);
            })
            .catch((error) => {
                // console.log(error.request.status);
                if(error.request.status === 404){
                    return toast.error("Tài khoản không tồn tại!", {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                    
                } else if(error.request.status === 400){
                    return toast.error("Mật khẩu không đúng!", {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                    
                }
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
                
            </Form>

            <ToastContainer bodyClassName={cx('toastBody')} />

        </>
    );
}