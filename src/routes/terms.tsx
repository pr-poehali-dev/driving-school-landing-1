import { createFileRoute } from "@tanstack/react-router";
import Terms from "@/pages/Terms";
import { fetchSeo, seoHead } from "@/lib/seo";
import { getSiteOrigin } from "@/lib/origin";

export const Route = createFileRoute("/terms")({
  loader: async () => ({ seo: await fetchSeo("/terms"), origin: getSiteOrigin() }),
  head: ({ loaderData }) => seoHead(loaderData?.seo, loaderData?.origin ?? ""),
  component: Terms,
});
