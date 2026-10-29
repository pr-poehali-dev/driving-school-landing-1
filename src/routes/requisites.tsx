import { createFileRoute } from "@tanstack/react-router";
import Requisites from "@/pages/Requisites";
import { fetchSeo, seoHead } from "@/lib/seo";

export const Route = createFileRoute("/requisites")({
  loader: async () => ({ seo: await fetchSeo("/requisites") }),
  head: ({ loaderData }) => seoHead(loaderData?.seo),
  component: Requisites,
});
