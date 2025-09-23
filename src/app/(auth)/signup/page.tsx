import Signup from "@/component/auth/signup";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense>
      <Signup />
    </Suspense>
  );
}
