"use client";

import { Activity, useState } from "react";
import generateLink from "../actions/generateLink";
import Image from "next/image";

import LinkImg from "@/public/link-45deg.svg";
import ExclamationImg from "@/public/exclamation-lg.svg";
import CheckImg from "@/public/check-lg.svg";

interface Links {
  link: string;
  createdAt: Date | null;
  original: string;
  visits: number;
}

const InputField = () => {
  const [link, setLink] = useState<string | null>(null);
  const [shortLink, setShortLink] = useState<Links | null>(null);
  const [error, setError] = useState<boolean>(false);

  const onShorten = async () => {
    if (link) {
      const res = await generateLink({ link });
      if (!res) {
        setShortLink(null);
        return setError(true);
      }
      setError(false);

      const storedLinks = localStorage.getItem("links");
      const linksArr = storedLinks ? JSON.parse(storedLinks) : [];
      const isDuplicate = linksArr.some(
        (item: { link: string }) => item.link === res.link
      );

      if (!isDuplicate) {
        const updatedLinks = [res, ...linksArr];
        localStorage.setItem("links", JSON.stringify(updatedLinks));
      }

      return setShortLink(res);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col gap-2 md:w-[60%] w-full">
      <div className="flex justify-center w-full md:flex-row flex-col rounded-2xl bg-[#222225] gap-3 p-6 sm:p-8 backdrop-blur-sm">
        <input
          type="text"
          placeholder="Link (http, https)"
          className="p-2 border border-zinc-700 rounded-xl w-full outline-none h-14 bg-[#19191D] placeholder:italic"
          onChange={(e) => setLink(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onShorten();
          }}
        />
        <button
          onClick={() => onShorten()}
          className="group relative inline-flex items-center rounded-xl justify-center overflow-hidden bg-neutral-950 px-8 font-medium text-neutral-200 transition hover:scale-105 cursor-pointer"
        >
          <span>Shorter</span>
          <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:transform-[skew(-12deg)_translateX(100%)]">
            <div className="relative h-full w-8 bg-white/20"></div>
          </div>
        </button>
      </div>
      <Activity mode={shortLink ? "visible" : "hidden"}>
        <div className="w-full bg-linear-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl p-6 sm:p-8 backdrop-blur-sm flex flex-col gap-2">
          <div className="flex gap-2 flex-col justify-center">
            <div className="flex items-center gap-2">
              <div className="p-2 border border-green-500/20  bg-green-500/20 rounded-lg">
                <Image src={CheckImg} alt="" width={18} height={18} />
              </div>
              <div>
                <p className="text-green-400">Link Shortened Successfully!</p>
                <p className="text-zinc-400 text-sm">
                  Your shortened link is ready to share
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-col p-2 border border-zinc-700 rounded-xl w-fullb bg-zinc-900/80">
            <div className="flex gap-1 items-center">
              <Image src={LinkImg} alt="" className="mt-1"></Image>
              <p className="text-gray-400 text-xm">Shortened URL</p>
            </div>
            <div className="flex gap-2">
              <div className="p-2 border border-zinc-700 rounded-xl w-full bg-zinc-800/50 flex items-center text-gray-400 text-xm">
                <a href={shortLink?.link} className="underline" target="_blank">
                  {shortLink?.link}
                </a>
              </div>
              <button
                className="p-2 border border-zinc-700 rounded-xl cursor-pointer flex gap-2 md:w-fit w-full justify-center hover:bg-zinc-700 transition-all"
                onClick={async () =>
                  await navigator.clipboard.writeText(shortLink?.link || "")
                }
              >
                Copy
              </button>
            </div>

            <div className="flex gap-2 items-center">
              <i className="text-gray-400 text-[12px] w-fit block">
                Clicks: {shortLink?.visits}
              </i>
              <span className="p-0.5 bg-gray-400 rounded-full leading-1 h-0.5 w-0.5"></span>
              <i className="text-gray-400 text-[12px] w-fit block">
                {String(shortLink?.createdAt).substring(0, 10)}
              </i>
            </div>
          </div>
        </div>
      </Activity>
      <Activity mode={error ? "visible" : "hidden"}>
        <div className="flex flex-col w-full bg-linear-to-br gap-2 from-red-500/10 to-red-500/10 border border-red-500/20 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="p-2 border border-red-500/20  bg-red-500/20 rounded-xl ">
              <Image src={ExclamationImg} alt="" width={18} height={18} />
            </div>
            <div>
              <p className="text-red-400">Couldn&apos;t shorten the link</p>
              <p className="text-zinc-400 text-sm">
                Make sure your link contains domain.
                <i> Exmp: youtube.com</i>
              </p>
            </div>
          </div>
          <div className="flex gap-2 flex-col p-2 border border-zinc-700 rounded-xl w-fullb bg-zinc-900/80 text-gray-400">
            <i className="text-zinc-400 ">Example of valid links</i>
            <i className="border border-zinc-700 rounded-xl w-full bg-zinc-800/50 p-2 inline-block truncate">
              www.youtube.com/watch?...
            </i>
            <i className="border border-zinc-700 rounded-xl bg-zinc-800/50 p-2 inline-block truncate w-full">
              https://www.amazon.com/gift-cards/b/?ie=UTF8&node=2238192011&ref_=nav_cs_gc
            </i>
            <i className="border border-zinc-700 rounded-xl w-full bg-zinc-800/50 p-2 inline-block truncate">
              open.spotify.com
            </i>
          </div>
        </div>
      </Activity>
    </div>
  );
};

export default InputField;
