/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";

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

    useEffect(() => {
        document.title = "Giai đoạn nuôi"
     }, []);
        
    return (
        <>  
            <div className={cx('nav-bar-btn')}>
                <Tabs
                    defaultActiveKey='GetGiaiDoanList'
                    id="fill-tab-example"
                    className={'mb-3'}
                    fill
                >
                    <Tab eventKey="GetGiaiDoanList" title="Danh sách giai đoạn nuôi">
                        <GetGiaiDoanList />
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
