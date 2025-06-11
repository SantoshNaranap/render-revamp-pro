
import React from 'react';
import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTheme } from '@/contexts/ThemeContext';

const themes = [
  { value: 'default', label: 'Default Purple', color: 'hsl(262, 83%, 58%)' },
  { value: 'blue', label: 'Ocean Blue', color: 'hsl(221, 83%, 53%)' },
  { value: 'green', label: 'Forest Green', color: 'hsl(142, 76%, 36%)' },
  { value: 'purple', label: 'Royal Purple', color: 'hsl(271, 81%, 56%)' },
  { value: 'orange', label: 'Sunset Orange', color: 'hsl(25, 95%, 53%)' },
  { value: 'red', label: 'Crimson Red', color: 'hsl(0, 84%, 60%)' },
];

export const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger className="w-[180px] bg-background/60 border-border/60">
        <div className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          <SelectValue placeholder="Select theme" />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-popover border-border z-50">
        {themes.map((themeOption) => (
          <SelectItem key={themeOption.value} value={themeOption.value}>
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full border border-border/20" 
                style={{ backgroundColor: themeOption.color }}
              />
              {themeOption.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
