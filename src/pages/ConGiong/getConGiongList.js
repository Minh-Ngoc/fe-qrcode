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

import Scrollbars from "react-custom-scrollbars-2";

import Table from 'react-bootstrap/Table';

import EditConGiong from './editConGiong'

import classNames from 'classnames/bind';
import styles from './ConGiong.module.scss';

const cx = classNames.bind(styles);

function GetConGiongList(props) {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Get userId from Auth Component 
    const location = useLocation();
    const userData = location.state.userId;

    const [congiongLists, setConGiongLists] = useState(props.sendData);
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
                        return toast.error("Kh??ng c?? ?????t nu??i n??o ???????c t???o!", {
                            position: toast.POSITION.TOP_RIGHT,
                        })
                    }
                });
        } 
        getConGiong();
      },[props.sendData, congiongDelete,formEdit]);
      
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
                return toast.error("Kh??ng th??? c???p nh???t ?????t nu??i!", {
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
            url: `http://localhost:3000/api/congiong/${idConGiong}`,
            params: {
                tkId: userData,
            },
        };

        // make the API call
        axios(configuration)
        .then((result) => {
            if(result.data.errCode === 201) { 
                setSuccessMessage(
                    toast.success("X??a th??nh c??ng !", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                )
                setConGiongDelete(true);
            return setConGiongDelete('');

            } else { 
                setErrorMessage(
                    toast.error("X??a kh??ng th??nh c??ng !", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                )
            }
        })
        .catch((error) => {
            if(error.request.status === 505){
                return toast.error("Kh??ng th??? x??a ?????t nu??i!", {
                    position: toast.POSITION.TOP_RIGHT,
                    })
                }
        });
    }


    const handleClickFrom = (e) => {
        // ??????? take parameter passed from Child component
        setFormEdit(e);
      };

    // console.log(dataEdit);

    return (
        <>  
                {formEdit ? (
                    <EditConGiong dataSend={dataEdit} aonuoiList={aonuoiLists} handleClickFrom={handleClickFrom} />
                ) : (
                    <div className={cx('AoNuoi-container-list')}>
                        <div className={cx('title-aonuoi-list')}>Danh s??ch ?????t nu??i</div>
                        <Table responsive hover className="text-center">
                            <thead>
                                <tr className="align-middle">
                                    <th>#</th>
                                    <th>T??n con gi???ng</th>
                                    <th>Lo???i con gi???ng</th>
                                    <th>Nh?? cung c???p</th>
                                    <th>M?? t???</th>
                                    {/* <th>H??nh ???nh</th> */}
                                    <th className="text-center" colSpan="2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datas.map((data, index) => {
                                    return (
                                        <tr key={data._id} className="align-middle">
                                            <td> {index + 1 } </td>
                                            <td> {data.ten} </td>
                                            <td> 
                                                {data.loaicongiongs.map(loaicongiong => loaicongiong.ten)}     
                                            </td>
                                            <td>
                                                {data.ncccongiongs.map(ncccongiong => ncccongiong.ten)}
                                            </td>
                                            <td style={{width: '500px'}}> 
                                                <Scrollbars style={{height: 100}}>
                                                    {data.mota} 
                                                </Scrollbars>
                                            </td>
                                            {/* <td> 
                                                {(data.hinhanh) ? (
                                                    <img style={{width: "100px"}} src={data.hinhanh} class="img-thumbnail" alt="..."></img>
                                                ) : 'Ch??a ch???n h??nh con gi???ng!'
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
