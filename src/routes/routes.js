import config from '../config';

// Layouts
import { HeaderOnly } from '../layouts';
import LoginManage from '../layouts/LoginManage';

// Pages
import Home from '../pages/Home';
import Upload from '../pages/Upload';
import Register from '../pages/Register';
import Login from '../pages/Login';
import AuthComponent from '../components/AuthComponent';
import FreeComponent from '../components/FreeComponent';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.register, component: Register, layout: LoginManage },
    { path: config.routes.login, component: Login, layout: LoginManage },
    { path: config.routes.auth, component: AuthComponent, layout: null },
    { path: config.routes.free, component: FreeComponent, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
