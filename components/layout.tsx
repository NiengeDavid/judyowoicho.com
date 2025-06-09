import LeftSidebar from "@/components/leftSidebar";
import RightSidebar from "@/components/rightSidebar";
import { ReactNode } from "react";
import Container from "./container";

type LayoutProps = {
  children: ReactNode;
  className?: string;
};

export default function Layout({ children, className = "" }: LayoutProps) {
  return (
    <Container className="w-full min-h-screen bg-white">
      <div
        className={`flex flex-col lg:flex-row items-stretch mt-4 justify-center min-h-screen mx-auto ${className}`}
      >
        {/* Left Sidebar */}
        <div className="hidden lg:flex lg:flex-shrink-0 lg:w-[240px]">
          <LeftSidebar />
        </div>
        {/* Main content */}
        <main className="w-full max-w-2xl mx-auto flex-1 py-4 px-4 lg:border-x border-gray-300 lg:px-8">
          {children}
        </main>
        {/* Right Sidebar */}
        <div className="hidden lg:flex lg:flex-shrink-0 lg:w-[240px]">
          <RightSidebar />
        </div>
        {/* Right Sidebar (Below main on mobile, right on large screens) */}
        <div className="flex lg:hidden order-2 w-full max-w-2xl mx-auto px-4 py-4 mt-20">
          <RightSidebar />
        </div>
        {/* Left Sidebar (Below right on mobile, left on large screens) */}
        <div className="flex lg:hidden order-3 w-full max-w-2xl mx-auto px-4 py-4 mt-10">
          <LeftSidebar />
        </div>
      </div>
    </Container>
  );
}
