"use client"
// as we are using browsers capability
import { SessionProvider } from 'next-auth/react'


const Provider = ({children,session}) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider