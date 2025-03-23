import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link, Outlet, useParams } from "react-router-dom";

import { searchServices } from '../../../../services/AppointmentService'
import { getToken } from "../../../../services/localStorageService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faMagnifyingGlass, faArrowLeft, faFileMedical } from "@fortawesome/free-solid-svg-icons";
import ModalDetail from '../Compoments/ModalDetail';

export default function DanhSachDichVu() {
    const [services, setServices] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5); // Mỗi lần lấy 5 dịch vụ
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState(""); // Từ khóa tìm kiếm
    const [isModalOpen, setIsModalOpen] = useState(false);  // Trạng thái của modal
    const [modalContent, setModalContent] = useState({ title: "", content: "" });  // Nội dung modal
    const [isSearch, setIsSearch] = useState(false);

    const timeoutRef = useRef(null);  // Dùng useRef để lưu timeout
    const { serviceCategoryId } = useParams();
    const { serviceId } = useParams();

    const navigate = useNavigate();

    // Hàm lấy danh sách dịch vụ
    const fetchServiceCategories = async (accessToken) => {
        setLoading(true);
        console.log("Lay danh sach")
        try {
            const response = await fetch(
                `${searchServices}?keyword=${keyword}&serviceCategoryId=${serviceCategoryId}&page=${currentPage}&size=${pageSize}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'ngrok-skip-browser-warning': 'true'
                    }
                }
            );

            const data = await response.json();
            setTotalPages(data.totalPages || 1);

            // Nếu muốn chỉ tải thêm các dịch vụ, giữ nguyên các dịch vụ cũ
            if (currentPage === 1) {
                setServices(data.data || []); // Nếu là trang đầu tiên, thay thế danh sách
            } else {
                setServices(prevCategories => [...prevCategories, ...(data.data || [])]); // Nếu là các trang tiếp theo, thêm mới vào
            }

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const accessToken = getToken();
        fetchServiceCategories(accessToken);
    }, [currentPage, isSearch]);

    // Hàm xử lý từ khóa tìm kiếm và debounce
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setKeyword(value);

        // Hủy bỏ timeout trước đó nếu có
        clearTimeout(timeoutRef.current);

        // Tạo timeout mới để trì hoãn việc gọi API sau 500ms
        timeoutRef.current = setTimeout(() => {
            setIsSearch(!isSearch);  // Thực hiện tìm kiếm sau khi người dùng dừng gõ
            setCurrentPage(1);  // Quay lại trang đầu khi tìm kiếm mới
        }, 500); // Đặt thời gian debounce là 500ms
    };

    // Hàm cắt mô tả
    const getShortenedDescription = (description, maxLength) => {
        if (description.length <= maxLength) {
            return description; // Nếu độ dài không vượt quá, không cần cắt
        }

        let shortened = description.substring(0, maxLength);
        const lastSpaceIndex = shortened.lastIndexOf(' ');

        if (lastSpaceIndex !== -1) {
            shortened = shortened.substring(0, lastSpaceIndex);
        }

        return `${shortened}...`;
    };

    // Hàm mở modal khi nhấn vào nút "Chi tiết"
    const openModal = (service) => {
        setModalContent({ title: service.serviceName.toUpperCase(), content: service.description });
        setIsModalOpen(true);  // Mở modal
    };

    // Hàm đóng modal
    const closeModal = () => {
        setIsModalOpen(false);  // Đóng modal
    };

    return (
        <>
            {
                !serviceId && (
                    <div>
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
                                CHỌN DỊCH VỤ
                            </h1>
                            <div className="mt-2 w-32 mx-auto h-1 bg-gradient-to-r from-cyan-600 to-blue-800 rounded-full"></div>
                        </div>

                        {/* Ô nhập từ khóa và nút Tìm */}
                        <div className="text-center pt-2">
                            <input
                                type="text"
                                placeholder="Nhập từ khóa tìm kiếm"
                                value={keyword}
                                onChange={handleSearchChange}  // Thực hiện debounce khi người dùng nhập
                                className="p-2 border border-cyan-700 rounded-md w-4/6"
                            />
                            <button
                                onClick={() => {
                                    setCurrentPage(1)
                                    setIsSearch(!isSearch)
                                }}
                                className="ml-2 p-2 bg-gradient-to-r from-cyan-600 to-sky-700 text-white font-semibold rounded-md w-1/5"
                            >
                                <FontAwesomeIcon icon={faMagnifyingGlass} /> Tìm
                            </button>
                        </div>

                        {/* Danh sách dịch vụ */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                            {services.map((service) => (
                                <div
                                    key={service.id}
                                    className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between relative border border-sky-600"
                                    style={{ minHeight: "180px" }}
                                >
                                    <div className="flex items-center gap-6 mb-6">
                                        <img
                                            src={service.image || "https://cdn-icons-png.flaticon.com/512/1976/1976945.png"}
                                            alt="service-icon"
                                            className="w-20 h-20 object-contain"
                                        />
                                        <div className="flex-1">
                                            <h4
                                                className="text-1xl font-bold bg-clip-text text-transparent"
                                                style={{
                                                    backgroundImage: "linear-gradient(to right, #0078B7, #004F8C)",
                                                }}
                                            >
                                                {service.serviceName.toUpperCase()}
                                            </h4>
                                            <p className="text-sm text-gray-700 mt-1 text-justify">
                                                {getShortenedDescription(service.description, 90)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Nút hành động */}
                                    <div className="flex gap-2 justify-end">
                                        <button
                                            onClick={() => openModal(service)}  // Mở modal khi nhấn nút Chi tiết
                                            className="w-28 h-10 border-2 border-cyan-700 text-cyan-700 font-semibold rounded-lg bg-white hover:bg-cyan-50 transition duration-300"
                                        >
                                            Chi tiết
                                        </button>
                                        <Link to={`${service.id}`}>
                                            <button className="w-40 h-10 bg-gradient-to-r from-cyan-600 to-sky-700 text-white font-semibold rounded-lg shadow-lg hover:from-cyan-800 hover:to-blue-900 transition duration-300">
                                                Chọn dịch vụ
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination for mobile */}
                        {currentPage < totalPages && (
                            <div className="flex justify-center p-4 mb-4">
                                <button
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    className="w-full h-12 bg-gradient-to-r from-cyan-600 to-sky-700 text-white font-bold rounded-lg shadow-lg hover:from-cyan-800 hover:to-blue-900 transition duration-300"
                                >
                                    Xem thêm &nbsp; <FontAwesomeIcon icon={faCaretDown} />
                                </button>
                            </div>
                        )}
                    </div>
                )
            }

            {/* Hiển thị ModalDetail khi modal được mở */}
            {isModalOpen && (
                <ModalDetail
                    title={modalContent.title}
                    content={modalContent.content}
                    onClose={closeModal}
                />
            )}

            <Outlet />
        </>
    );
}
