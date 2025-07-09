import { Pages, Routes } from '@/constants/enums';
import { Locale } from '@/i18n.config'
import { authOptions } from '@/server/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

async function ProfilePage({params}:{params:Promise<{locale:Locale}>}) {
  const locale = (await params).locale;
  const session = await getServerSession(authOptions);
  if(!session){
    redirect(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`);
  }
  return (
    <main>
            <p>user</p>
    </main>
  )
}

export default ProfilePage