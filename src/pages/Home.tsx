import { useState, useMemo } from 'react';
import { formatAmount } from '../utils/formatters';
import { QuickAdd } from '../components/QuickAdd';
import { RecordItem } from '../components/RecordItem';
import { useRecords } from '../hooks/useRecords';

export function Home() {
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const { records, addRecord, deleteRecord } = useRecords();

  const todayTotal = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return records
      .filter(r => new Date(r.date).getTime() >= today.getTime())
      .reduce((sum, r) => sum + r.amount, 0);
  }, [records]);

  const monthTotal = useMemo(() => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    return records
      .filter(r => r.createdAt >= monthStart)
      .reduce((sum, r) => sum + r.amount, 0);
  }, [records]);

  const todayRecords = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return records
      .filter(r => new Date(r.date).getTime() >= today.getTime())
      .slice(0, 5);
  }, [records]);

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">AI 记账本</h1>
        <div style={{ fontSize: '14px', opacity: 0.9, marginTop: '4px' }}>
          {new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' })}
        </div>
      </div>

      <div className="page-content">
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>今日支出</div>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', marginTop: '4px' }}>
                ¥{formatAmount(todayTotal)}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>本月累计</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'rgba(255,255,255,0.9)', marginTop: '4px' }}>
                ¥{formatAmount(monthTotal)}
              </div>
            </div>
          </div>
        </div>

        <button
          className="btn btn-primary"
          style={{ width: '100%', marginBottom: '16px' }}
          onClick={() => setShowQuickAdd(true)}
        >
          + 记一笔
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '16px' }}>今天</h3>
        </div>

        {todayRecords.length === 0 ? (
          <div className="list-empty">
            <div className="list-empty-icon">📝</div>
            <div>今天还没有记账哦</div>
            <div style={{ fontSize: '14px', marginTop: '4px' }}>点击上方按钮开始记录</div>
          </div>
        ) : (
          todayRecords.map(record => (
            <RecordItem
              key={record.id}
              {...record}
              onDelete={deleteRecord}
            />
          ))
        )}
      </div>

      <QuickAdd
        isOpen={showQuickAdd}
        onClose={() => setShowQuickAdd(false)}
        onAdd={(amount, description, category) => addRecord({ amount, description, category, date: new Date().toISOString() })}
      />
    </>
  );
}
