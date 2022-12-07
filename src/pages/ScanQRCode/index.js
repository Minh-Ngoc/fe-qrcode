import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';

import { Scrollbars } from 'react-custom-scrollbars-2';

import { Table } from "react-bootstrap";
// Call API
import axios from "axios";

//Library react toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import Table from 'react-bootstrap/Table';

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
    const [cosonuoitrong, setCoSoNuoiTrong] = useState(false);
    const [aonuoi, setAoNuoi] = useState(false);
    const [giaidoan, setGiaiDoan] = useState(false);
    const [thucanLists, setThucAn] = useState(false);
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

                    document.title = !result.data.dotnuoi[0].ctcongiong[0].congiongs.ten ? 'Quét mã QR' : result.data.dotnuoi[0].ctcongiong[0].congiongs.ten;
                    setCoSoNuoiTrong(result.data.dotnuoi[0].cosonuoitrongs[0]);
                    setAoNuoi(result.data.dotnuoi[0].aonuois[0]);
                    setGiaiDoan(result.data.dotnuoi[0].giaidoans[0]);
                    setThucAn(result.data.thucan);
                    setData(result.data.dotnuoi[0]);
                    setCTConGiong(result.data.dotnuoi[0].ctcongiong[0]);
                    setConGiong(result.data.dotnuoi[0].ctcongiong[0].congiongs);
                    setLoaiConGiong(result.data.dotnuoi[0].loaicongiongs[0]);
                    setNCCConGiong(result.data.dotnuoi[0].ncccongiongs[0]);
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

    // console.log(thucanLists);

    return (
        <div id={cx('Scan-qrcode')}>
            <div className={cx('body_container')}>
                <div className="container-fluid">
                    <div className="titlePage text-center">
                        <h1>TRANG QUẢN LÝ QUÁ TRÌNH NUÔI TRỒNG THỦY SẢN</h1>
                    </div>
                    <hr/>
                    <div id={cx('content')} >
                        <div className="d-flex">
                            <div className={cx('content-qr-image')}>
                                <img style={{width: "180px"}} src={data.qrImage} className="img-thumbnail" alt="..."></img>
                            </div>

                            <Scrollbars style={{ height: 600 }}>
                                <div className={'d-flex flex-column mt-3 ms-5 me-5 ' + cx('bg-content')}>

                                    <div className={cx('content-text')}>
                                        <div className={cx('title')}>
                                            <div className={cx('icon')}><FontAwesomeIcon icon={faSnowflake} /></div>
                                            Con giống:
                                        </div>
                                        <div className={cx('value')}>
                                            <li>Loại con giống: {loaicongiong.ten}</li>
                                            <li>Tên con giống: {congiong.ten}</li>
                                            <li>Số lượng con giống: {ctcongiong.soluong}</li>
                                            <li>Ngày tuổi: {ctcongiong.ngaytuoi} ngày</li>
                                            <li>Chất lượng: {ctcongiong.chatluong}</li>
                                            <li>Nhà cung cấp con giống:</li>
                                            <ul>
                                                <li>Tên nhà cung cấp con giống: {ncccongiong.ten}</li>
                                                <li>Địa chỉ: {ncccongiong.diachi}</li>
                                                <li>Số điện thoại: {ncccongiong.sdt}</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className={cx('content-text')}>
                                        <div className={cx('title')}>
                                            <div className={cx('icon')}><FontAwesomeIcon icon={faSnowflake} /></div>
                                            Cơ sở nuôi trồng:
                                        </div>
                                        <div className={cx('value')}>
                                            <li>Tên cơ sỏ nuôi trồng: {cosonuoitrong.ten} </li>
                                            <li>Chủ sở hữu: {cosonuoitrong.chusohuu} </li>
                                            <li>Địa chỉ: {cosonuoitrong.diachi} </li>
                                            <li>Số điện thoại: {cosonuoitrong.sdt} </li>
                                            <li>Diện tích: {cosonuoitrong.dientich} m<sup>2</sup> </li>
                                            <li>Thể tích mặt nước: {cosonuoitrong.dtmatnuoc} m<sup>3</sup></li>
                                            <li>Năm đăng ký: {cosonuoitrong.namdangky} </li>
                                        </div>
                                    </div>

                                    <div className={cx('content-text')}>
                                        <div className={cx('title')}>
                                            <div className={cx('icon')}><FontAwesomeIcon icon={faSnowflake} /></div>
                                            Ao nuôi:
                                        </div>
                                        <div className={cx('value')}>
                                            <li>Diện tích ao nuôi: {aonuoi.dientich} m<sup>2</sup></li>
                                        </div>
                                    </div>

                                    <div className={cx('content-text')}>
                                        <div className={cx('title')}>
                                            <div className={cx('icon')}><FontAwesomeIcon icon={faSnowflake} /></div>
                                            Giai đoạn nuôi:
                                        </div>
                                        <div className={cx('value')}>
                                            <li>{giaidoan.ten}</li>
                                            <li>Thời điểm: {giaidoan.thoidiem}</li>
                                            {(giaidoan.ghichu && giaidoan.ghichu !== '') ? (
                                                <li>Ghi chú: {giaidoan.ghichu}</li>
                                                ) : ''
                                            }
                                            <li>Thức ăn đã sử dụng: (Được thể hiện dưới dạng bảng dưới đây) </li>
                                            
                                            <div className={'mt-3 mb-3 ' + cx('table-content')}>
                                                <Table responsive hover className="text-center">
                                                    <thead>
                                                        <tr className="align-middle">
                                                            <th>#</th>
                                                            <th>Thời điểm cho ăn </th>
                                                            <th>Lượng thức ăn</th>
                                                            <th>Tên thức ăn</th>
                                                            <th>Loại thức ăn</th>
                                                            <th>Nhà cung cấp thức ăn</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {giaidoan.thucan ? giaidoan.thucan.map((thucan, index) => 
                                                        thucanLists.map(list => (list._id === thucan.thucanId) ? (
                                                        <tr key={data._id} className="align-middle">
                                                            <td> {++index} </td>
                                                            <td>{thucan.thoidiem} </td>
                                                            <td>{thucan.luongthucan} kg</td>
                                                            <td>{list.ten} kg</td>
                                                            <td>{list.loaithucan}</td>
                                                            <td> {list.ncc} </td>
                                                        </tr>
                                                        ) : '') 
                                                    ) : ''}

                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </Scrollbars>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>    
    );
}

export default ScanQRCode;