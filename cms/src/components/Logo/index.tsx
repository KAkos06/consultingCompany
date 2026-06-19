import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import classes from './index.module.scss'

export const CustomLogo = async () => {
  let siteName = 'Executive Insights'
  let logoUrl = null

  try {
    const payload = await getPayload({ config: configPromise })
    const siteSettings = await payload.findGlobal({
      slug: 'site-settings',
      depth: 1,
    })

    if (siteSettings?.siteName) {
      siteName = siteSettings.siteName
    }

    if (siteSettings?.logo && typeof siteSettings.logo === 'object' && siteSettings.logo.url) {
      logoUrl = siteSettings.logo.url
    }
  } catch (error) {
    console.error('Error loading site settings for logo:', error)
  }

  return (
    <div className={classes.logoWrapper}>
      {logoUrl ? (
        <img src={logoUrl} alt={siteName} className={classes.logoImageNode} />
      ) : (
        <div className={classes.logoImage}>
          <span className={classes.logoText}>{siteName.charAt(0)}</span>
        </div>
      )}
      <div className={classes.textWrapper}>
        <h2 className={classes.companyName}>{siteName}</h2>
        <p className={classes.adminText}>Admin felület</p>
      </div>
    </div>
  )
}
