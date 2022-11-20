/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import ItemSideBar from "../../components/ItemSideBar";
import styles from './SideBar.module.scss';
import classNames from 'classnames/bind';
import { motion } from "framer-motion";
import { faRightToBracket, faListUl, faTableList } from '@fortawesome/free-solid-svg-icons';
import Cookies from "universal-cookie";
import config from '../../config';
import { linkItems } from './linkItems';

import {
  sideContainerVariants,
  sidebarVariants,
  profileVariants
} from './constSideBar';

const cx = classNames.bind(styles);
const cookies = new Cookies();

export default function SideBar() {

  const navigate = useNavigate();

  const logout = () => {
    // destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
    // redirect user to the landing page
    navigate(config.routes.login)
  }

  const [open, setOpen] = useState(true);

  const handleToggle = () => {
      setOpen(!open);
    };

  return (
      <motion.div
        data-Open={open}
        variants={sideContainerVariants}
        initial={`${open}`}
        animate={`${open}`}
        className={cx('sidebar_container')}
      >
        {/* sidebar div */}
        <motion.div
          className={cx('sidebar')}
          initial={`${open}`}
          animate={`${open}`}
          variants={sidebarVariants}
        >
          <div className={cx('sidebar-item')}>
            {/* lines_icon */}
            <motion.div
              whileHover={{
                scale: 1.2,
                rotate: 180,
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(3.5px)",
                WebkitBackdropFilter: "blur(3.5px)",
                border: "1px solid rgba( 255, 255, 255, 0.18 )",
                transition: {
                  delay: 0.2,
                  duration: 0.4,
                },
              }}
              onClick={handleToggle}
              className={cx('lines_icon')}
            >
              <ItemSideBar icon={faListUl} />
            </motion.div>
            {/* profile */}
            <Link to={config.routes.auth}>
              <motion.div
                layout
                initial={`${open}`}
                animate={`${open}`}
                variants={profileVariants}
                className={cx('profile')}
                transition={{ duration: 0.4 }}
                whileHover={{
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                  backdropFilter: "blur(5.5px)",
                  WebkitBackdropFilter: "blur(5.5px)",
                  border: "1px solid rgba( 255, 255, 255, 0.18 )",
                  cursor: "pointer",
                }}
              >
                  <img
                    src="https://cdn2.iconfinder.com/data/icons/business-colored-2/128/1-1024.png"
                    alt="profile_img"
                  />
              </motion.div>
            </Link>
            {/* groups */}
            <div className={cx('groups')}>
              {/* group 1 */}
                {linkItems.map(linkItem => {
                  return (
                  <Link to={linkItem.path}> 
                    <ItemSideBar icon={faTableList} name={linkItem.name} /> 
                  </Link>
                  )
                })}
            </div>
          </div>
            
          {/* group 3 */}
          <div className={cx('group')} onClick={() => logout() }>
            <ItemSideBar icon={faRightToBracket} name="Logout" />
          </div>
        </motion.div>
      </motion.div>

        
  );
}