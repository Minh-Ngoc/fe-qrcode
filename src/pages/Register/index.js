/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";
import axios from "axios";

import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import config from '../../config';

// import { toast } from './HandleMessage'
const cx = classNames.bind(styles);


export default function Register() {

  // initial state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ten, setTen] = useState("");
  const [sdt, setSdt] = useState("");
  const [diachi, setDiaChi] = useState("");

  const [register, setRegister] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    // set configurations
    const configuration = {
      method: "post",
      url: "http://localhost:4000/api/register",
      data: {
        username,
        password,
        ten,
        sdt,
        diachi,
      },
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        // redirect user to the auth page
        navigate(config.routes.login);
        
        setRegister(true);
      })
      .catch((error) => {
        error = new Error();
      });
  };

  return (
    <>  
      {/* <div id={cx('toast')}></div>  */}

      <Form onSubmit={(e) => handleSubmit(e)}>
        {/* username */}
        <Form.Group controlId="formBasicEmail" className={cx('form-group')}>
          <Form.Label>Tên đăng nhập:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

        {/* ten */}
        <Form.Group controlId="formBasicName" className={cx('form-group')}>
          <Form.Label>Họ và tên:</Form.Label>
          <Form.Control
            type="text"
            name="ten"
            value={ten}
            onChange={(e) => setTen(e.target.value)}
            placeholder="Họ và tên..."
          />
        </Form.Group>

        {/* sdt */}
        <Form.Group controlId="formBasicSDT" className={cx('form-group')}>
          <Form.Label>Số điện thoại:</Form.Label>
          <Form.Control
            type="text"
            name="sdt"
            value={sdt}
            onChange={(e) => setSdt(e.target.value)}
            placeholder="Số điện thoại..."
          />
        </Form.Group>

        {/* Dia chi */}
        <Form.Group controlId="formBasicDiaChi" className={cx('form-group')}>
          <Form.Label>Địa chỉ:</Form.Label>
          <Form.Control
            type="text"
            name="diachi"
            value={diachi}
            onChange={(e) => setDiaChi(e.target.value)}
            placeholder="Địa chỉ..."
          />
        </Form.Group>

        {/* submit button */}
        <Button
          className={cx('btn-submit-login', 'btn', 'btn--success') }
          variant="danger"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Đăng ký
        </Button>

        {/* display success message */}
        {register ? (
          <p className={cx('form-text-message')}>You Are Registered Successfully</p>
        ) : (
          <p className={cx('form-text-message')}></p>
        )}
      </Form>                                    
    </>
  );
}
