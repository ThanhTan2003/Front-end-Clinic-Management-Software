import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import SelectDate from './SelectDate'

import { getListDayOfWeekByDoctorService } from '../../../../services/AppointmentService'
import { getToken } from "../../../../services/localStorageService";

const MainContent = () => {
  const { doctorServiceId } = useParams();
  const navigate = useNavigate();

  const [availableDays, setAvailableDays] = useState([]);
  const [loading, setLoading] = useState(true);

  const holidayMatrix = [[1, 1], [30, 4], [2, 9]];
  const specificHolidays = ["2024/12/30", "2025/09/03"];

  const [serviceTimeFrameId, setServiceTimeFrameId] = useState(null);

  // Các trạng thái quản lý
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal xác nhận ngày/khung giờ
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // Modal thông báo đăng nhập
  const [notificationMessage, setNotificationMessage] = useState(""); // Thông báo trong modal thông báo

  const [selectedDate, setSelectedDate] = useState(null);

  // Hàm gọi API để lấy availableDays
  const fetchAvailableDays = async (accessToken) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${getListDayOfWeekByDoctorService}/${doctorServiceId}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'ngrok-skip-browser-warning': 'true'
            }
        }
    );
      const data = await response.json();
      setAvailableDays(data);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý khi người dùng chọn ngày và TimeSlot
  const handleDateTimeSelection = async (date, timeSlot) => {
    // Nếu token hợp lệ, điều hướng đến ChonHoSo
    setSelectedDate(date);
    setSelectedTimeSlot(timeSlot);
    setServiceTimeFrameId(timeSlot.id); // Thiết lập serviceTimeFrameId
    console.log(date)
    navigate(`${timeSlot.id}/${date}`); // Điều hướng đến ChonHoSo với serviceTimeFrameId
  };

  // Hàm xử lý khi xác nhận từ Modal xác nhận
  const handleConfirm = () => {
    console.log("Xác nhận chọn ngày:", selectedDate);
    console.log("Xác nhận chọn TimeSlot:", selectedTimeSlot);
    setIsModalOpen(false); // Đóng Modal
  };

  // Hàm xử lý khi đóng Modal xác nhận
  const handleCloseModal = () => {
    setSelectedDate(null);
    setSelectedTimeSlot(null);
    setIsModalOpen(false);
  };

  // Hàm xử lý khi đồng ý đăng nhập từ Modal thông báo
  const handleLoginRedirect = () => {
    navigate("/login");
  };

  // Hàm xử lý khi đóng Modal thông báo
  const handleCloseNotification = () => {
    setIsNotificationOpen(false);
  };

  // Gọi API khi component mount hoặc khi doctorServiceId thay đổi
  useEffect(() => {
    const accessToken = getToken();
    if (doctorServiceId) {
      fetchAvailableDays(accessToken);
    }
  }, [doctorServiceId]);

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <>
      {
        !serviceTimeFrameId && (
          <div>
            <SelectDate
              doctorServiceId={doctorServiceId}
              availableDays={availableDays}
              holidayMatrix={holidayMatrix}
              specificHolidays={specificHolidays}
              onDateTimeSelection={handleDateTimeSelection}
              setSelectedDate = {setSelectedDate}
            />
          </div>
        )
      }
      <Outlet />
    </>
  );
};

export default MainContent;
