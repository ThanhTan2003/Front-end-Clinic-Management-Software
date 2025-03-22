import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faRotate, faMessage, faCommentDots, faCircleInfo, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

import { searchUsers, getTags } from '../../../../services/ZaloOAService';
import { getToken } from "../../../../services/localStorageService";
import Pagination from "../../../../components/Pagination";

// Filter Section
const FilterSection = ({
  keyword,
  setKeyword,
  handleSearch,
  tags,
  selectedTagId,
  setSelectedTagId,
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
        title="Tải lại danh sách với Zalo OA"
      >
        Tải lại danh sách&nbsp;<FontAwesomeIcon icon={faRotate} />
      </button>
    </div>

    <div className="flex items-center space-x-2">
      {/* Dropdown cho Tags */}
      <select
        className="border p-2 rounded border-blue-300"
        value={selectedTagId}
        onChange={(e) => {
          setCurrentPage(1);
          setSelectedTagId(e.target.value);
        }}
      >
        <option value="">Tất cả nhóm đối tượng</option>
        {tags.map((tag) => (
          <option key={tag.id} value={tag.id}>
            {tag.name}
          </option>
        ))}
      </select>

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
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selectedTagId, setSelectedTagId] = useState("");
  const [tags, setTags] = useState([])

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);

  const [notification, setNotification] = useState("");

  const { userId } = useParams();

  // Hàm sao chép ID vào clipboard và hiển thị thông báo
  const copyToClipboard = (id) => {
    navigator.clipboard.writeText(id)  // Sao chép ID vào clipboard
      .then(() => {
        setNotification("Đã sao chép ID!"); // Hiển thị thông báo
        setTimeout(() => {
          setNotification(""); // Ẩn thông báo sau 2 giây
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  // Lấy danh sách tags từ API
  const fetchTags = async (accessToken) => {
    const response = await fetch(`${getTags}?page=1&size=300`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'ngrok-skip-browser-warning': 'true' // Thêm header này
        }
      }
    );

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new TypeError('Response is not JSON');
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    setTags(data.data);
  };

  useEffect(() => {
    const accessToken = getToken();
    //     if (!accessToken) {
    //         navigate("/login");
    //     } else {
    //         getUserDetails(accessToken);
    //         getSpecialties(accessToken);
    // }
    fetchTags(accessToken);
  }, []);

  const fetchData = async (accessToken) => {
    try {
      const response = await fetch(
        `${searchUsers}?keyword=${keyword}&tagId=${selectedTagId}&page=${currentPage}&size=${pageSize}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'ngrok-skip-browser-warning': 'true' // Thêm header này
          }
        }
      );

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new TypeError('Response is not JSON');
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data.data || []);
      setTotalPages(data.totalPages || 0);
      setTotalElements(data.totalElements || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const accessToken = getToken();
    //     if (!accessToken) {
    //         navigate("/login");
    //     } else {
    //         getUserDetails(accessToken);
    //         getSpecialties(accessToken);
    // }
    fetchData(accessToken);
  }, [keyword, selectedTagId, currentPage, pageSize]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchData();
  };

  return (
    <>
      {
        !userId && (
          <div className="container mx-auto">
            {/* Filter Section */}
            <FilterSection
              keyword={keyword}
              setKeyword={setKeyword}
              handleSearch={handleSearch}
              tags={tags}
              selectedTagId={selectedTagId}
              setSelectedTagId={setSelectedTagId}
              setCurrentPage={setCurrentPage}
            />

            {/* Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 shadow-lg rounded-md">
                <thead>
                  <tr className="bg-sky-600 text-white">
                    <th className="border p-2 text-center">STT</th>
                    <th className="border p-2 text-left">Zalo User ID</th>
                    <th className="border p-2 text-left whitespace-nowrap">Tên người dùng</th>
                    <th className="border p-2 text-left">Nhóm đối tượng</th>
                    <th className="border p-2 text-center"></th>
                    <th className="border p-2 text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <tr key={user.id} className="border hover:bg-gray-100 transition duration-200 ease-in-out align-top">
                        <td className="border p-2 text-center align-top">{index + 1}</td>
                        <td
                          className="border p-2 text-left cursor-copy"
                          onClick={() => copyToClipboard(user.id)}
                          title="Sao chép"
                        >
                          {user.id}
                        </td>
                        <td
                          className="p-2 pr-4 flex items-center space-x-2 font-semibold text-left whitespace-nowrap cursor-help"
                          title="Xem thông tin"
                        >
                          <img src={user.avatar} alt={user.displayName} className="w-8 h-8 rounded-full" />
                          <span>{user.displayName}</span>
                        </td>
                        <td className="border p-2">
                          {user.tags.length > 0 ? (
                            <div className="flex flex-wrap space-x-2 justify-start">
                              {user.tags.map((tag, idx) => (
                                <span
                                  key={tag.id}
                                  className="bg-blue-50 text-sky-600 px-3 py-1 rounded-sm font-medium mb-1"
                                  style={{ marginLeft: "8px", whiteSpace: "nowrap" }}
                                >
                                  {tag.name}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-500"></span>
                          )}
                        </td>
                        <td className="border p-2 text-center w-32 whitespace-nowrap">
                          <a href={user.chatLink} target="_blank" rel="noopener noreferrer">
                            <button className="bg-white text-sky-600 px-3 py-1 rounded border border-sky-600 hover:bg-sky-100">
                              Nhắn tin <FontAwesomeIcon icon={faCommentDots} />
                            </button>
                          </a>
                        </td>
                        <td className="border p-2 text-center w-32 whitespace-nowrap">
                          <Link to={`/zalo-oa/user/${user.id}`}>
                            <button className="bg-sky-600 text-white px-3 py-1 rounded border border-sky-600 hover:bg-sky-700">
                              Chi tiết <FontAwesomeIcon icon={faCircleInfo} />
                            </button>
                          </Link>
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
        )
      }
      <Outlet />
    </>
  );
};

export default DataTable;