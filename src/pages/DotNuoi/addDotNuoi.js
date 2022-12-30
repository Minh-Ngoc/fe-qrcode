import { useLocation } from "react-router-dom";
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

// Library react toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classNames from 'classnames/bind';
import styles from './DotNuoi.module.scss';

const cx = classNames.bind(styles);


function AddDotNuoi() {
    const [congiongLists, setConGiongLists] = useState([]);
    const [aonuoiLists, setAoNuoiLists] = useState([]);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Get userId from Auth Component 
    const location = useLocation();
    const userData = location.state.userId;
    
    // initial state

    const [ten, setTen] = useState("");
    const [namnuoi, setNamNuoi] = useState("");
    const [thoidiem, setThoiDiem] = useState("");
    const [trangthai, setTrangThai] = useState("");
    const [tinhtrang, setTinhTrang] = useState("");

    const [soluong, setSoLuong] = useState("");
    const [ngaytuoi, setNgayTuoi] = useState("");
    const [chatluong, setChatLuong] = useState("");

    const [congiongId, setConGiongId] = useState("");
    const [aonuoiId, setAoNuoiId] = useState("");

    useEffect(() => {
        async function getAoNuoi(){
            const configuration = {
                method: "GET",
                url: `http://localhost:3000/api/aonuoi/${userData}/list`,
            };
            const getConGiongList = {
                method: "GET",
                url: `http://localhost:3000/api/congiong/${userData}/list`,
            };
            // make the API call
            await Promise.all([axios(configuration), axios(getConGiongList)])
                .then(([result, result2]) => {
                    // redirect user to the auth page
                    if(result.data.dataLists.length === 0) {
                        return toast.error("Bạn chưa có ao nuôi nào. Vui lòng thêm ao nuôi để tạo đợt nuôi!", {
                            position: toast.POSITION.TOP_RIGHT,
                        })
                    }
                    setAoNuoiLists(result.data.dataLists);
                    setConGiongLists(result2.data.congiong);
                })
                .catch((error) => {
                    if(error){
                        return toast.error("Không có ao nuôi nào được tạo!", {
                            position: toast.POSITION.TOP_RIGHT,
                        })
                    } 
                });
        } 
        getAoNuoi();
    }, []);

    const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
        e.preventDefault();

        if(
            !ten ||
            !namnuoi ||
            !thoidiem ||
            !trangthai ||
            !tinhtrang ||
            !soluong ||
            !ngaytuoi ||
            !chatluong ||
            !congiongId ||
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
                url: "http://localhost:3000/api/dotnuoi/create",
                data: {
                    ten,
                    namnuoi,
                    thoidiem,
                    trangthai,
                    tinhtrang,
                    soluong,
                    ngaytuoi,
                    chatluong,
                    congiongId,
                    aonuoiId,
                    tkId: userData,
                },
            };

            // make the API call
            axios(configuration)
            .then((result) => {
                // redirect user to the auth page
                (result.data.errCode === 201) ? setSuccessMessage(
                    toast.success("Thêm đợt nuôi thành công !", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                ) : setErrorMessage(
                    toast.error("Thêm đợt nuôi không thành công !", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                )
                
                setTimeout(() => {
                    setTen('');
                    setNamNuoi('');
                    setThoiDiem('');
                    setTrangThai('');
                    setTinhTrang('');
                    setSoLuong('');
                    setNgayTuoi('');
                    setChatLuong('');
                   
                },100)
            })
            .catch((error) => {
                if(error){
                    return toast.error("Thêm đợt nuôi không thành công!", {
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
                                <Form.Label>Tên đợt nuôi:</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="ten"
                                    value={ten}
                                    onChange={(e) => setTen(e.target.value)}
                                    placeholder="Nhập tên đợt nuôi..."
                                />
                            </Form.Group>

                            {/* ten */}
                            <Form.Group controlId="formBasicName" className={cx('form-group')}>
                                <Form.Label>Năm nuôi:</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="namnuoi"
                                    value={namnuoi}
                                    onChange={(e) => setNamNuoi(e.target.value)}
                                    placeholder="Nhập năm nuôi..."
                                />
                            </Form.Group>

                            {/* Dia chi */}
                            <Form.Group controlId="formBasicDiaChi" className={cx('form-group')}>
                                <Form.Label>Thời điểm:</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="thoidiem"
                                    value={thoidiem}
                                    onChange={(e) => setThoiDiem(e.target.value)}
                                    placeholder="Nhập thời điểm..."
                                />
                            </Form.Group>

                            {/* sdt */}
                            <Form.Group controlId="formBasicSDT" className={cx('form-group')}>
                                <Form.Label>Trạng thái:</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="trangthai"
                                    value={trangthai}
                                    onChange={(e) => setTrangThai(e.target.value)}
                                    placeholder="Nhập trạng thái..."
                                />
                            </Form.Group>
                            {/* dientich */}
                            <Form.Group controlId="formBasicSDT" className={cx('form-group')}>
                                <Form.Label>Tình trạng:</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="tinhtrang"
                                    value={tinhtrang}
                                    onChange={(e) => setTinhTrang(e.target.value)}
                                    placeholder="Nhập tình trạng..."
                                />
                            </Form.Group>
                        </div>

                        <div>
                            {/* sdt */}
                            <Form.Group controlId="formBasicSDT" className={cx('form-group')}>
                                <Form.Label>Số lượng: (con)</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="soluong"
                                    value={soluong}
                                    onChange={(e) => setSoLuong(e.target.value)}
                                    placeholder="Nhập số lượng..."
                                />
                            </Form.Group>
                            {/* dientich */}
                            <Form.Group controlId="formBasicSDT" className={cx('form-group')}>
                                <Form.Label>Ngày tuổi:</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="ngaytuoi"
                                    value={ngaytuoi}
                                    onChange={(e) => setNgayTuoi(e.target.value)}
                                    placeholder="Nhập tình trạng..."
                                />
                            </Form.Group>

                            {/* dientich */}
                            <Form.Group controlId="formBasicSDT" className={cx('form-group')}>
                                <Form.Label>Chất lượng:</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="chatluong"
                                    value={chatluong}
                                    onChange={(e) => setChatLuong(e.target.value)}
                                    placeholder="Nhập tình trạng..."
                                />
                            </Form.Group>                            

                            <Form.Group controlId="formBasicDiaChi" className={cx('form-group')}>
                                <Form.Label>Con giống:</Form.Label>
                                <Form.Select  defaultValue="Chọn con giống..." size="lg" name="congiongId" onChange={(e) => setConGiongId(e.target.value)}>
                                    <option disabled>Chọn con giống...</option>
                                    {congiongLists.map(data =>  (
                                        <option key={data._id} value={data._id}> {data.ten} </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group controlId="formBasicDiaChi" className={cx('form-group')}>
                                <Form.Label>Con giống:</Form.Label>
                                <Form.Select  defaultValue="Chọn ao nuôi..." size="lg" name="aonuoiId" onChange={(e) => setAoNuoiId(e.target.value)}>
                                    <option disabled>Chọn ao nuôi...</option>
                                    {aonuoiLists.map(data => data.aonuois.map(aonuoi => (
                                        <option key={aonuoi._id} value={aonuoi._id}> {aonuoi.ten} </option>
                                    )))}
                                </Form.Select>
                            </Form.Group>

                        </div>
                    </div>

                    {/* submit button */}
                    <div className={cx('btn-addAoNuoi')}>
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

export default AddDotNuoi;
