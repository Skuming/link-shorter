"use server";

import { prisma } from "@/lib/prisma";

const updateLink = async (id: string) => {
  try {
    const updated = await prisma.links.findUnique({
      where: { id },
    });

    if (updated) {
      const readyLink = `${process.env.DOMAIN}${updated.id}`;

      return {
        id: updated.id,
        createdAt: updated.createdAt,
        link: readyLink,
        original: updated.link,
        visits: updated.visits,
      };
    }
    return null;
  } catch {
    return null;
  }
};

export default updateLink;
