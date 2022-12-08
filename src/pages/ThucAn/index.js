/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";

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

    useEffect(() => {
        document.title = "Thức ăn"
     }, []);
        
    return (
        <>  
            <div className={cx('nav-bar-btn')}>
                <Tabs
                    defaultActiveKey='GetThucAnList'
                    id="fill-tab-example"
                    className={'mb-3'}
                    fill
                >
                    <Tab eventKey="GetThucAnList" title="Danh sách thức ăn">
                        <GetThucAnList />
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
