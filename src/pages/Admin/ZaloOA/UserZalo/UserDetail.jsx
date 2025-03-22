import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faMagnifyingGlass, faXmark, faCircleInfo } from "@fortawesome/free-solid-svg-icons";

import Pagination from "../../../../components/Pagination";

function ZaloInformation() {
    return (
        <div>
            {/* {appointment ? ( */}
            <>
                <div className="border border-blue-600 rounded-lg shadow-md relative p-2">
                    <div className="absolute -top-4 left-4 bg-white px-2 text-blue-900 font-bold text-xl">
                        THÔNG TIN ZALO NGƯỜI DÙNG
                    </div>
                    <div className="md:col-span-2 pr-6 text-justify pt-3">
                        <div className="grid grid-cols-1 md:grid-cols-[20%,80%] gap-4">
                            <div className="flex justify-center">
                                <img
                                    src="https://s240-ava-talk.zadn.vn/c/4/4/d/8/240/4a1308c5163b2dd7c67df271dbad0e7e.jpg" // Thay ảnh đại diện thật tại đây
                                    alt="Avatar"
                                    className="w-48 h-48 rounded-md object-cover text-center align-top"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-[3fr,7fr,4fr,6fr] gap-4">
                                <p><strong>Zalo User ID : </strong></p>
                                <p>7546191973773392974</p>

                                <p><strong>Ngày cuối tương tác: </strong></p>
                                <p>18/03/2025</p>

                                <p><strong>Tên hiển thị: </strong></p>
                                <p>Thanh Tân</p>

                                <p><strong>Bí danh: </strong></p>
                                <p>Thanh Tân</p>

                                <p><strong>Trạng thái: </strong></p>
                                <p>Đã quan tâm</p>

                                <p><strong>Số điện thoại: </strong></p>
                                <p>84356457444</p>

                                <p><strong>Địa chỉ: </strong></p>
                                <p>ấp Hòa Phú, Xã Hòa Tịnh, huyện Chợ Gạo, tỉnh Tiền Giang</p>

                                <p><strong>Nhóm đối tượng: </strong></p>
                                <p className="flex flex-wrap gap-2">
                                    <span
                                        className="bg-blue-50 text-sky-600 px-2 py-1 font-medium shadow-md hover:shadow-lg transition"
                                    >
                                        Sinh viên
                                    </span>
                                    <span
                                        className="bg-blue-50 text-sky-600 px-2 py-1 font-medium shadow-md hover:shadow-lg transition"
                                    >
                                        Xương khớp
                                    </span>
                                    <span
                                        className="bg-blue-50 text-sky-600 px-2 py-1 font-medium shadow-md hover:shadow-lg transition"
                                    >
                                        Mất ngủ
                                    </span>
                                </p>

                            </div>
                        </div>
                    </div>
                    <br></br>
                </div>
            </>
            {/* ) : (
                <div className="text-center text-xl text-gray-500">
                </div>
            )} */}
        </div>
    );
}

