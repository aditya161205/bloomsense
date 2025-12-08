export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export type UsageType = 'home' | 'office' | 'greenhouse';

export interface SystemConfig {
  plantCount: number; // Determines number of valves & sensors
  tankSize: number; // In Liters
  usageType: UsageType;
}

export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image?: string;
  type: 'system' | 'component';
}
