import { Metadata } from "next";
import GPTOSSHero from "@/components/blocks/gpt-oss/hero";
import GPTOSSFeatures from "@/components/blocks/gpt-oss/features";
import GPTOSSStats from "@/components/blocks/gpt-oss/stats";
import GPTOSSComparison from "@/components/blocks/gpt-oss/comparison";
import GPTOSSFAQ from "@/components/blocks/gpt-oss/faq";
import GPTOSSCTA from "@/components/blocks/gpt-oss/cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  let canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}`;

  if (locale !== "en") {
    canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/${locale}`;
  }

  return {
    title: "GPT-OSS-120B - Next-Generation Open Source AI Model | Free AI Chat",
    description: "Experience GPT-OSS-120B, the revolutionary open-source AI model with 120B parameters. Advanced reasoning, multimodal support, and specialized coding features. Try free AI chat now!",
    keywords: "gpt-oss-120b, open source ai, ai model, free ai chat, 120b parameters, multimodal ai, ai coding assistant, gpt alternative, open source gpt",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "GPT-OSS-120B - Revolutionary Open Source AI Model",
      description: "120B parameter open-source AI with advanced reasoning and multimodal capabilities",
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: "/imgs/gpt-oss-120b-og.png",
          width: 1200,
          height: 630,
          alt: "GPT-OSS-120B AI Model",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "GPT-OSS-120B - Next-Gen Open Source AI",
      description: "Experience the power of 120B parameter open-source AI",
      images: ["/imgs/gpt-oss-120b-og.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "GPT-OSS-120B",
  applicationCategory: "Artificial Intelligence",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description: "Open-source AI model with 120B parameters featuring advanced reasoning and multimodal capabilities",
  featureList: [
    "120B Parameters",
    "Advanced Reasoning",
    "Multimodal Support",
    "Code Generation",
    "Open Source",
    "Free to Use",
  ],
  softwareVersion: "4.0",
  releaseNotes: "2025 Release",
  operatingSystem: "Web-based",
  url: "https://gpt-oss-120b.ai",
};

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <GPTOSSHero />
      <GPTOSSStats />
      <GPTOSSFeatures />
      <GPTOSSComparison />
      <GPTOSSFAQ />
      <GPTOSSCTA />
    </main>
  );
}