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
import styles from './ThucAn.module.scss';

import AddThucAn from './addThucAn';
import GetThucAnList from './getThucAnList';

const cx = classNames.bind(styles);


function CoSoNuoiTrong() {
    const [key, setKey] = useState('GetThucAnList');
    const [data, setData] = useState([]);
    const location = useLocation();
    const userData = location.state.userId;

    useEffect(() => {
        document.title = "Thức ăn"

        async function getThucAn(){
            // console.log(userData)
            const configuration = {
                method: "GET",
                url: `http://localhost:3000/api/thucan/${userData}/list`,
            };
            // make the API call
            await axios(configuration)
                .then((result) => {
                    // redirect user to the auth page
                    setData(result.data.thucan);
                })
                .catch(error => error);
        } 
        getThucAn();
     }, [key]);
    // console.log(data);
        
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
                    <Tab eventKey="GetThucAnList" title="Danh sách thức ăn">
                        <GetThucAnList sendData={data} />
                    </Tab>
                    <Tab eventKey="AddThucAn" title="Thêm thức ăn">
                        <AddThucAn />
                    </Tab>
                </Tabs>
            </div>

            <ToastContainer/>
                {/* Same as */}
        </>
    );
}

export default CoSoNuoiTrong;
