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
import styles from './NCCConGiong.module.scss';

import AddNCCConGiong from './addNCCConGiong';
import GetNCCConGiongList from './getNCCConGiongList';

const cx = classNames.bind(styles);


function CoSoNuoiTrong() {
    const [key, setKey] = useState('GetNCCConGiongList');
    const [data, setData] = useState([]);
    const location = useLocation();
    const userData = location.state.userId;

    useEffect(() => {
        document.title = "Nhà cung cấp con giống";

        async function getNCCConGiong(){
            console.log(userData)
            const configuration = {
                method: "GET",
                url: `http://localhost:3000/api/nhacungcapcongiong/${userData}/list`,
            };
            // make the API call
            axios(configuration)
                .then((result) => {
                    // redirect user to the auth page
                    console.log(result.data.ncccongiong)
                    setData(result.data.ncccongiong);
                })
                .catch((error) => error);
        } 
        getNCCConGiong();
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
                    <Tab eventKey="GetNCCConGiongList" title="Danh sách nhà cung cấp con giống">
                        <GetNCCConGiongList sendData={data} />
                    </Tab>
                    <Tab eventKey="AddNCCConGiong" title="Thêm nhà cung cấp con giống">
                        <AddNCCConGiong />
                    </Tab>
                </Tabs>
            </div>

            <ToastContainer/>
                {/* Same as */}
        </>
    );
}

export default CoSoNuoiTrong;
