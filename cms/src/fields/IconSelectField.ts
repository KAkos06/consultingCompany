import { Field } from 'payload';

export const ICONS = [
  // Navigation & UI
  'Menu', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowUpRight', 'ChevronDown', 'ChevronRight', 'ChevronLeft', 'ChevronUp', 'Check', 'X', 'Search', 'Home', 'Settings', 'MoreHorizontal', 'MoreVertical',
  // Communication
  'Mail', 'Phone', 'MessageCircle', 'MessageSquare', 'Send', 'Share', 'Share2', 'Bell',
  // Users & Social
  'User', 'Users', 'UserPlus', 'UserMinus', 'UserCheck', 'Linkedin', 'Twitter', 'Instagram', 'Facebook', 'Youtube', 'Github',
  // Business & Strategy
  'Target', 'TrendingUp', 'TrendingDown', 'Briefcase', 'Building', 'Lightbulb', 'Compass', 'BarChart', 'BarChart2', 'PieChart', 'Award', 'Globe', 'Map', 'MapPin', 'Shield',
  // Media & Interaction
  'Play', 'PlayCircle', 'Pause', 'Star', 'Heart', 'Image', 'Camera', 'Video', 'VideoOff', 'Mic', 'Headphones', 'Speaker',
  // Objects & Tools
  'Clock', 'Calendar', 'File', 'FileText', 'Folder', 'Save', 'Edit', 'Copy', 'Trash', 'Trash2', 'Paperclip', 'Lock', 'Unlock', 'Key', 'CreditCard', 'ShoppingCart', 'ShoppingBag', 'Gift', 'Tag', 'Package', 'Printer', 'Monitor', 'Smartphone', 'Tablet', 'Tv', 'Wifi', 'Battery', 'Bluetooth', 'Cloud', 'Download', 'Upload', 'Umbrella', 'Sun', 'Moon', 'Zap', 'Sparkles', 'BookOpen', 'Quote'
].sort();

export const IconSelectField: Field = {
  name: 'icon',
  type: 'text', // Using text instead of select so we don't have to map all options
  label: 'Ikon',
  admin: {
    components: {
      Field: '/components/IconSelect/index#IconSelectClient',
    },
  },
};
