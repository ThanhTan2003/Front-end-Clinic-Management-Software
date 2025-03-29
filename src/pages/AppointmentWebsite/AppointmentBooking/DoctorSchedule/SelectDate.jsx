import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link, Outlet, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faArrowLeft, faCircleInfo, faPhone } from "@fortawesome/free-solid-svg-icons";

import { getScheduleByDoctorAndDate } from '../../../../services/AppointmentService'
import { getToken } from "../../../../services/localStorageService";

import SelectTime from './SelectTime';

function SchedulePicker({
    doctorServiceId,
    availableDays,
    holidayMatrix,
    specificHolidays,
    doctorId,
    setSelectedDate,
    onDateTimeSelection,
}) {
    const today = new Date();
    const oneMonthLater = new Date(today);
    oneMonthLater.setMonth(today.getMonth() + 1);

    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectedDate, setSelectedDateState] = useState(null);

    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedDoctorSchedule, setSelectedDoctorSchedule] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    // Ánh xạ ngày trong tuần
    const dayMapping = {
        SUNDAY: 0,
        MONDAY: 1,
        TUESDAY: 2,
        WEDNESDAY: 3,
        THURSDAY: 4,
        FRIDAY: 5,
        SATURDAY: 6,
    };

    const numericAvailableDays = availableDays.map((day) => {
        if (dayMapping[day] !== undefined) {
            return dayMapping[day];
        }
        throw new Error(`Invalid day: ${day}`);
    });

    const isHoliday = (day, month, year) => {
        const dateString = `${year}/${month + 1}/${day}`;
        if (specificHolidays.includes(dateString)) return true;
        return holidayMatrix.some(
            ([holidayDay, holidayMonth]) =>
                holidayDay === day && holidayMonth - 1 === month
        );
    };

    const getDaysInMonth = (month, year) => {
        const days = [];
        const date = new Date(year, month, 1);
        const firstDayOfWeek = date.getDay();

        // Thêm các ô trống trước ngày 1
        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push(null);
        }

        // Thêm các ngày trong tháng
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }

        return days;
    };

    const daysInMonth = getDaysInMonth(currentMonth, currentYear);

    const prevMonth = () => {
        if (currentMonth === today.getMonth() && currentYear === today.getFullYear()) return;
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const nextMonth = () => {
        const nextDate = new Date(currentYear, currentMonth + 1, 1);
        if (nextDate > oneMonthLater) return;
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const isSelectable = (day, month, year) => {
        const date = new Date(year, month, day);
        const isValidDay = numericAvailableDays.includes(date.getDay());
        const maxSelectableDate = new Date(today);
        maxSelectableDate.setMonth(today.getMonth() + 1);
        maxSelectableDate.setDate(today.getDate());

        return (
            date > today &&
            date <= maxSelectableDate &&
            isValidDay &&
            !isHoliday(day, month, year)
        );
    };

    const handleDateSelection = (date) => {
        console.log("Ngày được chọn:", date);

        const adjustedDate = new Date(date.getTime() + 7 * 60 * 60 * 1000);

        const year = adjustedDate.getFullYear();
        const month = String(adjustedDate.getMonth() + 1).padStart(2, "0");
        const day = String(adjustedDate.getDate()).padStart(2, "0");

        const formattedDate = `${year}-${month}-${day}`;

        console.log("Ngày sau khi điều chỉnh múi giờ:", formattedDate);

        setSelectedDateState(date); // Cập nhật state nội bộ
        setSelectedDate(date); // Cập nhật state bên ngoài thông qua prop
        setSelectedDoctorSchedule(formattedDate); // Xóa thông tin khung giờ cũ
        setTimeSlots([]); // Reset danh sách khung giờ cũ

        const dayOfWeek = Object.keys(dayMapping).find(
            (key) => dayMapping[key] === date.getDay()
        );

        if (!dayOfWeek) return;

        // Gọi API với ngày đã điều chỉnh
        fetchTimeSlots(formattedDate);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    // Hàm đóng modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const fetchTimeSlots = async (formattedDate) => {
        const accessToken = getToken();
        try {
            const response = await fetch(
                `${getScheduleByDoctorAndDate}/${doctorId}/schedule?date=${formattedDate}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'ngrok-skip-browser-warning': 'true'
                    }
                }
            );
            console.log(`${getScheduleByDoctorAndDate}/${doctorId}/schedule?date=${formattedDate}`)
            const data = await response.json();
            setTimeSlots(
                data.map((slot) => ({
                    id: slot.id,
                    session: slot.timeFrameResponse.session,
                    name: slot.timeFrameResponse.name,
                }))
            );
            openModal();
        } catch (error) {
            console.error("Lỗi khi lấy danh sách khung giờ:", error);
        }
    };

    return (
        <div>
            {isModalOpen && (
                <SelectTime
                    selectedDate={selectedDate}
                    timeSlots={timeSlots}
                    setSelectedDoctorSchedule={setSelectedDoctorSchedule}
                    doctorId={doctorId}
                    onClose={closeModal}
                    onDateTimeSelection={onDateTimeSelection}
                />
            )}
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
                    CHỌN NGÀY KHÁM
                </h1>
                <div className="mt-2 w-32 mx-auto h-1 bg-gradient-to-r from-cyan-600 to-blue-800 rounded-full"></div>
            </div>

            <div className="bg-white p-2 border border-sky-300 rounded-md m-4">
                <div className="text-sm text-gray-600 text-justify">
                    <FontAwesomeIcon icon={faCircleInfo} /> <b>Phòng Khám Đa Khoa Dân Quý </b>hỗ trợ đặt lịch khám trước hẹn từ <b>1</b> đến <b>30</b> ngày.
                </div>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
                {/* Hôm nay */}
                <div className="flex items-center">
                    <div className="w-6 h-6 bg-red-300 rounded-lg mr-2"></div>
                    <span className="text-gray-700">Hôm nay</span>
                </div>

                {/* Còn trống */}
                <div className="flex items-center">
                    <div className="w-6 h-6 bg-sky-200 rounded-lg mr-2"></div>
                    <span className="text-gray-700">Còn trống</span>
                </div>

                {/* Kín lịch */}
                <div className="flex items-center">
                    <div className="w-6 h-6 bg-gray-200 rounded-lg mr-2"></div>
                    <span className="text-gray-700">Kín lịch</span>
                </div>
            </div>
            {/* Phần dịch vụ và thông tin */}
            <div className="w-full p-4">
                <div className="border border-sky-300 rounded-t-md bg-white">
                    <div className="flex justify-between items-center mb-4 bg-sky-600 p-4">
                        <button
                            onClick={prevMonth}
                            disabled={currentMonth === today.getMonth() && currentYear === today.getFullYear()}
                            className="text-white hover:bg-cyan-700 p-2 rounded-full"
                        >
                            <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                        </button>
                        <h2 className="text-lg font-bold text-white">
                            THÁNG {currentMonth + 1} - {currentYear}
                        </h2>
                        <button
                            onClick={nextMonth}
                            className="text-white hover:bg-cyan-700 p-2 rounded-full"
                        >
                            <FontAwesomeIcon icon={faChevronRight} size="lg" />
                        </button>
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-center p-4">
                        {["CN", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy"].map((day) => (
                            <div key={day} className="text-cyan-800 font-bold">
                                {day}
                            </div>
                        ))}
                        {daysInMonth.map((date, index) => {
                            if (!date) {
                                return <div key={index} className="p-2"></div>;
                            }

                            const isAvailable = isSelectable(
                                date.getDate(),
                                date.getMonth(),
                                date.getFullYear()
                            );
                            const isToday =
                                date.getDate() === today.getDate() &&
                                date.getMonth() === today.getMonth() &&
                                date.getFullYear() === today.getFullYear();

                            const isSelected =
                                selectedDate &&
                                selectedDate.toISOString().split("T")[0] === date.toISOString().split("T")[0];

                            return (
                                <button
                                    key={index}
                                    disabled={!isAvailable}
                                    className={`p-2 rounded-lg ${isToday
                                        ? "bg-red-300 text-white"
                                        : isSelected
                                            ? "bg-sky-100 text-cyan-700 hover:bg-sky-200 font-semibold"
                                            : isAvailable
                                                ? "bg-sky-100 text-cyan-700 hover:bg-sky-200 font-semibold"
                                                : "bg-gray-100 text-gray-400"
                                        }`}
                                    onClick={() => {
                                        if (isAvailable) {
                                            handleDateSelection(date);
                                        }
                                    }}
                                >
                                    {date.getDate()}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
            {/* Phần thông báo về khung giờ */}
            <div className="bg-yellow-50 p-4 border border-yellow-300 rounded-md m-4 mt-2">
                <div className="text-center text-sm text-gray-600">
                    Trong trường hợp không chọn được khung giờ, vui lòng gọi đến bộ phận CSKH để được hỗ trợ.
                </div>
                <div className="mt-2 text-center">
                    <a href="tel:02733907909">
                        <button className="px-4 py-2 border-2 border-cyan-700 text-cyan-700 font-bold rounded-lg  hover:bg-cyan-50">
                            <FontAwesomeIcon icon={faPhone} /> &nbsp; 0273 3907 909
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SchedulePicker;