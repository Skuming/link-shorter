import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const Redirect = async ({ params }: PageProps) => {
  const { slug } = await params;
  if (!slug) return redirect("/");

  const getLink = await prisma.links.findUnique({ where: { id: slug } });
  if (!getLink) return redirect("/");

  return redirect(getLink.link);
};

export default Redirect;
