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

function AddThuocThuySanSD(props) {
    const [TTSLists, setTTSLists] = useState([]);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Get userId from Auth Component 
    const location = useLocation();
    const userData = location.state.userId;
    const TTSId = props.dataSend;
    // initial state

    const [lieuluong, setLieuLuong] = useState("");
    const [thoidiem, setThoiDiem] = useState("");
    const [thuocthuysanId, setThuocThuySanId] = useState("");

    useEffect(() => {
        async function getCSNT(){
            const configuration = {
                method: "GET",
                url: `http://localhost:3000/api/thuocthuysan/${userData}/list`,
            };
            // make the API call
            axios(configuration)
                .then((result) => {
                    // redirect user to the auth page
                    if(result.data.thuocthuysan.length === 0) {
                        return toast.error("Bạn chưa thêm thuốc thủy sản. Vui lòng thêm thuốc thủy sản để tạo thuốc thủy sản sử dụng!", {
                            position: toast.POSITION.TOP_RIGHT,
                        })
                    }
                    // console.log(result.data.thuocthuysan);
                    setTTSLists(result.data.thuocthuysan);
                })
                .catch((error) => {
                    if(error){
                        return toast.error("Không có thuốc thủy sản nào được tạo!", {
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
            !lieuluong ||
            !thoidiem ||
            !thuocthuysanId
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
                url: `http://localhost:3000/api/aonuoi/addthuocthuysansd/${TTSId}`,
                data: {
                    lieuluong,
                    thoidiem,
                    thuocthuysanId,  
                },
            };

            // make the API call
            axios(configuration)
            .then((result) => {
                // redirect user to the auth page
                (result.data.errCode === 200) ? setSuccessMessage(
                    toast.success("Thêm thuốc thủy sản sử dụng thành công !", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                ) : setErrorMessage(
                    toast.error("Thêm thuốc thủy sản sử dụng không thành công !", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                )
                
                setTimeout(() => {
                    setLieuLuong('');
                    setThoiDiem('');
                },100)
            })
            .catch((error) => {
                if(error){
                    return toast.error("Thêm chỉ số môi trường sử dụng không thành công!", {
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
                                <Form.Label>Liều lượng:</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="lieuluong"
                                    value={lieuluong}
                                    onChange={(e) => setLieuLuong(e.target.value)}
                                    placeholder="Nhập liều lượng..."
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicDiaChi" className={cx('form-group')}>
                                <Form.Label>Thuốc thủy sản:</Form.Label>
                                <Form.Select  defaultValue="Chọn thuốc thủy sản..." size="lg" name="thuocthuysanId" onChange={(e) => setThuocThuySanId(e.target.value)}>
                                    <option disabled>Chọn thuốc thủy sản...</option>
                                    {TTSLists.map(csmt => (
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

export default AddThuocThuySanSD;
