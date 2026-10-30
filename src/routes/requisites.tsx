import { createFileRoute } from "@tanstack/react-router";
import Requisites from "@/pages/Requisites";
import { fetchSeo, seoHead } from "@/lib/seo";
import { getSiteOrigin } from "@/lib/origin";

export const Route = createFileRoute("/requisites")({
  loader: async () => ({ seo: await fetchSeo("/requisites"), origin: getSiteOrigin() }),
  head: ({ loaderData }) => seoHead(loaderData?.seo, loaderData?.origin ?? ""),
  component: Requisites,
});
