import { LearnNavbar } from "@/component/dashboard/nav";
import { LearnSidebar } from "@/component/dashboard/sidebar";
import LoadingLearn from "@/component/loading-learn";
import CryptoOnboarding from "@/component/popups/crypto-onboarding";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="size-full px-4 lg:px-10 flex flex-col items-center">
      <CryptoOnboarding />
      <div className="flex flex-col gap-4 md:gap-6 items-center max-w-[1440px] w-full relative">
        <LearnNavbar />
        <main className="flex gap-5 w-full pb-20 lg:pb-4 [height:calc(100vh-64px)] lg:[height:calc(100vh-85px-32px)]">
          <LearnSidebar />
          {children}
        </main>
      </div>
      <LoadingLearn />
    </div>
  );
}
