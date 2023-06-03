import React from 'react'
import { ClipLoader } from 'react-spinners'

export default function Loader() {
  return <div style={{ height: '40rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <ClipLoader size={64} />
  </div>
}
