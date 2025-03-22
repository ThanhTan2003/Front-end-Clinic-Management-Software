import React from 'react';

const Pagination = ({ totalElements, currentPage, totalPages, setCurrentPage }) => {
  // Hàm lấy các số trang cần hiển thị
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxDisplayPages = 7;  // Tổng số trang hiển thị (3 đầu + 3 sau + 1 trang hiện tại)

    // Hiển thị 3 trang đầu tiên
    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      pageNumbers.push(i);
    }

    // Nếu trang hiện tại cách trang đầu tiên > 3, hiển thị dấu ba chấm
    if (currentPage > 4) {
      pageNumbers.push('...');
    }

    // Hiển thị 3 trang trước và sau trang hiện tại
    for (let i = Math.max(currentPage - 3, 4); i <= Math.min(currentPage + 3, totalPages - 1); i++) {
      pageNumbers.push(i);
    }

    // Nếu trang hiện tại cách trang cuối cùng > 3, hiển thị dấu ba chấm
    if (currentPage < totalPages - 3) {
      pageNumbers.push('...');
    }

    // Hiển thị 3 trang cuối cùng
    if (totalPages > 3) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="mt-4">
      {/* Pagination Controls: Tổng số và trang hiện tại */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-600">
          Tổng số: <b>{totalElements}</b>
        </div>
        <div className="text-gray-600">
          Trang {currentPage} / {totalPages}
        </div>
      </div>

      {/* Pagination: Các nút phân trang */}
      <div className="flex justify-center space-x-2">
        {getPageNumbers().map((pageNumber, index) =>
          typeof pageNumber === "number" ? (
            <button
              key={index}
              onClick={() => setCurrentPage(pageNumber)}
              className={`p-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-sky-500 transition duration-200 ${
                currentPage === pageNumber ? "bg-sky-700 text-white" : ""
              }`}
            >
              {pageNumber}
            </button>
          ) : (
            <span key={index} style={{ margin: "0 5px" }}>
              ...
            </span>
          )
        )}
      </div>
    </div>
  );
};

export default Pagination;
