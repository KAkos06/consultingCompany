import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import classes from './index.module.scss'
import { PagesIcon, MediaIcon, UsersIcon } from '../Icons'

export const CustomDashboard = async () => {
  const payload = await getPayload({ config: configPromise })

  // Fetch real stats
  const pages = await payload.find({ collection: 'pages', limit: 5, sort: '-updatedAt' })
  const media = await payload.find({ collection: 'media', limit: 5, sort: '-updatedAt' })
  const users = await payload.find({ collection: 'users', limit: 1 })

  const totalCollections = pages.totalDocs + media.totalDocs + users.totalDocs
  const recentUploads = media.totalDocs // Just a proxy for recent uploads count
  const activeUsers = users.totalDocs

  // Combine recent activity
  const allActivity = [
    ...pages.docs.map(doc => ({
      id: doc.id,
      title: doc.title,
      type: 'page',
      updatedAt: new Date(doc.updatedAt),
    })),
    ...media.docs.map(doc => ({
      id: doc.id,
      title: doc.alt || doc.filename || 'Névtelen média',
      type: 'media',
      updatedAt: new Date(doc.updatedAt),
    }))
  ].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()).slice(0, 5)

  return (
    <div className={classes.dashboard}>
      <header className={classes.header}>
        <h1 className={classes.title}>Irányítópult</h1>
        <p className={classes.subtitle}>Üdvözlünk újra. Itt van egy összefoglaló a munkaterületedről.</p>
      </header>

      <section className={classes.statsGrid}>
        <div className={classes.statCard}>
          <p className={classes.statLabel}>Összes elem</p>
          <div className={classes.statValueContainer}>
            <span className={classes.statValue}>{totalCollections}</span>
          </div>
        </div>
        <div className={classes.statCard}>
          <p className={classes.statLabel}>Média fájlok</p>
          <div className={classes.statValueContainer}>
            <span className={classes.statValue}>{recentUploads}</span>
          </div>
        </div>
        <div className={classes.statCard}>
          <p className={classes.statLabel}>Felhasználók</p>
          <div className={classes.statValueContainer}>
            <span className={classes.statValue}>{activeUsers}</span>
            <span className={classes.statExtra}>Aktív</span>
          </div>
        </div>
      </section>

      <div className={classes.mainGrid}>
        <div>
          <section>
            <h2 className={classes.sectionTitle}>Globális beállítások</h2>
            <div className={classes.collectionsGrid}>
              <div className={classes.collectionCard}>
                <div className={classes.collectionHeader}>
                  <div className={classes.collectionIcon}>
                    <PagesIcon />
                  </div>
                  <h3 className={classes.collectionTitle}>Oldal Beállítások (Site Settings)</h3>
                </div>
                <div className={classes.collectionActions}>
                  <Link href="/admin/globals/site-settings" className={classes.btnPrimary}>Szerkesztés</Link>
                </div>
              </div>

              <div className={classes.collectionCard}>
                <div className={classes.collectionHeader}>
                  <div className={classes.collectionIcon}>
                    <PagesIcon />
                  </div>
                  <h3 className={classes.collectionTitle}>Főmenü (Main Menu)</h3>
                </div>
                <div className={classes.collectionActions}>
                  <Link href="/admin/globals/main-menu" className={classes.btnPrimary}>Szerkesztés</Link>
                </div>
              </div>

              <div className={classes.collectionCard}>
                <div className={classes.collectionHeader}>
                  <div className={classes.collectionIcon}>
                    <PagesIcon />
                  </div>
                  <h3 className={classes.collectionTitle}>Lábléc (Footer)</h3>
                </div>
                <div className={classes.collectionActions}>
                  <Link href="/admin/globals/footer" className={classes.btnPrimary}>Szerkesztés</Link>
                </div>
              </div>
            </div>
          </section>

          <section style={{ marginTop: '2rem' }}>
            <h2 className={classes.sectionTitle}>Tartalom</h2>
            <div className={classes.collectionsGrid}>
              <div className={classes.collectionCard}>
                <div className={classes.collectionHeader}>
                  <div className={classes.collectionIcon}>
                    <PagesIcon />
                  </div>
                  <h3 className={classes.collectionTitle}>Oldalak (Pages)</h3>
                </div>
                <div className={classes.collectionActions}>
                  <Link href="/admin/collections/pages" className={classes.btnSecondary}>Összes</Link>
                  <Link href="/admin/collections/pages/create" className={classes.btnPrimary}>Új oldal</Link>
                </div>
              </div>

              <div className={classes.collectionCard}>
                <div className={classes.collectionHeader}>
                  <div className={classes.collectionIcon}>
                    <MediaIcon />
                  </div>
                  <h3 className={classes.collectionTitle}>Média (Media)</h3>
                </div>
                <div className={classes.collectionActions}>
                  <Link href="/admin/collections/media" className={classes.btnSecondary}>Összes</Link>
                  <Link href="/admin/collections/media/create" className={classes.btnPrimary}>Feltöltés</Link>
                </div>
              </div>
            </div>
          </section>

          <section style={{ marginTop: '2rem' }}>
            <h2 className={classes.sectionTitle}>Adminisztráció</h2>
            <div className={classes.collectionsGrid}>
              <div className={classes.collectionCard}>
                <div className={classes.collectionHeader}>
                  <div className={classes.collectionIcon}>
                    <UsersIcon />
                  </div>
                  <h3 className={classes.collectionTitle}>Felhasználók (Users)</h3>
                </div>
                <div className={classes.collectionActions}>
                  <Link href="/admin/collections/users" className={classes.btnSecondary}>Összes</Link>
                  <Link href="/admin/collections/users/create" className={classes.btnPrimary}>Új felhasználó</Link>
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside className={classes.activityPanel}>
          <div className={classes.activityHeader}>
            <h2 className={classes.activityTitle}>Legutóbbi aktivitás</h2>
          </div>
          <div className={classes.activityList}>
            {allActivity.map((activity, i) => (
              <div key={i} className={classes.activityItem}>
                <div className={classes.activityDot} />
                <div className={classes.activityContent}>
                  <p className={classes.activityText}>
                    {activity.type === 'page' ? 'Oldal frissítve: ' : 'Média feltöltve: '}
                    <span className={classes.highlight}>{String(activity.title)}</span>
                  </p>
                  <p className={classes.activityTime}>
                    {activity.updatedAt.toLocaleString('hu-HU')}
                  </p>
                </div>
              </div>
            ))}
            {allActivity.length === 0 && (
              <p className={classes.activityText}>Nincs még aktivitás.</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
