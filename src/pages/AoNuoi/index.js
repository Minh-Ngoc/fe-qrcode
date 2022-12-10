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
import styles from './AoNuoi.module.scss';

import AddAoNuoi from './addAoNuoi';
import GetAoNuoiList from './getAoNuoiList';

const cx = classNames.bind(styles);


function AoNuoi() {
    const [key, setKey] = useState('GetAoNuoiList');
    const [data, setData] = useState([]);
    const location = useLocation();
    const userData = location.state.userId;

    useEffect(() => {
        document.title = "Ao nuôi";
        async function getAoNuoi(){
            // console.log(userData)
            const configuration = {
                method: "GET",
                url: `http://localhost:3000/api/aonuoi/${userData}/list`,
            };
            // make the API call
            axios(configuration)
                .then((result) => {
                    // redirect user to the auth page
                    // console.log(result.data.dataLists)
                    setData(result.data.dataLists);
                })
                .catch((error) => error);
        } 
        getAoNuoi();
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
                    <Tab eventKey="GetAoNuoiList" title="Danh sách ao nuôi">
                        <GetAoNuoiList sendData={data} />
                    </Tab>
                    <Tab eventKey="AddAoNuoi" title="Thêm ao nuôi">
                        <AddAoNuoi />
                    </Tab>
                </Tabs>
            </div>

            <ToastContainer/>
                {/* Same as */}
        </>
    );
}

export default AoNuoi;
