"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  FaFacebook,
  FaInstagram,
  FaTumblr,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import {
  getSocialLinks,
  getClient,
  getRightside,
} from "@/sanity/lib/sanity.client";
import { SocialLink, Rightside } from "@/sanity/lib/sanity.queries";
import { readToken } from "@/sanity/lib/sanity.api";
import { toast } from "sonner";

const avatar = "/assets/avatar.png";

export default function RightSidebar() {
  const client = getClient({ token: readToken });
  const [socials, setSocials] = useState<SocialLink[] | null>(null);
  const [rightside, setRightside] = useState<Rightside | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSocials = async () => {
      setIsLoading(true);
      try {
        const [socialData, rightsideData] = await Promise.all([
          getSocialLinks(client),
          getRightside(client),
        ]);
        setSocials(socialData);
        setRightside(rightsideData);
        //console.log("Socails Data:", rightsideData);
      } catch (error) {
        toast("Network Error", {
          description:
            "Error fetching about data; kindly check your internet connection.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSocials();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center text-primary font-serif text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <aside className="w-full p-4 text-black items-center text-left space-y-8 flex flex-col">
      {/* Search */}
      <div className="w-full">
        <Input
          type="text"
          placeholder="Search this website"
          className="w-full bg-creamy/50 border border-gray-300 rounded-sm px-3 py-6 font-serif focus:outline-none focus:ring-2 focus:ring-secondary drop-shadow"
        />
      </div>
      {/* About the Author */}
      <div>
        <h3 className="text-sm font-bold mb-2">ABOUT THE AUTHOR</h3>
        <Image
          src={rightside?.coverImage?.url || avatar}
          alt={rightside?.coverImage?.alt || "Author Avatar"}
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
          {rightside?.bio}{" "}
          <a href="/about" className="text-secondary hover:underline">
            Read more&rarr;
          </a>
        </p>
      </div>

      {/* Social Links */}
      <div className="w-full flex gap-4 justify-content-start items-center">
        {socials &&
          socials.map((link) => {
            const Icon =
              link.icon === "FaFacebook"
                ? FaFacebook
                : link.icon === "FaInstagram"
                  ? FaInstagram
                  : link.icon === "FaTumblr"
                    ? FaTumblr
                    : link.icon === "FaTwitter"
                      ? FaTwitter
                      : link.icon === "FaYoutube"
                        ? FaYoutube
                        : () => <span>Unknown</span>;

            return (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-black text-white p-2 hover:bg-secondary"
              >
                <Icon className="text-lg" />
              </a>
            );
          })}
      </div>

      {/* Newsletter */}
      <div className="space-y-2 flex flex-col gap-2 font-sans">
        <h3 className="text-sm font-medium text-nowrap mb-2">
          SUBSCRIBE TO MY NEWSLETTER
        </h3>
        <p className="text-sm mb-2">{rightside?.newsletterBio}</p>
        <div className="w-full">
          <iframe
            src="https://quickfixcareer.substack.com/embed"
            width="480"
            height="320"
            // style="border:1px solid #EEE; background:white;"
            className="max-w-68 h-100 border bg-white"
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
