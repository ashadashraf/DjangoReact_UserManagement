import React from 'react'
import AdminHeader from '../../Components/Admin/AdminHeader/AdminHeader';
import AdminBanner from '../../Components/Admin/AdminBanner/AdminBanner';
import AdminFooter from '../../Components/Admin/AdminFooter/AdminFooter';

function AdminSideHome() {
  return (
    <div className='AdminSideHome'>
      <AdminHeader />
      <AdminBanner />
      <AdminFooter />
    </div>
  )
}

export default AdminSideHome