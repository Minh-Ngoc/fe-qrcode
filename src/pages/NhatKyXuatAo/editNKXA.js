import { useLocation } from "react-router-dom";
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";
import axios from "axios";

//Library react toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classNames from 'classnames/bind';
import styles from './NKXA.module.scss';

const cx = classNames.bind(styles);


function EditNKXA(props) {
    // console.log(props.dataSend)

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Get userId from Auth Component 
    const location = useLocation();
    const userData = location.state.userId;
    
    // initial state
    const [ten, setTen] = useState("");
    const [dientich, setDienTich] = useState("");
    const [csntId, setCSNTId] = useState("");

    const [aonuoi, setAoNuoi] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setTen(props.dataSend.ten)
        setDienTich(props.dataSend.dientich)
        setCSNTId(props.dataSend.csntId)
    },[props.dataSend])

    console.log(csntId)

    const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
        e.preventDefault();

        if(
            !ten ||
            !dientich ||
            !csntId 
        ) {
            setErrorMessage(
                toast.error("Vui lòng nhập đầy đủ thông tin !", {
                    position: toast.POSITION.TOP_RIGHT
                })
            )
        } 
        else if (
            ten === props.dataSend.ten &&
            dientich === props.dataSend.dientich &&
            csntId === props.dataSend.csntId
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
                url: `http://localhost:3000/api/aonuoi/${props.dataSend._id}`,
                data: {
                    ten,
                    dientich,
                    csntId
                },
            };

            // make the API call
            axios(configuration)
            .then((result) => {
                // redirect user to the auth page
                // console.log(result.data.errCode)
                if(result.data.errCode === 201) { 
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
                props.handleClickFrom(false)
                setAoNuoi(true);
                
            })
            .catch((error) => {
                // console.log(error)
                if(error && error.request.status === 505){
                    return toast.error("Ao nuôi đã tồn tại!", {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                } else {
                    return toast.error("Cập nhật ao nuôi không thành công!", {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                }
            });
        }
    };

    return (
        <>  
            <div className={cx('AoNuoi-container-add') + ' mt-4'}>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    {/* username */}
                    <div className="d-flex justify-content-around">
                        <div>
                            <Form.Group controlId="formBasicEmail" className={cx('form-group')}>
                                <Form.Label>Tên ao nuôi:</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="ten"
                                    value={ten}
                                    onChange={(e) => setTen(e.target.value)}
                                    placeholder="Nhập tên ao nuôi..."
                                />
                            </Form.Group>

                            {/* ten */}
                            <Form.Group controlId="formBasicName" className={cx('form-group')}>
                                <Form.Label>Diện tích ao nuôi:</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="dientich"
                                    value={dientich}
                                    onChange={(e) => setDienTich(e.target.value)}
                                    placeholder="Nhập họ và tên chủ sở hữu..."
                                />
                            </Form.Group>

                            {/* Dia chi */}
                            <Form.Group controlId="formBasicDiaChi" className={cx('form-group')}>
                                <Form.Label>Cơ sở nuôi trồng:</Form.Label>
                                <Form.Select size="lg" name="csntId" onChange={(e) => setCSNTId(e.target.value)}>
                                    <option disabled>Chọn cơ sở nuôi trồng...</option>
                                    {props.csntList.map(csnt => (
                                        <option key={csnt._id} value={csnt._id}> {csnt.ten} </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                        </div>
                    </div>

                    {/* submit button */}
                    <div className={'d-flex justify-content-center ' + cx('btn-editAoNuoi')}>
                        <Button
                            className={cx('btn-submit-addAoNuoi', 'btn', 'btn--success') }
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

export default EditNKXA;
