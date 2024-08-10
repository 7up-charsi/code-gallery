import {
  Building2Icon,
  CalendarIcon,
  HomeIcon,
  ListTodoIcon,
  UserCogIcon,
  UsersIcon,
} from 'lucide-react';

export const navLinks = [
  { label: 'home', href: '/', icon: <HomeIcon /> },
  {
    label: 'users',
    href: '/page1',
    icon: <UsersIcon />,
  },
  {
    label: 'organizations',
    href: '/page4',
    icon: <Building2Icon />,
  },
  {
    label: 'calendar',
    href: '/page2',
    icon: <CalendarIcon />,
  },
  {
    label: 'todo',
    href: '/page3',
    icon: <ListTodoIcon />,
  },

  {
    label: 'settings',
    href: '/page5',
    icon: <UserCogIcon />,
  },
];
