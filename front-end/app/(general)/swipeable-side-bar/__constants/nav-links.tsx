import {
  Building2Icon,
  CalendarIcon,
  HomeIcon,
  ListTodoIcon,
  UserCogIcon,
  UsersIcon,
} from 'lucide-react';

export const navLinks = [
  { label: 'home', href: '/', icon: <HomeIcon size={20} /> },
  {
    label: 'users',
    href: '/page1',
    icon: <UsersIcon size={20} />,
  },
  {
    label: 'organizations',
    href: '/page4',
    icon: <Building2Icon size={20} />,
  },
  {
    label: 'calendar',
    href: '/page2',
    icon: <CalendarIcon size={20} />,
  },
  {
    label: 'todo',
    href: '/page3',
    icon: <ListTodoIcon size={20} />,
  },

  {
    label: 'settings',
    href: '/page5',
    icon: <UserCogIcon size={20} />,
  },
];
