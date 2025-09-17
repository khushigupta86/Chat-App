import React from 'react'   
import { useAuthStore } from '../store/useAuthStore.js'

function SignUpPage() {
  const{authUser,isLoading,login}=useAuthStore();  
  return (
    <div>SignUpPage</div>
  )
}

export default SignUpPage