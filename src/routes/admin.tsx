import { createFileRoute, Outlet } from "@tanstack/react-router";

// Админка: вход хранится в localStorage, поэтому рендерится только в браузере.
// На сервере отдаём тот же экран загрузки, что и сама админка.
function AdminShell() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <span className="sr-only">Загрузка панели управления автошколы «Время рулить»…</span>
    </div>
  );
}

export const Route = createFileRoute("/admin")({
  ssr: false,
  pendingComponent: AdminShell,
  component: Outlet,
});