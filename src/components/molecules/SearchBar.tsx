import React, { useCallback } from 'react'
import { Input } from '@/components/atoms/Input'
import { debounce } from '@/lib/utils'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

/**
 * Debounced search bar component
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search tokens...',
}) => {
  const debouncedOnChange = useCallback(
    debounce((value: string) => onChange(value), 300),
    [onChange]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedOnChange(e.target.value)
  }

  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <Input
        type="text"
        placeholder={placeholder}
        defaultValue={value}
        onChange={handleChange}
        className="pl-10"
      />
    </div>
  )
}

