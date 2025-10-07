import React from 'react';
import TaskCard from './TaskCard';
import './TaskBoard.css';

const TaskBoard = () => {
  const columns = [
    {
      id: 'todo',
      title: 'To do',
      count: 3,
      tasks: [
        {
          id: 1,
          title: 'Mobile Wireframes',
          assignee: 'Viverna Diam',
          attachments: 3,
          comments: 0,
          flag: 'red',
          date: 'Apr 12',
          assignees: [1]
        },
        {
          id: 2,
          title: 'User Research',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque ...',
          assignee: 'Maecenas Lacus',
          attachments: 1,
          comments: 0,
          flag: 'green',
          date: 'Mar 4',
          assignees: [2, 3]
        },
        {
          id: 3,
          title: 'Client Call',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque ...',
          assignee: 'Eglit Integer',
          attachments: 0,
          comments: 0,
          flag: 'green',
          date: 'Apr 2',
          assignees: [1]
        }
      ]
    },
    {
      id: 'review',
      title: 'In Review',
      count: 4,
      tasks: [
        {
          id: 4,
          title: 'Landing Page',
          assignee: 'Maecenas Lacus',
          attachments: 2,
          comments: 0,
          flag: 'green',
          date: 'Mar 8',
          assignees: [2, 3]
        },
        {
          id: 5,
          title: 'Annual Presentation',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque ...',
          assignee: 'Maecenas Lacus',
          attachments: 0,
          comments: 0,
          flag: 'yellow',
          date: 'Mar 15',
          assignees: [2, 3]
        },
        {
          id: 6,
          title: 'Icons',
          assignee: 'Eglit Integer',
          attachments: 0,
          comments: 0,
          flag: 'yellow',
          date: 'Apr 10',
          assignees: [1]
        },
        {
          id: 7,
          title: 'Onboarding Screens',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque ...',
          assignee: 'Maecenas Lacus',
          attachments: 1,
          comments: 0,
          flag: 'red',
          date: 'Mar 17',
          assignees: [1, 2, 3]
        }
      ]
    },
    {
      id: 'done',
      title: 'Done',
      count: 3,
      tasks: [
        {
          id: 8,
          title: 'Product Mockups',
          assignee: 'Viverna Diam',
          attachments: 0,
          comments: 0,
          flag: 'green',
          date: 'Mar 2',
          assignees: [1]
        },
        {
          id: 9,
          title: 'Workshop Ideas',
          assignee: 'Nullam Velit',
          attachments: 0,
          comments: 0,
          flag: 'yellow',
          date: 'Mar 4',
          assignees: [3]
        },
        {
          id: 10,
          title: 'Navigation',
          assignee: 'Maecenas Lacus',
          attachments: 0,
          comments: 0,
          flag: 'red',
          date: 'Mar 15',
          assignees: [2]
        }
      ]
    }
  ];

  return (
    <div className="task-board">
      {columns.map((column) => (
        <div key={column.id} className="task-column">
          <div className="column-header">
            <div className="column-title-wrapper">
              <h3 className="column-title">{column.title}</h3>
              <span className="column-count">{column.count}</span>
            </div>
            <div className="column-actions">
              <button className="column-btn">+</button>
              <button className="column-btn">⋯</button>
            </div>
          </div>
          
          <div className="column-content">
            {column.tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;
