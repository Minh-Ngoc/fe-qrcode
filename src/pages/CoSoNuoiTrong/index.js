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
import styles from './CoSoNuoiTrong.module.scss';

import AddCSNT from './addCSNT';
import GetCSNTList from './getCSNTList';

const cx = classNames.bind(styles);


function CoSoNuoiTrong() {
    const [key, setKey] = useState('GetCSNTList');
    const [data, setData] = useState([]);
    const location = useLocation();
    const userData = location.state.userId;

    useEffect(() => {
        document.title = "Cơ sở nuôi trồng";

        async function getCSNT(){
            // console.log(userData)
            const configuration = {
                method: "GET",
                url: `http://localhost:3000/api/cosonuoitrong/${userData}/list`,
            };
            // make the API call
            axios(configuration)
                .then((result) => {
                    // redirect user to the auth page
                    // console.log(result.data.csnt)
                    setData(result.data.csnt);
                })
                .catch((error) => error);
        } 
        getCSNT();
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
                    <Tab eventKey="GetCSNTList" title="Danh sách cơ sở nuôi trồng">
                        <GetCSNTList sendData={data} />
                    </Tab>
                    <Tab eventKey="AddCSNT" title="Thêm cơ sở nuôi trồng">
                        <AddCSNT />
                    </Tab>
                </Tabs>
            </div>

            <ToastContainer/>
                {/* Same as */}
        </>
    );
}

export default CoSoNuoiTrong;
