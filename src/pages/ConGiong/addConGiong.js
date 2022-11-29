import { useLocation } from "react-router-dom";
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Form, Button, FloatingLabel } from "react-bootstrap";
import axios from "axios";

//Library react toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classNames from 'classnames/bind';
import styles from './ConGiong.module.scss';

const cx = classNames.bind(styles);


function AddConGiong() {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Get userId from Auth Component 
    const location = useLocation();
    const userData = location.state.userId;
    
    // initial state

    const [ten, setTen] = useState("");
    const [hinhanh, setHinhAnh] = useState("");
    const [mota, setMoTa] = useState("");
    const [lcgId, setLoaiConGiong] = useState("");
    const [ncccgId, setNhaCungCap] = useState("");

    const [loaicongiongLists, setLoaiConGiongLists] = useState([]);
    const [ncccongiongLists, setNCCConGiongLists] = useState([]);

    const [congiongId, setConGiongId] = useState("");

    const [aonuoi, setAoNuoi] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        async function getNCCConGiong(){
            const configuration = {
                method: "GET",
                url: `http://localhost:3000/api/nhacungcapcongiong/${userData}/list`,
            };
            const callApiLoaiConGiong = {
                method: "GET",
                url: "http://localhost:3000/api/loaicongiong/list",
            };
            // make the API call
            await Promise.all([axios(configuration), axios(callApiLoaiConGiong)])
                .then(([result, resultLCG]) => {
                    // redirect user to the auth page
                    if(result.data.ncccongiong.length === 0) {
                        return toast.error("Bạn chưa có nhà cung cấp con giống nào. Vui lòng thêm đợt nuôi để tạo con giống!", {
                            position: toast.POSITION.TOP_RIGHT,
                        })
                    } else {
                        setNCCConGiongLists(result.data.ncccongiong);
                        setLoaiConGiongLists(resultLCG.data.loaicongiong);
                    }
                    
                })
                .catch((error) => {
                    if(error){
                        return toast.error("Không có đợt nuôi nào được tạo!", {
                            position: toast.POSITION.TOP_RIGHT,
                        })
                    } 
                });
        } 
        getNCCConGiong();
      },[]);

    const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
        e.preventDefault();
        
        if(
            !ten ||
            !mota ||
            !lcgId ||
            !ncccgId 
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
                url: "http://localhost:3000/api/congiong/create",
                data: {
                    ten,
                    hinhanh,
                    mota,
                    lcgId,
                    ncccgId,
                    tkId: userData,
                },
            };

            // make the API call
            axios(configuration)
            .then((result) => {
                // redirect user to the auth page
                (result.data.errCode === 201) ? setSuccessMessage(
                    toast.success("Thêm con giống thành công !", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                ) : setErrorMessage(
                    toast.error("Thêm con giống không thành công !", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                )
                
                setAoNuoi(true);
                setTimeout(() => {
                    setTen('');
                    setMoTa('');
                    setLoaiConGiong('');
                    setNhaCungCap('');
                },100)
            })
            .catch((error) => {
                if(error){
                    return toast.error("Thêm con giống không thành công!", {
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
                                <Form.Label>Tên con giống:</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="ten"
                                    value={ten}
                                    onChange={(e) => setTen(e.target.value)}
                                    placeholder="Nhập tên con giống..."
                                />
                            </Form.Group>

                            {/* ten */}
                            <Form.Group controlId="formBasicName" className={cx('form-group')}>
                            <Form.Label>Ảnh con giống (nếu có): </Form.Label>
                                <Form.Control
                                size="lg"
                                type="file"
                                name={hinhanh}
                                onChange={(e) => setHinhAnh(e.target.value)}
                                />
                            </Form.Group>

                            {/* Dia chi */}
                            <Form.Group controlId="formBasicDiaChi" className={cx('form-group')}>
                                <Form.Label>Mô tả: </Form.Label>
                                <FloatingLabel controlId="floatingTextarea2" label="Mô tả con giống..." style={{ color: '#212529' }}>
                                    <Form.Control
                                        as="textarea"
                                        name={mota}
                                        onChange={(e) => setMoTa(e.target.value)}
                                        placeholder="Leave a comment here"
                                        style={{ height: '100px', paddingTop: '24px', fontSize: '16px' }}
                                    />
                                </FloatingLabel>
                            </Form.Group>
                            
                        </div>

                        <div>                          
                            <Form.Group controlId="formBasicDiaChi" className={cx('form-group')}>
                                <Form.Label>Loại con giống:</Form.Label>
                                <Form.Select  defaultValue="Chọn ..." size="lg" name="lcgId" onChange={(e) => setLoaiConGiong(e.target.value)}>
                                    <option disabled>Chọn Loại con giống...</option>
                                    {loaicongiongLists.map(data => (
                                        <option key={data._id} value={data._id}> {data.ten} </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group controlId="formBasicDiaChi" className={cx('form-group')}>
                                <Form.Label>Nhà cung cấp con giống:</Form.Label>
                                <Form.Select  defaultValue="Chọn đợt nuôi..." size="lg" name="ncccgId" onChange={(e) => setLoaiConGiong(e.target.value)}>
                                    <option disabled>Chọn nhà cung cấp con giống...</option>
                                    {ncccongiongLists.map(data => (
                                        <option key={data._id} value={data._id}> {data.ten} </option>
                                    ))}
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

export default AddConGiong;
