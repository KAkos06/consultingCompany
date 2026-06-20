import React from 'react'
import { headers } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NavClient } from './NavClient'

export const CustomNav = async () => {
  const payload = await getPayload({ config: configPromise })
  
  // A Payload 3.0-ban / Next.js 15-ben a headers() aszinkron
  const reqHeaders = await headers()
  const { user } = await payload.auth({ headers: reqHeaders })

  let logoUrl = '/default-logo.svg'
  try {
    const siteSettings = await payload.findGlobal({
      slug: 'site-settings',
      depth: 1,
    })
    if (siteSettings?.logo && typeof siteSettings.logo === 'object' && siteSettings.logo.url) {
      logoUrl = siteSettings.logo.url
    }
  } catch (err) {}

  return <NavClient user={user} logoUrl={logoUrl} />
}
