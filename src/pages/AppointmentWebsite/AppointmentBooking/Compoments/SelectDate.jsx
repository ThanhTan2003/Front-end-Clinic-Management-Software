import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link, Outlet, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function SchedulePicker({
    doctorServiceId,
    availableDays,
    holidayMatrix,
    specificHolidays,
    onDateTimeSelection,
    setSelectedDate,
}) {
    const today = new Date();
    const oneMonthLater = new Date(today);
    oneMonthLater.setMonth(today.getMonth() + 1);

    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectedDate, setSelectedDateState] = useState(null);

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
    return (
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
                    CHỌN NGÀY KHÁM
                </h1>
                <div className="mt-2 w-32 mx-auto h-1 bg-gradient-to-r from-cyan-600 to-blue-800 rounded-full"></div>
            </div>
            <div className="w-full bg-white p-4">
                <div className="border border-sky-300 rounded-t-md">
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
                                        ? "bg-sky-600 text-white font-bold"
                                        : isAvailable
                                            ? "bg-sky-100 text-cyan-700 hover:bg-sky-200 font-semibold"
                                            : "bg-gray-100 text-gray-400"
                                    }`}
                                onClick={() => {
                                    if (isAvailable) {

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
        </div>
    );
};

export default SchedulePicker;