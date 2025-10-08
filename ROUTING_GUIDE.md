# 📚 Hướng Dẫn Chuyển Trang (Routing) trong Dự Án

## 🎯 Cách Hoạt Động

Dự án sử dụng **Conditional Rendering** (không dùng React Router) để chuyển trang:

### 1. **State Management (Quản lý trạng thái)**

```jsx
// Trong App.jsx
const [activeTab, setActiveTab] = useState("tasks");
```

- `activeTab`: Lưu trang hiện tại đang hiển thị
- `setActiveTab`: Function để thay đổi trang
- Giá trị mặc định: `'tasks'`

### 2. **Sidebar - Nơi User Click**

```jsx
// Trong Sidebar.jsx
<button
  onClick={() => setActiveTab(item.id)}  // ← Khi click, thay đổi activeTab
  className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
>
```

**Luồng hoạt động:**

1. User click vào menu item (ví dụ: "Calendar")
2. `setActiveTab('calendar')` được gọi
3. State `activeTab` thay đổi từ `'tasks'` → `'calendar'`
4. React re-render App component
5. Component tương ứng được hiển thị

### 3. **App.jsx - Nơi Hiển Thị Trang**

```jsx
{
  activeTab === "tasks" && <TaskBoard />;
}
{
  activeTab === "calendar" && <Calendar />;
}
{
  activeTab === "dashboard" && <Dashboard />;
}
```

**Logic:**

- Nếu `activeTab === 'tasks'` → Hiển thị `<TaskBoard />`
- Nếu `activeTab === 'calendar'` → Hiển thị `<Calendar />`
- Các trang khác không hiển thị (return `false`)

---

## ✨ Cách Thêm Trang Mới

### **Bước 1: Tạo Component Mới**

Tạo file mới: `client/src/components/YourPage.jsx`

```jsx
import React from "react";
import "./YourPage.css";

const YourPage = () => {
  return (
    <div className="your-page-container">
      <h1>Your Page Title</h1>
      <p>Your page content here...</p>
    </div>
  );
};

export default YourPage;
```

Tạo file CSS: `client/src/components/YourPage.css`

```css
.your-page-container {
  padding: 24px;
  background-color: #f5f5f7;
  min-height: 100%;
}
```

### **Bước 2: Import Component vào App.jsx**

```jsx
import YourPage from "./components/YourPage"; // ← Thêm dòng này
```

### **Bước 3: Thêm Route trong App.jsx**

Thêm điều kiện hiển thị:

```jsx
{
  activeTab === "your-page" && <YourPage />;
}
```

**Ví dụ đầy đủ:**

```jsx
<div className="content-area">
  {activeTab === "tasks" && <TaskBoard />}
  {activeTab === "calendar" && <Calendar />}
  {activeTab === "your-page" && <YourPage />} {/* ← Thêm dòng này */}
  {/* ... các trang khác */}
</div>
```

### **Bước 4: Thêm Menu Item vào Sidebar**

**Option 1: Có icon riêng**

```jsx
// Import icon
import yourPageIcon from "../assets/TaskManagement-icon/your-icon.svg";

// Thêm vào menuItems array
const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: dashboardIcon },
  { id: "tasks", label: "Tasks", icon: taskIcon },
  { id: "your-page", label: "Your Page", icon: yourPageIcon }, // ← Thêm dòng này
  // ... các menu khác
];
```

**Option 2: Chưa có icon (dùng emoji tạm)**

Bạn có thể tạo trang trước, thêm icon sau.

---

## 📝 Ví Dụ Thực Tế: Thêm Trang "Pomodoro"

### **Bước 1: Tạo Component**

File: `client/src/components/Pomodoro.jsx`

```jsx
import React, { useState } from "react";
import "./Pomodoro.css";

const Pomodoro = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="pomodoro-container">
      <h1>🍅 Pomodoro Timer</h1>
      <div className="timer-display">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>
      <div className="timer-controls">
        <button onClick={() => setIsActive(!isActive)}>
          {isActive ? "Pause" : "Start"}
        </button>
        <button
          onClick={() => {
            setMinutes(25);
            setSeconds(0);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;
```

### **Bước 2: Import vào App.jsx**

```jsx
import Pomodoro from "./components/Pomodoro";
```

### **Bước 3: Thêm Route**

```jsx
{
  activeTab === "pomodoro" && <Pomodoro />;
}
```

### **Bước 4: Menu đã có sẵn**

Menu item 'pomodoro' đã tồn tại trong Sidebar, nên không cần thêm!

---

## 🎨 Best Practices

### 1. **Naming Convention**

