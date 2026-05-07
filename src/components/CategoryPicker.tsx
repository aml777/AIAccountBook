import { CATEGORIES, Category } from '../utils/categories';

interface CategoryPickerProps {
  selected: string;
  onSelect: (categoryId: string) => void;
}

export function CategoryPicker({ selected, onSelect }: CategoryPickerProps) {
  return (
    <div className="category-grid">
      {CATEGORIES.map((cat: Category) => (
        <button
          key={cat.id}
          className={`category-item ${selected === cat.id ? 'selected' : ''}`}
          onClick={() => onSelect(cat.id)}
        >
          <span className="category-icon">{cat.icon}</span>
          <span className="category-name">{cat.name}</span>
        </button>
      ))}
    </div>
  );
}
