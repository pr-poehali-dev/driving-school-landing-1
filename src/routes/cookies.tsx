import { createFileRoute } from "@tanstack/react-router";
import Cookies from "@/pages/Cookies";
import { fetchSeo, seoHead } from "@/lib/seo";

export const Route = createFileRoute("/cookies")({
  loader: async () => ({ seo: await fetchSeo("/cookies") }),
  head: ({ loaderData }) => seoHead(loaderData?.seo),
  component: Cookies,
});
