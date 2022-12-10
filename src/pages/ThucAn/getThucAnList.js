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

import EditThucAn from './editThucAn'

import classNames from 'classnames/bind';
import styles from './ThucAn.module.scss';

const cx = classNames.bind(styles);

function GetThucAnList(props) {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Get userId from Auth Component 
    const location = useLocation();
    const userData = location.state.userId;

    const [thucanLists, setThucAnLists] = useState(props.sendData);
    const [thucan, setThucAnEdit] = useState(false);
    const [formEdit, setFormEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState('');

    const [thucanDelete, setThucAnDelete] = useState(false);


    useEffect(() => {
        async function getThucAn(){
            console.log(userData)
            const configuration = {
                method: "GET",
                url: `http://localhost:3000/api/thucan/${userData}/list`,
            };
            // make the API call
            axios(configuration)
                .then((result) => {
                    // redirect user to the auth page
                    console.log(result.data.thucan)
                    setThucAnLists(result.data.thucan);
                })
                .catch((error) => {
                    if(error.request.status === 505){
                        return toast.error("Không có thức ăn nào được tạo!", {
                            position: toast.POSITION.TOP_RIGHT,
                        })
                        }
                });
        } 
        getThucAn();
      },[props.sendData, thucanDelete, formEdit]);
      
    const datas = thucanLists;

    let idThucAn;
    const getIdThucAn = (id) => idThucAn = id;

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();

        setFormEdit(true);
        
        // set configurations
        const configuration = {
            method: "get",
            url: `http://localhost:3000/api/nhacungcapcongiong/${idThucAn}/edit`,
        };

        // make the API call
        axios(configuration)
        .then((result) => {
            setDataEdit(result.data.thucan);
            setThucAnEdit(true);
        })
        .catch((error) => {
            if(error.request.status === 505){
                return toast.error("Không thể cập nhật thức ăn!", {
                    position: toast.POSITION.TOP_RIGHT,
                    })
                }
        });
    }

    const handleDeleteThucAn = (e) => {
        e.preventDefault();

        // set configurations
        const configuration = {
            method: "delete",
            url: `http://localhost:3000/api/thucan/${idThucAn}`,
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
            setThucAnDelete(true);
        })
        .catch((error) => {
            if(error.request.status === 505){
                return toast.error("Không thể xóa thức ăn!", {
                    position: toast.POSITION.TOP_RIGHT,
                    })
                }
        });
    }


    const handleClickFrom = (e) => {
        // 👇️ take parameter passed from Child component
        setFormEdit(e);
    };

    console.log(props.sendData);

    return (
        <>  
                {formEdit ? (
                    <EditThucAn dataSend={dataEdit} handleClickFrom={handleClickFrom} />
                ) : (
                    <div className={cx('CSNT-container-list')}>
                        <div className={cx('title-csnt-list')}>Danh sách thức ăn</div>
                        <Table responsive hover>
                            <thead>
                                <tr className="align-middle">
                                    <th>#</th>
                                    <th className="text-center">Tên thức ăn</th>
                                    <th>Loại thức ăn</th>
                                    <th>Nhà cung cấp</th>
                                    <th>Ghi chú</th>
                                    <th className="text-center" colSpan="2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datas ? datas.map((data, index) => (
                                    <tr key={data._id} className="align-middle">
                                        <td> {index + 1} </td>
                                        <td> {data.ten} </td>
                                        <td> {data.loaithucan} </td>
                                        <td> {data.ncc} </td>
                                        <td> {(data.ghichu && data.ghichu !== '') ? data.ghichu : 'Không có ghi chú'} </td>
                                        <td className="text-center"> 
                                            <Button
                                                className={cx('btn-submit-edit', 'btn', 'btn--primary') }
                                                variant="primary"
                                                type="submit"
                                                onClick={(e) => {
                                                    getIdThucAn(data._id);
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
                                                    getIdThucAn(data._id);
                                                    handleDeleteThucAn(e);
                                                    }
                                                }
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button> 
                                        </td>
                                    </tr>
                                )) : ''}
                            </tbody>
                        </Table>
                    </div>
                )}
        </>
    );
}

export default GetThucAnList;
