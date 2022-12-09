import { useLocation } from "react-router-dom";
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

//Library react toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classNames from 'classnames/bind';
import styles from './GiaiDoan.module.scss';

const cx = classNames.bind(styles);


function AddGiaiDoan() {
    const [aonuoiLists, setAoNuoiLists] = useState([]);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Get userId from Auth Component 
    const location = useLocation();
    const userData = location.state.userId;
    
    // initial state

    const [ten, setTen] = useState("");
    const [thoidiem, setThoiDiem] = useState("");
    const [ghichu, setGhiChu] = useState("");
    const [aonuoiId, setAoNuoiId] = useState("");

    useEffect(() => {
        async function getCSNT(){
            const configuration = {
                method: "GET",
                url: `http://localhost:3000/api/aonuoi/${userData}/list`,
            };
            // make the API call
            axios(configuration)
                .then((result) => {
                    // redirect user to the auth page
                    if(result.data.dataLists[0].aonuois === 0) {
                        return toast.error("Bạn chưa có ao nuôi nào. Vui lòng thêm ao nuôi để tạo giai đoạn nuôi!", {
                            position: toast.POSITION.TOP_RIGHT,
                        })
                    }
                    // console.log(result.data.dataLists[0].aonuois);
                    setAoNuoiLists(result.data.dataLists);
                })
                .catch((error) => {
                    if(error){
                        return toast.error("Không có ao nuôi nào được tạo!", {
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
            !thoidiem ||
            !aonuoiId 
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
                url: "http://localhost:3000/api/giaidoan/create",
                data: {
                    ten,
                    thoidiem,
                    ghichu,
                    aonuoiId,
                    tkId: userData,
                },
            };

            // make the API call
            axios(configuration)
            .then((result) => {
                // redirect user to the auth page
                (result.data.errCode === 201) ? setSuccessMessage(
                    toast.success("Thêm giai đoạn nuôi thành công !", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                ) : setErrorMessage(
                    toast.error("Thêm giai đoạn nuôi không thành công !", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                )
                
                setTimeout(() => {
                    setTen('');
                    setThoiDiem('');
                    setAoNuoiId('');
                },100)
            })
            .catch((error) => {
                if(error){
                    return toast.error("Thêm giai doạn nuôi không thành công!", {
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
                                <Form.Label>Tên giai đoạn nuôi:</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="ten"
                                    value={ten}
                                    onChange={(e) => setTen(e.target.value)}
                                    placeholder="Nhập tên giai đoạn nuôi..."
                                />
                            </Form.Group>

                            {/* ten */}
                            <Form.Group controlId="formBasicName" className={cx('form-group')}>
                                <Form.Label>Thời điểm:</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="thoidiem"
                                    value={thoidiem}
                                    onChange={(e) => setThoiDiem(e.target.value)}
                                    placeholder="1-20 ngày tuổi..."
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicName" className={cx('form-group')}>
                                <Form.Label>Ghi chú:</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="ghichu"
                                    value={ghichu}
                                    onChange={(e) => setGhiChu(e.target.value)}
                                    placeholder="Nhập ghi chú (Không bắt buộc)..."
                                />
                            </Form.Group>

                            {/* Dia chi */}
                            <Form.Group controlId="formBasicDiaChi" className={cx('form-group')}>
                                <Form.Label>Ao nuôi:</Form.Label>
                                <Form.Select  defaultValue="Chọn ao nuôi..." size="lg" name={aonuoiId} onChange={(e) => setAoNuoiId(e.target.value)}>
                                    <option disabled>Chọn ao nuôi...</option>
                                    {aonuoiLists ? aonuoiLists.map(aonuois => aonuois.aonuois.map(aonuoi => (
                                        <option key={aonuoi._id} value={aonuoi._id}> {aonuoi.ten} </option>
                                        ))
                                    ) : ''}
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

export default AddGiaiDoan;
