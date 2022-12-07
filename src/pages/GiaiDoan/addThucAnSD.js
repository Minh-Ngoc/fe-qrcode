import { useLocation, useNavigate } from "react-router-dom";
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

import { ToastContainer } from 'react-toastify';

//Library react toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classNames from 'classnames/bind';
import styles from './GiaiDoan.module.scss';

const cx = classNames.bind(styles);


function AddThucAnSD() {
    const navigate = useNavigate();
    const [thucanLists, setThucAnLists] = useState([]);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Get userId from Auth Component 
    const location = useLocation();
    const userData = location.state.userId;
    const giaiDoanId = location.state.giaiDoanId;
    // initial state

    const [luongthucan, setLuongThucAn] = useState("");
    const [thoidiem, setThoiDiem] = useState("");
    const [thucanId, setThucAnId] = useState("");

    useEffect(() => {
        async function getCSNT(){
            const configuration = {
                method: "GET",
                url: `http://localhost:3000/api/thucan/${userData}/list`,
            };
            // make the API call
            axios(configuration)
                .then((result) => {
                    // redirect user to the auth page
                    if(result.data.thucan.length === 0) {
                        return toast.error("Bạn chưa thêm thức ăn. Vui lòng thêm thức ăn để tạo thức ăn sử dụng!", {
                            position: toast.POSITION.TOP_RIGHT,
                        })
                    }
                    // console.log(result.data.thucan);
                    setThucAnLists(result.data.thucan);
                })
                .catch((error) => {
                    if(error){
                        return toast.error("Không có thức ăn nào được tạo!", {
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
            !luongthucan ||
            !thoidiem ||
            !thucanId 
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
                url: `http://localhost:3000/api/giaidoan/addthucansd/${giaiDoanId}`,
                data: {
                    luongthucan,
                    thoidiem,
                    thucanId,
                    // tkId: userData,
                },
            };

            // make the API call
            axios(configuration)
            .then((result) => {
                // redirect user to the auth page
                (result.data.errCode === 200) ? setSuccessMessage(
                    toast.success("Thêm thức ăn sử dụng thành công !", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                ) : setErrorMessage(
                    toast.error("Thêm thức ăn sử dụng không thành công !", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                )
                
                setTimeout(() => {
                    setLuongThucAn('');
                    setThoiDiem('');
                    // setThucAnId('');
                },100)
            })
            .catch((error) => {
                if(error){
                    return toast.error("Thêm thức ăn sử dụng không thành công!", {
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
                                <Form.Label>Lượng thức ăn (kg):</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="luongthucan"
                                    value={luongthucan}
                                    onChange={(e) => setLuongThucAn(e.target.value)}
                                    placeholder="Nhập lượng thức ăn..."
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
                                    placeholder="Ngày ? tháng ?..."
                                />
                            </Form.Group>

                            {/* Dia chi */}
                            <Form.Group controlId="formBasicDiaChi" className={cx('form-group')}>
                                <Form.Label>Thức ăn:</Form.Label>
                                <Form.Select  defaultValue="Chọn thức ăn..." size="lg" name={thucanId} onChange={(e) => setThucAnId(e.target.value)}>
                                    <option disabled>Chọn thức ăn...</option>
                                    {thucanLists.map(thucan => (
                                        <option key={thucan._id} value={thucan._id}> {thucan.ten} </option>
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
                            onClick={() => navigate(-1)}
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

export default AddThucAnSD;
