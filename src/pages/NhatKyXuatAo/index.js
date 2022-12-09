/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";

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

    useEffect(() => {
        document.title = "Nhật ký xuất ao"
     }, []);
        
    return (
        <>  
            <div className={cx('nav-bar-btn')}>
                <Tabs
                    defaultActiveKey='GetNKXAList'
                    id="fill-tab-example"
                    className={'mb-3'}
                    fill
                >
                    <Tab eventKey="GetNKXAList" title="Danh sách nhật ký xuất ao">
                        <GetNKXAList />
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