function TagInformation() {
    return (
        <div>
            {/* {appointment ? ( */}
            <>
                <div className="border border-blue-600 rounded-lg shadow-md relative p-2">
                    <div className="absolute -top-4 left-4 bg-white px-2 text-blue-900 font-bold text-xl">
                        THÔNG TIN NHÓM ĐỐI TƯỢNG
                    </div>
                    <div className="pt-3 flex justify-between items-center">
                        <div className="flex justify-start">
                            <input
                                type="text"
                                placeholder="Nhập từ khóa tìm kiếm"
                                className="border p-2 rounded w-64 border-blue-300"
                            />

                            <button
                                type="button"
                                className="bg-sky-700 text-white py-2 px-4 rounded hover:bg-sky-800 ml-2"
                            >
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </div>

                        <button
                            type="button"
                            className="bg-sky-700 text-white py-2 px-4 rounded hover:bg-sky-800 font-semibold"
                        >
                            Thêm mới +
                        </button>
                    </div>

                    <div className="md:col-span-2 text-justify pt-3">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-200 shadow-lg rounded-md">
                                <thead>
                                    <tr className="bg-sky-600 text-white">
                                        <th className="border p-2 text-center">STT</th>
                                        <th className="border p-2 text-left">Tên nhóm</th>
                                        <th className="border p-2 text-center"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border p-2 text-center">1</td>
                                        <td className="border p-2 text-left">Sinh viên</td>
                                        <td className="border p-2 text-center whitespace-nowrap">
                                            <button className="bg-white text-orange-700 px-3 py-1 rounded border border-orange-700 hover:bg-orange-100">
                                                Xóa <FontAwesomeIcon icon={faXmark} />
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2 text-center">2</td>
                                        <td className="border p-2 text-left">Xương khớp</td>
                                        <td className="border p-2 text-center whitespace-nowrap w-24">
                                            <button className="bg-white text-orange-700 px-3 py-1 rounded border border-orange-700 hover:bg-orange-100">
                                                Xóa <FontAwesomeIcon icon={faXmark} />
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2 text-center">2</td>
                                        <td className="border p-2 text-left">Mất ngủ</td>
                                        <td className="border p-2 text-center whitespace-nowrap w-24">
                                            <button className="bg-white text-orange-700 px-3 py-1 rounded border border-orange-700 hover:bg-orange-100">
                                                Xóa <FontAwesomeIcon icon={faXmark} />
                                            </button>
                                        </td>
                                    </tr>

                                    {/* <tr>
                                        <td colSpan="6" className="text-center p-4">Không có dữ liệu</td>
                                    </tr> */}
                                </tbody>

                            </table>
                        </div>
                    </div>

                    <Pagination totalElements={5} currentPage={1} totalPages={2} setCurrentPage={null} />
                </div>
            </>
            {/* ) : (
                <div className="text-center text-xl text-gray-500">
                </div>
            )} */}
        </div>
    );
}

function NoteInformation() {
    return (
        <div>
            {/* {appointment ? ( */}
            <>
                <div className="border border-blue-600 rounded-lg shadow-md relative p-2">
                    <div className="absolute -top-4 left-4 bg-white px-2 text-blue-900 font-bold text-xl">
                        GHI CHÚ
                    </div>
                    <div className="pt-3 flex justify-between items-center">
                        <div className="flex justify-start">
                            <input
                                type="text"
                                placeholder="Nhập từ khóa tìm kiếm"
                                className="border p-2 rounded w-64 border-blue-300"
                            />

                            <button
                                type="button"
                                className="bg-sky-700 text-white py-2 px-4 rounded hover:bg-sky-800 ml-2"
                            >
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </div>

                        <button
                            type="button"
                            className="bg-sky-700 text-white py-2 px-4 rounded hover:bg-sky-800 font-semibold"
                        >
                            Thêm mới +
                        </button>
                    </div>
                    <div className="md:col-span-2 text-justify pt-3">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-200 shadow-lg rounded-md">
                                <thead>
                                    <tr className="bg-sky-600 text-white">
                                        <th className="border p-2 text-center">STT</th>
                                        <th className="border p-2 text-left">Nội dung</th>
                                        <th className="border p-2 text-center"></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <td className="border p-2 text-center">1</td>
                                        <td className="border p-2 text-left">Quan tâm nhiều về sức khỏe</td>
                                        <td className="border p-2 text-center whitespace-nowrap w-24">
                                            <button className="bg-white text-orange-700 px-3 py-1 rounded border border-orange-700 hover:bg-orange-100">
                                                Xóa <FontAwesomeIcon icon={faXmark} />
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2 text-center">2</td>
                                        <td className="border p-2 text-left">Khách hàng kỹ tính.</td>
                                        <td className="border p-2 text-center whitespace-nowrap w-24">
                                            <button className="bg-white text-orange-700 px-3 py-1 rounded border border-orange-700 hover:bg-orange-100">
                                                Xóa <FontAwesomeIcon icon={faXmark} />
                                            </button>
                                        </td>
                                        {/* <td colSpan="6" className="text-center p-4">Không có dữ liệu</td> */}
                                    </tr>
                                    <tr>
                                        <td className="border p-2 text-center">3</td>
                                        <td className="border p-2 text-left">Thường xuyên quên lịch tái khám.</td>
                                        <td className="border p-2 text-center whitespace-nowrap w-24">
                                            <button className="bg-white text-orange-700 px-3 py-1 rounded border border-orange-700 hover:bg-orange-100">
                                                Xóa <FontAwesomeIcon icon={faXmark} />
                                            </button>
                                        </td>
                                        {/* <td colSpan="6" className="text-center p-4">Không có dữ liệu</td> */}
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>
                    <Pagination totalElements={5} currentPage={1} totalPages={2} setCurrentPage={null} />
                </div>
            </>
            {/* ) : (
                <div className="text-center text-xl text-gray-500">
                </div>
            )} */}
        </div>
    );
}

