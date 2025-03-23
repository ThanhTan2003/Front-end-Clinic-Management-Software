import React, { useEffect } from "react";
import { Link, Routes, Route, useLocation, Outlet } from "react-router-dom";
import SeviceCaterory from './AppointmentBooking/ServiceBooking/ServiceCaterory'
import ServiceBooking_Service from'./AppointmentBooking/ServiceBooking/Service'
import NotFound from "../../components/NotFound";

function MainContent() {
    return (
        <div>
            <Routes>
                <Route index element={<NotFound />} />
                <Route path="service-booking" element={<SeviceCaterory />}>
                    <Route path=":serviceCategoryId" element={<ServiceBooking_Service />}>
                    
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