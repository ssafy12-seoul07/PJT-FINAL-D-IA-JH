import type { BottomNavProps } from '../interface/navigation'

export const MENU_LIST: BottomNavProps[] = [
  {
    navTo: '/my-daily',
    activeColor: '#11D06F',
    icon: 'house',
    navName: '나의 하루',
  },
  {
    navTo: '/houseworks',
    activeColor: '#41A4FD',
    icon: 'calendar-check',
    navName: '집안일',
  },
  {
    navTo: '/family-daily',
    activeColor: '#E78834',
    icon: 'trophy',
    navName: '가족의 하루',
  },
]
