import { useLocation } from "react-router-dom";
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

import { ToastContainer } from 'react-toastify';

//Library react toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classNames from 'classnames/bind';
import styles from './AoNuoi.module.scss';

const cx = classNames.bind(styles);


function AddCSMTDetail(props) {
    const [csmtLists, setCSMTLists] = useState([]);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Get userId from Auth Component 
    const location = useLocation();
    const userData = location.state.userId;
    const giaiDoanId = props.dataSend;
    // initial state

    const [thoidiem, setThoiDiem] = useState("");
    const [chiso, setChiSo] = useState("");
    const [ghichu, setGhiChu] = useState("");
    const [csmtId, setCSMTId] = useState("");

    useEffect(() => {
        async function getCSNT(){
            const configuration = {
                method: "GET",
                url: `http://localhost:3000/api/chisomoitruong/${userData}/list`,
            };
            // make the API call
            axios(configuration)
                .then((result) => {
                    // redirect user to the auth page
                    if(result.data.chisomoitruong.length === 0) {
                        return toast.error("Bạn chưa thêm chỉ số môi trường. Vui lòng thêm chỉ số môi trường để tạo chỉ số môi trường sử dụng!", {
                            position: toast.POSITION.TOP_RIGHT,
                        })
                    }
                    // console.log(result.data.chisomoitruong);
                    setCSMTLists(result.data.chisomoitruong);
                })
                .catch((error) => {
                    if(error){
                        return toast.error("Không có chỉ số môi trường nào được tạo!", {
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
            !thoidiem ||
            !chiso ||
            !csmtId
        ) {
            setErrorMessage(
                toast.error("Vui lòng nhập đầy đủ thông tin !", {
                    position: toast.POSITION.TOP_RIGHT
                })
            )
        } else {
            // set configurations
            const configuration = {
                method: "put",
                url: `http://localhost:3000/api/aonuoi/addcsmtdetail/${giaiDoanId}`,
                data: {
                    thoidiem,
                    chiso,
                    ghichu,
                    csmtId,  
                },
            };

            // make the API call
            axios(configuration)
            .then((result) => {
                // redirect user to the auth page
                (result.data.errCode === 200) ? setSuccessMessage(
                    toast.success("Thêm chỉ số môi trường thành công !", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                ) : setErrorMessage(
                    toast.error("Thêm chỉ số môi trường không thành công !", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                )
                
                setTimeout(() => {
                    setThoiDiem('');
                    setChiSo('');
                    setGhiChu('');
                },100)
            })
            .catch((error) => {
                if(error){
                    return toast.error("Thêm chỉ số môi trường không thành công!", {
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
                        <Form.Group controlId="formBasicName" className={cx('form-group')}>
                                <Form.Label>Thời điểm:</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="thoidiem"
                                    value={thoidiem}
                                    onChange={(e) => setThoiDiem(e.target.value)}
                                    placeholder="Ngày ? tháng ?..."
                                />
                            </Form.Group>
                            
                            <Form.Group controlId="formBasicEmail" className={cx('form-group')}>
                                <Form.Label>Chỉ số:</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="chiso"
                                    value={chiso}
                                    onChange={(e) => setChiSo(e.target.value)}
                                    placeholder="Nhập chỉ số..."
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail" className={cx('form-group')}>
                                <Form.Label>Ghi chú:</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="ghichu"
                                    value={ghichu}
                                    onChange={(e) => setGhiChu(e.target.value)}
                                    placeholder="Ghi chú..."
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicDiaChi" className={cx('form-group')}>
                                <Form.Label>Chỉ số môi trường:</Form.Label>
                                <Form.Select  defaultValue="Chọn chỉ số môi trường..." size="lg" name="csmtId" onChange={(e) => setCSMTId(e.target.value)}>
                                    <option disabled>Chọn chỉ số môi trường...</option>
                                    {csmtLists.map(csmt => (
                                        <option key={csmt._id} value={csmt._id}> {csmt.ten} </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                        </div>
                    </div>

                    {/* submit button */}
                    <div className={'d-flex justify-content-center ' + cx('btn-editAoNuoi')}>
                        <Button
                            className={cx('btn-submit-login', 'btn', 'btn--success') }
                            variant="danger"
                            type="submit"
                            onClick={(e) => {
                                    handleSubmit(e);
                                }
                            }
                        >
                            THÊM
                        </Button>

                        <Button
                            className={cx('btn-submit-login', 'btn', 'btn--success') }
                            variant="primary"
                            type="button"
                            onClick={() => props.handleSetDisplay('block')}
                        >
                            TRỞ VỀ
                        </Button>
                    </div>
                </Form>  
            </div>
            <ToastContainer/>
        </>
    );
}

export default AddCSMTDetail;
