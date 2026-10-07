import ContentPage from "./../../components/ContentPage";
import PricingTable from "./../../components/PricingTable";

export const metadata = {
  title: "Pricing",
  description:
    "Choose a DocFix plan: Basic, Pro or Ultra, billed weekly, fortnightly or monthly. All plans run locally in your browser with no uploads.",
};

export default function PricingPage() {
  return (
    <ContentPage
      title="Pricing that scales with you"
      description="Pick a tier and a billing cadence. Every plan runs 100% in your browser — no server uploads, no account required to try the free tools."
      eyebrow="Plans"
    >
      <PricingTable />
    </ContentPage>
  );
}