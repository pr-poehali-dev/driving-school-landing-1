import { createFileRoute } from "@tanstack/react-router";
import Admin from "@/pages/Admin";

// /admin/* — та же админка (вход через localStorage), только в браузере
export const Route = createFileRoute("/admin/$")({
  ssr: false,
  component: Admin,
});
