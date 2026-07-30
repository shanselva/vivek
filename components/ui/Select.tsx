'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  name?: string;
  value: string;
  onChange: (value: string, name?: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
}

export function Select({ label, name, value, onChange, options, placeholder = "Select an option", className = "" }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-sm font-semibold text-text-dark">{label}</label>}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-4 py-2.5 bg-slate-50 border ${isOpen ? 'border-primary ring-2 ring-primary/20 bg-white' : 'border-border'} rounded-lg text-sm text-left transition-all flex items-center justify-between hover:bg-white focus:bg-white focus:outline-none`}
        >
          <span className={`block truncate ${!selectedOption ? 'text-slate-400' : 'text-text-dark'}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown size={16} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
            <div className="p-1 grid grid-cols-1 gap-0.5">
              {options.length === 0 && (
                <div className="px-3 py-2 text-sm text-slate-400 italic">No options available</div>
              )}
              {options.map((opt) => {
                const isSelected = value === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onChange(opt.value, name);
                      setIsOpen(false);
                    }}
                    className={`flex items-center justify-between w-full px-3 py-2 text-sm text-left rounded-md transition-colors ${isSelected ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-slate-50 text-slate-700'}`}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isSelected && <Check size={16} className="shrink-0 text-primary" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
