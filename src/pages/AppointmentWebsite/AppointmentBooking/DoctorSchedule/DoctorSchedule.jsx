import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import SelectDate from './SelectDate'

import { getListDayOfWeekByDoctorService, getDoctorServiceById } from '../../../../services/AppointmentService'
import { getToken } from "../../../../services/localStorageService";

const MainContent = () => {
  const { doctorServiceId } = useParams();
  const { doctorScheduleId } = useParams();

  const navigate = useNavigate();

  const [availableDays, setAvailableDays] = useState([]);
  const [loading, setLoading] = useState(true);

  const holidayMatrix = [[1, 1], [30, 4], [2, 9]];
  const specificHolidays = ["2024/12/30", "2025/09/03"];

  const [doctorId, setDoctorId] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedDoctorScheduleId, setSelectedDoctorScheduleId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const fetchDoctor = async (accessToken) =>{
    try {
        setLoading(true);
        const response = await fetch(
          `${getDoctorServiceById}/${doctorServiceId}`,
          {
              method: "GET",
              headers: {
                  Authorization: `Bearer ${accessToken}`,
                  'ngrok-skip-browser-warning': 'true'
              }
          }
      );
        const data = await response.json();
        setDoctorId(data.doctorId);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      } finally {
        
      }
  }

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
  const handleDateTimeSelection = async (date, doctorScheduleId) => {
    setSelectedDate(date);
    setSelectedDoctorScheduleId(doctorScheduleId);
    navigate(`${doctorScheduleId}/${date}`);
  };

  useEffect(() => {
    const accessToken = getToken();
    if (doctorServiceId) {
      fetchAvailableDays(accessToken);
      fetchDoctor(accessToken);
    }
  }, [doctorServiceId]);


  return (
    <>
      {
        !doctorScheduleId && (
          <div>
            <SelectDate
              doctorServiceId={doctorServiceId}
              availableDays={availableDays}
              holidayMatrix={holidayMatrix}
              specificHolidays={specificHolidays}
              doctorId={doctorId}
              setSelectedDate = {setSelectedDate}
              onDateTimeSelection={handleDateTimeSelection}
            />
          </div>
        )
      }
      <Outlet />
    </>
  );
};

export default MainContent;
