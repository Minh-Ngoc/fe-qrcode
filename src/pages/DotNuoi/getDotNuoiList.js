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

import EditDotNuoi from './editDotNuoi'

import classNames from 'classnames/bind';
import styles from './DotNuoi.module.scss';

const cx = classNames.bind(styles);

function GetDotNuoiList(props) {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Get userId from Auth Component 
    const location = useLocation();
    const userData = location.state.userId;

    const [dotnuoiLists, setDotNuoiLists] = useState(props.sendData);
    const [aonuoiLists, setAoNuoiLists] = useState([]);
    const [congiongLists, setConGiongLists] = useState([]);

    const [formEdit, setFormEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState('');

    const [dotnuoiDelete, setDotNuoiDelete] = useState(false);


    useEffect(() => {
        async function getDotNuoi(){
            // console.log(userData)
            const configuration = {
                method: "GET",
                url: `http://localhost:3000/api/dotnuoi/${userData}/list`,
            };
            // make the API call
            axios(configuration)
                .then((result) => {
                    // redirect user to the auth page
                    // console.log(result.data.aonuoi)
                    setDotNuoiLists(result.data.dotnuoi);
                    setAoNuoiLists(result.data.aonuoi);
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
        getDotNuoi();
      },[props.sendData, dotnuoiDelete, formEdit]);
      
    const datas = dotnuoiLists;

    let idDotNuoi;
    const getIdDotNuoi = (id) => idDotNuoi = id;

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();

        setFormEdit(true);
        
        // set configurations
        const configuration = {
            method: "get",
            url: `http://localhost:3000/api/dotnuoi/${idDotNuoi}/edit`,
            params: {
                tkId: userData,
            },
        };

        // make the API call
        axios(configuration)
        .then((result) => {
            // setAoNuoiLists(result.data.aonuoi)
            setDataEdit(result.data.dotnuoi);
        })
        .catch((error) => {
            if(error.request.status === 505){
                return toast.error("Kh??ng th??? c???p nh???t ?????t nu??i!", {
                    position: toast.POSITION.TOP_RIGHT,
                    })
                }
        });
    }

    const handleDeleteDotNuoi = (e) => {
        e.preventDefault();

        // set configurations
        const configuration = {
            method: "delete",
            url: `http://localhost:3000/api/dotnuoi/${idDotNuoi}`,
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
            } else { 
                setErrorMessage(
                    toast.error("X??a kh??ng th??nh c??ng !", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                )
            }
            setDotNuoiDelete(true);
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

    // console.log(datas.ctcongiong);

    return (
        <>  
                {formEdit ? (
                    <EditDotNuoi dataSend={dataEdit} congiongLists={congiongLists} aonuoiLists={aonuoiLists} handleClickFrom={handleClickFrom} />
                ) : (
                    <div className={cx('AoNuoi-container-list')}>
                        <div className={cx('title-aonuoi-list')}>Danh s??ch ?????t nu??i</div>
                        <Table responsive hover className="text-center">
                            <thead>
                                <tr className="align-middle">
                                    <th>#</th>
                                    <th>T??n ?????t nu??i</th>
                                    <th>N??m nu??i</th>
                                    <th>Th???i ??i???m</th>
                                    <th>Tr???ng th??i</th>
                                    <th>T??nh tr???ng</th>
                                    <th>Ao nu??i</th>
                                    <th>Con gi???ng</th>
                                    <th>M?? QR</th>
                                    <th className="text-center" colSpan="2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datas.map((data, index) => {
                                    return (
                                        <tr key={data._id} className="align-middle">
                                            <td> {index + 1 } </td>
                                            <td> {data.ten} </td>
                                            <td> {data.namnuoi} </td>
                                            <td> {data.thoidiem} </td>
                                            <td> {data.trangthai} </td>
                                            <td> {data.tinhtrang} </td>
                                            <td> 
                                                {aonuoiLists.map(aonuoi => (aonuoi._id !== data.aonuoiId) ? '' : aonuoi.ten )} 
                                            </td>
                                            <td> 
                                                {data.ctcongiong.map(congiong => congiongLists.map(congiongList => (congiongList._id !== congiong.congiongId) ? '' : congiongList.ten))} 
                                            </td>
                                            <td> 
                                                {(data.qrImage) ? (
                                                    <img style={{width: "100px"}} src={data.qrImage} className="img-thumbnail" alt="..."></img>
                                                ) : 'Ch??a c???p m?? QR'
                                                } 
                                            </td>
                                            <td className="text-center"> 
                                                <Button
                                                    className={cx('btn-submit-edit', 'btn', 'btn--primary') }
                                                    variant="primary"
                                                    type="submit"
                                                    onClick={(e) => {
                                                        getIdDotNuoi(data._id);
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
                                                        getIdDotNuoi(data._id);
                                                        handleDeleteDotNuoi(e);
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

export default GetDotNuoiList;
