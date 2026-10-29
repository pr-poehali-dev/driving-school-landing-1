import { createFileRoute } from "@tanstack/react-router";
import Privacy from "@/pages/Privacy";
import { fetchSeo, seoHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  loader: async () => ({ seo: await fetchSeo("/privacy") }),
  head: ({ loaderData }) => seoHead(loaderData?.seo),
  component: Privacy,
});
