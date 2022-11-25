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
import styles from './AoNuoi.module.scss';

const cx = classNames.bind(styles);


function AddAoNuoi() {
    const [csntLists, setCSNTLists] = useState([]);

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
        async function getCSNT(){
            const configuration = {
                method: "GET",
                url: `http://localhost:3000/api/cosonuoitrong/${userData}/list`,
            };
            // make the API call
            axios(configuration)
                .then((result) => {
                    // redirect user to the auth page
                    setCSNTLists(result.data.csnt);
                })
                .catch((error) => {
                    if(error.request.status === 505){
                        return toast.error("Không có cơ sở nuôi trồng nào được tạo!", {
                            position: toast.POSITION.TOP_RIGHT,
                        })
                        }
                });
        } 
        getCSNT();
      },[]);

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
        } else {
            // set configurations
            const configuration = {
                method: "post",
                url: "http://localhost:3000/api/aonuoi/create",
                data: {
                    ten,
                    dientich,
                    csntId,
                    tkId: userData,
                },
            };

            // make the API call
            axios(configuration)
            .then((result) => {
                // redirect user to the auth page
                (result.data.errCode === 201) ? setSuccessMessage(
                    toast.success("Thêm thành công !", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                ) : setErrorMessage(
                    toast.error("Không thành công !", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                )
                
                setAoNuoi(true);
                setTimeout(() => {
                    setTen('');
                    setDienTich('');
                    setCSNTId('');
                },100)
            })
            .catch((error) => {
                if(error){
                    return toast.error("Ao nuôi đã tồn tại!", {
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
                                    placeholder="Nhập diện tích ao nuôi..."
                                />
                            </Form.Group>

                            {/* Dia chi */}
                            <Form.Group controlId="formBasicDiaChi" className={cx('form-group')}>
                                <Form.Label>Cơ sở nuôi trồng:</Form.Label>
                                <Form.Select  defaultValue="Chọn cơ sở nuôi trồng..." size="lg" name="csntId" onChange={(e) => setCSNTId(e.target.value)}>
                                    <option disabled>Chọn cơ sở nuôi trồng...</option>
                                    {csntLists.map(csnt => (
                                        <option key={csnt._id} value={csnt._id}> {csnt.ten} </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                        </div>
                    </div>

                    {/* submit button */}
                    <div className={'text-center ' + cx('btn-addAoNuoi')}>
                        <Button
                            className={cx('btn-submit-addAoNuoi', 'btn', 'btn--success') }
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

export default AddAoNuoi;
