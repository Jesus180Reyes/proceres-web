interface SideBarItem {
  title: string;
  href: string;
  icon?: string;
}
export const sideBatItems: SideBarItem[] = [
  {
    title: 'Inventario',
    href: '/home',
    icon: 'home',
  },
  {
    title: 'Insumos',
    href: 'insumos',
    icon: 'box',
  },

  // {
  //   title: 'Notificaciones',
  //   href: 'notificaciones',
  //   icon: 'bell',
  // },
];
