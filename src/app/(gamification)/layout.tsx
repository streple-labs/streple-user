import MobileNav from "@/component/layout/mobile-nav-learn";
import Navbar from "@/component/layout/nav-learn";
import Sidebar from "@/component/layout/sidebar-learn";
import LoadingLearn from "@/component/popups/loading-learn";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="size-full px-4 lg:px-10 flex flex-col items-center">
      <div className="flex flex-col gap-4 md:gap-6 items-center max-w-[1440px] w-full relative">
        <Navbar />
        <main className="flex gap-5 w-full pb-20 lg:pb-4 lg:[height:calc(100vh-85px-32px)]">
          <Sidebar />
          {children}
        </main>
      </div>
      <MobileNav />
      <LoadingLearn />
    </div>
  );
}
