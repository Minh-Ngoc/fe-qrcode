/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
//Library react toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classNames from 'classnames/bind';
import styles from './ThuongLai.module.scss';

import AddThuongLai from './addThuongLai';
import GetThuongLaiList from './getThuongLaiList';

const cx = classNames.bind(styles);


function CoSoNuoiTrong() {

    useEffect(() => {
        document.title = "Thương lái"
     }, []);
        
    return (
        <>  
            <div className={cx('nav-bar-btn')}>
                <Tabs
                    defaultActiveKey='GetThuongLaiList'
                    id="fill-tab-example"
                    className={'mb-3'}
                    fill
                >
                    <Tab eventKey="GetThuongLaiList" title="Danh sách thương lái">
                        <GetThuongLaiList />
                    </Tab>
                    <Tab eventKey="AddThuongLai" title="Thêm thương lái">
                        <AddThuongLai />
                    </Tab>
                </Tabs>
            </div>

            <ToastContainer/>
                {/* Same as */}
        </>
    );
}

export default CoSoNuoiTrong;
