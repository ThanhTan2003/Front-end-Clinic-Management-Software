import React from 'react';

const ModalSuccess = ({ title, content, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white rounded-lg shadow-lg w-4/5 p-6">
        <div className="text-center pb-2">
        <h1
          className="text-1xl font-bold relative"
          style={{
            background: "linear-gradient(to right, #0078B7, #00A3E0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {title}
        </h1>
        <div className="mt-2 w-12 mx-auto h-1 bg-gradient-to-r from-cyan-600 to-blue-800 rounded-full"></div>
      </div>
        <p className="text-sm text-gray-700 mt-2 text-justify">{content}</p>
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

export default ModalSuccess;