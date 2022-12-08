/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
/* eslint-disable no-unused-vars */
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from "react-bootstrap";
//Library react toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Table from 'react-bootstrap/Table';

import EditGiaiDoan from './editGiaiDoan'

import Scrollbars from "react-custom-scrollbars-2";

import AddThucAnSD from './addThucAnSD';

import config from '../../config';

import classNames from 'classnames/bind';
import styles from './GiaiDoan.module.scss';

const cx = classNames.bind(styles);

function GetGiaiDoanList() {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [idSend, setId] = useState('');

    // Get userId from Auth Component 
    const location = useLocation();
    const userData = location.state.userId;

    const [giaidoanLists, setGiaiDoanLists] = useState([]);
    const [thucanLists, setThucAnLists] = useState([]);

    const [display, setDisplay] = useState('');

    const [giaidoanEdit, setGiaiDoanEdit] = useState(false);
    const [formEdit, setFormEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState('');

    const [giaidoanDelete, setGiaiDoanDelete] = useState(false);


    useEffect(() => {
        async function getAoNuoi(){
            // console.log(userData)
            const configuration = {
                method: "GET",
                url: `http://localhost:3000/api/giaidoan/${userData}/list`,
            };
            // make the API call
            axios(configuration)
                .then((result) => {
                    // redirect user to the auth page
                    // console.log(result.data.dataLists)
                    setGiaiDoanLists(result.data.giaidoan);
                    setThucAnLists(result.data.thucan);
                })
                .catch((error) => {
                    if(error){
                        return toast.error("Không có giai đoạn nuôi nào được tạo!", {
                            position: toast.POSITION.TOP_RIGHT,
                        })
                    }
                });
        } 
        getAoNuoi();
      },[]);
      
    const datas = giaidoanLists;

    let idGiaiDoan;
    const getIdGiaiDoan = (id) => idGiaiDoan = id;

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();

        setFormEdit(true);
        
        // set configurations
        const configuration = {
            method: "get",
            url: `http://localhost:3000/api/aonuoi/${idGiaiDoan}/edit`,
            params: {
                tkId: userData,
            },
        };

        // make the API call
        axios(configuration)
        .then((result) => {
            setDataEdit(result.data.giaidoan);
            setGiaiDoanEdit(true);
        })
        .catch((error) => {
            if(error.request.status === 505){
                return toast.error("Không thể cập nhật giai đoạn nuôi!", {
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
            url: `http://localhost:3000/api/aonuoi/${idGiaiDoan}`,
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
            setGiaiDoanDelete(true);
        })
        .catch((error) => {
            if(error.request.status === 505){
                return toast.error("Không thể xóa giai đoạn nuôi!", {
                    position: toast.POSITION.TOP_RIGHT,
                    })
                }
        });
    }

    const handleSetDisplay = () => {
        setDisplay((display === 'none') ? 'block' : 'none');
    }

    const handleSubmitAdd = (e) => {
        // 👇️ take parameter passed from Child component
        setDisplay('none');
        setId(idGiaiDoan)
        console.log(idGiaiDoan);
    };

    const handleClickFrom = (e) => {
        // 👇️ take parameter passed from Child component
        setFormEdit(e);
    };

    return (
        <>  
                {formEdit ? (
                    <EditGiaiDoan dataSend={dataEdit} handleClickFrom={handleClickFrom}/>
                ) : (
                    <>
                        {(display === 'none' ? (<AddThucAnSD dataSend={idSend} handleSetDisplay={handleSetDisplay} />) : '')}
                        
                        <div style={{display: display}} className={cx('AoNuoi-container-list')}>
                            <div className={cx('title-aonuoi-list')}>Danh sách giai đoạn nuôi</div>
                            <Table responsive hover className="text-center">
                                <thead>
                                    <tr className="align-middle">
                                        <th>#</th>
                                        <th>Tên giai đoạn nuôi</th>
                                        <th>Ao nuôi</th>
                                        <th>Thời điểm</th>
                                        <th className={cx('thucanDetail')}>Thức ăn sử dụng</th>
                                        <th>Ghi chú</th>
                                        <th className="text-center" colSpan="2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!datas ? '' : datas.map((data, index) => (
                                            <tr key={data._id} className="align-middle">
                                                <td> {++index} </td>
                                                <td> {data.ten} </td>
                                                <td> 
                                                    {data.aonuois.map(aonuoi => aonuoi.ten )} 
                                                </td>
                                                <td> {data.thoidiem} </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <Scrollbars style={{ minHeight: 120, width: 350, flex: 1 }}>
                                                            <div className={'list-group ' + cx('thucanDetail')}>
                                                                {data.thucan ? data.thucan.map((thucan, index) => (
                                                                    <div className="d-flex align-items-center list-group-item">
                                                                        <span>{++index}</span>
                                                                        <div className={cx('item-style-list')}>
                                                                            <li>Thời điểm cho ăn: {thucan.thoidiem} </li>    
                                                                            <li>Lượng thức ăn: {thucan.luongthucan} kg</li> 
                                                                            {thucanLists.map(list => (list._id === thucan.thucanId) ? (
                                                                                <li>Tên thức ăn: {list.ten}</li>                                     
                                                                            ) : '')}
                                                                            
                                                                        </div>
                                                                    </div>
                                                                )) : ''}
                                                            </div>
                                                        </Scrollbars>   
                                                        <div className="ps-2 pe-2">
                                                            <Button
                                                                className={cx('btn-submit-edit', 'btn', 'btn--success') }
                                                                variant="success"
                                                                type="submit"
                                                                onClick={async(e) => {
                                                                    await getIdGiaiDoan(data._id);
                                                                    handleSubmitAdd(e);
                                                                }}
                                                            >
                                                                <FontAwesomeIcon icon={faPlus} />
                                                            </Button>
                                                        </div>
                                                        
                                                    </div>

                                                </td>
                                                <td> {(data.ghichu === '') ? 'Không có ghi chú' : data.ghichu} </td>
                                                <td className="text-center"> 
                                                    <Button
                                                        className={cx('btn-submit-edit', 'btn', 'btn--primary') }
                                                        variant="primary"
                                                        type="submit"
                                                        onClick={(e) => {
                                                            getIdGiaiDoan(data._id);
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
                                                            getIdGiaiDoan(data._id);
                                                            handleDeleteAoNuoi(e);
                                                            }
                                                        }
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </Button> 
                                                </td>
                                            </tr>
                                    )   )}
                                </tbody>
                            </Table>
                        </div>
                    </>
                )}
        </>
    );
}

export default GetGiaiDoanList;
