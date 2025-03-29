import React from 'react';

const SelectTime = ({
    selectedDate,
    timeSlots,
    setSelectedDoctorSchedule,
    doctorId,
    onClose,
    onDateTimeSelection
}) => {

    // Hàm xử lý khi người dùng chọn khung giờ
    const handleTimeSlotClick = (slot) => {
        setSelectedDoctorSchedule(slot); // Lưu thông tin khung giờ đã chọn
        if (selectedDate && slot) {
            // Điều chỉnh thời gian theo múi giờ GMT+7
            const adjustedDate = new Date(selectedDate.getTime() + 7 * 60 * 60 * 1000);

            // Chuyển ngày thành định dạng yyyy-MM-dd (ISO format)
            const year = adjustedDate.getFullYear();
            const month = String(adjustedDate.getMonth() + 1).padStart(2, "0");
            const day = String(adjustedDate.getDate()).padStart(2, "0");
            const formattedDate = `${year}-${month}-${day}`;

            console.log("Formatted date sent to backend:", formattedDate);

            // Truyền dữ liệu đã chỉnh sửa sang MainContent
            onDateTimeSelection(formattedDate, slot.id);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-white rounded-lg shadow-lg w-10/12 p-6 max-h-[90vh] overflow-y-auto">
                <h1
                    className="text-2xl font-bold relative text-center"
                    style={{
                        background: "linear-gradient(to right, #0078B7, #00A3E0)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    CHỌN KHUNG GIỜ
                </h1>
                <div className="mt-2 w-32 mx-auto h-1 bg-gradient-to-r from-cyan-600 to-blue-800 rounded-full mb-4"></div>
                <div className="">
                    {timeSlots.length > 0 ? (
                        <>
                            {Object.entries(
                                timeSlots.reduce((sessions, slot) => {
                                    if (!sessions[slot.session]) sessions[slot.session] = [];
                                    sessions[slot.session].push(slot);
                                    return sessions;
                                }, {})
                            ).map(([session, slots]) => (
                                <div key={session} className="mb-4">
                                    <h4 className="text-md font-bold text-gray-600 pb-2">Buổi {session}:</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {slots.map((slot) => (
                                            <button
                                                key={slot.id}
                                                className="p-2 text-center rounded-lg border bg-white text-cyan-700 border-sky-700 hover:bg-sky-100"
                                                onClick={() =>{ 
                                                    console.log(slot)
                                                    handleTimeSlotClick(slot)
                                                }}
                                            >
                                                {slot.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {/* Dòng mô tả múi giờ */}
                            <p className="mt-4 text-base text-gray-500">
                                Tất cả theo múi giờ Việt Nam <b>GMT+7</b>
                            </p>
                        </>
                    ) : (
                        <div className="text-center text-gray-500">Không có khung giờ khả dụng.</div>
                    )}
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-sky-700 text-white font-semibold rounded-lg w-full"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SelectTime;
