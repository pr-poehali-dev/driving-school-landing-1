import { createFileRoute } from "@tanstack/react-router";
import Privacy from "@/pages/Privacy";
import { fetchSeo, seoHead } from "@/lib/seo";
import { getSiteOrigin } from "@/lib/origin";

export const Route = createFileRoute("/privacy")({
  loader: async () => ({ seo: await fetchSeo("/privacy"), origin: getSiteOrigin() }),
  head: ({ loaderData }) => seoHead(loaderData?.seo, loaderData?.origin ?? ""),
  component: Privacy,
});
