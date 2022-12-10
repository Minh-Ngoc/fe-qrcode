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
import styles from './ConGiong.module.scss';

import AddConGiong from './addConGiong';
import GetConGiongList from './getConGiongList';

const cx = classNames.bind(styles);

function ConGiong() {
    const [key, setKey] = useState('GetConGiongList');
    const [data, setData] = useState([]);
    const location = useLocation();
    const userData = location.state.userId;

    useEffect(() => {
        document.title = "Con giống"

        async function getConGiong(){
            // console.log(userData)
            const configuration = {
                method: "GET",
                url: `http://localhost:3000/api/congiong/${userData}/list`,
            };
            // make the API call
            axios(configuration)
                .then((result) => {
                    // redirect user to the auth page
                    // console.log(result.data.dataLists)
                    setData(result.data.congiong);
                })
                .catch((error) => error);
        } 
        getConGiong();

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
                    <Tab eventKey="GetConGiongList" title="Danh sách con giống">
                        <GetConGiongList sendData={data} />
                    </Tab>
                    <Tab eventKey="AddConGiong" title="Thêm con giống">
                        <AddConGiong />
                    </Tab>
                </Tabs>
            </div>

            <ToastContainer/>
                {/* Same as */}
        </>
    );
}

export default ConGiong;
