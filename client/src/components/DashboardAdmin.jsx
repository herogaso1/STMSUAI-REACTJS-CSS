import React, { useState } from "react";
import "./DashboardAdmin.css";

const DashboardAdmin = () => {
    const [activeSection, setActiveSection] = useState("users");
    const [searchTerm, setSearchTerm] = useState("");

    // Dữ liệu mẫu người dùng
    const users = [
        {
            id: 1,
            avatar: "https://i.pravatar.cc/40?img=1",
            firstName: "Nguyễn",
            lastName: "An",
            phone: "0901234567",
            email: "an.nguyen@example.com",
            role: "Sinh Viên",
            disabled: "Không",
        },
        {
            id: 2,
            avatar: "https://i.pravatar.cc/40?img=2",
            firstName: "Trần",
            lastName: "Bình",
            phone: "0987654321",
            email: "binh.tran@example.com",
            role: "Sinh viên",
            disabled: "Không",
        },
    ];

    // Lọc người dùng theo tìm kiếm
    const filteredUsers = users.filter(
        (user) =>
            user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="dashboard-admin">
            {/* Header */}
            <header className="admin-header">
                <h1>STMSUAL - ADMIN</h1>
                <div className="admin-header-right">
                    <span className="admin-name">Xin chào, Quản trị viên 👋</span>
                    <button className="logout-btn">Đăng xuất</button>
                </div>
            </header>

            <div className="admin-body">
                {/* Sidebar */}
                <aside className="admin-sidebar">
                    <h2>Bảng điều khiển</h2>
                    <ul>
                        <li
                            className={activeSection === "users" ? "active" : ""}
                            onClick={() => setActiveSection("users")}
                        >
                            👤 Quản lý người dùng
                        </li>
                        <li
                            className={activeSection === "classes" ? "active" : ""}
                            onClick={() => setActiveSection("classes")}
                        >
                            🏫 Quản lý lớp học
                        </li>
                        <li
                            className={activeSection === "scores" ? "active" : ""}
                            onClick={() => setActiveSection("scores")}
                        >
                            📚 Thông tin Admin
                        </li>
                        <li
                            className={activeSection === "reports" ? "active" : ""}
                            onClick={() => setActiveSection("reports")}
                        >
                            📊 Báo cáo & Thống kê
                        </li>
                    </ul>
                </aside>

                {/* Nội dung chính */}
                <main className="admin-content">
                    {activeSection === "users" && (
                        <div className="user-management">
                            <div className="table-header">
                                <h3>Quản lý người dùng</h3>
                                <button className="new-btn">+ Thêm mới</button>
                            </div>

                            <div className="table-search">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm người dùng..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <table className="user-table">
                                <thead>
                                    <tr>
                                        <th>ẢNH ĐẠI DIỆN</th>
                                        <th>HỌ</th>
                                        <th>TÊN</th>
                                        <th>SỐ ĐIỆN THOẠI</th>
                                        <th>EMAIL</th>
                                        <th>VAI TRÒ</th>
                                        <th>TRẠNG THÁI</th>
                                        <th>HÀNH ĐỘNG</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user) => (
                                        <tr key={user.id}>
                                            <td>
                                                <img
                                                    src={user.avatar}
                                                    alt="avatar"
                                                    className="avatar"
                                                />
                                            </td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>{user.disabled}</td>
                                            <td>
                                                <button className="view-btn">Xem</button>
                                                <button className="edit-btn">Sửa</button>
                                                <button className="delete-btn">Xóa</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="pagination">
                                <select>
                                    <option>10</option>
                                    <option>20</option>
                                    <option>50</option>
                                </select>
                                <span>Trang 1</span>
                            </div>
                        </div>
                    )}

                    {activeSection === "classes" && (
                        <div className="class-management">
                            <div className="table-header">
                                <h3>Quản lý lớp học</h3>
                                <button className="new-btn">+ Thêm lớp học</button>
                            </div>

                            <div className="table-search">
                                <input type="text" placeholder="Tìm kiếm lớp học..." />
                            </div>

                            <table className="class-table">
                                <thead>
                                    <tr>
                                        <th>MÃ PHÒNG HỌC</th>
                                        <th>TÊN PHÒNG HỌC</th>
                                        <th>SỐ LƯỢNG</th>
                                        <th>CHỦ PHÒNG</th>
                                        <th>THỜI GIAN</th>
                                        <th>KẾT NỐI</th>
                                        <th>GHI CHÚ</th>
                                        <th>HÀNH ĐỘNG</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>CS101</td>
                                        <td>Lập trình Python cơ bản</td>
                                        <td>32</td>
                                        <td>Nguyễn Văn A</td>
                                        <td>32m:21s</td>
                                        <td>Ổn định</td>
                                        <td>Bài test</td>
                                        <td>
                                            <button className="view-btn">Xem</button>
                                            <button className="edit-btn">Sửa</button>
                                            <button className="delete-btn">Xóa</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>CS202</td>
                                        <td>Nhập môn Trí tuệ nhân tạo</td>
                                        <td>28</td>
                                        <td>Trần Thị B</td>
                                        <td>1h:28m</td>
                                        <td>Ổn định</td>
                                        <td>Online</td>
                                        <td>
                                            <button className="view-btn">Xem</button>
                                            <button className="edit-btn">Sửa</button>
                                            <button className="delete-btn">Xóa</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="pagination">
                                <div>
                                    <label>
                                        <select>
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                        </select>{" "}
                                        hàng / trang
                                    </label>
                                </div>
                                <span>Trang 1</span>
                            </div>
                        </div>
                    )}


                    {activeSection === "scores" && (
                        <div>
                            <h3>Thông tin Admin</h3>
                            <p>Hiển thị thôn tin Admin, cho phép xem và cập nhật thông tin.</p>
                        </div>
                    )}

                    {activeSection === "reports" && (
                        <div>
                            <h3>Báo cáo & Thống kê</h3>
                            <p>Hiển thị biểu đồ và thống kê tổng quan hệ thống.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default DashboardAdmin;
