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
    const [loaithucan, setLoaiThucAn] = useState("");
    const [ncc, setNCC] = useState("");
    const [ghichu, setGhiChu] = useState("");

    const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
        e.preventDefault();

        if(
            !ten ||
            !loaithucan ||
            !ncc   
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
                url: "http://localhost:3000/api/thucan/create",
                data: {
                    ten,
                    loaithucan,
                    ncc,
                    ghichu
                },
            };

            // make the API call
            axios(configuration)
            .then((result) => {
                // redirect user to the auth page
                (result.data.errCode === 201) ? setSuccessMessage(
                    toast.success("Thêm thức ăn thành công !", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                ) : setErrorMessage(
                    toast.error("Thêm thức ăn không thành công !", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                )
                
                setTimeout(() => {
                    setTen('');
                    setLoaiThucAn('');
                    setNCC('');
                    setGhiChu('');
                },100)
            })
            .catch((error) => {
                if(error){
                    return toast.error("Thêm thức ăn không thành công!", {
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
                                <Form.Label>Tên thức ăn:</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="ten"
                                    value={ten}
                                    onChange={(e) => setTen(e.target.value)}
                                    placeholder="Nhập tên thức ăn..."
                                />
                            </Form.Group>

                            {/* Dia chi */}
                            <Form.Group controlId="formBasicDiaChi" className={cx('form-group')}>
                                <Form.Label>Loại thức ăn:</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="loaithucan"
                                    value={loaithucan}
                                    onChange={(e) => setLoaiThucAn(e.target.value)}
                                    placeholder="Nhập loại thức ăn..."
                                />
                            </Form.Group>

                            {/* sdt */}
                            <Form.Group controlId="formBasicSDT" className={cx('form-group')}>
                                <Form.Label>Nhà cung cấp thức ăn:</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="ncc"
                                    value={ncc}
                                    onChange={(e) => setNCC(e.target.value)}
                                    placeholder="Nhập nhà cung cấp thức ăn..."
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicSDT" className={cx('form-group')}>
                                <Form.Label>Ghi chú:</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="ghichu"
                                    value={ghichu}
                                    onChange={(e) => setGhiChu(e.target.value)}
                                    placeholder="Ghi chú (không bắt buộc)..."
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