function PatientList() {
    return (
        <div>
            {/* {appointment ? ( */}
            <>
                <div className="border border-blue-600 rounded-lg shadow-md relative p-2">
                    <div className="absolute -top-4 left-4 bg-white px-2 text-blue-900 font-bold text-xl">
                        DANH SÁCH HỒ SƠ KHÁM BỆNH
                    </div>
                    <div className="pt-3 flex justify-between items-center">
                        <div className="flex justify-start">
                            <input
                                type="text"
                                placeholder="Nhập từ khóa tìm kiếm"
                                className="border p-2 rounded w-64 border-blue-300"
                            />

                            <button
                                type="button"
                                className="bg-sky-700 text-white py-2 px-4 rounded hover:bg-sky-800 ml-2"
                            >
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </div>

                        <div>
                            <button
                                type="button"
                                className="bg-sky-700 text-white py-2 px-4 rounded hover:bg-sky-800 font-semibold ml-2"
                            >
                                Thêm hồ sơ khám bệnh mới +
                            </button>
                        </div>
                    </div>
                    <div className="md:col-span-2 text-justify pt-3">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-200 shadow-lg rounded-md">
                                <thead>
                                    <tr className="bg-sky-600 text-white">
                                        <th className="border p-2 text-center">STT</th>
                                        <th className="border p-2 text-left">Mã hồ sơ</th>
                                        <th className="border p-2 text-left">Họ tên</th>
                                        <th className="border p-2 text-left">Giới tính</th>
                                        <th className="border p-2 text-left">Mối quan hệ</th>
                                        <th className="border p-2 text-left">Số lần khám</th>
                                        <th className="border p-2 text-center"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border p-2 text-center">1</td>
                                        <td className="border p-2 text-left whitespace-nowrap">HS-65HFBC6483DC</td>
                                        <td className="border p-2 text-left whitespace-nowrap">Trần Minh Sang</td>
                                        <td className="border p-2 text-left whitespace-nowrap">Nam</td>
                                        <td className="border p-2 text-left whitespace-nowrap">Em trai</td>
                                        <td className="border p-2 text-left">2</td>
                                        <td className="border p-2 text-center whitespace-nowrap w-32">
                                            <button className="bg-white text-sky-700 px-3 py-1 rounded border border-sky-700 hover:bg-sky-100">
                                                Chi tiết <FontAwesomeIcon icon={faCircleInfo} />
                                            </button>
                                            <button className="bg-white text-orange-700 px-3 py-1 rounded border border-orange-700 hover:bg-orange-100 ml-2">
                                                Xóa <FontAwesomeIcon icon={faXmark} />
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2 text-center">2</td>
                                        <td className="border p-2 text-left whitespace-nowrap">HS-62HWBC6483AD</td>
                                        <td className="border p-2 text-left whitespace-nowrap">Trần Trọng Nhân</td>
                                        <td className="border p-2 text-left whitespace-nowrap">Nam</td>
                                        <td className="border p-2 text-left whitespace-nowrap">Ông/Bà</td>
                                        <td className="border p-2 text-left">1</td>
                                        <td className="border p-2 text-center whitespace-nowrap w-32">
                                            <button className="bg-white text-sky-700 px-3 py-1 rounded border border-sky-700 hover:bg-sky-100">
                                                Chi tiết <FontAwesomeIcon icon={faCircleInfo} />
                                            </button>
                                            <button className="bg-white text-orange-700 px-3 py-1 rounded border border-orange-700 hover:bg-orange-100 ml-2">
                                                Xóa <FontAwesomeIcon icon={faXmark} />
                                            </button>
                                        </td>
                                    </tr>
                                    {/* <tr>
                                        <td colSpan="6" className="text-center p-4">Không có dữ liệu</td>
                                    </tr> */}
                                </tbody>

                            </table>
                        </div>
                    </div>
                    <Pagination totalElements={5} currentPage={1} totalPages={2} setCurrentPage={null} />
                </div>
            </>
            {/* ) : (
                <div className="text-center text-xl text-gray-500">
                </div>
            )} */}
        </div>
    );
}

