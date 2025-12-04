"use server";

import { prisma } from "@/lib/prisma";
import shortid from "shortid";
import normalizeUrl from "./normalizeUrl";

interface IGenerateLink {
  link: string;
}

const generateLink = async ({ link }: IGenerateLink) => {
  const normalize = normalizeUrl(link);
  if (!normalize) return null;

  const existing = await prisma.links.findUnique({
    where: { link: normalize },
  });

  if (!existing) {
    const genLink = await prisma.links.create({
      data: {
        id: shortid.generate(),
        link: normalize,
      },
    });
    const readyLink = `${process.env.DOMAIN}${genLink.id}`;
    return {
      link: readyLink,
      createdAt: genLink.createdAt,
      original: genLink.link,
      visits: genLink.visits,
    };
  }

  const readyLink = `${process.env.DOMAIN}${existing.id}`;
  return {
    link: readyLink,
    createdAt: existing.createdAt,
    original: existing.link,
    visits: existing.visits,
  };
};

export default generateLink;
