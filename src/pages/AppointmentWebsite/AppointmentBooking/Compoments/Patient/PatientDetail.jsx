import React from 'react';

const ModalDetail = ({ patient, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white rounded-lg shadow-lg w-4/5 p-6 max-h-[90vh] overflow-y-auto">
        {/* Tiêu đề */}
        <h3 className="text-xl font-bold text-sky-800 mb-4">{patient.fullName.toUpperCase()}</h3>

        {/* Các thông tin bệnh nhân */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Mã hồ sơ</label>
            <input
              type="text"
              value={patient.id}
              className="w-full p-1 border border-gray-300 rounded-md text-gray-700"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Giới tính</label>
            <input
              type="text"
              value={patient.gender || "Chưa cập nhật"}
              className="w-full p-1 border border-gray-300 rounded-md text-gray-700"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Số điện thoại</label>
            <input
              type="text"
              value={patient.phoneNumber}
              className="w-full p-1 border border-gray-300 rounded-md text-gray-700"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Ngày sinh</label>
            <input
              type="text"
              value={new Date(patient.dateOfBirth).toLocaleDateString('en-GB')}
              className="w-full p-1 border border-gray-300 rounded-md text-gray-700"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Số căn cước</label>
            <input
              type="text"
              value={patient.identityCard}
              className="w-full p-1 border border-gray-300 rounded-md text-gray-700"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Địa chỉ</label>
            <textarea
              value={patient.address}
              rows="3"
              className="w-full p-1 border border-gray-300 rounded-md text-gray-700"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Số thẻ BHYT</label>
            <input
              type="text"
              value={patient.insuranceId || "Chưa có"}
              className="w-full p-1 border border-gray-300 rounded-md text-gray-700"
              readOnly
            />
          </div>
        </div>

        {/* Nút đóng */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-sky-700 text-white font-semibold rounded-lg w-full"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDetail;