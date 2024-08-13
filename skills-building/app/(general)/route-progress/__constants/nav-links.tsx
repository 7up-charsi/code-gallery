import {
  Building2Icon,
  CalendarIcon,
  HomeIcon,
  ListTodoIcon,
  UserCogIcon,
  UsersIcon,
} from 'lucide-react';

export const navLinks = [
  {
    label: 'home',
    href: '/',
    icon: <HomeIcon size={20} />,
  },
  {
    label: 'users',
    href: '/users',
    icon: <UsersIcon size={20} />,
  },
  {
    label: 'organizations',
    href: '/organizations',
    icon: <Building2Icon size={20} />,
  },
  {
    label: 'calendar',
    href: '/calendar',
    icon: <CalendarIcon size={20} />,
  },
  {
    label: 'todo',
    href: '/todo',
    icon: <ListTodoIcon size={20} />,
  },

  {
    label: 'settings',
    href: '/settings',
    icon: <UserCogIcon size={20} />,
  },
];
