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

  return <NavClient user={user} />
}
