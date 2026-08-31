import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [services, setServices] = useState([
    { id: 1, name: 'GitHub API', url: 'https://api.github.com', status: 'Checking...', latency: '-', uptime: '100%', lastCheck: '-' },
    { id: 2, name: 'JSON Mock DB', url: 'https://jsonplaceholder.typicode.com/posts/1', status: 'Checking...', latency: '-', uptime: '100%', lastCheck: '-' },
    { id: 3, name: 'Invalid Service', url: 'https://this-will-fail.com', status: 'Checking...', latency: '-', uptime: '0%', lastCheck: '-' }
  ]);
  
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    const timeStr = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timeStr}] ${message}`, ...prev.slice(0, 4)]);
  };

  const checkServices = async () => {
    setIsRefreshing(true);
    addLog("Initiating health check sweep across endpoints...");

    const updatedServices = await Promise.all(
      services.map(async (service) => {
        const startTime = performance.now();
        try {
          const response = await fetch(service.url);
          const endTime = performance.now();
          const latency = Math.round(endTime - startTime);
          const isOk = response.ok;

          addLog(`Pinged ${service.name}: ${isOk ? 'SUCCESS' : 'WARNING'} (${latency}ms)`);
          
          return {
            ...service,
            status: isOk ? 'Online' : 'Warning',
            latency: `${latency} ms`,
            uptime: isOk ? '99.9%' : '85.0%',
            lastCheck: new Date().toLocaleTimeString()
          };
        } catch (error) {
          addLog(`Pinged ${service.name}: FAILED (Network Error)`);
          return {
            ...service,
            status: 'Offline',
            latency: 'N/A',
            uptime: '45.2%',
            lastCheck: new Date().toLocaleTimeString()
          };
        }
      })
    );
    
    setServices(updatedServices);
    setIsRefreshing(false);
  };

  useEffect(() => {
    checkServices(); 
    let interval = null;
    if (isAutoRefresh) {
      interval = setInterval(checkServices, 10000); 
    }
    return () => clearInterval(interval);
  }, [isAutoRefresh]);

  const isAllOnline = services.every(s => s.status === 'Online');
  const isAnyOffline = services.some(s => s.status === 'Offline');

  return (
    <div className="dashboard-container">
      <div className="header-section">
        <div>
          <h1>⚡ Enterprise DevOps Uptime Monitor</h1>
          <p>Real-time microservice health, latency tracking & audit logs</p>
        </div>
        <div className="control-panel">
          <label className="toggle-label">
            <input 
              type="checkbox" 
              checked={isAutoRefresh} 
              onChange={() => setIsAutoRefresh(!isAutoRefresh)} 
            />
            Auto-Refresh (10s)
          </label>
          <button 
            onClick={checkServices} 
            disabled={isRefreshing}
            className="refresh-btn"
          >
            {isRefreshing ? 'Checking...' : '🔄 Refresh Now'}
          </button>
        </div>
      </div>

      {/* Global Status Banner */}
      <div className={`global-banner ${isAllOnline ? 'operational' : isAnyOffline ? 'outage' : 'warning'}`}>
        {isAllOnline ? '🟢 All Enterprise Systems Operational' : isAnyOffline ? '🔴 Critical Outage Detected' : '⚠️ Minor Service Degraded'}
      </div>
      
      <div className="server-grid">
        {services.map(server => (
          <div key={server.id} className={`server-card ${server.status.toLowerCase()}`}>
            <h3>{server.name}</h3>
            <div className="server-stats">
              <p><strong>URL:</strong> <span className="url-text">{server.url}</span></p>
              <p><strong>Status:</strong> <span className={`status-badge ${server.status.toLowerCase()}`}>{server.status}</span></p>
              <p><strong>Latency:</strong> <span>{server.latency}</span></p>
              <p><strong>Uptime:</strong> <span className="uptime-text">{server.uptime}</span></p>
              <p><strong>Last Checked:</strong> <span>{server.lastCheck}</span></p>
            </div>
          </div>
        ))}
      </div>

      {/* Live Audit Logs Terminal Section */}
      <div className="terminal-section">
        <h3>💻 Real-Time System Audit Logs</h3>
        <div className="terminal-box">
          {logs.length === 0 ? (
            <p className="log-item">Initializing system monitoring feeds...</p>
          ) : (
            logs.map((log, index) => (
              <p key={index} className="log-item">{log}</p>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;