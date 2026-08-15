import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard — GenX Resumes",
  description: "Manage your resumes",
};

export default async function DashboardLayout({ children }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/?auth=login&callbackUrl=/dashboard");
  }

  return <>{children}</>;
}
