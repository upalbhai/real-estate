import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPropertyBySlug,
  getAllPropertySlugs,
} from "@/data/mock-property-detail";
import { PropertyDetailView } from "@/components/sections/property-detail/PropertyDetailView";

interface PropertyDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const slugs = getAllPropertySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PropertyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    return {
      title: "Property Not Found | Aura Estates",
      description: "The requested architectural listing could not be found or has been moved to private off-market escrow.",
    };
  }

  const ogImageUrl = property.images[0]?.url;

  return {
    title: `${property.title} | ${property.priceFormatted} | Aura Estates`,
    description: property.seo.metaDescription,
    keywords: property.seo.keywords,
    openGraph: {
      title: property.seo.metaTitle,
      description: property.seo.metaDescription,
      type: "website",
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: property.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: property.seo.metaTitle,
      description: property.seo.metaDescription,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: PropertyDetailPageProps) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  return <PropertyDetailView property={property} />;
}

