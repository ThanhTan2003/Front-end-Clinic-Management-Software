import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link, Outlet, useParams } from "react-router-dom";

import { searchDoctors } from '../../../../services/AppointmentService'
import { getToken } from "../../../../services/localStorageService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faMagnifyingGlass, faArrowLeft, faFileMedical } from "@fortawesome/free-solid-svg-icons";
import ModalDetail from '../Compoments/Booking/ModalDetail';

export default function MainContent() {
    const [doctors, setDoctors] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5); // Mỗi lần lấy 5 dịch vụ
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState(""); // Từ khóa tìm kiếm
    const [isModalOpen, setIsModalOpen] = useState(false);  // Trạng thái của modal
    const [modalContent, setModalContent] = useState({ title: "", content: "" });  // Nội dung modal
    const [isSearch, setIsSearch] = useState(false);

    const timeoutRef = useRef(null);  // Dùng useRef để lưu timeout

    const { doctorId } = useParams();

    const navigate = useNavigate();

    // Hàm lấy danh sách dịch vụ
    const fetchDoctors = async (accessToken) => {
        setLoading(true);
        try {
            const response = await fetch(
                `${searchDoctors}?keyword=${keyword}&page=${currentPage}&size=${pageSize}`,
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
                setDoctors(data.data || []); // Nếu là trang đầu tiên, thay thế danh sách
            } else {
                setDoctors(prevCategories => [...prevCategories, ...(data.data || [])]); // Nếu là các trang tiếp theo, thêm mới vào
            }

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const accessToken = getToken();
        fetchDoctors(accessToken);
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
    const openModal = (doctorResponse) => {
        setModalContent({ title: doctorResponse.name.toUpperCase(), content: doctorResponse.description });
        setIsModalOpen(true);  // Mở modal
    };

    // Hàm đóng modal
    const closeModal = () => {
        setIsModalOpen(false);  // Đóng modal
    };

    return (
        <>
            {
                !doctorId && (
                    <div>
                        
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
                                CHỌN BÁC SĨ
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

                        {/* Danh sách bác sĩ */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                            {doctors.map((doctor) => (
                                <div
                                    key={doctor.id}
                                    className="bg-white rounded-lg shadow-md p-3 flex flex-col justify-between relative border border-slate-300"
                                    
                                >
                                    {/* Dòng 1: Hình ảnh bác sĩ và nội dung */}
                                    <div className="flex items-center gap-6">
                                        {/* Hình ảnh bác sĩ (chiếm 1/3 chiều rộng) */}
                                        <div className="w-1/3 h-auto flex-shrink-0 overflow-hidden rounded-l-lg ">
                                            <img
                                                src={doctor.image || (doctor.gender === "Nam"
                                                    ? "/images/default-male-doctor.jpg"
                                                    : "/images/default-female-doctor.jpg")}
                                                alt="Ảnh bác sĩ"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = doctor.gender === "Nam"
                                                        ? "/images/default-male-doctor.jpg"
                                                        : "/images/default-female-doctor.jpg";
                                                }}
                                            />
                                        </div>

                                        {/* Nội dung bác sĩ (chiếm 2/3 chiều rộng) */}
                                        <div className="flex-1">
                                            <h4 className="text-lg font-bold text-sky-800">
                                                {doctor.name.toUpperCase()}
                                            </h4>
                                            <p className="text-sm text-amber-800">
                                                <span className="font-semibold">Giới tính:</span> {doctor.gender || "Chưa cập nhật"}
                                            </p>
                                            <p className="text-sm text-gray-700 mt-1">
                                            <span className="font-semibold">Chuyên môn:</span> {doctor.nameOfServiceCategory || "..."}
                                            </p>
                                            {/* Dòng 2: Nút hành động */}
                                            <div className="flex gap-2 justify-end mt-3 ">
                                                <button
                                                    onClick={() => openModal(doctor)} // Mở modal khi nhấn nút "Chi tiết"
                                                    className="w-20 h-10 border-2 border-cyan-700 text-cyan-700 font-semibold rounded-lg bg-white hover:bg-cyan-50 transition duration-300"
                                                >
                                                    Chi tiết
                                                </button>
                                                <Link to={`${doctor.id}`}>
                                                    <button className="ml-2 w-24 h-10 bg-gradient-to-r from-cyan-600 to-sky-700 text-white font-semibold rounded-lg shadow-lg hover:from-cyan-800 hover:to-blue-900 transition duration-300">
                                                        Chọn
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
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
