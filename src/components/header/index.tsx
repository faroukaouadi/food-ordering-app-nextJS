import React from 'react'
import Link from '../link'
import { Routes } from '@/constants/enums'
import Navbar from './Navbar'
import CartButton from './cart-button'
import LanguageSwitcher from './language-switcher'
import getTrans from '@/lib/translation'
import { getCurrentLocale } from '@/lib/getCurrentLocale'

async function Header() {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);
  return (
    <header className='py-4 md:py-6'>
        <div className='container flex items-center justify-between'>
          <Link href={Routes.ROOT} className='text-primary font-semibold text-2xl' >🍕 Pizza</Link>
          <Navbar translations={translations} />
          <LanguageSwitcher />
          <CartButton />
        </div>
    </header>
  )
}

export default Header