"use client";

import Image from "next/image";
import { Activity, useState } from "react";

import ClockImg from "@/public/clock-history.svg";
import UpImg from "@/public/caret-up-fill.svg";
import LinkImg from "@/public/link-45deg.svg";
import CopyImg from "@/public/copy.svg";
import UpdateImg from "@/public/arrow-repeat.svg";
import updateLink from "../actions/updateLink";

interface Links {
  id: string;
  link: string;
  createdAt: Date;
  original: string;
  visits: number;
}

const LinkHistory = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [links, setLinks] = useState<Array<Links> | null>(null);
  const [rotated, setRotated] = useState<boolean>(false);

  const getLocalStorage = () => {
    const rawData = localStorage.getItem("links");

    if (!rawData) return setLinks(null);

    const parsedData = JSON.parse(rawData);

    if (Array.isArray(parsedData)) {
      setLinks(parsedData);
    }
  };

  const handleRotate = () => {
    setRotated(true);
    setTimeout(() => {
      setRotated(false);
    }, 1000);
  };

  const updateLinkData = async (id: string) => {
    const updatedData = await updateLink(id);

    if (updatedData) {
      const storedLinks = localStorage.getItem("links");
      const linksArr = storedLinks ? JSON.parse(storedLinks) : null;
      if (linksArr) {
        const newLinksArr = linksArr.map((item: Links) => {
          if (item.id === updatedData.id) {
            return updatedData;
          }
          return item;
        });
        setLinks(newLinksArr);
        localStorage.setItem("links", JSON.stringify(newLinksArr));
      }
    }
  };

  return (
    <div className="flex flex-col rounded-2xl md:w-[60%] w-full bg-[#222225] gap-3 p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center gap-2">
          <div className="p-2 border border-zinc-700 rounded-xl">
            <Image src={ClockImg} alt="" width={18} height={18} />
          </div>
          <b>History</b>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setLinks(null);
              localStorage.removeItem("links");
            }}
            className="border border-zinc-700 rounded-xl cursor-pointer transition-all text-[#dc3545] hover:text-white p-2 hover:bg-[#dc3545]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill={`currentColor`}
              viewBox="0 0 16 16"
              className=""
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path>
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path>
            </svg>
          </button>
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
            <p className="text-xl text-gray-400 text-center">
              You haven&apos;t created any links 😭
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
                    <a
                      href={item.link}
                      className="text-gray-400 text-xm"
                      target="_blank"
                    >
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
                    <div className="flex gap-1.5 items-center justify-center">
                      <i className="text-gray-400 text-[12px] w-fit block underline">
                        Clicks: {item.visits}
                      </i>
                      <button
                        className="flex justify-center items-center cursor-pointer"
                        onClick={() => {
                          updateLinkData(item.id);
                        }}
                      >
                        <Image
                          src={UpdateImg}
                          alt=""
                          width={14}
                          className={`transition-transform duration-300 ${
                            rotated ? "rotate-180" : "rotate-0"
                          }`}
                          onClick={handleRotate}
                        />
                      </button>
                    </div>
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
        <div className="flex justify-center" onClick={() => setIsOpen(false)}>
          <i className="text-gray-400 underline cursor-pointer">Close</i>
        </div>
      </Activity>
    </div>
  );
};

export default LinkHistory;
