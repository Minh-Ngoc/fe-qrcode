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
import styles from './NKXA.module.scss';

const cx = classNames.bind(styles);


function AddNKXA() {
    const [aonuoiLists, setAoNuoiLists] = useState([]);
    const [thuonglaiLists, setThuongLaiLists] = useState([]);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Get userId from Auth Component 
    const location = useLocation();
    const userData = location.state.userId;
    
    // initial state

    const [_id, setAoNuoiId] = useState("");
    const [thoidiem, setThoiDiem] = useState("");
    const [khoiluong, setKhoiLuong] = useState("");
    const [ppthuhoach, setPPThuHoach] = useState("");
    const [thuonglaiId, setThuongLaiId] = useState("");

    useEffect(() => {
        async function getNKXA(){
            const configuration = {
                method: "GET",
                url: `http://localhost:3000/api/aonuoi/${userData}/list`,
            };
            const TLLists = {
                method: "GET",
                url: `http://localhost:3000/api/thuonglai/${userData}/list`,
            };
            // make the API call
            Promise.all([axios(configuration), axios(TLLists)])
                .then(([result, result2]) => {
                    // redirect user to the auth page
                    if(result.data.dataLists.length === 0) {
                        return toast.error("Bạn chưa có ao nuôi nào. Vui lòng thêm ao nuôi để tạo nhật ký nuôi trồng!", {
                            position: toast.POSITION.TOP_RIGHT,
                        })
                    }
                    setAoNuoiLists(result.data.dataLists);
                    setThuongLaiLists(result2.data.thuonglai);
                })
                .catch((error) => {
                    if(error.request.status === 505){
                        return toast.error("Không có nhật ký nuôi trồng nào được tạo!", {
                            position: toast.POSITION.TOP_RIGHT,
                        })
                    } 
                });
        } 
        getNKXA();
      },[]);

    const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
        e.preventDefault();

        if(
            !_id ||
            !thoidiem ||
            !khoiluong ||
            !ppthuhoach ||
            !thuonglaiId
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
                url: `http://localhost:3000/api/aonuoi/addnhatkyxuatao/${_id}`,
                data: {
                    thoidiem,
                    khoiluong,
                    ppthuhoach,
                    thuonglaiId,
                    // tkId: userData,
                },
            };

            // make the API call
            axios(configuration)
            .then((result) => {
                // redirect user to the auth page
                (result.data.errCode === 200) ? setSuccessMessage(
                    toast.success("Thêm nhật ký xuất ao thành công !", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                ) : setErrorMessage(
                    toast.error("Thêm nhật ký xuất ao không thành công !", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                )
                
                setTimeout(() => {
                    setThoiDiem('');
                    setKhoiLuong('');
                    setPPThuHoach('');
                },100)
            })
            .catch((error) => {
                if(error){
                    return toast.error("Thêm nhật ký xuất ao không thành công!", {
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
                            <Form.Group controlId="formBasicDiaChi" className={cx('form-group')}>
                                <Form.Label>Con giống:</Form.Label>
                                <Form.Select  defaultValue="Chọn ao nuôi..." size="lg" name="aonuoiId" onChange={(e) => setAoNuoiId(e.target.value)}>
                                    <option disabled>Chọn ao nuôi...</option>
                                    {aonuoiLists.map(data => data.aonuois.map(aonuoi => (
                                        <option key={aonuoi._id} value={aonuoi._id}> {aonuoi.ten} </option>
                                    )))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail" className={cx('form-group')}>
                                <Form.Label>Thời điểm thu hoạch:</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="thoidiem"
                                    value={thoidiem}
                                    onChange={(e) => setThoiDiem(e.target.value)}
                                    placeholder="Nhập thời điểm thu hoạch..."
                                />
                            </Form.Group>

                            {/* ten */}
                            <Form.Group controlId="formBasicName" className={cx('form-group')}>
                                <Form.Label>Khối lượng sau khi thu hoạch (tấn):</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="khoiluong"
                                    value={khoiluong}
                                    onChange={(e) => setKhoiLuong(e.target.value)}
                                    placeholder="Nhập khối lượng sau khi thu hoạch..."
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicName" className={cx('form-group')}>
                                <Form.Label>Phương pháp thu hoạch (m<sup>2</sup>) :</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="ppthuhoach"
                                    value={ppthuhoach}
                                    onChange={(e) => setPPThuHoach(e.target.value)}
                                    placeholder="Nhập phương pháp thu hoạch..."
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicDiaChi" className={cx('form-group')}>
                                <Form.Label>Thương lái:</Form.Label>
                                <Form.Select  defaultValue="Chọn thương lái..." size="lg" name="thuonglaiId" onChange={(e) => setThuongLaiId(e.target.value)}>
                                    <option disabled>Chọn thương lái...</option>
                                    {thuonglaiLists.map(thuonglai => (
                                        <option key={thuonglai._id} value={thuonglai._id}> {thuonglai.ten} </option>
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

export default AddNKXA;
