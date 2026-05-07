import { useRecords } from '../hooks/useRecords';

export function Settings() {
  const { records, exportData, clearAll } = useRecords();

  const handleExportAll = () => {
    if (records.length === 0) {
      alert('暂无记录可导出');
      return;
    }
    exportData();
  };

  const handleClearAll = () => {
    if (confirm('确定要清空所有记录吗？此操作不可恢复！')) {
      clearAll();
      window.location.reload();
    }
  };

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">设置</h1>
      </div>

      <div className="page-content">
        <div className="card">
          <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>数据管理</h3>

          <div className="setting-item">
            <span className="setting-label">记账记录</span>
            <span className="setting-value">{records.length} 条</span>
          </div>

          <div className="setting-item">
            <span className="setting-label">数据存储</span>
            <span className="setting-value">本地（仅本地保存）</span>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>导出功能</h3>

          <button
            className="btn btn-secondary"
            style={{ width: '100%', marginBottom: '12px' }}
            onClick={handleExportAll}
          >
            📋 导出所有记录
          </button>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '16px', marginBottom: '12px', color: '#F44336' }}>危险操作</h3>

          <button
            onClick={handleClearAll}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #F44336',
              borderRadius: '12px',
              background: 'white',
              color: '#F44336',
              fontSize: '15px',
              cursor: 'pointer'
            }}
          >
            🗑️ 清空所有记录
          </button>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>关于</h3>

          <div className="setting-item">
            <span className="setting-label">应用名称</span>
            <span className="setting-value">AI记账本</span>
          </div>

          <div className="setting-item">
            <span className="setting-label">版本</span>
            <span className="setting-value">1.0.0</span>
          </div>

          <div className="setting-item">
            <span className="setting-label">技术栈</span>
            <span className="setting-value">React + Capacitor</span>
          </div>

          <div style={{
            marginTop: '16px',
            padding: '12px',
            background: '#f9f9f9',
            borderRadius: '8px',
            fontSize: '13px',
            color: '#666',
            lineHeight: '1.6'
          }}>
            💡 提示：所有数据均保存在您的设备本地，不会上传至任何服务器。请定期导出备份重要数据。
          </div>
        </div>
      </div>
    </>
  );
}
