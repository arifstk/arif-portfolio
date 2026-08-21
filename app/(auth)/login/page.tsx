// app/(auth)/login/page.tsx 

import { notFound } from "next/navigation";
import LoginForm from "./LoginForm";

interface LoginPageProps {
  searchParams: Promise<{ secret?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const resolvedParams = await searchParams;
  const adminSecret = process.env.ADMIN_SECRET_KEY;

  if (!resolvedParams.secret || resolvedParams.secret !== adminSecret) {
    notFound();
  }

  return <LoginForm />;
}

