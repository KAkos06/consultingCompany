'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useField } from '@payloadcms/ui'
import * as LucideIcons from 'lucide-react'
import { ICONS } from '../../fields/IconSelectField'

export const IconSelectClient: React.FC<any> = ({ path, label, required }) => {
  const { value, setValue } = useField<string>({ path })
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Safely get current icon or fallback to Circle
  const CurrentIcon = value && (LucideIcons as any)[value] ? (LucideIcons as any)[value] : LucideIcons.Circle

  const filteredIcons = ICONS.filter(i => i.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="field-type" style={{ marginBottom: '1.5rem', position: 'relative' }} ref={dropdownRef}>
      {label && (
        <label className="field-label" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--theme-text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {typeof label === 'string' ? label : label?.hu || 'Ikon'}
          {required && <span style={{ color: 'var(--theme-error-500)', marginLeft: '0.25rem' }}>*</span>}
        </label>
      )}
      
      {/* Current Selection Button */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem',
          backgroundColor: 'var(--theme-elevation-50)', border: '1px solid',
          borderColor: isOpen ? 'var(--theme-brand-primary)' : 'var(--theme-border-color)',
          borderRadius: '0.5rem', cursor: 'pointer', color: 'var(--theme-text)',
          boxShadow: isOpen ? '0 0 0 2px rgba(77, 142, 255, 0.2)' : 'none',
          transition: 'all 0.2s'
        }}
      >
        <CurrentIcon size={20} />
        <span style={{ flex: 1, fontSize: '1rem' }}>{value || 'Válassz ikont...'}</span>
        <LucideIcons.ChevronDown size={16} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </div>

      {/* Dropdown with Grid */}
      {isOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '0.5rem',
          backgroundColor: 'var(--theme-elevation-100)', border: '1px solid var(--theme-border-color)',
          borderRadius: '0.5rem', zIndex: 10, padding: '1rem',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
        }}>
          <input 
            type="text" 
            placeholder="Keresés..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '0.75rem 1rem', marginBottom: '1rem',
              backgroundColor: 'var(--theme-elevation-150)', border: '1px solid var(--theme-border-color)',
              color: 'var(--theme-text)', borderRadius: '0.5rem', fontSize: '0.875rem',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--theme-brand-primary)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--theme-border-color)'}
          />
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(44px, 1fr))', gap: '0.5rem',
            maxHeight: '260px', overflowY: 'auto', paddingRight: '0.5rem'
          }}>
            {filteredIcons.map(icon => {
              const IconComp = (LucideIcons as any)[icon]
              if (!IconComp) return null
              const isSelected = value === icon
              return (
                <div 
                  key={icon}
                  title={icon}
                  onClick={() => { setValue(icon); setIsOpen(false); setSearch(''); }}
                  style={{
                    padding: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center',
                    cursor: 'pointer', borderRadius: '0.25rem',
                    backgroundColor: isSelected ? 'rgba(77, 142, 255, 0.2)' : 'var(--theme-elevation-50)',
                    color: isSelected ? 'var(--theme-brand-primary)' : 'var(--theme-text)',
                    border: '1px solid',
                    borderColor: isSelected ? 'var(--theme-brand-primary)' : 'transparent',
                    transition: 'all 0.1s'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = 'var(--theme-elevation-150)'
                      e.currentTarget.style.borderColor = 'var(--theme-border-color-highlight)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = 'var(--theme-elevation-50)'
                      e.currentTarget.style.borderColor = 'transparent'
                    }
                  }}
                >
                  <IconComp size={20} strokeWidth={isSelected ? 2.5 : 2} />
                </div>
              )
            })}
            {filteredIcons.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '1rem', color: 'var(--theme-text-dim)', fontSize: '0.875rem' }}>
                Nincs találat a keresésre.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
