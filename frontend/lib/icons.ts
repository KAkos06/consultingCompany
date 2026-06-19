import * as LucideIcons from 'lucide-react';
import React from 'react';

/**
 * Returns a Lucide React component by name.
 * Fallbacks to Circle if icon doesn't exist.
 */
export const getIcon = (iconName: string): React.ElementType => {
  if (!iconName) return LucideIcons.Circle;
  
  const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons];
  
  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found in lucide-react. Falling back to Circle.`);
    return LucideIcons.Circle;
  }
  
  return IconComponent as React.ElementType;
};
