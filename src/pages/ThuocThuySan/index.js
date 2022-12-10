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
import styles from './ThuocThuySan.module.scss';

import AddThuocThuySan from './addThuocThuySan';
import GetThuocThuySanList from './getThuocThuySanList';

const cx = classNames.bind(styles);


function ThuocThuySan() {
    const [key, setKey] = useState('GetThuocThuySanList');
    const [data, setData] = useState([]);
    const location = useLocation();
    const userData = location.state.userId;

    useEffect(() => {
        document.title = "Thuốc thủy sản";

        async function getThuocThuySan(){
            console.log(userData)
            const configuration = {
                method: "GET",
                url: `http://localhost:3000/api/thuocthuysan/${userData}/list`,
            };
            // make the API call
            axios(configuration)
                .then((result) => {
                    // redirect user to the auth page
                    // console.log(result.data.thuocthuysan)
                    setData(result.data.thuocthuysan);
                })
                .catch((error) => error);
        } 
        getThuocThuySan();
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
                    <Tab eventKey="GetThuocThuySanList" title="Danh sách thuốc thủy sản">
                        <GetThuocThuySanList sendData={data} />
                    </Tab>
                    <Tab eventKey="AddThuocThuySan" title="Thêm thuốc thủy sản">
                        <AddThuocThuySan />
                    </Tab>
                </Tabs>
            </div>

            <ToastContainer/>
                {/* Same as */}
        </>
    );
}

export default ThuocThuySan;
