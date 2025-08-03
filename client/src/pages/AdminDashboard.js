import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import CustOrder from '../components/Admin/CustOrder';
import Stock from '../components/Admin/Stock';

const AdminDashboard = () => {
  const [switchTab, setSwitchTab] = useState(true);

  return (
    <Layout>
        <div className='admin-dashboard'>
          <div className='tabs'>
            <button onClick={()=>setSwitchTab(true)} style={{backgroundColor:switchTab?"#ff8f8f":"#ffababf7"}}>Orders</button>
            <button onClick={()=>setSwitchTab(false)} style={{backgroundColor:switchTab?"#ffababf7":"#ff8f8f"}}>Available Stock</button>
          </div>
          {switchTab && <CustOrder />}
          {!switchTab && <Stock />}
        </div>
    </Layout>
  )
}

export default AdminDashboard