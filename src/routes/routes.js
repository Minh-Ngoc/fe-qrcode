import config from '../config';

// Layouts
import LoginManage from '../layouts/LoginManage';

// Pages
// import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import AuthComponent from '../pages/AuthComponent';

import ScanQRCode from '../pages/ScanQRCode';

import CoSoNuoiTrong from '../pages/CoSoNuoiTrong';
import AoNuoi from '../pages/AoNuoi';
import DotNuoi from '../pages/DotNuoi';
import ConGiong from '../pages/ConGiong';
import NCCConGiong from '../pages/NCCConGiong';
import ChiSoMoiTruong from '../pages/ChiSoMoiTruong';
import GiaiDoan from '../pages/GiaiDoan';
// import ThucAnSD from '../pages/GiaiDoan/addThucAnSD';
import ThucAn from '../pages/ThucAn';
import NhatKyXuatAo from '../pages/NhatKyXuatAo';
import ThuongLai from '../pages/ThuongLai';
import ThuocThuySan from '../pages/ThuocThuySan';


import FreeComponent from '../components/FreeComponent';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Login, layout: LoginManage },
    { path: config.routes.register, component: Register, layout: LoginManage },
    { path: config.routes.login, component: Login, layout: LoginManage },
    { path: config.routes.auth, component: AuthComponent, layout: null },

    { path: config.routes.scanqrcode + '/:id', component: ScanQRCode, layout: null },

    { path: config.routes.cosonuoitrong, component: CoSoNuoiTrong, layout: AuthComponent },
    { path: config.routes.aonuoi, component: AoNuoi, layout: AuthComponent },
    { path: config.routes.dotnuoi, component: DotNuoi, layout: AuthComponent },
    { path: config.routes.congiong, component: ConGiong, layout: AuthComponent },
    { path: config.routes.ncccongiong, component: NCCConGiong, layout: AuthComponent },
    { path: config.routes.chisomoitruong, component: ChiSoMoiTruong, layout: AuthComponent },

    { path: config.routes.giaidoan, component: GiaiDoan, layout: AuthComponent },
    // { path: config.routes.thucansd, component: ThucAnSD, layout: AuthComponent },

    { path: config.routes.thucan, component: ThucAn, layout: AuthComponent },
    { path: config.routes.nhatkyxuatao, component: NhatKyXuatAo, layout: AuthComponent },
    { path: config.routes.thuonglai, component: ThuongLai, layout: AuthComponent },
    { path: config.routes.thuocthuysan, component: ThuocThuySan, layout: AuthComponent },
    
    { path: config.routes.free, component: FreeComponent, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
