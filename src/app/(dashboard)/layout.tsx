import MobileNav from "@/component/layout/mobile-nav-main";
import HomeNavbar from "@/component/layout/nav-main";
import HomeSidebar from "@/component/layout/sidebar-main";
import Onboarding from "@/component/popups/onboarding";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="size-full px-4 lg:px-10 flex flex-col items-center">
      <Onboarding />
      <div className="flex flex-col gap-4 md:gap-6 items-center max-w-[1440px] w-full relative">
        <HomeNavbar />
        <main className="flex gap-5 w-full pb-20 lg:pb-4 [height:calc(100vh-64px)] md:[height:calc(100vh-85px-32px)]">
          <HomeSidebar />
          {children}
        </main>
        <MobileNav />
      </div>
    </div>
  );
}
