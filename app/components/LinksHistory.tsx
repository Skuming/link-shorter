"use client";

import Image from "next/image";
import ClockImg from "@/public/clock-history.svg";
import UpImg from "@/public/caret-up-fill.svg";
import LinkImg from "@/public/link-45deg.svg";
import CopyImg from "@/public/copy.svg";

import { Activity, useState } from "react";

interface Links {
  link: string;
  createdAt: Date;
  original: string;
  visits: number;
}

const LinkHistory = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [links, setLinks] = useState<Array<Links> | null>(null);

  const getLocalStorage = () => {
    const rawData = localStorage.getItem("links");

    if (!rawData) return setLinks(null);

    const parsedData = JSON.parse(rawData);

    if (Array.isArray(parsedData)) {
      setLinks(parsedData);
    }
  };

  return (
    <div className="flex flex-col rounded-2xl md:w-[60%] w-full bg-[#222225] gap-3 p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center gap-2">
          <div className="p-2 border border-zinc-700 rounded-xl">
            <Image src={ClockImg} alt="" width={18} height={18} />
          </div>
          <b className="">History</b>
        </div>
        <div className="flex items-center">
          <button
            className="p-2 border border-zinc-700 rounded-xl cursor-pointer hover:bg-zinc-700 transition-all"
            onClick={() => {
              if (!isOpen) getLocalStorage();
              setIsOpen((prev) => !prev);
            }}
          >
            <Image
              src={UpImg}
              alt=""
              className={`${
                isOpen ? "-rotate-180" : "rotate-0"
              } transition-all `}
            />
          </button>
        </div>
      </div>
      <Activity mode={isOpen ? "visible" : "hidden"}>
        <Activity mode={!links ? "visible" : "hidden"}>
          <div className="p-2 justify-center flex items-center gap-2">
            <p className="text-xl text-gray-400">
              You don&apos;t have the links that you created 😭
            </p>
          </div>
        </Activity>
        <Activity mode={links ? "visible" : "hidden"}>
          {links?.map((item, i) => (
            <div
              key={i}
              className="p-2 border border-zinc-700 rounded-xl items-center flex gap-2 justify-between md:flex-row flex-col"
            >
              <div className="flex items-center gap-2 w-full">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <Image src={LinkImg} alt="" width={16} height={16} />
                    <a href={item.link} className="text-gray-400 text-xm">
                      {item.link}
                    </a>
                  </div>
                  <p className="text-gray-400 text-[12px] inline-block truncate w-40">
                    <a href={item.original} className="underline">
                      {item.original}
                    </a>
                  </p>
                  <div className="flex gap-2 items-center">
                    <i className="text-gray-400 text-[12px] w-fit block">
                      {String(item.createdAt).substring(0, 10)}
                    </i>
                    <span className="p-0.5 bg-gray-400 rounded-full leading-1 h-0.5 w-0.5"></span>
                    <i className="text-gray-400 text-[12px] w-fit block">
                      Clicks before creation: {item.visits}
                    </i>
                  </div>
                </div>
              </div>
              <div className="gap-2 flex w-full md:flex-row-reverse flex-row">
                <button
                  className="p-2 border border-zinc-700 rounded-xl cursor-pointer flex gap-2 md:w-fit w-full justify-center hover:bg-zinc-700 transition-all"
                  onClick={async () =>
                    await navigator.clipboard.writeText(item.link)
                  }
                >
                  <Image src={CopyImg} alt="" width={16} height={16} />
                  Copy
                </button>
              </div>
            </div>
          ))}
        </Activity>
      </Activity>
    </div>
  );
};

export default LinkHistory;
