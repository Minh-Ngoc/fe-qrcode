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
import styles from './NKXA.module.scss';

import AddNKXA from './addNKXA';
import GetNKXAList from './getNKXAList';

const cx = classNames.bind(styles);


function NhatKyXuatAo() {
    const [key, setKey] = useState('GetNKXAList');
    const [data, setData] = useState([]);
    const location = useLocation();
    const userData = location.state.userId;

    useEffect(() => {
        document.title = "Nhật ký xuất ao";

        async function getAoNuoi(){
            // console.log(userData)
            const configuration = {
                method: "GET",
                url: `http://localhost:3000/api/nhatkyxuatao/${userData}/list`,
            };
            // make the API call
            axios(configuration)
                .then((result) => {
                    // redirect user to the auth page
                    // console.log(result.data.dataLists)
                    setData(result.data.aonuoi);
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
                    <Tab eventKey="GetNKXAList" title="Danh sách nhật ký xuất ao">
                        <GetNKXAList sendData={data}/>
                    </Tab>
                    <Tab eventKey="AddNKXA" title="Thêm nhật ký xuất ao">
                        <AddNKXA />
                    </Tab>
                </Tabs>
            </div>

            <ToastContainer/>
                {/* Same as */}
        </>
    );
}

export default NhatKyXuatAo;
