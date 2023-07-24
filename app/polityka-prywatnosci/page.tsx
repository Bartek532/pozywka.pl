import { PrivacyPolicy } from "components/privacyPolicy/PrivacyPolicy";
import { DEFAULT_METADATA, getMetadata } from "lib/metadata";
import { fetchPage } from "lib/wordpress";
import { escapeHtml } from "utils/functions";

export async function generateMetadata() {
  const page = await fetchPage("privacy-policy");

  if (!page) return DEFAULT_METADATA;

  return getMetadata({
    title: page.title,
    description: escapeHtml(page.excerpt),
  });
}

const PrivacyPolicyPage = () => <PrivacyPolicy />;

export default PrivacyPolicyPage;
