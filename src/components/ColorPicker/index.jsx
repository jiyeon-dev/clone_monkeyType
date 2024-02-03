import * as React from "react";
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

const statuses = [
  {
    value: "backlog",
    label: "Backlog",
  },
  {
    value: "todo",
    label: "Todo",
  },
  {
    value: "in progress",
    label: "In Progress",
  },
  {
    value: "done",
    label: "Done",
  },
  {
    value: "canceled",
    label: "Canceled",
  },
];

export default function ComboboxPopover() {
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState(null);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button>
          <FaPalette />
          bouquet
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
              {statuses.map((status) => (
                <CommandItem
                  className={styles.commandItem}
                  key={status.value}
                  value={status.value}
                  onSelect={(value) => {
                    setSelectedStatus(
                      statuses.find((priority) => priority.value === value) ||
                        null
                    );

                    console.log(value);
                    setOpen(false);
                  }}
                >
                  {status.label}
                  <div className='flex gap-1 rounded-lg p-1'>
                    <div
                      className='w-3 h-3 rounded-full'
                      style={{ backgroundColor: "red" }}
                    />
                    <div
                      className='w-3 h-3 rounded-full'
                      style={{ backgroundColor: "yellow" }}
                    />
                    <div
                      className='w-3 h-3 rounded-full'
                      style={{ backgroundColor: "skyblue" }}
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
