import EditUserForm from "@/components/edit-user-form";
import { Pages, Routes } from "@/constants/enums";
import { UserRole } from "@/generated/prisma";
import { Locale } from "@/i18n.config";
import getTrans from "@/lib/translation";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

async function AdminPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const session = await getServerSession(authOptions);
  const {locale} = await params; 
  const translations = await getTrans(locale);

  if (!session) {
    redirect(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`);
  }


   if(session && session.user.role !== UserRole.ADMIN){
      redirect(`/${locale}/${Routes.ADMIN}`);
    }
  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <EditUserForm user={session?.user} translations={translations} />
        </div>
      </section>
    </main>
  );
}

export default AdminPage;
