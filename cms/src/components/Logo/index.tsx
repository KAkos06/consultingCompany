import React from 'react'
import classes from './index.module.scss'

export const CustomLogo: React.FC = () => {
  return (
    <div className={classes.logoWrapper}>
      {/* We can use a generic placeholder or an actual image if the user uploads one. For now, a generic stylized box. */}
      <div className={classes.logoImage}>
        <span className={classes.logoText}>C</span>
      </div>
      <div className={classes.textWrapper}>
        <h2 className={classes.companyName}>Consulting Company</h2>
        <p className={classes.adminText}>Admin felület</p>
      </div>
    </div>
  )
}
