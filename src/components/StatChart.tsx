import { useEffect, useRef } from 'react';
import { CATEGORIES } from '../utils/categories';

interface StatChartProps {
  stats: Record<string, number>;
  total: number;
}

export function StatChart({ stats, total }: StatChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const COLORS = [
    '#FF6B35', '#4A90A4', '#FFB347', '#87CEEB',
    '#DDA0DD', '#98D8C8', '#F0E68C'
  ];

  useEffect(() => {
    if (!canvasRef.current || total === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2 - 10;
    const radius = Math.min(centerX, centerY) - 40;

    ctx.clearRect(0, 0, rect.width, rect.height);

    let startAngle = -Math.PI / 2;
    const entries = Object.entries(stats);

    entries.forEach(([_, value], index) => {
      const ratio = value / total;
      const endAngle = startAngle + ratio * 2 * Math.PI;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = COLORS[index % COLORS.length];
      ctx.fill();

      startAngle = endAngle;
    });

    // Draw center circle for donut effect
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    // Draw total in center
    ctx.fillStyle = '#333';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`¥${total.toFixed(0)}`, centerX, centerY - 8);
    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#999';
    ctx.fillText('本月支出', centerX, centerY + 16);

  }, [stats, total]);

  if (total === 0) {
    return (
      <div className="chart-container">
        <div style={{ textAlign: 'center', color: '#999' }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>📊</div>
          <div>暂无统计数据</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '200px' }}
      />
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '12px',
        marginTop: '16px'
      }}>
        {Object.entries(stats).map(([catId, value], index) => {
          const cat = CATEGORIES.find(c => c.id === catId);
          const ratio = ((value / total) * 100).toFixed(1);
          return (
            <div key={catId} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px'
            }}>
              <span style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: COLORS[index % COLORS.length]
              }} />
              <span>{cat?.icon} {cat?.name} {ratio}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
