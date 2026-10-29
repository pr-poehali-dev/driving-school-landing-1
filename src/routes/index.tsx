import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";
import { ContentProvider, fetchContent } from "@/hooks/useContent";
import { fetchSeo, seoHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [sections, seo] = await Promise.all([fetchContent(), fetchSeo("/")]);
    return { sections, seo };
  },
  head: ({ loaderData }) => seoHead(loaderData?.seo),
  component: IndexRoute,
});

function IndexRoute() {
  const { sections } = Route.useLoaderData();

  // Старые ссылки HashRouter (/#/privacy) ведут на новые адреса
  useEffect(() => {
    const h = window.location.hash;
    if (h.startsWith("#/") && h.length > 2) window.location.replace(h.slice(1));
  }, []);

  return (
    <ContentProvider initial={sections}>
      <Index />
    </ContentProvider>
  );
}