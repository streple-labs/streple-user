import Signup from "@/component/auth/signup";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function page() {
  redirect("/login");

  return (
    <Suspense>
      <Signup />
    </Suspense>
  );
}