- **Component ID**: lowercase-with-dashes (`'study-room'`, `'admin-panel'`)
- **Component Name**: PascalCase (`StudyRoom`, `AdminPanel`)
- **File Name**: PascalCase.jsx (`StudyRoom.jsx`, `AdminPanel.jsx`)

### 2. **File Structure**

```
components/
├── YourPage.jsx       ← Component
├── YourPage.css       ← Styles
└── ...
```

### 3. **Props Passing**

Nếu cần truyền data cho component:

```jsx
{
  activeTab === "your-page" && <YourPage userId={123} data={someData} />;
}
```

### 4. **Conditional Content**

Tránh tạo quá nhiều trang placeholder. Ví dụ xấu:

```jsx
// ❌ Không nên
{
  activeTab === "page1" && <div>Page 1 coming soon...</div>;
}
{
  activeTab === "page2" && <div>Page 2 coming soon...</div>;
}
{
  activeTab === "page3" && <div>Page 3 coming soon...</div>;
}
```

Nên tạo component khi đã có content thực sự.

---

## 🔄 Luồng Dữ Liệu (Data Flow)

```
User Click Menu
      ↓
setActiveTab('new-page')
      ↓
State thay đổi: activeTab = 'new-page'
      ↓
React Re-render
      ↓
Check điều kiện: activeTab === 'new-page'?
      ↓
Có → Hiển thị <NewPage />
Không → Không hiển thị
```

---

## 🚀 Ví Dụ Hoàn Chỉnh: Thêm Trang "Dashboard"

### **1. Tạo Component**

```jsx
// client/src/components/Dashboard.jsx
import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>📊 Dashboard</h1>
      <div className="dashboard-grid">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <p className="stat-number">24</p>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p className="stat-number">18</p>
        </div>
        <div className="stat-card">
          <h3>In Progress</h3>
          <p className="stat-number">6</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
```

### **2. Tạo CSS**

```css
/* client/src/components/Dashboard.css */
.dashboard-container {
  padding: 24px;
  background-color: #f5f5f7;
  min-height: 100%;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.stat-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-number {
  font-size: 48px;
  font-weight: 700;
  color: #2563eb;
  margin: 10px 0 0 0;
}
```

### **3. Update App.jsx**

```jsx
// Thêm import
import Dashboard from "./components/Dashboard";

// Thêm route (thay thế placeholder)
{
  activeTab === "dashboard" && <Dashboard />;
}
```

### **4. Done!**

Dashboard menu đã có trong Sidebar, bây giờ click vào sẽ hiển thị trang Dashboard thật!

---

## 🎯 Checklist Khi Thêm Trang Mới

- [ ] Tạo file Component (`.jsx`)
- [ ] Tạo file CSS (`.css`)
- [ ] Import component vào `App.jsx`
- [ ] Thêm điều kiện render trong `App.jsx`
- [ ] Kiểm tra menu item đã có trong Sidebar chưa
- [ ] Nếu chưa có, thêm vào `menuItems` array trong `Sidebar.jsx`
- [ ] Test: Click menu → Trang hiển thị đúng
- [ ] Test: CSS responsive trên mobile/tablet

---

## ⚡ Tips & Tricks

### **Tip 1: Debug Routing**

Thêm console.log để debug:

```jsx
console.log("Current activeTab:", activeTab);
```

### **Tip 2: Default Page**

Muốn trang mặc định khác:

```jsx
const [activeTab, setActiveTab] = useState("dashboard"); // Mặc định là Dashboard
```

### **Tip 3: Shared Components**

Nếu nhiều trang dùng chung layout:

```jsx
const PageLayout = ({ children, title }) => (
  <div className="page-container">
    <h1>{title}</h1>
    {children}
  </div>
);

// Sử dụng
<PageLayout title="Dashboard">
  <Dashboard />
</PageLayout>;
```

---

## 🎓 So Sánh với React Router

### **Cách hiện tại (Conditional Rendering)**

✅ Đơn giản, dễ hiểu
✅ Không cần library thêm
✅ Phù hợp dự án nhỏ/trung
❌ Không có URL riêng cho mỗi trang
❌ Không có browser history
❌ Không share được link trực tiếp

### **React Router (Nếu muốn nâng cấp sau)**

✅ Có URL riêng: `/dashboard`, `/tasks`, `/calendar`
✅ Browser back/forward button hoạt động
✅ Share link trực tiếp
✅ Nested routes
❌ Phức tạp hơn
❌ Cần học thêm API

---

## 📚 Tài Liệu Thêm

- Xem code hiện tại: `App.jsx`, `Sidebar.jsx`
- Component mẫu: `TaskBoard.jsx`, `Calendar.jsx`
- CSS pattern: Tất cả component CSS đều theo cấu trúc tương tự

---

**Chúc bạn code vui! 🚀**
