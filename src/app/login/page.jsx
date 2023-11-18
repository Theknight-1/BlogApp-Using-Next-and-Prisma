'use client'
import React from 'react'
import style from './loginPage.module.css'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Login = () => {
  const {data,status} = useSession();
  const router = useRouter()
  if(status === 'loading'){
    return <div className={style.loading}>Loading...</div>
  }


  if(status === 'authenticated'){
    router.push('/') 
  }
  return (
    <div className={style.container}>
      <div className={style.socialMediaText}>
      Login With Different Social Media&apos;s
      </div>
      <div className={style.wrapper}>
        <div className={style.socialButton} onClick={()=>signIn("google",{callbackUrl:"http://localhost:3000"})}>Sign in with Google <div className={style.gsign}>G</div></div>
        <div className={style.socialButton}>Sign in with Github </div>
        <div className={style.socialButton}>Sign in with Facebook <div className={style.gsign}>F</div></div>
      </div>
    </div>
  )
}

export default Login
