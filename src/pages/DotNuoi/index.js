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
import styles from './DotNuoi.module.scss';

import AddDotNuoi from './addDotNuoi';
import GetDotNuoiList from './getDotNuoiList';

const cx = classNames.bind(styles);


function DotNuoi() {
    const [key, setKey] = useState('GetDotNuoiList');
    const [data, setData] = useState([]);
    const location = useLocation();
    const userData = location.state.userId;
    
    useEffect(() => {
        document.title = "Đợt nuôi";

        async function getDotNuoi(){
            // console.log(userData)
            const configuration = {
                method: "GET",
                url: `http://localhost:3000/api/dotnuoi/${userData}/list`,
            };
            // make the API call
            axios(configuration)
                .then((result) => {
                    // redirect user to the auth page
                    // console.log(result.data.aonuoi)
                    setData(result.data.dotnuoi);

                })
                .catch((error) => error);
        } 
        getDotNuoi();
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
                    <Tab eventKey="GetDotNuoiList" title="Danh sách đợt nuôi">
                        <GetDotNuoiList sendData={data} />
                    </Tab>
                    <Tab eventKey="AddDotNuoi" title="Thêm đợt nuôi">
                        <AddDotNuoi />
                    </Tab>
                </Tabs>
            </div>

            <ToastContainer/>
                {/* Same as */}
        </>
    );
}

export default DotNuoi;
