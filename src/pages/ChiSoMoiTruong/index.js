/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";

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

    useEffect(() => {
        document.title = "Chỉ số môi trường"
     }, []);
        
    return (
        <>  
            <div className={cx('nav-bar-btn')}>
                <Tabs
                    defaultActiveKey='GetCSMTList'
                    id="fill-tab-example"
                    className={'mb-3'}
                    fill
                >
                    <Tab eventKey="GetCSMTList" title="Danh sách chỉ số môi trường">
                        <GetCSMTList />
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
