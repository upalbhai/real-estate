import * as React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPropertyBySlug,
  getAllPropertySlugs,
} from "@/data/mock-property-detail";
import { PropertyDetailView } from "@/components/sections/property-detail/PropertyDetailView";
import { PropertyDetailSkeleton } from "@/components/sections/property-detail/PropertyDetailSkeleton";

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
      description: "The requested property listing could not be found.",
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

export default function PropertyDetailPage({
  params,
}: PropertyDetailPageProps) {
  return (
    <React.Suspense fallback={<PropertyDetailSkeleton />}>
      <PropertyDetailContent params={params} />
    </React.Suspense>
  );
}

async function PropertyDetailContent({
  params,
}: PropertyDetailPageProps) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  return <PropertyDetailView property={property} />;
}

