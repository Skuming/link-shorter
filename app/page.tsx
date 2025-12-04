import InputField from "./components/InputField";
import LinkHistory from "./components/LinksHistory";

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col text-white p-4 gap-2 pt-[20vh]">
      <div className="flex items-center justify-center gap-2">
        <h2 className="text-white text-2xl font-bold">Link shortener</h2>
        <a
          href="https://t.me/NetGuardCommunity"
          className="cursiveFont text-2xl underline"
          target="_blank"
        >
          by netguard
        </a>
      </div>
      <i className="text-gray-400 text-center">
        Transform long URLs into short, shareable links in seconds. Track clicks
        and manage all your links in one place.
      </i>
      <InputField />
      <LinkHistory />
    </div>
  );
}
