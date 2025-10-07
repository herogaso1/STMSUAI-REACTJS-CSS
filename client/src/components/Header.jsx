import React from 'react';
import './Header.css';
import searchIcon from '../assets/TaskManagement-icon/search.svg';
import notificationIcon from '../assets/TaskManagement-icon/notifications.svg';
import avatarMan from '../assets/TaskManagement-icon/Avatar-man.svg';
import muitenxuong from '../assets/TaskManagement-icon/muitenxuong.svg';
function Header() {
  return (
    <header className="header">
        <div className="user-profile">
          <img 
            src={avatarMan}
            alt="User Avatar" 
            className="user-avatar"
          />
          <div className="user-info">
            <span className="user-name">Minh Nguyen</span>
            <span className="dropdown-icon"> <img src={muitenxuong} alt="Dropdown Icon" style={{ width: '10px', height: '5px' }} /></span>
          </div>
          <div className="header-search">
        <img src={searchIcon} alt="Search" className="search-icon" />
        <input 
          type="text" 
          placeholder="Quick search" 
          className="search-input"
        />
      </div>
        </div>
      
      
      <div className="header-right">
        <button className="notification-btn">
          <img src={notificationIcon} alt="Notifications" className="notification-icon" />
        </button>
        
        
      </div>
    </header>
  );
};

export default Header;
