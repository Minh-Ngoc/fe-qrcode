// {!data ? '' : (
//     <div className={cx('container')}>
//     {/* <div className={cx('title-aonuoi-list')}></div> */}
//         <div className={cx('table')}>
//             <Table responsive hover className="text-center">
//                 <thead>
//                     <tr className="align-middle">
//                         <th>Tên đợt nuôi</th>
//                         <th>Ao nuôi</th>
//                         <th>Năm nuôi</th>
//                         <th>Thời điểm</th>
//                         <th>Trạng thái</th>
//                         <th>Tình trạng</th>
//                         <th>Mã QR</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr key={data._id} className="align-middle">
//                         <td> {data.ten} </td>
//                         <td> {data.aonuois.map(aonuoi => aonuoi.ten)} </td>
//                         <td> {data.namnuoi} </td>
//                         <td> {data.thoidiem} </td>
//                         <td> {data.trangthai} </td>
//                         <td> {data.tinhtrang} </td>
//                         <td>
//                             <img style={{width: "100px"}} src={data.qrImage} className="img-thumbnail" alt="..."></img>
//                         </td>
//                     </tr>
//                 </tbody>
//             </Table>
//         </div>

//         <div className={cx('table', 'congiong')}>
//             <Table responsive hover className="text-center">
//                 <thead>
//                     <tr className="align-middle">
//                         <th>Con giống</th>
//                         <th>Số lượng</th>
//                         <th>Ngày tuổi</th>
//                         <th>Chất lượng</th>
//                         <th>Loại con giống</th>
//                         <th>Nhà cung cấp</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr key={data._id} className="align-middle">
//                         <td> {congiong} </td>
//                         <td> {ctcongiong.soluong} </td>
//                         <td> {ctcongiong.ngaytuoi} </td>
//                         <td> {ctcongiong.chatluong} </td>
//                         <td> {loaicongiong} </td>
//                         <td> {ncccongiong} </td>
//                     </tr>
//                 </tbody>
//             </Table>
//         </div>
//     </div>
// )}