import React from 'react';
import './TaskCard.css';
import attachmentIcon from '../assets/TaskManagement-icon/Icon__Paperclip.svg';
import commentIcon from '../assets/TaskManagement-icon/Task__Attachments.svg';
import clockIcon from '../assets/TaskManagement-icon/Icon__Clock.svg';
import flagGreen from '../assets/TaskManagement-icon/Icon__Flag__green.svg';
import flagYellow from '../assets/TaskManagement-icon/Icon__Flag__yellow.svg';
import flagRed from '../assets/TaskManagement-icon/Icon__Flag__red.svg';
import avatarMan from '../assets/TaskManagement-icon/Avatar-man.svg';
import avatarMan2 from '../assets/TaskManagement-icon/Avatar_man2.svg';
import avatarWoman from '../assets/TaskManagement-icon/Avatar__woman.svg';

function TaskCard({ task }) {
  const priorityFlags = {
    low: flagGreen,
    medium: flagYellow,
    high: flagRed,
    red: flagRed,
    yellow: flagYellow,
    green: flagGreen
  };

  const avatars = {
    1: avatarMan,
    2: avatarMan2,
    3: avatarWoman
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <h4 className="task-title">{task.title}</h4>
      </div>
      
      {task.assignee && (
        <div className="task-assignee">
          <span className="assignee-badge">{task.assignee}</span>
        </div>
      )}
      
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      
      <div className="task-footer">
        <div className="task-meta">
          {task.attachments >= 0 && (
            <span className="task-icon">
              <img src={attachmentIcon} alt="Attachments" className="meta-icon" />
              {task.attachments}
            </span>
          )}
          {task.flag && (
            <img 
              src={priorityFlags[task.flag]} 
              alt={`Priority: ${task.flag}`} 
              className="priority-flag"
            />
          )}
          {task.date && (
            <span className="task-date">
              <img src={clockIcon} alt="Date" className="meta-icon" />
              {task.date}
            </span>
          )}
        </div>
        
        <div className="task-avatars">
          {task.assignees && task.assignees.map((assigneeId, index) => (
            <img
              key={index}
              src={avatars[assigneeId] || avatarMan}
              alt={`Assignee ${assigneeId}`}
              className="avatar"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
