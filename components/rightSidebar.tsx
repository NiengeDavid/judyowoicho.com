import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  FaFacebook,
  FaInstagram,
  FaTumblr,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const avatar = "/assets/avatar.jpeg";

export default function RightSidebar() {
  return (
    <aside className="w-full p-4 text-black items-center text-left space-y-8 flex flex-col">
      {/* Search */}
      <div className="w-full">
        <Input
          type="text"
          placeholder="Search this website"
          className="w-full bg-creamy/50 border border-gray-300 rounded-sm px-3 py-6 font-serif focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>
      {/* About the Author */}
      <div>
        <h3 className="text-sm font-bold mb-2">ABOUT THE AUTHOR</h3>
        <Image
          src={avatar}
          alt="Judy Owoicho"
          width={120}
          height={120}
          className="rounded-full border-2 shadow-lg"
        />
        <p className="text-sm mt-2">
          <a
            href="/about"
            className="font-semibold text-secondary hover:underline"
          >
            Judy Owoicho
          </a>{" "}
          is a writer who draws. He's the bestselling author of{" "}
          <em>Steal Like An Artist</em> and other books.{" "}
          <a href="/about" className="text-secondary hover:underline">
            Read more&rarr;
          </a>
        </p>
      </div>

      {/* Social Links */}
      <div className="flex gap-4">
        <a
          href="#"
          className="rounded-full bg-black text-white p-2 hover:bg-secondary"
        >
          <i className="text-lg">
            <FaFacebook />
          </i>
        </a>
        <a
          href="#"
          className="rounded-full bg-black text-white p-2 hover:bg-secondary"
        >
          <i className="text-lg">
            <FaInstagram />
          </i>
        </a>
        <a
          href="#"
          className="rounded-full bg-black text-white p-2 hover:bg-secondary"
        >
          <i className="text-lg">
            <FaTumblr />
          </i>
        </a>
        <a
          href="#"
          className="rounded-full bg-black text-white p-2 hover:bg-secondary"
        >
          <i className="text-lg">
            <FaTwitter />
          </i>
        </a>
        <a
          href="#"
          className="rounded-full bg-black text-white p-2 hover:bg-secondary"
        >
          <i className="text-lg">
            <FaYoutube />
          </i>
        </a>
      </div>

      {/* Newsletter */}
      <div className="space-y-6 flex flex-col gap-4 font-sans">
        <h3 className="text-sm font-medium text-nowrap mb-2">
          SUBSCRIBE TO MY NEWSLETTER
        </h3>
        <p className="text-sm mb-2">
          Join the hundreds of thousands of readers who get it delivered free to
          their inboxes every week:
        </p>
        <div className="w-full">
          <iframe
            src="https://syntax001.substack.com/embed"
            width="480"
            height="320"
            // style="border:1px solid #EEE; background:white;"
            className="max-w-68 h-80 border bg-white"
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </div>

        {/* <div className="flex items-center gap-2 mt-2">
          <Image
            src={avatar}
            alt="Judy Owoicho avatar"
            width={40}
            height={40}
            className="rounded-xl border shadow-lg"
          />
          <div>
            <p className="font-bold text-sm">Judy Owoicho</p>
            <p className="text-xs">
              Weekly art, writing, and creative inspiration.
            </p>
          </div>
        </div> */}
      </div>
    </aside>
  );
}
