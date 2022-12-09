/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
/* eslint-disable no-unused-vars */
import { useLocation } from "react-router-dom";
import axios from "axios";

import Scrollbars from "react-custom-scrollbars-2";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from "react-bootstrap";
//Library react toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Table from 'react-bootstrap/Table';

import EditNKXA from './editNKXA'

import classNames from 'classnames/bind';
import styles from './NKXA.module.scss';

const cx = classNames.bind(styles);

function GetNKXAList() {

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Get userId from Auth Component 
    const location = useLocation();
    const userData = location.state.userId;

    const [aonuoiLists, setAoNuoiLists] = useState([]);

    const [aonuoiEdit, setAoNuoiEdit] = useState(false);
    const [formEdit, setFormEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState('');

    const [aonuoiDelete, setAoNuoiDelete] = useState(false);


    useEffect(() => {
        async function getAoNuoi(){
            // console.log(userData)
            const configuration = {
                method: "GET",
                url: `http://localhost:3000/api/nhatkyxuatao/${userData}/list`,
            };
            // make the API call
            axios(configuration)
                .then((result) => {
                    // redirect user to the auth page
                    // console.log(result.data.dataLists)
                    setAoNuoiLists(result.data.aonuoi);
                })
                .catch((error) => {
                    if(error){
                        return toast.error("Không có nhật ký xuất ao nào được tạo!", {
                            position: toast.POSITION.TOP_RIGHT,
                        })
                    }
                });
        } 
        getAoNuoi();
      },[]);
      
    const datas = aonuoiLists;

    let idAoNuoi;
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

    return (
        <>  
                {formEdit ? (
                    <EditNKXA dataSend={dataEdit} handleClickFrom={handleClickFrom} />
                ) : (
                    <div className={cx('AoNuoi-container-list')}>
                        <div className={cx('title-aonuoi-list')}>Danh sách nhật ký xuất ao</div>
                        <Table responsive hover className="text-center">
                            <thead>
                                <tr className="align-middle">
                                    <th>#</th>
                                    <th>Tên ao nuôi</th>
                                    <th>Thời điểm xuất ao</th>
                                    <th>Khối lượng</th>
                                    <th>Phương pháp thu hoạch</th>
                                    <th>Tên thương lái</th>
                                    <th className="text-center" colSpan="2">Action</th>
                                </tr>
                            </thead>
                            <tbody>                                
                                {!datas ? '' : datas.map((aonuoi, index) =>

                                    aonuoi.nhatkyxuatao ? aonuoi.nhatkyxuatao.map( nkxa => (
                                        <tr key={aonuoi._id} className="align-middle">
                                            <td> {++index} </td>
                                            <td> {aonuoi.ten} </td>

                                            <td> {nkxa.thoidiem}</td>
                                            <td> {nkxa.khoiluong} tấn</td>
                                            <td> {nkxa.ppthuhoach}</td>
                                            <td> {aonuoi.thuonglais.map(thuonglai => thuonglai.ten)}</td>

                                            <td className="text-center" style={{width: '50px'}}> 
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
                                            <td className="text-center" style={{width: '50px'}}> 
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
                                    )) : ''
                                )}
                            </tbody>
                        </Table>
                    </div>
                )}
        </>
    );
}

export default GetNKXAList;
