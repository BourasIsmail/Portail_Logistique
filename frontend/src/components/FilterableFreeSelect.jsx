import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Fuse from "fuse.js"; // 🔍 Import Fuse.js

export default function FilterableFreeSelect({ entities, setParentName }) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState(null);

  // 🧠 Create a Fuse instance (memoized to avoid recreating on every render)
  const fuse = useMemo(() => {
    if (!entities || entities.length === 0) {
      return new Fuse([], { keys: [] }); // Return an empty Fuse instance if no entities
    }
    return new Fuse(entities, {
      keys: ["label"],
      threshold: 0.4, // Adjust this for stricter or looser matching
    });
  }, []);

  // 🧠 Use Fuse to compute filtered results
  const filtered =
    inputValue.trim() === ""
      ? entities
      : fuse.search(inputValue).map((result) => result.item);

  const finalValue = selected
    ? entities.find((f) => f.value === selected)?.label
    : inputValue;

  useEffect(() => {
    setParentName(finalValue || null);
  }, [finalValue]);

  return (
    <div className="w-[300px]">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between"
          >
            {finalValue ? finalValue : "Select or type..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput
              placeholder="Search..."
              value={inputValue}
              onValueChange={(val) => {
                setInputValue(val);
                setSelected(null); // Clear selection on manual typing
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (filtered.length > 0) {
                    const bestMatch = filtered[0];
                    setSelected(bestMatch.value);
                    setInputValue(bestMatch.label);
                  } else {
                    setSelected(null);
                    setInputValue(e.currentTarget.value);
                  }
                  setOpen(false);
                  e.preventDefault();
                }
              }}
            />
            <CommandEmpty>No match found.</CommandEmpty>
            <CommandGroup>
              {filtered.map((framework) => (
                <CommandItem
                  key={framework.value}
                  onSelect={() => {
                    setSelected(framework.value);
                    setInputValue(framework.label);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
