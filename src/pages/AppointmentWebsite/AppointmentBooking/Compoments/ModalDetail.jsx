import React from 'react';

const ModalDetail = ({ title, content, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white rounded-lg shadow-lg w-4/5 p-6">
        <h2 className="text-2xl font-bold text-uppercase text-sky-800">{title}</h2>
        <p className="text-sm text-gray-700 mt-4 text-justify">{content}</p>
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
