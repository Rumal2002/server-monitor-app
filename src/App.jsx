import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [services, setServices] = useState([
    { id: 1, name: 'GitHub API', url: 'https://api.github.com', status: 'Checking...', lastCheck: '-' },
    { id: 2, name: 'JSON Mock DB', url: 'https://jsonplaceholder.typicode.com/posts/1', status: 'Checking...', lastCheck: '-' },
    { id: 3, name: 'Invalid Service', url: 'https://this-will-fail.com', status: 'Checking...', lastCheck: '-' }
  ]);

  const checkServices = async () => {
    const updatedServices = await Promise.all(
      services.map(async (service) => {
        try {
          const response = await fetch(service.url);
          return {
            ...service,
            status: response.ok ? 'Online' : 'Warning',
            lastCheck: new Date().toLocaleTimeString()
          };
        } catch (error) {
          return {
            ...service,
            status: 'Offline',
            lastCheck: new Date().toLocaleTimeString()
          };
        }
      })
    );
    setServices(updatedServices);
  };

  // App eka load weddi check karala, eeta passe hama thappara 10ta sarayak auto refresh wenawa
  useEffect(() => {
    checkServices(); 
    const interval = setInterval(checkServices, 10000); 
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    if (status === 'Online') return 'status-online';
    if (status === 'Warning') return 'status-warning';
    if (status === 'Offline') return 'status-offline';
    return 'status-pending';
  };

  return (
    <div className="dashboard-container">
      <h1>⚡ Real-Time Uptime Monitor</h1>
      <p>DevOps Dashboard - Auto-refreshing every 10 seconds</p>
      
      <div className="server-grid">
        {services.map(server => (
          <div key={server.id} className="server-card">
            <h3>{server.name}</h3>
            <div className="server-stats">
              <p><strong>URL:</strong> <span style={{fontSize: '0.8em', color: '#94a3b8'}}>{server.url}</span></p>
              <p><strong>Status:</strong> <span className={`badge ${getStatusColor(server.status)}`}>{server.status}</span></p>
              <p><strong>Last Checked:</strong> {server.lastCheck}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;