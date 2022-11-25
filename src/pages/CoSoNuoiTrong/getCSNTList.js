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

import EditCSNT from './editCSNT'

import classNames from 'classnames/bind';
import styles from './CoSoNuoiTrong.module.scss';

const cx = classNames.bind(styles);

function GetCSNTList() {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Get userId from Auth Component 
    const location = useLocation();
    const userData = location.state.userId;

    const [csntLists, setCSNTLists] = useState([]);
    const [csntEdit, setCSNTEdit] = useState(false);
    const [formEdit, setFormEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState('');

    const [csntDelete, setCSNTDelete] = useState(false);


    useEffect(() => {
        async function getCSNT(){
            console.log(userData)
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
      
    const datas = csntLists;

    let idCSNT;
    const getIdCSNT = (id) => idCSNT = id;

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();

        setFormEdit(true);
        
        // set configurations
        const configuration = {
            method: "get",
            url: `http://localhost:3000/api/cosonuoitrong/${idCSNT}/edit`,
            params: {
                tkId: userData,
            },
        };

        // make the API call
        axios(configuration)
        .then((result) => {
            setDataEdit(result.data.csnt);
            setCSNTEdit(true);
        })
        .catch((error) => {
            if(error.request.status === 505){
                return toast.error("Không thể cập nhật cơ sở nuôi trồng!", {
                    position: toast.POSITION.TOP_RIGHT,
                    })
                }
        });
    }

    const handleDeleteCSNT = (e) => {
        e.preventDefault();

        // set configurations
        const configuration = {
            method: "delete",
            url: `http://localhost:3000/api/cosonuoitrong/${idCSNT}`,
            params: {
                tkId: userData,
            },
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
            setCSNTLists(result.data.csnt)
            setCSNTDelete(true);
        })
        .catch((error) => {
            if(error.request.status === 505){
                return toast.error("Không thể xóa cơ sở nuôi trồng!", {
                    position: toast.POSITION.TOP_RIGHT,
                    })
                }
        });
    }


    const handleClickFrom = (e, data) => {
        // 👇️ take parameter passed from Child component
        setCSNTLists(data)
        setFormEdit(e);
      };

    // console.log(dataEdit);

    return (
        <>  
                {formEdit ? (
                    <EditCSNT dataSend={dataEdit} handleClickFrom={handleClickFrom} />
                ) : (
                    <div className={cx('CSNT-container-list')}>
                        <div className={cx('title-csnt-list')}>Danh sách cơ sở nuôi trồng</div>
                        <Table responsive hover>
                            <thead>
                                <tr className="align-middle">
                                    <th>#</th>
                                    <th>Tên cơ sở nuôi trồng</th>
                                    <th>Chủ sở hữu</th>
                                    <th>Địa chỉ</th>
                                    <th>Số điện thoại</th>
                                    <th className="text-center">Diện tích</th>
                                    <th className="text-center">Diện tích mặt nước</th>
                                    <th className="text-center">Năm đăng ký</th>
                                    <th className="text-center" colSpan="2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datas.map((data, index) => (
                                    <tr key={data._id} className="align-middle">
                                        <td> {index + 1} </td>
                                        <td> {data.ten} </td>
                                        <td> {data.chusohuu} </td>
                                        <td> {data.diachi} </td>
                                        <td> {data.sdt} </td>
                                        <td className="text-center"> {data.dientich} </td>
                                        <td className="text-center"> {data.dtmatnuoc} </td>
                                        <td className="text-center"> {data.namdangky} </td>
                                        <td className="text-center"> 
                                            <Button
                                                className={cx('btn-submit-edit', 'btn', 'btn--primary') }
                                                variant="primary"
                                                type="submit"
                                                onClick={(e) => {
                                                    getIdCSNT(data._id);
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
                                                    getIdCSNT(data._id);
                                                    handleDeleteCSNT(e);
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

export default GetCSNTList;
