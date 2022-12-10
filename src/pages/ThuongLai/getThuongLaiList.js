/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
/* eslint-disable no-unused-vars */
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button } from "react-bootstrap";
//Library react toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Table from 'react-bootstrap/Table';

import EditThuongLai from './editThuongLai'

import classNames from 'classnames/bind';
import styles from './ThuongLai.module.scss';

const cx = classNames.bind(styles);

function GetThuongLaiList(props) {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Get userId from Auth Component 
    const location = useLocation();
    const userData = location.state.userId;

    const [thuonglaiLists, setThuongLaiLists] = useState(props.sendData);
    const [thuonglaiEdit, setThuongLaiEdit] = useState(false);
    const [formEdit, setFormEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState('');

    const [thuonglaiDelete, setThuongLaiDelete] = useState(false);


    useEffect(() => {
        async function getThuongLai(){
            console.log(userData)
            const configuration = {
                method: "GET",
                url: `http://localhost:3000/api/thuonglai/${userData}/list`,
            };
            // make the API call
            axios(configuration)
                .then((result) => {
                    // redirect user to the auth page
                    console.log(result.data.thuonglai)
                    setThuongLaiLists(result.data.thuonglai);
                })
                .catch((error) => {
                    if(error.request.status === 505){
                        return toast.error("Không có thương lái nào được tạo!", {
                            position: toast.POSITION.TOP_RIGHT,
                        })
                        }
                });
        } 
        getThuongLai();
      },[props.sendData, formEdit, thuonglaiDelete]);
      
    const datas = thuonglaiLists;

    let idThuongLai;
    const getIdThuongLai = (id) => idThuongLai = id;

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();

        setFormEdit(true);
        
        // set configurations
        const configuration = {
            method: "get",
            url: `http://localhost:3000/api/thuonglai/${idThuongLai}/edit`,
        };

        // make the API call
        axios(configuration)
        .then((result) => {
            setDataEdit(result.data.thuonglai);
            setThuongLaiEdit(true);
        })
        .catch((error) => {
            if(error.request.status === 505){
                return toast.error("Không thể cập nhật thương lái!", {
                    position: toast.POSITION.TOP_RIGHT,
                    })
                }
        });
    }

    const handleDeleteThuongLai = (e) => {
        e.preventDefault();

        // set configurations
        const configuration = {
            method: "delete",
            url: `http://localhost:3000/api/thuonglai/${idThuongLai}`,
        };

        // make the API call
        axios(configuration)
        .then((result) => {
            if(result.data.errCode === 201) { 
                setSuccessMessage(
                    toast.success("Xóa thành công !", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                )
            } else { 
                setErrorMessage(
                    toast.error("Xóa không thành công !", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                )
            }
            setThuongLaiDelete(true);
        })
        .catch((error) => {
            if(error.request.status === 505){
                return toast.error("Không thể xóa thương lái!", {
                    position: toast.POSITION.TOP_RIGHT,
                    })
                }
        });
    }


    const handleClickFrom = (e) => {
        // 👇️ take parameter passed from Child component
        setFormEdit(e);
      };

    // console.log(dataEdit);

    return (
        <>  
                {formEdit ? (
                    <EditThuongLai dataSend={dataEdit} handleClickFrom={handleClickFrom} />
                ) : (
                    <div className={cx('CSNT-container-list')}>
                        <div className={cx('title-csnt-list')}>Danh sách thương lái</div>
                        <Table responsive hover>
                            <thead>
                                <tr className="align-middle">
                                    <th>#</th>
                                    <th className="text-center">Tên thương lái</th>
                                    <th>Giới tính</th>
                                    <th>Số điện thoại</th>
                                    <th>Địa chỉ</th>
                                    <th className="text-center" colSpan="2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datas.map((data, index) => (
                                    <tr key={data._id} className="align-middle">
                                        <td> {index + 1} </td>
                                        <td> {data.ten} </td>
                                        <td> {data.gioitinh} </td>
                                        <td> {data.sdt} </td>
                                        <td> {data.diachi} </td>
                                        <td className="text-center"> 
                                            <Button
                                                className={cx('btn-submit-edit', 'btn', 'btn--primary') }
                                                variant="primary"
                                                type="submit"
                                                onClick={(e) => {
                                                    getIdThuongLai(data._id);
                                                    handleSubmit(e);
                                                    }
                                                }
                                            >
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </Button>
                                        </td>
                                        <td className="text-center"> 
                                            <Button
                                                className={cx('btn-submit-edit', 'btn', 'btn--success') }
                                                variant="danger"
                                                type="submit"
                                                onClick={(e) => {
                                                    getIdThuongLai(data._id);
                                                    handleDeleteThuongLai(e);
                                                    }
                                                }
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button> 
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                )}
        </>
    );
}

export default GetThuongLaiList;
