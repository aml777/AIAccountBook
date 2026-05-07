import { useState } from 'react';
import { RecordItem } from '../components/RecordItem';
import { CategoryPicker } from '../components/CategoryPicker';
import { QuickAdd } from '../components/QuickAdd';
import { useRecords } from '../hooks/useRecords';
import { isSameDay } from '../utils/formatters';

type FilterType = 'all' | 'week' | 'month';

export function Records() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const { records, addRecord, deleteRecord } = useRecords();

  const filteredRecords = records.filter(record => {
    const recordDate = new Date(record.date);
    const now = new Date();

    // Time filter
    if (filter === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      if (recordDate < weekAgo) return false;
    } else if (filter === 'month') {
      if (!isSameDay(recordDate, now)) return false;
    }

    // Category filter
    if (selectedCategory !== 'all' && record.category !== selectedCategory) {
      return false;
    }

    return true;
  });

  // Group records by date
  const groupedRecords: Record<string, typeof records> = {};
  filteredRecords.forEach(record => {
    const dateKey = new Date(record.date).toLocaleDateString('zh-CN');
    if (!groupedRecords[dateKey]) {
      groupedRecords[dateKey] = [];
    }
    groupedRecords[dateKey].push(record);
  });

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">记账记录</h1>
      </div>

      <div className="page-content">
        <div className="card" style={{ padding: '8px 0' }}>
          <div style={{ display: 'flex', gap: '8px', padding: '0 8px', marginBottom: '8px' }}>
            {(['all', 'week', 'month'] as FilterType[]).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  flex: 1,
                  padding: '8px',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  background: filter === f ? '#FF6B35' : '#f0f0f0',
                  color: filter === f ? 'white' : '#666'
                }}
              >
                {f === 'all' ? '全部' : f === 'week' ? '最近7天' : '今天'}
              </button>
            ))}
          </div>

          <div style={{ padding: '0 8px' }}>
            <CategoryPicker
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
        </div>

        {Object.keys(groupedRecords).length === 0 ? (
          <div className="list-empty">
            <div className="list-empty-icon">📭</div>
            <div>没有找到记录</div>
          </div>
        ) : (
          Object.entries(groupedRecords).map(([dateKey, dayRecords]) => (
            <div key={dateKey}>
              <div style={{
                fontSize: '14px',
                color: '#999',
                marginBottom: '8px',
                marginTop: '16px'
              }}>
                {dateKey}
              </div>
              {dayRecords.map(record => (
                <RecordItem
                  key={record.id}
                  {...record}
                  onDelete={deleteRecord}
                />
              ))}
            </div>
          ))
        )}
      </div>

      <button className="fab" onClick={() => setShowQuickAdd(true)}>
        +
      </button>

      <QuickAdd
        isOpen={showQuickAdd}
        onClose={() => setShowQuickAdd(false)}
        onAdd={(amount, description, category) => addRecord({ amount, description, category, date: new Date().toISOString() })}
      />
    </>
  );
}
