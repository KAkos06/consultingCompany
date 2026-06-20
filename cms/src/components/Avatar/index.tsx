'use client'

import React from 'react'
import { useAuth } from '@payloadcms/ui'
import { Media, User } from '../../payload-types'
import Image from 'next/image'

export const CustomAvatar: React.FC = () => {
  const { user } = useAuth<User>()
  
  // payload uses an object with an ID or a populated object for relationTo fields
  const avatarMedia = user?.avatar as Media | number | undefined
  const avatarUrl = typeof avatarMedia === 'object' && avatarMedia?.url ? avatarMedia.url : '/default-avatar.svg'

  return (
    <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e5e7eb' }}>
      <img
        src={avatarUrl}
        alt={user?.firstName ? `${user.firstName} avatar` : 'User avatar'}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  )
}
