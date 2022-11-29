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
    const [ctcongiong, setCTConGiong] = useState(false);
    const [loaicongiong, setLoaiConGiong] = useState(false);
    const [ncccongiong, setNCCConGiong] = useState(false);
    const [congiong, setConGiong] = useState(false);

    useEffect(() => {
        async function getData(){
            const configuration = {
                method: "GET",
                url: `http://localhost:3000/api/scanqrcode/${idDotNuoi}`,
            };
            // make the API call
            await axios(configuration)
                .then((result) => {
                    
                    setMessage(toast.success("Quét mã QR thành công!", {
                        position: toast.POSITION.TOP_RIGHT
                    }));

                    setData(result.data.dotnuoi[0]);
                    setCTConGiong(result.data.dotnuoi[0].ctcongiong[0]);
                    setConGiong(result.data.dotnuoi[0].ctcongiong[0].congiongs.ten);
                    setLoaiConGiong(result.data.dotnuoi[0].loaicongiongs[0].ten);
                    setNCCConGiong(result.data.dotnuoi[0].ncccongiongs[0].ten);
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

    console.log(congiong);

    return (
        <div id={cx('Scan-qrcode')}>
            <div className={cx('body_container')}>
                <div className="container-fluid">
                    <div className="titlePage text-center">
                        <h1>TRANG QUẢN LÝ QUÁ TRÌNH NUÔI TRỒNG THỦY SẢN</h1>
                    </div>
                    <hr/>
                    <div id={cx('content')} >
                        {!data ? '' : (
                            <div className={cx('container')}>
                            {/* <div className={cx('title-aonuoi-list')}></div> */}
                                <div className={cx('table')}>
                                    <Table responsive hover className="text-center">
                                        <thead>
                                            <tr className="align-middle">
                                                <th>Tên đợt nuôi</th>
                                                <th>Ao nuôi</th>
                                                <th>Năm nuôi</th>
                                                <th>Thời điểm</th>
                                                <th>Trạng thái</th>
                                                <th>Tình trạng</th>
                                                <th>Mã QR</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr key={data._id} className="align-middle">
                                                <td> {data.ten} </td>
                                                <td> {data.aonuois.map(aonuoi => aonuoi.ten)} </td>
                                                <td> {data.namnuoi} </td>
                                                <td> {data.thoidiem} </td>
                                                <td> {data.trangthai} </td>
                                                <td> {data.tinhtrang} </td>
                                                <td>
                                                    <img style={{width: "100px"}} src={data.qrImage} className="img-thumbnail" alt="..."></img>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>

                                <div className={cx('table', 'congiong')}>
                                    <Table responsive hover className="text-center">
                                        <thead>
                                            <tr className="align-middle">
                                                <th>Con giống</th>
                                                <th>Số lượng</th>
                                                <th>Ngày tuổi</th>
                                                <th>Chất lượng</th>
                                                <th>Loại con giống</th>
                                                <th>Nhà cung cấp</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr key={data._id} className="align-middle">
                                                <td> {congiong} </td>
                                                <td> {ctcongiong.soluong} </td>
                                                <td> {ctcongiong.ngaytuoi} </td>
                                                <td> {ctcongiong.chatluong} </td>
                                                <td> {loaicongiong} </td>
                                                <td> {ncccongiong} </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>    
    );
}

export default ScanQRCode;
