import React, { useEffect } from 'react'

const useAuth = () => {
    useEffect(()=>{
        const fetchUser=async()=>{
        const res = await fetch('/api/auth/me', {
          headers: { Authorization: token }
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }}
    })

  return (
    <div>
        
    </div>
  )
}

export default useAuth