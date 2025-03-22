import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import NotFound from '../../components/NotFound';

import Home from './Home/index';
import Staff from './Staff/index';
import Medical from './Medical/index';
import Appointment from './Appointment/index';
import ZaloOA from './ZaloOA';
import Account from './Account/index';

import { useNavigate } from 'react-router-dom';
import { logOut } from '../../services/authenticationService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faHospitalUser, faSuitcaseMedical, faFileMedical, faSquareShareNodes, faFolderOpen, faUserGear, faUserNurse, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const menuItems = [
  { id: 'Home', label: 'Trang chủ', icon: faHouse, path: 'home' },
  { id: 'Staff', label: 'Nhân sự', icon: faUserNurse, path: 'staff' },
  { id: 'Medical', label: 'Y tế', icon: faSuitcaseMedical, path: 'medical' },
  { id: 'Appointment', label: 'Lịch hẹn', icon: faFileMedical, path: 'appointment' },
  { id: 'ZaloOA', label: 'Zalo OA', icon: faSquareShareNodes, path: 'zalo-oa' },
  { id: 'Account', label: 'Tài khoản', icon: faUserGear, path: 'account' },
];

// Sidebar Component
const Sidebar = ({ selectedPage, setSelectedPage }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate('/login');
  };

  return (
    <div className="w-64 bg-white p-5 shadow h-screen fixed">
      <div className="logo flex justify-center items-center">
        <img src="/logo.PNG" alt="Logo" className="w-full" />
      </div>
      <hr className="my-5" />
      <div>
        <h3 className="text-blue-800 mt-5 text-lg font-bold">THANH TÂN</h3>
        <p className="text-gray-800">Quản trị viên</p>
      </div>
      <hr className="my-5" />
      <ul className="menu space-y-1">
        {menuItems.map(item => (
          <li
            key={item.id}
            className={`cursor-pointer font-bold p-3 rounded ${selectedPage === item.id ? 'bg-blue-100 text-blue-800' : 'text-blue-900 hover:bg-blue-200 hover:text-blue-600'}`}
            onClick={() => {
              setSelectedPage(item.id);
              navigate(`/${item.path}`);
            }}
          >
            <FontAwesomeIcon icon={item.icon} /> &nbsp; {item.label}
          </li>
        ))}
      </ul>
      <div className="logo mt-10">
        <button
          className="bg-blue-500 text-white py-2 px-4 w-full rounded"
          onClick={handleLogout}
        >
          <b>Đăng xuất</b> &nbsp;<FontAwesomeIcon icon={faRightFromBracket} />
        </button>
      </div>
    </div>
  );
};

// Main Content Component
const MainContent = () => {
  return (
    <div className="ml-64 w-full px-5 pb-5">
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home/*" element={<Home />} />
        <Route path="/staff/*" element={<Staff />} />
        <Route path="/medical/*" element={<Medical />} />
        <Route path="/appointment/*" element={<Appointment />} />
        <Route path="/zalo-oa/*" element={<ZaloOA />} />
        <Route path="/account/*" element={<Account />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Outlet />
    </div>
  );
};

// Dashboard Component
const Dashboard = () => {
  const [selectedPage, setSelectedPage] = useState("Home");

  const location = useLocation();

  // Cập nhật selectedPage khi URL thay đổi
  useEffect(() => {
    const currentPage = menuItems.find(item => location.pathname.includes(item.path));
    if (currentPage) {
      setSelectedPage(currentPage.id);
    }
  }, [location]);

  return (
    <div className="flex bg-[#f4f5f7] min-h-screen">
      <Sidebar selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
      <MainContent />
    </div>
  );
};

export default Dashboard;