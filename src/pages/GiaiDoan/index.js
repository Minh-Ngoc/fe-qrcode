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
import styles from './GiaiDoan.module.scss';

import AddGiaiDoan from './addGiaiDoan';
import GetGiaiDoanList from './getGiaiDoanList';

const cx = classNames.bind(styles);


function GiaiDoan() {
    const [key, setKey] = useState('GetGiaiDoanList');
    const [data, setData] = useState([]);
    const location = useLocation();
    const userData = location.state.userId;

    useEffect(() => {
        document.title = "Giai đoạn nuôi";

        async function getGiaiDoan(){
            // console.log(userData)
            const configuration = {
                method: "GET",
                url: `http://localhost:3000/api/giaidoan/${userData}/list`,
            };
            // make the API call
            axios(configuration)
                .then((result) => {
                    // redirect user to the auth page
                    // console.log(result.data.dataLists)
                    setData(result.data.giaidoan);
                })
                .catch((error) => error);
        } 
        getGiaiDoan();
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
                    <Tab eventKey="GetGiaiDoanList" title="Danh sách giai đoạn nuôi">
                        <GetGiaiDoanList sendData={data} />
                    </Tab>
                    <Tab eventKey="AddGiaiDoan" title="Thêm giai đoạn nuôi">
                        <AddGiaiDoan />
                    </Tab>
                </Tabs>
            </div>

            <ToastContainer/>
                {/* Same as */}
        </>
    );
}

export default GiaiDoan;
