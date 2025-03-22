import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faMagnifyingGlass, faXmark, faPaperPlane, faEnvelopesBulk, faNewspaper, faBullhorn, faFolderPlus, faVideo } from "@fortawesome/free-solid-svg-icons";

import Pagination from "../../../../components/Pagination";

function ListOfZaloOALinkButtons() {
  return (
    <div>

    </div>
  )
}

function TagsList() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-[50%,50%] gap-4 pr-4">
        <div>
          <p className='text-xl font-bold text-sky-900'>Nhóm đối tượng nhận</p>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="bg-sky-700 text-white py-2 px-4 rounded hover:bg-sky-800 font-semibold"
          >
            Thêm mới +
          </button>
        </div>
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
              
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}

function UsersList() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-[50%,50%] gap-4 pr-4">
        <div>
          <p className='text-xl font-bold text-sky-900'>Người nhận khác</p>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="bg-sky-700 text-white py-2 px-4 rounded hover:bg-sky-800 font-semibold"
          >
            Thêm mới +
          </button>
        </div>
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
                <td className="p-2 pr-4 flex items-center space-x-2 font-semibold text-left whitespace-nowrap cursor-help">
                  <img src="https://s240-ava-talk.zadn.vn/c/4/4/d/8/240/4a1308c5163b2dd7c67df271dbad0e7e.jpg" className="w-8 h-8 rounded-full" />
                <span>Thanh Tân</span>
                </td>
                <td className="border p-2 text-center whitespace-nowrap">
                  <button className="bg-white text-orange-700 px-3 py-1 rounded border border-orange-700 hover:bg-orange-100">
                    Xóa <FontAwesomeIcon icon={faXmark} />
                  </button>
                </td>
              </tr>
              
            </tbody>

          </table>
        </div>
      </div>
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
            GỬI TIN NHẮN THEO NHÓM ĐỐI TƯỢNG
          </div>
          <br></br>
          <div>
            <p className='text-xl font-bold text-sky-900'>Nội dung tin nhắn</p>
            <textarea
              className="border p-2 rounded w-full h-32 border-blue-300"
              placeholder="Nhập nội dung tin nhắn tại đây..."
            ></textarea>
            <br></br><br></br>
            <div className="grid grid-cols-1 md:grid-cols-[50%,50%] gap-4 pr-4">
              <TagsList />
              <UsersList />
            </div>

            <br />

            <div className="flex justify-end">
              <button
                type="button"
                className="bg-sky-700 text-white py-2 px-4 rounded hover:bg-sky-800 font-semibold pt-4 pb-4 mb-4"
                title='Xác nhận gửi tin nhắn'
              >
                GỬI TIN NHẮN <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </div>

        </div>
      </>
      {/* ) : (
                <div className="text-center text-xl text-gray-500">
                </div>
            )} */}
    </div>
  );
}

export default function SendNotification() {
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
      <div className="flex gap-4 pt-4 pb-2">
        <button
          type="button"
          className="bg-sky-600 text-white py-2 px-4 rounded hover:bg-sky-700 font-semibold pt-4 pb-4"
        >
          QUẢN LÝ TIN NHẮN <FontAwesomeIcon icon={faEnvelopesBulk} />
        </button>
        <button
          type="button"
          className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 font-semibold pt-4 pb-4"
        >
          QUẢN LÝ BÀI VIẾT <FontAwesomeIcon icon={faNewspaper} />
        </button>
        <button
          type="button"
          className="bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 font-semibold pt-4 pb-4"
        >
          DANH SÁCH VIDEO <FontAwesomeIcon icon={faVideo} />
        </button>
        <button
          type="button"
          className="bg-violet-600 text-white py-2 px-4 rounded hover:bg-violet-700 font-semibold pt-4 pb-4"
        >
          QUẢN LÝ BROADCAST <FontAwesomeIcon icon={faBullhorn} />
        </button>
        <button
          type="button"
          className="bg-lime-600 text-white py-2 px-4 rounded hover:bg-lime-700 font-semibold pt-4 pb-4"
        >
          TẠO BROADCAST  <FontAwesomeIcon icon={faFolderPlus} />
        </button>
      </div>
      <br></br>


      <PatientList />
    </div>
  )
}
