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
import styles from './CSMT.module.scss';

import AddCSMT from './addCSMT';
import GetCSMTList from './getCSMTList';

const cx = classNames.bind(styles);


function ChiSoMoiTruong() {
    const [key, setKey] = useState('GetCSMTList');
    const [data, setData] = useState([]);
    const location = useLocation();
    const userData = location.state.userId;

    useEffect(() => {
        document.title = "Chỉ số môi trường";

        async function getCSMT(){
            console.log(userData)
            const configuration = {
                method: "GET",
                url: `http://localhost:3000/api/chisomoitruong/${userData}/list`,
            };
            // make the API call
            axios(configuration)
                .then((result) => {
                    // redirect user to the auth page
                    console.log(result.data.chisomoitruong)
                    setData(result.data.chisomoitruong);
                })
                .catch((error) => error);
        } 
        getCSMT();

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
                    <Tab eventKey="GetCSMTList" title="Danh sách chỉ số môi trường">
                        <GetCSMTList sendData={data} />
                    </Tab>
                    <Tab eventKey="AddCSMT" title="Thêm chỉ số môi trường">
                        <AddCSMT />
                    </Tab>
                </Tabs>
            </div>

            <ToastContainer/>
                {/* Same as */}
        </>
    );
}

export default ChiSoMoiTruong;
