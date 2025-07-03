import React from 'react'
import Link from '../link'
import { Routes } from '@/constants/enums'
import Navbar from './Navbar'
import CartButton from './cart-button'
import LanguageSwitcher from './language-switcher'

function Header() {
  return (
    <header className='py-4 md:py-6'>
        <div className='container flex items-center justify-between'>
          <Link href={Routes.ROOT} className='text-primary font-semibold text-2xl' >🍕 Pizza</Link>
          <Navbar />
          <LanguageSwitcher />
          <CartButton />
        </div>
    </header>
  )
}

export default Header