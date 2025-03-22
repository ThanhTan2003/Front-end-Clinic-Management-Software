import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faRotate, faMessage, faCommentDots, faCircleInfo, faXmark } from "@fortawesome/free-solid-svg-icons";

import { getTags } from '../../../../services/ZaloOAService';
import Pagination from "../../../../components/Pagination";

// Filter Section
const FilterSection = ({
  keyword,
  setKeyword,
  handleSearch,
  setCurrentPage
}) => (
  <div className="flex justify-between items-center mb-4">
    <div>
      <button
        className="bg-sky-600 text-white py-2 px-4 rounded font-bold hover:bg-sky-700"
        onClick={() => console.log("Syncing data...")}
        title="Đồng bộ dữ liệu với Zalo OA"
      >
        Đồng bộ dữ liệu Zalo OA&nbsp;<FontAwesomeIcon icon={faRotate} />
      </button>

      <button
        className="bg-white text-sky-600 py-2 px-4 rounded border border-sky-600 font-bold hover:bg-sky-100 ml-2"
        onClick={() => handleSearch()}
        title="Tải lại danh sách"
      >
        Tải lại danh sách&nbsp;<FontAwesomeIcon icon={faRotate} />
      </button>
    </div>

    <div className="flex items-center space-x-2">
      <button
        className="bg-sky-600 text-white py-2 px-4 rounded font-bold hover:bg-sky-700"
        onClick={() => console.log("Syncing data...")}
        title="Đồng bộ dữ liệu với Zalo OA"
      >
        Thêm mới nhóm đối tượng mới +
      </button>

      {/* Ô tìm kiếm */}
      <input
        type="text"
        placeholder="Nhập từ khóa tìm kiếm"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
          setCurrentPage(1);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setCurrentPage(1);
            handleSearch();
          }
        }}
        className="border p-2 rounded w-64 border-blue-300"
      />

      <button
        type="button"
        onClick={handleSearch}
        className="bg-sky-600 text-white py-2 px-4 rounded hover:bg-sky-700"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  </div>
);



// Main DataTable Component
const DataTable = () => {
  const [tags, setTags] = useState([]);
  const [keyword, setKeyword] = useState("");

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);

  // Hàm sao chép ID vào clipboard và hiển thị thông báo
  const copyToClipboard = (id) => {
    navigator.clipboard.writeText(id)  // Sao chép ID vào clipboard
  };


  const fetchData = async () => {
    const response = await fetch(
      `${getTags}?keyword=${keyword}&page=${currentPage}&size=${pageSize}`
    );
    const data = await response.json();
    setTags(data.data);
    setTotalPages(data.totalPages);
    setTotalElements(data.totalElements);
  };

  useEffect(() => {
    fetchData();
  }, [keyword, currentPage, pageSize]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchData();
  };

  return (
    <div className="container mx-auto">
      {/* Filter Section */}
      <FilterSection
        keyword={keyword}
        setKeyword={setKeyword}
        handleSearch={handleSearch}
        setCurrentPage={setCurrentPage}
      />

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 shadow-lg rounded-md">
          <thead>
            <tr className="bg-sky-600 text-white">
              <th className="border p-2 text-center">STT</th>
              <th className="border p-2 text-left">Tên nhóm đối tượng</th>
              <th className="border p-2 text-left  whitespace-nowrap">Số người thuộc nhóm</th>
              <th className="border p-2 text-center"></th>
            </tr>
          </thead>
          <tbody>
            {tags.length > 0 ? (
              tags.map((tag, index) => (
                <tr key={tag.id} className="border hover:bg-gray-100 transition duration-200 ease-in-out align-top">
                  <td className="border p-2 text-center align-top">{index + 1}</td> {/* Căn trái cột STT */}
                  <td
                    className="p-2 pr-4 flex items-center space-x-2 font-semibold text-left whitespace-nowrap cursor-help"
                    title="Xem thông tin"
                  >
                    {tag.name}
                  </td>
                  <td className="border p-2">
                    {tag.quantity}
                  </td>
                  <td className="border p-2 text-center w-64 whitespace-nowrap">
                    <button className="bg-sky-600 text-white px-3 py-1 rounded border border-sky-600 hover:bg-sky-700">
                      Chi tiết <FontAwesomeIcon icon={faCircleInfo} />
                    </button>
                    <button className="bg-white text-orange-700 px-3 py-1 rounded border border-orange-700 hover:bg-sky-100 ml-4">
                      Xóa <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">Không có dữ liệu</td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* Pagination */}
      <Pagination totalElements={totalElements} currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default DataTable;