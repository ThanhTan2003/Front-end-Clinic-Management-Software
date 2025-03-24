import React, { useState, useEffect } from 'react';
import { Route, Routes, Outlet, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faUsers, faDna, faMessage } from '@fortawesome/free-solid-svg-icons';

import NotFound from '../../../components/NotFound';
import ZaloUser from './UserZalo/ZaloUser';
import Tag from './Tag/Tag';
import SendNotification from './SendNotification/SendNotification';
import UserDetail from './UserZalo/UserDetail';


// Config cho tab
const tabConfig = [
  { id: 'ZaloUser', name: 'Người dùng', icon: faUsers, path: 'user' },
  { id: 'Tag', name: 'Nhóm đối tượng', icon: faDna, path: 'tag' },
  { id: 'SendNotification', name: 'Gửi thông báo', icon: faMessage, path: 'send-notification' },
];

// Component hiển thị menu tab
function TabMenu({ selectedTab, setSelectedTab }) {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-100 flex justify-start space-x-4 w-full rounded text-gray-700 shadow">
      {tabConfig.map((tab, index) => (
        <button
          key={index}
          onClick={() => {
            setSelectedTab(tab.id);
            navigate(`/admin/zalo-oa/${tab.path}`);
          }}
          className={`py-2 px-4 font-bold rounded ${tab.id === selectedTab ? 'text-blue-600 border border-blue-600 hover:bg-slate-100' : 'hover:bg-blue-700 hover:text-white'}`}
        >
          <FontAwesomeIcon icon={tab.icon} /> &nbsp;&nbsp;{tab.name}
        </button>
      ))}
    </div>
  );
}

function Index() {
  const [selectedTab, setSelectedTab] = useState('ZaloUser');
  const location = useLocation();
  const navigate = useNavigate();

  // Cập nhật selectedTab khi URL thay đổi
  useEffect(() => {
    const currentTab = tabConfig.find(tab => `/admin/zalo-oa/${tab.path}` === location.pathname);
    if (currentTab) {
      setSelectedTab(currentTab.id);
    }
  }, [location]);

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 text-white p-2 px-3 py-3 w-full rounded text-left font-bold sticky top-0 z-10">
        <h1>QUẢN LÝ ZALO OFFICIAL ACCOUNT
        </h1>
      </div>

      {/* Tab menu */}
      <div className="sticky top-[48px] z-10">
        <TabMenu selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </div>


      {/* Content */}
      <div className="flex-1 bg-white mt-4 p-4 rounded shadow w-full">
        <Routes>
          <Route index element={<ZaloUser />} />
          <Route path='user' element={<ZaloUser />}>
            <Route path=':userId' element={<UserDetail />}>
              
            </Route>
          </Route>
          <Route path='tag' element={<Tag />}>

          </Route>
          <Route path='send-notification' element={<SendNotification />} >

          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Outlet />
      </div>
    </div>
  );
}

export default Index;