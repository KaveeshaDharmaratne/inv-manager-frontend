export interface NavItem {
  label: string;
  icon: string;
  expanded: boolean;
  children: {
    label: string;
    to: string; // Changed from href to to for Vue Router
  }[];
}
