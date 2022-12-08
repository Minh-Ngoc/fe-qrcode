/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
/* eslint-disable no-unused-vars */
import { useLocation } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button } from "react-bootstrap";
//Library react toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Table from 'react-bootstrap/Table';

import EditCSMT from './editCSMT'

import classNames from 'classnames/bind';
import styles from './CSMT.module.scss';

const cx = classNames.bind(styles);

function GetCSMTList() {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Get userId from Auth Component 
    const location = useLocation();
    const userData = location.state.userId;

    const [csmtLists, setCSMTLists] = useState([]);
    const [csmt, setCSMTEdit] = useState(false);
    const [formEdit, setFormEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState('');

    const [csmtDelete, setCSMTDelete] = useState(false);


    useEffect(() => {
        async function getNCCConGiong(){
            console.log(userData)
            const configuration = {
                method: "GET",
                url: `http://localhost:3000/api/chisomoitruong/${userData}/list`,
            };
            // make the API call
            axios(configuration)
                .then((result) => {
                    // redirect user to the auth page
                    console.log(result.data.chisomoitruong)
                    setCSMTLists(result.data.chisomoitruong);
                })
                .catch((error) => {
                    if(error.request.status === 505){
                        return toast.error("Không có chỉ số môi trường nào được tạo!", {
                            position: toast.POSITION.TOP_RIGHT,
                        })
                        }
                });
        } 
        getNCCConGiong();
      },[]);
      
    const datas = csmtLists;

    let idCSMT;
    const getIdCSMT = (id) => idCSMT = id;

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();

        setFormEdit(true);
        
        // set configurations
        const configuration = {
            method: "get",
            url: `http://localhost:3000/api/chisomoitruong/${idCSMT}/edit`,
        };

        // make the API call
        axios(configuration)
        .then((result) => {
            setDataEdit(result.data.csmt);
            setCSMTEdit(true);
        })
        .catch((error) => {
            if(error.request.status === 505){
                return toast.error("Không thể cập nhật chỉ số môi trường!", {
                    position: toast.POSITION.TOP_RIGHT,
                    })
                }
        });
    }

    const handleDeleteNCCConGiong = (e) => {
        e.preventDefault();

        // set configurations
        const configuration = {
            method: "delete",
            url: `http://localhost:3000/api/chisomoitruong/${idCSMT}`,
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
            setCSMTLists(result.data.csmt)
            setCSMTDelete(true);
        })
        .catch((error) => {
            if(error.request.status === 505){
                return toast.error("Không thể xóa chỉ số môi trường!", {
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
                    <EditCSMT dataSend={dataEdit} handleClickFrom={handleClickFrom} />
                ) : (
                    <div className={cx('CSNT-container-list')}>
                        <div className={cx('title-csnt-list')}>Danh sách chỉ số môi trường</div>
                        <Table responsive hover className="text-center">
                            <thead>
                                <tr className="align-middle">
                                    <th>#</th>
                                    <th>Tên chỉ số môi trường</th>
                                    <th>Đơn vị tính</th>
                                    <th colSpan="2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datas.map((data, index) => (
                                    <tr key={data._id} className="align-middle">
                                        <td> {index + 1} </td>
                                        <td> {data.ten} </td>
                                        <td> {data.donvitinh} </td>
                                        <td> 
                                            <Button
                                                className={cx('btn-submit-edit', 'btn', 'btn--primary') }
                                                variant="primary"
                                                type="submit"
                                                onClick={(e) => {
                                                    getIdCSMT(data._id);
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
                                                    getIdCSMT(data._id);
                                                    handleDeleteNCCConGiong(e);
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

export default GetCSMTList;
