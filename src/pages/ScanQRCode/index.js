import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

// Call API
import axios from "axios";

//Library react toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Table from 'react-bootstrap/Table';

import styles from './ScanQRCode.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function ScanQRCode() {
    //Get id dot nuoi from scan QR Image
    const params = useParams();
    
    const idDotNuoi = params.id;
    console.log(idDotNuoi);

    const [message, setMessage] = useState('')

    const [data, setData] = useState(false);

    useEffect(() => {
        async function getData(){
            const configuration = {
                method: "GET",
                url: `http://localhost:3000/api/scanqrcode/${idDotNuoi}`,
            };
            // make the API call
            axios(configuration)
                .then((result) => {
                    
                    setMessage(toast.success("Quét mã QR thành công!", {
                        position: toast.POSITION.TOP_RIGHT
                    }));

                    setData(result.data.dotnuoi);
                })
                .catch((error) => {
                    if(error){
                        return toast.error("Sản phẩm không còn tồn tại!", {
                            position: toast.POSITION.TOP_RIGHT,
                        })
                    }
                });
        } 
        getData();
      },[]);

    // console.log(data)

    return (
        <div id={cx('Scan-qrcode')}>
            <div className={cx('body_container')}>
                <div className="container-fluid">
                    <div className="titlePage text-center">
                        <h1>TRANG QUẢN LÝ QUÁ TRÌNH NUÔI TRỒNG THỦY SẢN</h1>
                    </div>
                    <hr/>
                    <div id={cx('content')} >
                        <div className={cx('container')}>
                            {/* <div className={cx('title-aonuoi-list')}></div> */}
                            <Table responsive hover className="text-center">
                                <thead>
                                    <tr className="align-middle">
                                        <th>Tên đợt nuôi</th>
                                        <th>Năm nuôi</th>
                                        <th>Thời điểm</th>
                                        <th>Trạng thái</th>
                                        <th>Tình trạng</th>
                                        <th>Ao nuôi</th>
                                        <th>Mã QR</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key={data._id} className="align-middle">
                                        <td> {data.ten} </td>
                                        <td> {data.namnuoi} </td>
                                        <td> {data.thoidiem} </td>
                                        <td> {data.trangthai} </td>
                                        <td> {data.tinhtrang} </td>
                                        <td> {data.aonuoi} </td>
                                        <td>
                                            <img style={{width: "100px"}} src={data.qrImage} className="img-thumbnail" alt="..."></img>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>    
    );
}

export default ScanQRCode;
