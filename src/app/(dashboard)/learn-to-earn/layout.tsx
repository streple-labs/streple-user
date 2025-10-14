import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn To Earn",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
