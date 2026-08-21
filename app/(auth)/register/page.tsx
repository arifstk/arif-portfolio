// app/(auth)/register/page.tsx 

import { notFound } from "next/navigation";
import RegisterForm from "./RegisterForm";

interface RegisterPageProps {
  searchParams: Promise<{ secret?: string }>;
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const resolvedParams = await searchParams;
  const adminSecret = process.env.ADMIN_SECRET_KEY;

  if (!resolvedParams.secret || resolvedParams.secret !== adminSecret) {
    notFound();
  }

  return <RegisterForm secret={resolvedParams.secret} />;
}

