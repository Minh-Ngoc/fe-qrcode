/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";
import axios from "axios";

import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import config from '../../config';

//Library react toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { toast } from './HandleMessage'
const cx = classNames.bind(styles);


export default function Register() {

  useEffect(() => {
    document.title = "Đăng ký"
 }, []);

  const [modal, setModal] = useState(false);

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

    if(
        !username || 
        !password ||
        !ten ||
        !sdt ||
        !diachi 
      ) {
      return toast.error("Vui lòng nhập đầy đủ thông tin!", {
              position: toast.POSITION.TOP_RIGHT
      })
  }

    // set configurations
    const configuration = {
      method: "post",
      url: "http://localhost:3000/api/register",
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
      .then(async (result) => {
          setTimeout(() => { 
                setModal(toast.success("Đăng ký tài khoản thành công!", {
                  position: toast.POSITION.TOP_RIGHT,
                }))
          }, 100);

        // redirect user to the auth page
        navigate(config.routes.login);
        
        setRegister(true);
      })
      .catch((error) => {
        if(error.request.status === 505){
          return toast.error("Tài khoản đã tồn tại!", {
              position: toast.POSITION.TOP_RIGHT,
          })
        }
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
          className={cx('btn-submit-register', 'btn', 'btn--success') }
          variant="danger"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Đăng ký
        </Button>
      </Form>    

      <ToastContainer bodyClassName={cx('toastBody')} />
    </>
  );
}
