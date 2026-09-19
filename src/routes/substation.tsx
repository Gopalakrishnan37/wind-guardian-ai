import { createFileRoute } from "@tanstack/react-router";
import { SubstationDashboard } from "@/components/SubstationDashboard";

export const Route = createFileRoute("/substation")({
  head: () => ({ meta: [
    { title: "TRANS-SHIELD AI | SUB-01 Grid Substation" },
    { name: "description", content: "AI-enabled grid switching, voltage regulation, and predictive protection monitoring for SUB-01." },
    { property: "og:title", content: "TRANS-SHIELD AI | SUB-01 Grid Substation" },
    { property: "og:description", content: "Live substation telemetry, switching control, and local edge protection simulation." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: SubstationDashboard,
});