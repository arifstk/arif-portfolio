// app/admin/layout.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Provider from "@/components/Hoc/Provider";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return <Provider session={session}>{children}</Provider>;
}

