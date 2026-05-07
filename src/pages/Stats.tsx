import { useState, useMemo } from 'react';
import { StatChart } from '../components/StatChart';
import { useRecords, RecordData } from '../hooks/useRecords';
import { formatCurrency } from '../utils/formatters';
import { CATEGORIES } from '../utils/categories';

function getMonthTotal(records: RecordData[]): number {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
  return records
    .filter(r => r.createdAt >= monthStart)
    .reduce((sum, r) => sum + r.amount, 0);
}

function getCategoryStats(records: RecordData[]): Record<string, number> {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
  const monthRecords = records.filter(r => r.createdAt >= monthStart);
  const stats: Record<string, number> = {};
  monthRecords.forEach(r => {
    stats[r.category] = (stats[r.category] || 0) + r.amount;
  });
  return stats;
}

export function Stats() {
  const { records } = useRecords();
  const [period] = useState<'week' | 'month'>('month');

  const monthTotal = useMemo(() => getMonthTotal(records), [records]);
  const categoryStats = useMemo(() => getCategoryStats(records), [records]);

  const sortedStats = Object.entries(categoryStats)
    .sort(([, a], [, b]) => (b as number) - (a as number));

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">消费统计</h1>
      </div>

      <div className="page-content">
        <div className="card">
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {(['week', 'month'] as const).map(p => (
              <button
                key={p}
                style={{
                  flex: 1,
                  padding: '10px',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  background: period === p ? '#FF6B35' : '#f0f0f0',
                  color: period === p ? 'white' : '#666'
                }}
              >
                {p === 'week' ? '本周' : '本月'}
              </button>
            ))}
          </div>

          <StatChart stats={categoryStats} total={monthTotal} />
        </div>

        <div className="card">
          <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>分类明细</h3>

          {sortedStats.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#999', padding: '20px' }}>
              暂无数据
            </div>
          ) : (
            sortedStats.map(([catId, amount]) => {
              const cat = CATEGORIES.find(c => c.id === catId);
              const numAmount = amount as number;
              const ratio = monthTotal > 0 ? (numAmount / monthTotal) * 100 : 0;
              return (
                <div key={catId} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 0',
                  borderBottom: '1px solid #f0f0f0'
                }}>
                  <div style={{ fontSize: '24px' }}>{cat?.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px' }}>{cat?.name}</div>
                    <div style={{
                      height: '4px',
                      background: '#f0f0f0',
                      borderRadius: '2px',
                      marginTop: '6px'
                    }}>
                      <div style={{
                        width: `${ratio}%`,
                        height: '100%',
                        background: '#FF6B35',
                        borderRadius: '2px'
                      }} />
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                      {formatCurrency(numAmount)}
                    </div>
                    <div style={{ fontSize: '12px', color: '#999' }}>
                      {ratio.toFixed(1)}%
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '20px',
          fontSize: '13px',
          color: '#999'
        }}>
          共 {records.length} 条记录
        </div>
      </div>
    </>
  );
}
