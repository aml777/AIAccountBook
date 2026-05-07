export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export const CATEGORIES: Category[] = [
  { id: 'food', name: '餐饮', icon: '🍜', color: 'cat-food' },
  { id: 'transport', name: '交通', icon: '🚌', color: 'cat-transport' },
  { id: 'shopping', name: '购物', icon: '🛒', color: 'cat-shopping' },
  { id: 'entertainment', name: '娱乐', icon: '🎮', color: 'cat-entertainment' },
  { id: 'living', name: '居住', icon: '🏠', color: 'cat-living' },
  { id: 'medical', name: '医疗', icon: '💊', color: 'cat-medical' },
  { id: 'other', name: '其他', icon: '📦', color: 'cat-other' },
];

export function getCategoryById(id: string): Category {
  return CATEGORIES.find(c => c.id === id) || CATEGORIES[CATEGORIES.length - 1];
}

export function getCategoryIcon(id: string): string {
  return getCategoryById(id).icon;
}

// AI keyword mapping for auto-categorization
const KEYWORD_MAP: Record<string, string> = {
  // Food
  '早餐': 'food', '午餐': 'food', '晚餐': 'food', '吃饭': 'food', '外卖': 'food',
  '奶茶': 'food', '咖啡': 'food', '饮料': 'food', '零食': 'food', '水果': 'food',
  '快餐': 'food', '火锅': 'food', '烧烤': 'food', '面条': 'food', '米饭': 'food',
  // Transport
  '地铁': 'transport', '公交': 'transport', '打车': 'transport', '出租车': 'transport',
  '火车': 'transport', '高铁': 'transport', '飞机': 'transport', '加油': 'transport',
  '停车': 'transport', '保养': 'transport', '维修': 'transport',
  // Shopping
  '衣服': 'shopping', '鞋子': 'shopping', '包包': 'shopping', '化妆品': 'shopping',
  '护肤品': 'shopping', '电器': 'shopping', '手机': 'shopping', '电脑': 'shopping',
  '网购': 'shopping', '超市': 'shopping', '购物': 'shopping',
  // Entertainment
  '电影': 'entertainment', '唱歌': 'entertainment', '游戏': 'entertainment',
  '旅游': 'entertainment', '健身': 'entertainment', '运动': 'entertainment',
  '演唱会': 'entertainment', '话剧': 'entertainment', '展览': 'entertainment',
  // Living
  '房租': 'living', '水电': 'living', '燃气': 'living', '物业': 'living',
  '话费': 'living', '网费': 'living', '日用品': 'living', '理发': 'living',
  // Medical
  '医院': 'medical', '药店': 'medical', '买药': 'medical', '牙医': 'medical',
  '体检': 'medical', '保险': 'medical',
};

export function autoCategorize(text: string): string {
  const lowerText = text.toLowerCase();
  for (const [keyword, categoryId] of Object.entries(KEYWORD_MAP)) {
    if (lowerText.includes(keyword)) {
      return categoryId;
    }
  }
  return 'other';
}
