import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Resume Studio — GenX",
  description: "Live Technical Elegance Resume Editor",
};

export default async function ResumeLayout({ children }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/?auth=login&callbackUrl=/resume");
  }

  return <>{children}</>;
}
