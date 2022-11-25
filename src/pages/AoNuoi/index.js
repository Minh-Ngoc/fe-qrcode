/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";

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


function CoSoNuoiTrong() {

    useEffect(() => {
        document.title = "Ao nuôi"
     }, []);
        
    return (
        <>  
            <div className={cx('nav-bar-btn')}>
                <Tabs
                    defaultActiveKey='GetAoNuoiList'
                    id="fill-tab-example"
                    className={'mb-3'}
                    fill
                >
                    <Tab eventKey="GetAoNuoiList" title="Danh sách ao nuôi">
                        <GetAoNuoiList />
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

export default CoSoNuoiTrong;
