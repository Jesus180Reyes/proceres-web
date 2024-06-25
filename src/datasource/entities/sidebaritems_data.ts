interface SideBarItem {
  title: string;
  href: string;
  icon?: string;
}
export const sideBatItems: SideBarItem[] = [
  {
    title: 'Inventario',
    href: '/',
    icon: 'home',
  },
  {
    title: 'Proximamente',
    href: 'proximamente',
    icon: 'box',
  },

  {
    title: 'Notificaciones',
    href: 'notificaciones',
    icon: 'bell',
  },
  {
    title: 'Cerrar Sesion',
    href: 'logout',
    icon: 'log-out',
  },
];
