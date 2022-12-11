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
import styles from './CoSoNuoiTrong.module.scss';

const cx = classNames.bind(styles);


function EditCSNT(props) {
    // console.log(props.dataSend)

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Get userId from Auth Component 
    const location = useLocation();
    const userData = location.state.userId;
    
    // initial state
    const [ten, setTen] = useState('');
    const [chusohuu, setChuSoHuu] = useState('');
    const [diachi, setDiaChi] = useState('');
    const [sdt, setSdt] = useState('');
    const [dientich, setDienTich] = useState('');
    const [dtmatnuoc, setDtMatNuoc] = useState('');
    const [namdangky, setNamDangKy] = useState('');

    const [cosonuoitrong, setCoSoNuoiTrong] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setTen(props.dataSend.ten)
        setChuSoHuu(props.dataSend.chusohuu)
        setDiaChi(props.dataSend.diachi)
        setSdt(props.dataSend.sdt)
        setDienTich(props.dataSend.dientich)
        setDtMatNuoc(props.dataSend.dtmatnuoc)
        setNamDangKy(props.dataSend.namdangky)
    },[props.dataSend])

    const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
        e.preventDefault();

        if(
            !ten ||
            !chusohuu ||
            !diachi ||
            !sdt ||
            !dientich ||
            !dtmatnuoc ||
            !namdangky
        ) {
            setErrorMessage(
                toast.error("Vui lòng nhập đầy đủ thông tin !", {
                    position: toast.POSITION.TOP_RIGHT
                })
            )
        } 
        else if (
            ten === props.dataSend.ten &&
            chusohuu === props.dataSend.chusohuu &&
            diachi === props.dataSend.diachi &&
            sdt === props.dataSend.sdt &&
            dientich === props.dataSend.dientich &&
            dtmatnuoc === props.dataSend.dtmatnuoc &&
            namdangky === props.dataSend.namdangky
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
                url: `http://localhost:3000/api/cosonuoitrong/${props.dataSend._id}`,
                data: {
                    presentName: props.dataSend.ten,
                    ten,
                    chusohuu,
                    diachi,
                    sdt,
                    dientich,
                    dtmatnuoc,
                    namdangky,
                    tkId: props.dataSend.tkId,
                },
            };

            // make the API call
            axios(configuration)
            .then((result) => {
                // redirect user to the auth page
                // console.log(result.data.errCode)
                if(result.data.errCode === 201) { 
                    props.handleClickFrom(false, result.data.csnt)
                    setSuccessMessage(
                        toast.success("Cập nhật thành công !", {
                            position: toast.POSITION.TOP_RIGHT
                        })
                    )
                }
                
                setCoSoNuoiTrong(true);
                
            })
            .catch((error) => {
                console.log(error)
                if(error && error.request.status === 505){
                    return toast.error("Cơ sở nuôi trồng đã tồn tại!", {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                } else {
                    return toast.error("Cập nhật không thành công!", {
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
                                <Form.Label>Tên cơ sở nuôi trồng:</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="ten"
                                    value={ten}
                                    onChange={(e) => setTen(e.target.value)}
                                    placeholder="Nhập tên cơ sở nuôi trồng..."
                                />
                            </Form.Group>

                            {/* ten */}
                            <Form.Group controlId="formBasicName" className={cx('form-group')}>
                                <Form.Label>Họ và tên:</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="chusohuu"
                                    value={chusohuu}
                                    onChange={(e) => setChuSoHuu(e.target.value)}
                                    placeholder="Nhập họ và tên chủ sở hữu..."
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

                        <div>
                            {/* dientich */}
                            <Form.Group controlId="formBasicSDT" className={cx('form-group')}>
                                <Form.Label>Diện tích cơ sở nuôi trồng:</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="dientich"
                                    value={dientich}
                                    onChange={(e) => setDienTich(e.target.value)}
                                    placeholder="Nhập diện tích cơ sở nuôi trồng..."
                                />
                            </Form.Group>

                            {/* dtmatnuoc */}
                            <Form.Group controlId="formBasicSDT" className={cx('form-group')}>
                                <Form.Label>Diện tích mặt nước:</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="dtmatnuoc"
                                    value={dtmatnuoc}
                                    onChange={(e) => setDtMatNuoc(e.target.value)}
                                    placeholder="Nhập diện tích mặt nước..."
                                />
                            </Form.Group>

                            {/* namdangky */}
                            <Form.Group controlId="formBasicSDT" className={cx('form-group')}>
                                <Form.Label>Năm đăng ký cơ sở nuôi trồng:</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="namdangky"
                                    value={namdangky}
                                    onChange={(e) => setNamDangKy(e.target.value)}
                                    placeholder="Nhập năm đăng ký cơ sở nuôi trồng..."
                                />
                            </Form.Group>
                        </div>
                    </div>

                    {/* submit button */}
                    <div className={'d-flex justify-content-around ' + cx('btn-addCSNT')}>
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

export default EditCSNT;
