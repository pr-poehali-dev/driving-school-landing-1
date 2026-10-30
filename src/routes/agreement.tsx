import { createFileRoute } from "@tanstack/react-router";
import Agreement from "@/pages/Agreement";
import { fetchSeo, seoHead } from "@/lib/seo";
import { getSiteOrigin } from "@/lib/origin";

export const Route = createFileRoute("/agreement")({
  loader: async () => ({ seo: await fetchSeo("/agreement"), origin: getSiteOrigin() }),
  head: ({ loaderData }) => seoHead(loaderData?.seo, loaderData?.origin ?? ""),
  component: Agreement,
});
