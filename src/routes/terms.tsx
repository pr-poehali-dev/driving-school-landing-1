import { createFileRoute } from "@tanstack/react-router";
import Terms from "@/pages/Terms";
import { fetchSeo, seoHead } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  loader: async () => ({ seo: await fetchSeo("/terms") }),
  head: ({ loaderData }) => seoHead(loaderData?.seo),
  component: Terms,
});
