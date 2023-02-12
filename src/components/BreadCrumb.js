import React from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Button, Link, Typography } from '@material-ui/core';

const BreadCrumb = ({name}) => {
  return (
    <>
    <div
          className='my-3'
          ><Breadcrumbs aria-label="breadcrumb" style={{color:'white'}}>
            <Link underline="hover" color="inherit" href="/">
              root
            </Link>
            <Typography color="text.primary">{name?name:""}</Typography>
          </Breadcrumbs>
          </div>
    </>
  )
}

export default BreadCrumb