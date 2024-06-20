export interface NavItem {
  title: string;
  href?: string | null;
  disabled?: boolean;
  external?: boolean;
  // icon?: keyof typeof Icons;
  icon?: string;
  label?: string;
  description?: string;
  isSection?: boolean; // Nueva propiedad para indicar si es una sección
  children?: NavItem[]
}