import { useState } from "react";
import { FaPalette } from "react-icons/fa";
import styles from "./ColorPicker.module.css";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useThemeContext } from "@/context/theme";

export default function ColorPicker() {
  const [open, setOpen] = useState(false);
  const {
    themeList,
    currentThemeName,
    handleChangeTheme: onChangeTheme,
  } = useThemeContext();

  const handleChangeTheme = async (themeName) => {
    onChangeTheme(themeName);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button>
          <FaPalette />
          {currentThemeName}
        </button>
      </PopoverTrigger>

      <PopoverContent className='p-0 w-[200px]' sideOffset='1'>
        <Command className={styles.command}>
          <CommandInput
            className={styles.commandInput}
            placeholder='Type to search'
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {themeList.map((theme) => (
                <CommandItem
                  className={styles.commandItem}
                  key={theme.name}
                  value={theme.name}
                  onSelect={(value) => handleChangeTheme(value)}
                >
                  {theme.name}
                  <div
                    className='flex gap-1 rounded-lg p-1'
                    style={{ backgroundColor: theme.bgColor }}
                  >
                    <div
                      className='w-3 h-3 rounded-full'
                      style={{ backgroundColor: theme.mainColor }}
                    />
                    <div
                      className='w-3 h-3 rounded-full'
                      style={{ backgroundColor: theme.subColor }}
                    />
                    <div
                      className='w-3 h-3 rounded-full'
                      style={{ backgroundColor: theme.textColor }}
                    />
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
