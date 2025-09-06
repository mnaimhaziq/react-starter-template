import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from "react-i18next";

export const Route = createFileRoute('/translation')({
  component: RouteComponent,
})

function RouteComponent() {

  const { t, i18n } = useTranslation();

    return (
    <div className="p-4">
      <h1>{t("welcome")}</h1>
      <p>{t("hello", { name: "Naim" })}</p>

      <button
        onClick={() => i18n.changeLanguage("ms")}
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        Switch to Malay
      </button>

      <button
        onClick={() => i18n.changeLanguage("en")}
        className="ml-2 rounded bg-green-500 px-4 py-2 text-white"
      >
        Switch to English
      </button>
    </div>
  );
}
