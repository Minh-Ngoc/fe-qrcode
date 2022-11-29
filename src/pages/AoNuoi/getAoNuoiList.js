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

import EditAoNuoi from './editAoNuoi'

import classNames from 'classnames/bind';
import styles from './AoNuoi.module.scss';

const cx = classNames.bind(styles);

function GetAoNuoiList() {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Get userId from Auth Component 
    const location = useLocation();
    const userData = location.state.userId;

    const [aonuoiLists, setAoNuoiLists] = useState([]);
    const [cosonuoitrongLists, setCoSoNuoiTrongLists] = useState([]);

    const [aonuoiEdit, setAoNuoiEdit] = useState(false);
    const [formEdit, setFormEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState('');

    const [aonuoiDelete, setAoNuoiDelete] = useState(false);


    useEffect(() => {
        async function getAoNuoi(){
            // console.log(userData)
            const configuration = {
                method: "GET",
                url: `http://localhost:3000/api/aonuoi/${userData}/list`,
            };
            // make the API call
            axios(configuration)
                .then((result) => {
                    // redirect user to the auth page
                    // console.log(result.data.dataLists)
                    setAoNuoiLists(result.data.dataLists);
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
      },[]);
      
    const datas = aonuoiLists;

    let idAoNuoi, idCSNT;
    const getIdAoNuoi = (id) => idAoNuoi = id;

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();

        setFormEdit(true);
        
        // set configurations
        const configuration = {
            method: "get",
            url: `http://localhost:3000/api/aonuoi/${idAoNuoi}/edit`,
            params: {
                tkId: userData,
            },
        };

        // make the API call
        axios(configuration)
        .then((result) => {
            setCoSoNuoiTrongLists(result.data.csnt)
            setDataEdit(result.data.aonuoi);
            setAoNuoiEdit(true);
        })
        .catch((error) => {
            if(error.request.status === 505){
                return toast.error("Không thể cập nhật ao nuôi!", {
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
            url: `http://localhost:3000/api/aonuoi/${idAoNuoi}`,
            params: {
                csntId: userData,
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
            setAoNuoiDelete(true);
        })
        .catch((error) => {
            if(error.request.status === 505){
                return toast.error("Không thể xóa ao nuôi!", {
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
    let indexx = 1;

    return (
        <>  
                {formEdit ? (
                    <EditAoNuoi dataSend={dataEdit} csntList={cosonuoitrongLists} handleClickFrom={handleClickFrom} />
                ) : (
                    <div className={cx('AoNuoi-container-list')}>
                        <div className={cx('title-aonuoi-list')}>Danh sách ao nuôi</div>
                        <Table responsive hover className="text-center">
                            <thead>
                                <tr className="align-middle">
                                    <th>#</th>
                                    <th>Tên ao nuôi</th>
                                    <th>Diện tích</th>
                                    <th>Tên cơ sở nuôi trồng</th>
                                    <th className="text-center" colSpan="2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datas.map(data => {
                                    const csntName = data.ten;
                                    return data.aonuois.map((aonuoi) => (
                                        <tr key={aonuoi._id} className="align-middle">
                                            <td> {indexx++} </td>
                                            <td> {aonuoi.ten} </td>
                                            <td> {aonuoi.dientich} </td>
                                            <td> {csntName} </td>
                                            <td className="text-center"> 
                                                <Button
                                                    className={cx('btn-submit-edit', 'btn', 'btn--primary') }
                                                    variant="primary"
                                                    type="submit"
                                                    onClick={(e) => {
                                                        getIdAoNuoi(aonuoi._id);
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
                                                        getIdAoNuoi(aonuoi._id);
                                                        handleDeleteAoNuoi(e);
                                                        }
                                                    }
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button> 
                                            </td>
                                        </tr>
                                )   )})}
                            </tbody>
                        </Table>
                    </div>
                )}
        </>
    );
}

export default GetAoNuoiList;
