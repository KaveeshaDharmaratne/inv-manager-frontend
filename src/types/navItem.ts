export interface NavItem {
  label: string;
  icon?: string;
  to?: string; 
  expanded?: boolean;
  children?: NavItem[];
}