/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";

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

    useEffect(() => {
        document.title = "Đợt nuôi"
     }, []);
        
    return (
        <>  
            <div className={cx('nav-bar-btn')}>
                <Tabs
                    defaultActiveKey='GetDotNuoiList'
                    id="fill-tab-example"
                    className={'mb-3'}
                    fill
                >
                    <Tab eventKey="GetDotNuoiList" title="Danh sách đợt nuôi">
                        <GetDotNuoiList />
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
