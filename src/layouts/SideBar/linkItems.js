import { 
  faPrescriptionBottleMedical, 
  faAreaChart, 
  faSquare, 
  faQrcode, 
  faShrimp,
  faUniversalAccess,
  faSnowflake, 
  faSpinner,
  faTablets,
  faAddressCard,
  faClockRotateLeft,
} from '@fortawesome/free-solid-svg-icons';

export const linkItems = [
    {
      name: 'Cơ sở nuôi trồng',
      path: '/cosonuoitrong',
      icon: faAreaChart,
    },
    {
      name: 'Ao nuôi',
      path: '/aonuoi',
      icon: faSquare,
    },
    {
      name: 'Đợt nuôi',
      path: '/dotnuoi',
      icon: faQrcode,
    },
    {
      name: 'Giai đoạn',
      path: '/giaidoan',
      icon: faSpinner,
    },
    {
      name: 'Nhật ký xuất ao',
      path: '/nhatkyxuatao',
      icon: faClockRotateLeft,
    },
    {
      name: 'Con giống',
      path: '/congiong',
      icon: faShrimp,
    },
    {
      name: 'NCC con giống',
      path: '/ncccongiong',
      icon: faUniversalAccess,
    },
    {
      name: 'Chỉ số môi trường',
      path: '/chisomoitruong',
      icon: faSnowflake,
    },
    {
      name: 'Thức ăn',
      path: '/thucan',
      icon: faTablets,
    },
    {
      name: 'Thuốc thủy sản',
      path: '/thuocthuysan',
      icon: faPrescriptionBottleMedical,
    },
    {
      name: 'Thương lái',
      path: '/thuonglai',
      icon: faAddressCard,
    },

  ]