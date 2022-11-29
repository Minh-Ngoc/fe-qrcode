/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
//Library react toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classNames from 'classnames/bind';
import styles from './NCCConGiong.module.scss';

import AddNCCConGiong from './addNCCConGiong';
import GetNCCConGiongList from './getNCCConGiongList';

const cx = classNames.bind(styles);


function CoSoNuoiTrong() {

    useEffect(() => {
        document.title = "Nhà cung cấp con giống"
     }, []);
        
    return (
        <>  
            <div className={cx('nav-bar-btn')}>
                <Tabs
                    defaultActiveKey='GetNCCConGiongList'
                    id="fill-tab-example"
                    className={'mb-3'}
                    fill
                >
                    <Tab eventKey="GetNCCConGiongList" title="Danh sách nhà cung cấp con giống">
                        <GetNCCConGiongList />
                    </Tab>
                    <Tab eventKey="AddNCCConGiong" title="Thêm nhà cung cấp con giống">
                        <AddNCCConGiong />
                    </Tab>
                </Tabs>
            </div>

            <ToastContainer/>
                {/* Same as */}
        </>
    );
}

export default CoSoNuoiTrong;
