import { useLocation } from "react-router-dom";
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";
import axios from "axios";

//Library react toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classNames from 'classnames/bind';
import styles from './ThuongLai.module.scss';

const cx = classNames.bind(styles);


function EditThuongLai(props) {
    // console.log(props.dataSend)

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Get userId from Auth Component 
    const location = useLocation();
    const userData = location.state.userId;
    
    // initial state
    const [ten, setTen] = useState('');
    const [diachi, setDiaChi] = useState('');
    const [sdt, setSdt] = useState('');


    const [ncccongiong, setNCCConGiong] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setTen(props.dataSend.ten)
        setDiaChi(props.dataSend.diachi)
        setSdt(props.dataSend.sdt)

    },[props.dataSend])

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
        } 
        else if (
            ten === props.dataSend.ten &&
            diachi === props.dataSend.diachi &&
            sdt === props.dataSend.sdt 
        ) {
            setErrorMessage(
                toast.error("Thông tin cập nhật phải khác với thông tin ban đầu!", {
                    position: toast.POSITION.TOP_RIGHT
                })
            )
        }
         else {
            // set configurations
            const configuration = {
                method: "put",
                url: `http://localhost:3000/api/nhacungcapcongiong/${props.dataSend._id}`,
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
                // console.log(result.data.errCode)
                if(result.data.errCode === 201) { 
                    props.handleClickFrom(false, result.data.ncccongiong)
                    setSuccessMessage(
                        toast.success("Cập nhật thành công !", {
                            position: toast.POSITION.TOP_RIGHT
                        })
                    )
                } else { 
                    setErrorMessage(
                        toast.error("Cập nhật không thành công !", {
                            position: toast.POSITION.TOP_RIGHT
                        })
                    )
                }
                
                setNCCConGiong(true);
                
            })
            .catch((error) => {
                console.log(error)
                if(error && error.request.status === 505){
                    return toast.error("Cơ sở nuôi trồng đã tồn tại!", {
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
                                <Form.Label>Tên nhà cung cấp:</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="ten"
                                    value={ten}
                                    onChange={(e) => setTen(e.target.value)}
                                    placeholder="Nhập tên cơ sở nuôi trồng..."
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
                    <div className={'d-flex justify-content-center ' + cx('btn-editNCCConGiong')}>
                        <Button
                            className={cx('btn-submit-login', 'btn', 'btn--success') }
                            variant="danger"
                            type="submit"
                            onClick={(e) => {
                                    handleSubmit(e);
                                }
                            }
                        >
                            CẬP NHẬT
                        </Button>

                        <Button
                            className={cx('btn-submit-login', 'btn', 'btn--success') }
                            variant="primary"
                            type="button"
                            onClick={() => props.handleClickFrom(false)}
                        >
                            TRỞ VỀ
                        </Button>
                    </div>
                </Form>  
            </div>
        </>
    );
}

export default EditThuongLai;
