import Onboarding from "@/component/popups/onboarding";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="size-full px-4 lg:px-10 flex flex-col items-center">
      <Onboarding />
      <div className="flex flex-col gap-4 md:gap-6 items-center max-w-[1440px] w-full relative">
        {children}
      </div>
    </div>
  );
}
