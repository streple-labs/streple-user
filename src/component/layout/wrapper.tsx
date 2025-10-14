import MobileNav from "@/component/layout/mobile-nav-main";
import HomeSidebar from "@/component/layout/sidebar-main";

export default function Wrapper({
  topNav,
  children,
}: {
  topNav: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      {topNav}
      <main className="flex gap-5 w-full pb-20 lg:pb-4 [height:calc(100vh-64px)] md:[height:calc(100vh-85px-32px)]">
        <HomeSidebar />
        {children}
      </main>
      <MobileNav />
    </>
  );
}
