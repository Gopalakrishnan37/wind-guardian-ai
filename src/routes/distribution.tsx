import { createFileRoute } from "@tanstack/react-router";
import { DistributionDashboard } from "@/components/DistributionDashboard";

export const Route = createFileRoute("/distribution")({
  head: () => ({ meta: [
    { title: "TRANS-SHIELD AI | DT-01 Distribution Transformer" },
    { name: "description", content: "AI-enabled distribution transformer monitoring and predictive edge protection for DT-01." },
    { property: "og:title", content: "TRANS-SHIELD AI | DT-01 Distribution Transformer" },
    { property: "og:description", content: "Live distribution transformer health, cooling, relay, and local edge protection simulation." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: DistributionDashboard,
});