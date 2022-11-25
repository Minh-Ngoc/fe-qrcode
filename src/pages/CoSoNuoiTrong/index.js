/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
//Library react toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classNames from 'classnames/bind';
import styles from './CoSoNuoiTrong.module.scss';

import AddCSNT from './addCSNT';
import GetCSNTList from './getCSNTList';

const cx = classNames.bind(styles);


function CoSoNuoiTrong() {

    useEffect(() => {
        document.title = "Cơ sở nuôi trồng"
     }, []);
        
    return (
        <>  
            <div className={cx('nav-bar-btn')}>
                <Tabs
                    defaultActiveKey='GetCSNTList'
                    id="fill-tab-example"
                    className={'mb-3'}
                    fill
                >
                    <Tab eventKey="GetCSNTList" title="Danh sách cơ sở nuôi trồng">
                        <GetCSNTList />
                    </Tab>
                    <Tab eventKey="AddCSNT" title="Thêm cơ sở nuôi trồng">
                        <AddCSNT />
                    </Tab>
                </Tabs>
            </div>

            <ToastContainer/>
                {/* Same as */}
        </>
    );
}

export default CoSoNuoiTrong;
