import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link, Outlet, useParams } from "react-router-dom";

import { searchByService } from '../../../../services/AppointmentService'
import { getToken } from "../../../../services/localStorageService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faMagnifyingGlass, faArrowLeft, faFileMedical } from "@fortawesome/free-solid-svg-icons";
import ModalDetail from '../Compoments/ModalDetail';

export default function MainContent() {
    const [doctorServices, setDoctorServices] = useState([]);
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
    const { doctorServiceId } = useParams();

    const navigate = useNavigate();

    // Hàm lấy danh sách dịch vụ
    const fetchDoctorServices = async (accessToken) => {
        setLoading(true);
        try {
            const response = await fetch(
                `${searchByService}?keyword=${keyword}&serviceId=${serviceId}&page=${currentPage}&size=${pageSize}`,
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
                setDoctorServices(data.data || []); // Nếu là trang đầu tiên, thay thế danh sách
            } else {
                setDoctorServices(prevCategories => [...prevCategories, ...(data.data || [])]); // Nếu là các trang tiếp theo, thêm mới vào
            }

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const accessToken = getToken();
        fetchDoctorServices(accessToken);
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
                !doctorServiceId && (
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

                        {/* Danh sách dịch vụ */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                            {doctorServices.map((doctorService) => (
                                <div key={doctorService.id} className="bg-white rounded-lg shadow-md flex items-center m-1 border border-sky-700">
                                {/* Hình ảnh bác sĩ */}
                                <div className="w-40 h-full flex-shrink-0 overflow-hidden rounded-l-lg">
                                    <img
                                        src={doctorService.doctorResponse.image || (doctorService.doctorResponse.gender === "Nam"
                                            ? "/images/default-male-doctor.jpg"
                                            : "/images/default-female-doctor.jpg")}
                                        alt="Ảnh bác sĩ"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = doctorService.doctorResponse.gender === "Nam"
                                                ? "/images/default-male-doctor.jpg"
                                                : "/images/default-female-doctor.jpg";
                                        }}
                                    />
                                </div>
                            
                                {/* Nội dung bác sĩ */}
                                <div className="flex-1 p-4">
                                    <h4 className="text-xl font-bold text-sky-800">
                                        {doctorService.doctorResponse.name.toUpperCase()}
                                    </h4>
                                    <br />
                                    <p className="text-lg text-gray-600">
                                        <span className="font-semibold">Giới tính:</span> {doctorService.doctorResponse.gender || "Chưa cập nhật"}
                                    </p>
                                    <p className="text-lg text-gray-600">
                                        <span className="font-semibold">Dịch vụ:</span> {doctorService.serviceResponse.serviceName || "Chưa cập nhật"}
                                    </p>
                                    <p className="text-lg text-yellow-800">
                                        <span className="font-semibold">Phí khám bệnh / dịch vụ: </span> 
                                        <span className="">{doctorService.serviceResponse.price || "Liên hệ"}</span>
                                    </p>
                                    <br />
                                    <div className="mt-4 flex justify-end">
                                        <button
                                            onClick={() => openModal(doctorService.doctorResponse)} // Mở modal khi nhấn nút "Chi tiết"
                                            className="w-28 h-10 border-2 border-cyan-700 text-cyan-700 font-semibold rounded-lg bg-white hover:bg-cyan-50 transition duration-300"
                                        >
                                            Chi tiết
                                        </button>
                                        <Link to={`${doctorService.id}`}>
                                            <button className="ml-2 w-32 h-10 bg-gradient-to-r from-cyan-600 to-sky-700 text-white font-semibold rounded-lg shadow-lg hover:from-cyan-800 hover:to-blue-900 transition duration-300">
                                                Chọn bác sĩ
                                            </button>
                                        </Link>
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
