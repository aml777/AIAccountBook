import { useState, useRef, useEffect } from 'react';
import { CategoryPicker } from './CategoryPicker';
import { parseChineseNumber } from '../utils/formatters';
import { autoCategorize } from '../utils/categories';

interface QuickAddProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (amount: number, description: string, category: string) => void;
}

export function QuickAdd({ isOpen, onClose, onAdd }: QuickAddProps) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('other');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (description && !amount) {
      const parsed = parseChineseNumber(description);
      if (parsed) {
        setAmount(parsed.toString());
      }
      const autoCat = autoCategorize(description);
      setCategory(autoCat);
    }
  }, [description, amount]);

  const handleSubmit = () => {
    const numAmount = parseFloat(amount) || parseChineseNumber(description);
    if (!numAmount || numAmount <= 0) {
      alert('请输入有效金额');
      return;
    }
    onAdd(numAmount, description, category);
    setAmount('');
    setDescription('');
    setCategory('other');
    onClose();
  };

  const handleClose = () => {
    setAmount('');
    setDescription('');
    setCategory('other');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />
        <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>记一笔</h3>

        <div className="input-group">
          <label className="input-label">金额（元）</label>
          <input
            ref={inputRef}
            type="number"
            className="input-field"
            placeholder="0.00"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            inputMode="decimal"
          />
        </div>

        <div className="input-group">
          <label className="input-label">备注（可选）</label>
          <input
            type="text"
            className="input-field"
            placeholder="描述一下这笔消费..."
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label className="input-label">分类</label>
          <CategoryPicker selected={category} onSelect={setCategory} />
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          <button className="btn btn-secondary" style={{ flex: 1 }} onClick={handleClose}>
            取消
          </button>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleSubmit}>
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
