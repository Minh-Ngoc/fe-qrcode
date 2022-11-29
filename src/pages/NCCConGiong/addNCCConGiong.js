import { useLocation } from "react-router-dom";
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

//Library react toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classNames from 'classnames/bind';
import styles from './NCCConGiong.module.scss';

const cx = classNames.bind(styles);


function AddNCCConGiong() {

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Get userId from Auth Component 
    const location = useLocation();
    const userData = location.state.userId;
    
    // initial state
    const [ten, setTen] = useState("");
    const [diachi, setDiaChi] = useState("");
    const [sdt, setSdt] = useState("");

    const [ncccongiong, setNCCConGiong] = useState(false);

    const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
        e.preventDefault();

        if(
            !ten ||
            !diachi ||
            !sdt 
        ) {
            setErrorMessage(
                toast.error("Vui lòng nhập đầy đủ thông tin !", {
                    position: toast.POSITION.TOP_RIGHT
                })
            )
        } else {
            // set configurations
            const configuration = {
                method: "post",
                url: "http://localhost:3000/api/nhacungcapcongiong/create",
                data: {
                    ten,
                    diachi,
                    sdt,
                },
            };

            // make the API call
            axios(configuration)
            .then((result) => {
                // redirect user to the auth page
                (result.data.errCode === 201) ? setSuccessMessage(
                    toast.success("Thêm nhà cung cấp con giống thành công !", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                ) : setErrorMessage(
                    toast.error("Thêm nhà cung cấp con giống không thành công !", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                )
                
                setNCCConGiong(true);
                setTimeout(() => {
                    setTen('');
                    setDiaChi('');
                    setSdt('');
                },100)
            })
            .catch((error) => {
                if(error){
                    return toast.error("Thêm nhà cung cấp con giống không thành công!", {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                  }
            });
        }
    };


    return (
        <>  
            <div className={cx('CSNT-container-add') + ' mt-4'}>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    {/* username */}
                    <div className="d-flex justify-content-around">
                        <div>
                            <Form.Group controlId="formBasicEmail" className={cx('form-group')}>
                                <Form.Label>Tên nhà cung cấp con giống:</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="ten"
                                    value={ten}
                                    onChange={(e) => setTen(e.target.value)}
                                    placeholder="Nhập tên nhà cung cấp con giống..."
                                />
                            </Form.Group>

                            {/* Dia chi */}
                            <Form.Group controlId="formBasicDiaChi" className={cx('form-group')}>
                                <Form.Label>Địa chỉ:</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="diachi"
                                    value={diachi}
                                    onChange={(e) => setDiaChi(e.target.value)}
                                    placeholder="Nhập địa chỉ..."
                                />
                            </Form.Group>

                            {/* sdt */}
                            <Form.Group controlId="formBasicSDT" className={cx('form-group')}>
                                <Form.Label>Số điện thoại:</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="sdt"
                                    value={sdt}
                                    onChange={(e) => setSdt(e.target.value)}
                                    placeholder="Nhập số điện thoại..."
                                />
                            </Form.Group>
                        </div>
                    </div>

                    {/* submit button */}
                    <div className={'text-center ' + cx('btn-addCSNT')}>
                        <Button
                            className={cx('btn-submit-addCSNT', 'btn', 'btn--success') }
                            variant="danger"
                            type="submit"
                            onClick={(e) => {
                                handleSubmit(e);
                                }
                            }
                        >
                            THÊM
                        </Button>
                    </div>
                </Form>  
            </div>
        </>
    );
}

export default AddNCCConGiong;
