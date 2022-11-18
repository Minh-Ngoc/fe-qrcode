import classNames from 'classnames/bind';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//     faEllipsisVertical,
//     faSignOut,
//     faUser,
// } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import 'tippy.js/dist/tippy.css';

import config from '../../../config';
import styles from './Header.module.scss';
import images from '../../../assets/images';
// import Menu from '../../../components/Popper/Menu';
// import Image from '../../../components/Image';

const cx = classNames.bind(styles);

// const MENU_ITEMS = [
//     {
//         icon: <FontAwesomeIcon icon={faCircleQuestion} />,
//         title: 'Feedback and help',
//         to: '/feedback',
//     },
    
// ];

function Header() {
    // const currentUser = true;

    // // Handle logic
    // const handleMenuChange = (menuItem) => {
    //     switch (menuItem.type) {
    //         case 'language':
    //             // Handle change language
    //             break;
    //         default:
    //     }
    // };

    // const userMenu = [
    //     {
    //         icon: <FontAwesomeIcon icon={faUser} />,
    //         title: 'View profile',
    //         to: '/@hoaa',
    //     },
    //     ...MENU_ITEMS,
    //     {
    //         icon: <FontAwesomeIcon icon={faSignOut} />,
    //         title: 'Thoát',
    //         to: '/logout',
    //         separate: true,
    //     },
    // ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img className={cx('logo-image')} src={images.logo} alt="Home" />
                </Link>

                <div className={cx('actions')}>
                    <Link to={config.routes.login} className={cx('logo-link')}>
                        <span>Đăng nhập</span>
                    </Link>
                    {/* <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://files.fullstack.edu.vn/f8-prod/user_avatars/1/623d4b2d95cec.png"
                                alt="Nguyen Van A"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu> */}
                </div>
            </div>
        </header>
    );
}

export default Header;
