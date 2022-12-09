import { useLocation } from "react-router-dom";
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

//Library react toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classNames from 'classnames/bind';
import styles from './ThuongLai.module.scss';

const cx = classNames.bind(styles);


function AddThuongLai() {

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Get userId from Auth Component 
    const location = useLocation();
    const userData = location.state.userId;
    
    // initial state
    const [ten, setTen] = useState("");
    const [gioitinh, setGioiTinh] = useState("");
    const [sdt, setSDT] = useState("");
    const [diachi, setDiaChi] = useState("");

    const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
        e.preventDefault();

        if(
            !ten ||
            !sdt ||
            !diachi   
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
                url: "http://localhost:3000/api/thuonglai/create",
                data: {
                    ten,
                    gioitinh,
                    sdt,
                    diachi,
                },
            };

            // make the API call
            axios(configuration)
            .then((result) => {
                // redirect user to the auth page
                (result.data.errCode === 201) ? setSuccessMessage(
                    toast.success("Thêm thương lái thành công !", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                ) : setErrorMessage(
                    toast.error("Thêm thương lái không thành công !", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                )
                
                setTimeout(() => {
                    setTen('');
                    setSDT('');
                    setDiaChi('');
                },100)
            })
            .catch((error) => {
                if(error){
                    return toast.error("Thêm thương lái không thành công!", {
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
                                <Form.Label>Tên thương lái:</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="ten"
                                    value={ten}
                                    onChange={(e) => setTen(e.target.value)}
                                    placeholder="Nhập tên thương lái..."
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicDiaChi" className={cx('form-group')}>
                                <Form.Label>Giới tính:</Form.Label>
                                <Form.Select  defaultValue="Chọn giới tính..." size="lg" name="gioitinh" onChange={(e) => setGioiTinh(e.target.value)}>
                                    <option disabled>Chọn giới tính...</option>
                                    <option key="0" value="Nam">Nam</option>
                                    <option key="1" value="Nữ">Nữ</option>
                                </Form.Select>
                            </Form.Group>

                            {/* Dia chi */}
                            <Form.Group controlId="formBasicDiaChi" className={cx('form-group')}>
                                <Form.Label>Số điện thoại:</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="sdt"
                                    value={sdt}
                                    onChange={(e) => setSDT(e.target.value)}
                                    placeholder="Nhập số điện thoại..."
                                />
                            </Form.Group>

                            {/* sdt */}
                            <Form.Group controlId="formBasicSDT" className={cx('form-group')}>
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

export default AddThuongLai;
