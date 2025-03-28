import React, { useEffect } from "react";
import { Link, Routes, Route, useLocation, Outlet } from "react-router-dom";

import SeviceCaterory from './AppointmentBooking/ServiceBooking/ServiceCaterory'
import ServiceBooking_Service from './AppointmentBooking/ServiceBooking/Service'
import ServiceBooking_DoctorService from './AppointmentBooking/ServiceBooking/DoctorService'

import DoctorBooking_Doctor from './AppointmentBooking/DoctorBooking/Doctor'
import DoctorBooking_DoctorService from './AppointmentBooking/DoctorBooking/DoctorService'
import DoctorSchedule from "./AppointmentBooking/DoctorSchedule/DoctorSchedule";

import Patient from './AppointmentBooking/Compoments/Patient/Patient'
import CreatePatient from './AppointmentBooking/Compoments/Patient/Create'

import ConfirmAppointment from './AppointmentBooking/Compoments/Appointment/ConfirmAppointment'
import AppointmentResult from './AppointmentBooking/Compoments/Appointment/AppointmentResult'
import BookingResult from './AppointmentBooking/Compoments/BookingResult/BookingResult'

import NotFound from "../../components/NotFound"

function MainContent() {
    return (
        <div className="bg-slate-50  min-h-screen">
            <Routes>
                <Route index element={<NotFound />} />
                <Route path="service-booking" element={<SeviceCaterory />}>
                    <Route path=":serviceCategoryId" element={<ServiceBooking_Service />}>
                        <Route path=":serviceId" element={<ServiceBooking_DoctorService />}>
                            <Route path=":doctorServiceId" element={<DoctorSchedule />}>
                                <Route path=":doctorScheduleId/:date" element={<Patient />}>
                                    <Route path=":patientId" element={<ConfirmAppointment />}>
                                        <Route path=":appointmentId" element={<AppointmentResult />}>

                                        </Route>
                                    </Route>
                                    <Route path="create" element={<CreatePatient />}>

                                    </Route>
                                </Route>
                            </Route>
                        </Route>
                    </Route>
                </Route>

                <Route path="doctor-booking" element={<DoctorBooking_Doctor />}>
                    <Route path=":doctorId" element={<DoctorBooking_DoctorService />}>
                        <Route path=":doctorServiceId" element={<DoctorSchedule />}>
                            <Route path=":doctorScheduleId/:date" element={<Patient />}>
                                <Route path=":patientId" element={<ConfirmAppointment />}>
                                    <Route path=":appointmentId" element={<AppointmentResult />}>

                                    </Route>
                                </Route>
                                <Route path="create" element={<CreatePatient />}>

                                </Route>
                            </Route>
                        </Route>
                    </Route>
                </Route>

            </Routes>
        </div>
    )
}

export default function index() {
    return (
        <div>
            <MainContent />
        </div>
    )
}