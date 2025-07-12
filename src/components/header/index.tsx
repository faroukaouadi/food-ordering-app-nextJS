import React from 'react'
import Link from '../link'
import { Routes } from '@/constants/enums'
import Navbar from './Navbar'
import CartButton from './cart-button'
import LanguageSwitcher from './language-switcher'
import getTrans from '@/lib/translation'
import { getCurrentLocale } from '@/lib/getCurrentLocale'
import AuthButtons from './auth-buttons'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/server/auth'

async function Header() {
  const locale = await getCurrentLocale();
  const initialSession = await getServerSession(authOptions)
  const translations = await getTrans(locale);
  return (
    <header className="py-4 md:py-6">
      <div className="container flex items-center justify-between gap-6 lg:gap-10">
        <Link
          href={Routes.ROOT}
          className="text-primary font-semibold text-2xl"
        >
          🍕 {translations.logo}
        </Link>
        <Navbar initialSession={initialSession} translations={translations} />
        <div className='flex items-center gap-6 flex-1 justify-end'>
          <div className='hidden lg:flex lg:items-center lg:gap-6'>
            <AuthButtons initialSession={initialSession} translations={translations} />
            <LanguageSwitcher />
          </div>
          <CartButton />
        </div>
      </div>
    </header>
  );
}

export default Header