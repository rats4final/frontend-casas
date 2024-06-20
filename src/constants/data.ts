import { NavItem } from "@/types";

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Gestión de Propiedades",
    isSection: true, // Indicamos que es una sección
    children: [
      {
        title: "Usuarios",
        href: "/dashboard/users",
        icon: "user",
        label: "users",
      },
      {
        title: "Propiedades",
        href: "/dashboard/properties",
        icon: "home",
        label: "properties",
      },
      {
        title: "Casas",
        href: "/dashboard/houses",
        icon: "home",
        label: "house",
      },
    ],
  },
  {
    title: "Gestión de Tareas",
    isSection: true,
    children: [
      {
        title: "Kanban",
        href: "/dashboard/kanban",
        icon: "kanban",
        label: "kanban",
      },
      {
        title: "Pruebas",
        href: "/dashboard/pruebas",
        icon: "home",
        label: "pruebas",
      },
    ],
  },
  {
    title: "Otros",
    isSection: true,
    children: [
      {
        title: "Contratos",
        href: "/dashboard/contracts",
        label: "contracts",
      },
      {
        title: "Respaldos",
        href: "/dashboard/backups",
        label: "backups",
      },
      {
        title: "Registro de Actividades",
        href: "/dashboard/logs",
        label: "logs",
      },
    ],
  },
];