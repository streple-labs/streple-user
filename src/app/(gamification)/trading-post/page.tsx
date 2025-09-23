import React from "react";
import TradingPost from "./trading-post";
import { getProTraders } from "@/utils/api/queries";

export const revalidate = 0;

export default async function page() {
  const { document: traders, error } = await getProTraders({ limit: 4 });

  return <TradingPost traders={traders} error={error} />;
}