function AppointmentList() {
    return (
        <div>
            {/* {appointment ? ( */}
            <>
                <div className="border border-blue-600 rounded-lg shadow-md relative p-2">
                    <div className="absolute -top-4 left-4 bg-white px-2 text-blue-900 font-bold text-xl">
                        LỊCH SỬ ĐẶT KHÁM
                    </div>
                    <div className="pt-3 flex justify-between items-center">
                        <div className="flex justify-start">
                            <input
                                type="text"
                                placeholder="Nhập từ khóa tìm kiếm"
                                className="border p-2 rounded w-64 border-blue-300"
                            />

                            <button
                                type="button"
                                className="bg-sky-700 text-white py-2 px-4 rounded hover:bg-sky-800 ml-2"
                            >
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </div>

                        <div>
                            <select
                                className="border p-2 rounded border-blue-300"
                            >
                                <option value="">Tất cả trạng thái</option>
                                <option value="">Chờ phê duyệt</option>
                                <option value="">Đã xác nhận</option>
                            </select>

                            <button
                                type="button"
                                className="bg-sky-700 text-white py-2 px-4 rounded hover:bg-sky-800 font-semibold ml-2"
                            >
                                Đặt lịch khám mới +
                            </button>
                        </div>
                    </div>
                    <div className="md:col-span-2 text-justify pt-3">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-200 shadow-lg rounded-md">
                                <thead>
                                    <tr className="bg-sky-600 text-white">
                                        <th className="border p-2 text-center">STT</th>
                                        <th className="border p-2 text-left">Mã lịch hẹn</th>
                                        <th className="border p-2 text-left">Hồ sơ khám</th>
                                        <th className="border p-2 text-left">Dịch vụ</th>
                                        <th className="border p-2 text-left">Ngày khám</th>
                                        <th className="border p-2 text-left">Trạng thái</th>
                                        <th className="border p-2 text-center"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border p-2 text-center">1</td>
                                        <td className="border p-2 text-left whitespace-nowrap">LH-HSTE4H3821A</td>
                                        <td className="border p-2 text-left whitespace-nowrap">HS-62HWBC6483AD</td>
                                        <td className="border p-2 text-left whitespace-nowrap">Khám sức khỏe tổng quát</td>
                                        <td className="border p-2 text-left whitespace-nowrap">13/03/2025</td>
                                        <td className="border p-2 text-left whitespace-nowrap">Đã khám</td>
                                        <td className="border p-2 text-center whitespace-nowrap w-32">
                                            <button className="bg-white text-sky-700 px-3 py-1 rounded border border-sky-700 hover:bg-sky-100">
                                                Chi tiết <FontAwesomeIcon icon={faCircleInfo} />
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2 text-center">2</td>
                                        <td className="border p-2 text-left whitespace-nowrap">LH-SST34X192XSI</td>
                                        <td className="border p-2 text-left whitespace-nowrap">HS-62HWBC6483AD</td>
                                        <td className="border p-2 text-left whitespace-nowrap">Khám sức khỏe tổng quát</td>
                                        <td className="border p-2 text-left whitespace-nowrap">13/02/2025</td>
                                        <td className="border p-2 text-left whitespace-nowrap">Đã khám</td>
                                        <td className="border p-2 text-center whitespace-nowrap w-32">
                                            <button className="bg-white text-sky-700 px-3 py-1 rounded border border-sky-700 hover:bg-sky-100">
                                                Chi tiết <FontAwesomeIcon icon={faCircleInfo} />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>
                    <Pagination totalElements={5} currentPage={1} totalPages={2} setCurrentPage={null} />
                </div>
            </>
            {/* ) : (
                <div className="text-center text-xl text-gray-500">
                </div>
            )} */}
        </div>
    );
}

function UserDetail() {

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <div className="">
            <div className="flex justify-start">
                <button
                    onClick={() => navigate(-1)}
                    className="py-2 px-3 rounded transition duration-300 text-blue-600 border border-blue-600 hover:bg-slate-100 font-bold"
                >
                    <FontAwesomeIcon icon={faAnglesLeft} />&nbsp;Quay lại
                </button>
            </div>
            <br /><br></br>

            <ZaloInformation />
            <br></br>
            <div className="grid grid-cols-1 md:grid-cols-[50%,50%] gap-4 pr-4">
                <TagInformation />
                <NoteInformation />
            </div>
            <br></br>
            <PatientList />
            <br></br>
            <AppointmentList />

        </div>
    )
}

export default UserDetail;