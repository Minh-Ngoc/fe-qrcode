/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
//Library react toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classNames from 'classnames/bind';
import styles from './ThuongLai.module.scss';

import AddThuongLai from './addThuongLai';
import GetThuongLaiList from './getThuongLaiList';

const cx = classNames.bind(styles);


function CoSoNuoiTrong() {
    const [key, setKey] = useState('GetThuongLaiList');
    const [data, setData] = useState([]);
    const location = useLocation();
    const userData = location.state.userId;

    useEffect(() => {
        document.title = "Thương lái";

        async function getThuongLai(){
            console.log(userData)
            const configuration = {
                method: "GET",
                url: `http://localhost:3000/api/thuonglai/${userData}/list`,
            };
            // make the API call
            axios(configuration)
                .then((result) => {
                    // redirect user to the auth page
                    setData(result.data.thuonglai);
                })
                .catch((error) => error);
        } 
        getThuongLai();
     }, [key]);
        
    return (
        <>  
            <div className={cx('nav-bar-btn')}>
                <Tabs
                    id="fill-tab-example"
                    className={'mb-3'}
                    fill
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                >
                    <Tab eventKey="GetThuongLaiList" title="Danh sách thương lái">
                        <GetThuongLaiList sendData={data}/>
                    </Tab>
                    <Tab eventKey="AddThuongLai" title="Thêm thương lái">
                        <AddThuongLai />
                    </Tab>
                </Tabs>
            </div>

            <ToastContainer/>
                {/* Same as */}
        </>
    );
}

export default CoSoNuoiTrong;
