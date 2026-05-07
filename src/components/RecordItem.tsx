import { getCategoryById } from '../utils/categories';
import { formatCurrency, formatDate } from '../utils/formatters';

interface RecordItemProps {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  onDelete?: (id: string) => void;
}

export function RecordItem({ id, amount, description, category, date, onDelete }: RecordItemProps) {
  const cat = getCategoryById(category);
  const recordDate = new Date(date);

  return (
    <div className="record-item">
      <div className={`record-icon ${cat.color}`}>
        {cat.icon}
      </div>
      <div className="record-info">
        <div className="record-title">{description || cat.name}</div>
        <div className="record-date">{formatDate(recordDate)} · {cat.name}</div>
      </div>
      <div className="record-amount">-{formatCurrency(amount)}</div>
      {onDelete && (
        <button
          onClick={() => onDelete(id)}
          style={{
            marginLeft: '8px',
            background: 'none',
            border: 'none',
            color: '#999',
            fontSize: '18px',
            cursor: 'pointer'
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}
