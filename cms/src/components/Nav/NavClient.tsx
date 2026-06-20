'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classes from './index.module.scss'
import { PagesIcon, MediaIcon, UsersIcon } from '../Icons'

// Egyszerű Logout ikon
const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
  </svg>
)

// Egyszerű Dashboard ikon
const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
    <path d="M120-520v-320h320v320H120Zm0 400v-320h320v320H120Zm400-400v-320h320v320H520Zm0 400v-320h320v320H520Z"/>
  </svg>
)

export const NavClient = ({ user, logoUrl }: { user: any, logoUrl: string }) => {
  const pathname = usePathname()
  
  // Get current locale from cookie or default to hu
  const [currentLocale, setCurrentLocale] = React.useState('hu')

  React.useEffect(() => {
    const match = document.cookie.match(new RegExp('(^| )payload-locale=([^;]+)'))
    if (match) setCurrentLocale(match[2])
  }, [])

  const changeLocale = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value
    document.cookie = `payload-locale=${val}; path=/admin; max-age=31536000`
    window.location.reload()
  }

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <aside className={classes.aside}>
      <div className={classes.header}>
        <div className={classes.headerContent}>
          <div className={classes.logoIcon}>
            <img src={logoUrl} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'brightness(0) invert(100%)' }} />
          </div>
          <div>
            <h2 className={classes.logoTitle}>Executive Insights</h2>
            <p className={classes.logoSubtitle}>Admin felület</p>
          </div>
        </div>
      </div>

      <nav className={classes.nav}>
        <div className={classes.localeSwitcher}>
          <label className={classes.localeLabel}>TARTALOM NYELV VÁLASZTÓ</label>
          <div className={classes.localeSelectWrapper}>
            <select value={currentLocale} onChange={changeLocale} className={classes.localeSelect}>
              <option value="hu">🇭🇺 Magyar</option>
              <option value="en">🇬🇧 English</option>
            </select>
          </div>
        </div>

        <Link 
          href="/admin" 
          className={`${classes.navLink} ${isActive('/admin') ? classes.active : ''}`}
        >
          <DashboardIcon />
          Irányítópult
        </Link>

        <div className={classes.navDivider}></div>
        <div className={classes.navGroupLabel}>Globális beállítások</div>

        <Link 
          href="/admin/globals/site-settings" 
          className={`${classes.navLink} ${isActive('/admin/globals/site-settings') ? classes.active : ''}`}
        >
          <PagesIcon />
          Oldal Beállítások
        </Link>
        <Link 
          href="/admin/globals/main-menu" 
          className={`${classes.navLink} ${isActive('/admin/globals/main-menu') ? classes.active : ''}`}
        >
          <PagesIcon />
          Főmenü
        </Link>
        <Link 
          href="/admin/globals/footer" 
          className={`${classes.navLink} ${isActive('/admin/globals/footer') ? classes.active : ''}`}
        >
          <PagesIcon />
          Lábléc
        </Link>

        <div className={classes.navDivider}></div>
        <div className={classes.navGroupLabel}>Tartalom</div>

        <Link 
          href="/admin/collections/pages" 
          className={`${classes.navLink} ${isActive('/admin/collections/pages') ? classes.active : ''}`}
        >
          <PagesIcon />
          Oldalak
        </Link>
        <Link 
          href="/admin/collections/media" 
          className={`${classes.navLink} ${isActive('/admin/collections/media') ? classes.active : ''}`}
        >
          <MediaIcon />
          Média
        </Link>

        <div className={classes.navDivider}></div>
        <div className={classes.navGroupLabel}>Adminisztráció</div>

        <Link 
          href="/admin/collections/users" 
          className={`${classes.navLink} ${isActive('/admin/collections/users') ? classes.active : ''}`}
        >
          <UsersIcon />
          Felhasználók
        </Link>
      </nav>

      <div className={classes.footer}>
        <div className={classes.footerContent}>
          <div className={classes.userInfo}>
            <img 
              src={user?.avatar?.url || "/default-avatar.svg"} 
              alt="Avatar" 
              className={classes.userAvatar} 
            />
            <div className={classes.footerText}>
              <p className={classes.userEmail}>
                {user?.firstName || user?.lastName 
                  ? `${user.firstName || ''} ${user.lastName || ''}`.trim() 
                  : user?.email || 'admin@company.com'}
              </p>
              <Link href="/admin/account" className={classes.accountLink}>
                Fiók beállítások
              </Link>
            </div>
          </div>
          <Link href="/admin/logout" className={classes.logoutBtn} title="Kijelentkezés">
            <LogoutIcon />
          </Link>
        </div>
      </div>
    </aside>
  )
}
