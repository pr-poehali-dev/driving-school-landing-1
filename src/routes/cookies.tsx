import { createFileRoute } from "@tanstack/react-router";
import Cookies from "@/pages/Cookies";
import { fetchSeo, seoHead } from "@/lib/seo";
import { getSiteOrigin } from "@/lib/origin";

export const Route = createFileRoute("/cookies")({
  loader: async () => ({ seo: await fetchSeo("/cookies"), origin: getSiteOrigin() }),
  head: ({ loaderData }) => seoHead(loaderData?.seo, loaderData?.origin ?? ""),
  component: Cookies,
});
