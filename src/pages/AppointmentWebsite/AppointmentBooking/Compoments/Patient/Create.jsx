import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link, Outlet, useParams } from "react-router-dom";

import { ToastContainer, toast, Bounce } from "react-toastify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCircleInfo, faPlus } from "@fortawesome/free-solid-svg-icons";

import { createPatient } from '../../../../../services/AppointmentService'
import { getToken } from "../../../../../services/localStorageService";

import ModalSuccess from "../Booking/ModalSuccess";

export default function Create() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "Nam",
    phoneNumber: "",
    dateOfBirth: "",
    identityCard: "",
    insuranceId: "",
    address: "",
  });

  const [acceptTerms, setAcceptTerms] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);  // Trạng thái của modal
  const [modalContent, setModalContent] = useState({ title: "", content: "" });  // Nội dung modal

  const handleSubmit = async () => {
    const requiredFields = [
      "fullName",
      "gender",
      "phoneNumber",
      "dateOfBirth",
      "identityCard",
      "address",
    ];

    // Kiểm tra các trường bắt buộc
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Vui lòng nhập đầy đủ thông tin!`);
        return;
      }
    }

    // Kiểm tra điều khoản
    if (!acceptTerms) {
      toast.error("Bạn cần chấp nhận điều khoản trước khi tạo hồ sơ mới.");
      return;
    }

    const token = getToken();
    // if (!token) {
    //   toast.error("Không tìm thấy token! Vui lòng đăng nhập lại.");
    //   return;
    // }

    try {
      const response = await fetch(`${createPatient}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        //toast.success("Tạo hồ sơ mới thành công!");
        openModal();
        return;
      } else {
        toast.error(data.message || "Có lỗi xảy ra, vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi tạo hồ sơ mới:", error);
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại!");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value // Ghi đè giá trị của field đang thay đổi
    });
  };

  const openModal = () => {
    setModalContent({ title: "THÔNG BÁO", content: "Hồ sơ của bạn đã được tạo thành công! Bạn có thể đặt lịch khám ngay với hồ sơ này." });
    setIsModalOpen(true);  // Mở modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Đóng modal
    navigate(-1, { state: { refresh: true } });          // Sau đó chuyển hướng về trang Patient.jsx
  };

  return (
    <div>
      {isModalOpen && (
        <ModalSuccess
          title={modalContent.title}
          content={modalContent.content}
          onClose={handleModalClose}
        />
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <div className="text-center pb-2 p-4">
        <button
          onClick={() => navigate(-1)}
          className="w-full h-12 border-2 border-cyan-700 text-cyan-700 font-bold rounded-lg bg-white hover:bg-cyan-50 transition duration-300"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> &nbsp; Quay lại
        </button>
      </div>
      {/* Tiêu đề */}
      <div className="text-center pb-2 p-4">
        <h1
          className="text-2xl font-bold relative"
          style={{
            background: "linear-gradient(to right, #0078B7, #00A3E0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          TẠO HỒ SƠ MỚI
        </h1>
        <div className="mt-2 w-32 mx-auto h-1 bg-gradient-to-r from-cyan-600 to-blue-800 rounded-full"></div>
      </div>

      <div className="bg-yellow-50 p-4 border border-yellow-300 rounded-md m-4 mb-2">
        <div className="text-sm text-gray-600 text-justify">
          <b><FontAwesomeIcon icon={faCircleInfo} /> Lưu ý: </b>Hồ sơ chỉ được nhập một lần và không thể thay đổi. Đây sẽ là hồ sơ theo suốt quá trình khám chữa bệnh tại phòng khám. Bạn vui lòng cung cấp thông tin chính xác.
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
        <div>
          <label className="block text-sm font-semibold text-sky-800">Họ tên <span className="text-red-800">(*)</span></label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full p-1 border border-gray-300 rounded-md text-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-sky-800">Giới tính <span className="text-red-800">(*)</span></label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="border p-2 rounded-lg w-full mt-1"
          >
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-sky-800">Ngày sinh <span className="text-red-800">(*)</span></label>
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            type="date"
            className="w-full p-1 border border-gray-300 rounded-md text-gray-700"
          />
        </div>
        {/* <div>
          <label className="block text-sm font-semibold text-sky-800">
            Ngày sinh <span className="text-red-800">(*)</span>
          </label>
          <input
            type="text"
            placeholder="dd/MM/yyyy"
            className="w-full p-1 border border-gray-300 rounded-md text-gray-700"
          />
        </div> */}
        <div>
          <label className="block text-sm font-semibold text-sky-800">Số điện thoại liên hệ <span className="text-red-800">(*)</span></label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            type="text"
            className="w-full p-1 border border-gray-300 rounded-md text-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-sky-800">Số căn cước <span className="text-red-800">(*)</span></label>
          <input
            id="identityCard"
            name="identityCard"
            value={formData.identityCard}
            onChange={handleInputChange}
            type="text"
            className="w-full p-1 border border-gray-300 rounded-md text-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-sky-800">Số thẻ BHYT (nếu có)</label>
          <input
            id="insuranceId"
            name="insuranceId"
            value={formData.insuranceId}
            onChange={handleInputChange}
            type="text"
            className="w-full p-1 border border-gray-300 rounded-md text-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-sky-800">Địa chỉ <span className="text-red-800">(*)</span></label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            rows="2"
            className="w-full p-1 border border-gray-300 rounded-md text-gray-700"
          />
        </div>
      </div>

      <div className="p-4 pt-1 text-sm text-sky-900">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={() => setAcceptTerms(!acceptTerms)}
          />
          <div className="ml-2 text-justify">
            Tôi cam đoan những thông tin trên là thật và chịu trách nhiệm hoàn toàn về các thông tin đã cung cấp.
          </div>
        </label>
      </div>

      <div className="text-center pt-1 p-4 pb-6">
        <button
          onClick={handleSubmit}
          className="w-full h-12 bg-sky-700 text-white font-bold rounded-lg hover:bg-sky-600 transition duration-300"
        >
          Tạo hồ sơ mới &nbsp;<FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  )
}
