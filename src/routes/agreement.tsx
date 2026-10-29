import { createFileRoute } from "@tanstack/react-router";
import Agreement from "@/pages/Agreement";
import { fetchSeo, seoHead } from "@/lib/seo";

export const Route = createFileRoute("/agreement")({
  loader: async () => ({ seo: await fetchSeo("/agreement") }),
  head: ({ loaderData }) => seoHead(loaderData?.seo),
  component: Agreement,
});
