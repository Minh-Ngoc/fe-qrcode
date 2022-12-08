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

import EditConGiong from './editConGiong'

import classNames from 'classnames/bind';
import styles from './ConGiong.module.scss';

const cx = classNames.bind(styles);

function GetConGiongList() {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Get userId from Auth Component 
    const location = useLocation();
    const userData = location.state.userId;

    const [congiongLists, setConGiongLists] = useState([]);
    const [aonuoiLists, setAoNuoiLists] = useState([]);

    const [congiongEdit, setConGiongEdit] = useState(false);
    const [formEdit, setFormEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState('');

    const [congiongDelete, setConGiongDelete] = useState(false);


    useEffect(() => {
        async function getConGiong(){
            // console.log(userData)
            const configuration = {
                method: "GET",
                url: `http://localhost:3000/api/congiong/${userData}/list`,
            };
            // make the API call
            axios(configuration)
                .then((result) => {
                    // redirect user to the auth page
                    // console.log(result.data.dataLists)
                    setConGiongLists(result.data.congiong);
                })
                .catch((error) => {
                    if(error){
                        return toast.error("Không có đợt nuôi nào được tạo!", {
                            position: toast.POSITION.TOP_RIGHT,
                        })
                    }
                });
        } 
        getConGiong();
      },[]);
      
    const datas = congiongLists;

    let idConGiong;
    const getIdConGiong = (id) => idConGiong = id;

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();

        setFormEdit(true);
        
        // set configurations
        const configuration = {
            method: "get",
            url: `http://localhost:3000/api/aonuoi/${idConGiong}/edit`,
            params: {
                tkId: userData,
            },
        };

        // make the API call
        axios(configuration)
        .then((result) => {
            setAoNuoiLists(result.data.aonuoi)
            setDataEdit(result.data.congiong);
            setConGiongEdit(true);
        })
        .catch((error) => {
            if(error.request.status === 505){
                return toast.error("Không thể cập nhật đợt nuôi!", {
                    position: toast.POSITION.TOP_RIGHT,
                    })
                }
        });
    }

    const handleDeleteAoNuoi = (e) => {
        e.preventDefault();

        // set configurations
        const configuration = {
            method: "delete",
            url: `http://localhost:3000/api/aonuoi/${idConGiong}`,
            params: {
                aonuoiId: userData,
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
            setConGiongDelete(true);
        })
        .catch((error) => {
            if(error.request.status === 505){
                return toast.error("Không thể xóa đợt nuôi!", {
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
                    <EditConGiong dataSend={dataEdit} aonuoiList={aonuoiLists} handleClickFrom={handleClickFrom} />
                ) : (
                    <div className={cx('AoNuoi-container-list')}>
                        <div className={cx('title-aonuoi-list')}>Danh sách đợt nuôi</div>
                        <Table responsive hover className="text-center">
                            <thead>
                                <tr className="align-middle">
                                    <th>#</th>
                                    <th>Tên con giống</th>
                                    <th>Mô tả</th>
                                    <th>Loại con giống</th>
                                    <th>Nhà cung cấp</th>
                                    {/* <th>Hình ảnh</th> */}
                                    <th className="text-center" colSpan="2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datas.map((data, index) => {
                                    return (
                                        <tr key={data._id} className="align-middle">
                                            <td> {index + 1 } </td>
                                            <td> {data.ten} </td>
                                            <td> {data.mota} </td>
                                            <td> 
                                                {data.loaicongiongs.map(loaicongiong => loaicongiong.ten)}     
                                            </td>
                                            <td>
                                                {data.ncccongiongs.map(ncccongiong => ncccongiong.ten)}
                                            </td>
                                            {/* <td> 
                                                {(data.hinhanh) ? (
                                                    <img style={{width: "100px"}} src={data.hinhanh} class="img-thumbnail" alt="..."></img>
                                                ) : 'Chưa chọn hình con giống!'
                                                } 
                                            </td> */}
                                            <td className="text-center"> 
                                                <Button
                                                    className={cx('btn-submit-edit', 'btn', 'btn--primary') }
                                                    variant="primary"
                                                    type="submit"
                                                    onClick={(e) => {
                                                        getIdConGiong(data._id);
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
                                                        getIdConGiong(data._id);
                                                        handleDeleteAoNuoi(e);
                                                        }
                                                    }
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button> 
                                            </td>
                                        </tr>
                                )   })}
                            </tbody>
                        </Table>
                    </div>
                )}
        </>
    );
}

export default GetConGiongList;
