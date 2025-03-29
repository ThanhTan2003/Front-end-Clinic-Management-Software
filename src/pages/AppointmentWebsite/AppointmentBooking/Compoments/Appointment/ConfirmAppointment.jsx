import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link, Outlet, useParams } from "react-router-dom";

import { getPatientById, getDoctorServiceById, getDoctorScheduleById } from '../../../../../services/AppointmentService'
import { getToken } from "../../../../../services/localStorageService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faMagnifyingGlass, faArrowLeft, faFileMedical } from "@fortawesome/free-solid-svg-icons";

export default function MainContent() {
  const { appointmentId, patientId, doctorServiceId, doctorScheduleId, date } = useParams();

  const [patient, setPatient] = useState(null);
  const [doctorService, setDoctorService] = useState(null);
  const [doctorSchedule, setDoctorSchedule] = useState(null);

  // Hàm lấy danh sách dịch vụ
  const fetchPatient = async (accessToken) => {
    try {
      const response = await fetch(
        `${getPatientById}/${patientId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'ngrok-skip-browser-warning': 'true'
          }
        }
      );

      const data = await response.json();

      setPatient(data);

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {

    }
  };

  // Hàm lấy danh sách dịch vụ
  const fetchDoctorService = async (accessToken) => {
    try {
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

      setDoctorService(data);

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {

    }
  };

  // Hàm lấy danh sách dịch vụ
  const fetchDoctorSchedule = async (accessToken) => {
    try {
      const response = await fetch(
        `${getDoctorScheduleById}/${doctorScheduleId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'ngrok-skip-browser-warning': 'true'
          }
        }
      );

      const data = await response.json();

      setDoctorSchedule(data);

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {

    }
  };

  useEffect(() => {
    const accessToken = getToken();
    fetchPatient(accessToken);
    fetchDoctorService(accessToken);
    fetchDoctorSchedule(accessToken);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn lên đầu trang khi component được mount
  }, []);

  const navigate = useNavigate();
  return (
    <>
      {
        !appointmentId && (
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
                XÁC NHẬN THÔNG TIN
              </h1>
              <div className="mt-2 w-32 mx-auto h-1 bg-gradient-to-r from-cyan-600 to-blue-800 rounded-full"></div>
            </div>


            {/* Danh sách bác sĩ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
              <div
                className="bg-white rounded-lg p-3 flex flex-col justify-between relative border border-sky-600"
              >
                <div className="text-1xl font-bold text-sky-800 mb-4">
                  HỒ SƠ ĐẶT KHÁM
                </div>
                <div className="grid grid-cols-[4fr,6fr] gap-2">
                  <p><strong>Mã hồ sơ: </strong></p>
                  <p>{patient?.id || "..."}</p>

                  <p><strong>Họ tên: </strong></p>
                  <p>{patient?.fullName || "..."}</p>

                  <p><strong>Giới tính: </strong></p>
                  <p>{patient?.gender || "..."}</p>

                  <p><strong>Ngày sinh: </strong></p>
                  <p>{patient?.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString('en-GB') : "..."}</p>

                  <p><strong>Số điện thoại: </strong></p>
                  <p>{patient?.phoneNumber || "..."}</p>

                  <p><strong>Số căn cước: </strong></p>
                  <p>{patient?.identityCard || "..."}</p>

                  <p><strong>Số thẻ BHYT: </strong></p>
                  <p>{patient?.insuranceId || "..."}</p>

                  <p><strong>Địa chỉ: </strong></p>
                  <p>{patient?.address || "..."}</p>
                </div>

              </div>

              <div
                className="bg-white rounded-lg shadow-md p-3 flex flex-col justify-between relative border border-sky-600"
              >
                <div className=" fixedflex items-start">
                  <div className="text-1xl font-bold text-sky-800 mb-4">
                    THÔNG TIN ĐẶT KHÁM
                  </div>

                  <div className="grid grid-cols-[4fr,6fr] gap-2">
                    <p><strong>Dịch vụ: </strong></p>
                    <p>{doctorService?.serviceResponse?.serviceName || "..."}</p>

                    <p><strong>Bác sĩ: </strong></p>
                    <p>{doctorService?.doctorResponse?.name || "..."}</p>

                    <p><strong>Ngày khám: </strong></p>
                    <p>{date ? new Date(date).toLocaleDateString('en-GB') : "..."}</p>


                    <p><strong>Giờ khám: </strong></p>
                    <p>{doctorSchedule?.timeFrameResponse?.fullName || "..."}</p>

                    <p><strong>Phòng khám: </strong></p>
                    <p>{doctorSchedule?.roomName || "..."}</p>

                    <p><strong>Phí khám bệnh: </strong></p>
                    <p>{doctorService?.serviceResponse?.price || "..."}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center pt-1 p-4 pb-6">
              <button
                //onClick={handleSubmit}
                className="w-full h-12 bg-sky-700 text-white font-bold rounded-lg hover:bg-sky-600 transition duration-300"
              >
                Xác nhận đặt lịch
              </button>
            </div>
          </div>
        )
      }

      <Outlet />
    </>
  );
}
