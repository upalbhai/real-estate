"use client";

import * as React from "react";
import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Maximize2, ZoomIn, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------
 * 1. ImageViewerProvider: Wraps a subtree to enable coordinated photo viewing
 * ------------------------------------------------------------------------- */
export interface ImageViewerProviderProps {
  children: React.ReactNode;
  maskOpacity?: number;
  bannerVisible?: boolean;
  speed?: React.ComponentProps<typeof PhotoProvider>["speed"];
  easing?: React.ComponentProps<typeof PhotoProvider>["easing"];
  onIndexChange?: (index: number) => void;
  onVisibleChange?: (visible: boolean, index: number) => void;
}

export function ImageViewerProvider({
  children,
  maskOpacity = 0.88,
  bannerVisible = true,
  speed = () => 280,
  onIndexChange,
  onVisibleChange,
}: ImageViewerProviderProps) {
  return (
    <PhotoProvider
      maskOpacity={maskOpacity}
      bannerVisible={bannerVisible}
      speed={speed}
      onIndexChange={onIndexChange}
      onVisibleChange={onVisibleChange}
    >
      {children}
    </PhotoProvider>
  );
}

/* -------------------------------------------------------------------------
 * 2. ImageViewerItem: Wraps individual trigger elements or children
 * ------------------------------------------------------------------------- */
export interface ImageViewerItemProps {
  src: string;
  children: React.ReactElement;
  triggers?: ("onClick" | "onDoubleClick")[];
}

export function ImageViewerItem({
  src,
  children,
  triggers = ["onClick"],
}: ImageViewerItemProps) {
  return (
    <PhotoView src={src} triggers={triggers}>
      {children}
    </PhotoView>
  );
}

/* -------------------------------------------------------------------------
 * 3. ImageViewer: Standalone interactive image with zoom badge & lightbox
 * ------------------------------------------------------------------------- */
export interface ImageViewerProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  imageClassName?: string;
  aspectRatio?: "video" | "square" | "wide" | "portrait" | "auto";
  showZoomBadge?: boolean;
  zoomBadgeText?: string;
  zoomBadgePosition?: "top-right" | "bottom-right" | "center";
  overlayGradient?: boolean;
  priority?: boolean;
  children?: React.ReactNode;
}

const aspectRatioClasses = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[21/9]",
  portrait: "aspect-[3/4]",
  auto: "",
};

export function ImageViewer({
  src,
  alt = "Luxury Estate Architectural View",
  width,
  height,
  fill = false,
  className,
  imageClassName,
  aspectRatio = "video",
  showZoomBadge = true,
  zoomBadgeText = "Inspect Photo",
  zoomBadgePosition = "top-right",
  overlayGradient = true,
  priority = false,
  children,
}: ImageViewerProps) {
  const badgePositionClass = {
    "top-right": "top-4 right-4",
    "bottom-right": "bottom-4 right-4",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  }[zoomBadgePosition];

  const content = (
    <div
      className={cn(
        "group relative overflow-hidden rounded-control bg-primary/10 cursor-zoom-in select-none transition-all duration-300",
        fill ? "h-full w-full" : aspectRatioClasses[aspectRatio],
        className
      )}
    >
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
          className={cn(
            "object-cover transition-transform duration-500 ease-out group-hover:scale-105",
            imageClassName
          )}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width ?? 1200}
          height={height ?? 800}
          priority={priority}
          className={cn(
            "h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105",
            imageClassName
          )}
        />
      )}

      {overlayGradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20 pointer-events-none transition-opacity duration-300 group-hover:from-black/70" />
      )}

      {showZoomBadge && (
        <div
          className={cn(
            "absolute z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-control bg-black/65 text-white border border-brand-gold/40 backdrop-blur-xs shadow-md pointer-events-none group-hover:bg-brand-gold group-hover:text-brand-charcoal transition-all duration-200",
            badgePositionClass
          )}
        >
          <Maximize2 className="h-3 w-3" />
          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider">
            {zoomBadgeText}
          </span>
        </div>
      )}

      {children && (
        <div className="pointer-events-none z-10">{children}</div>
      )}
    </div>
  );

  return (
    <ImageViewerProvider>
      <ImageViewerItem src={src}>{content}</ImageViewerItem>
    </ImageViewerProvider>
  );
}

/* -------------------------------------------------------------------------
 * 4. ImageGalleryViewer: Complete estate gallery with hero & thumbnail plates
 * ------------------------------------------------------------------------- */
export interface ImageGalleryItem {
  src: string;
  alt?: string;
  title?: string;
  caption?: string;
}

export interface ImageGalleryViewerProps {
  images: (string | ImageGalleryItem)[];
  heroHeight?: string;
  showThumbnails?: boolean;
  thumbnailColumns?: 2 | 3 | 4 | 5 | 6;
  className?: string;
  heroOverlay?: React.ReactNode;
}

export function ImageGalleryViewer({
  images,
  heroHeight = "h-64 sm:h-80",
  showThumbnails = true,
  thumbnailColumns = 4,
  className,
  heroOverlay,
}: ImageGalleryViewerProps) {
  if (!images || images.length === 0) return null;

  const normalizedImages: ImageGalleryItem[] = images.map((img, idx) =>
    typeof img === "string"
      ? { src: img, alt: `Gallery view ${idx + 1}` }
      : img
  );

  const heroImage = normalizedImages[0];
  const galleryThumbnails = normalizedImages;

  const colClassMap: Record<number, string> = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
  };

  return (
    <ImageViewerProvider>
      <div className={cn("space-y-3", className)}>
        {/* Main Hero Banner */}
        <ImageViewerItem src={heroImage.src}>
          <div
            className={cn(
              "group relative w-full overflow-hidden rounded-control bg-primary cursor-zoom-in select-none shadow-md",
              heroHeight
            )}
          >
            <Image
              src={heroImage.src}
              alt={heroImage.alt ?? "Featured Estate Prospectus"}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25 pointer-events-none" />

            {/* Inspect Badge */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-control bg-black/65 text-white border border-brand-gold/40 backdrop-blur-xs shadow-md pointer-events-none group-hover:bg-brand-gold group-hover:text-brand-charcoal transition-all">
              <Maximize2 className="h-3 w-3" />
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider">
                Inspect High-Res ({normalizedImages.length} Plates)
              </span>
            </div>

            {heroOverlay && (
              <div className="pointer-events-none z-10">{heroOverlay}</div>
            )}
          </div>
        </ImageViewerItem>

        {/* Thumbnail Plates Strip */}
        {showThumbnails && galleryThumbnails.length > 1 && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-special text-[11px] uppercase tracking-wider font-semibold">
                Architectural Plates ({galleryThumbnails.length})
              </span>
              <span className="font-mono text-[10px] text-brand-gold flex items-center gap-1">
                <ZoomIn className="h-3 w-3" />
                <span>Click plate to launch gallery</span>
              </span>
            </div>

            <div
              className={cn(
                "grid gap-2",
                colClassMap[thumbnailColumns] ?? "grid-cols-4"
              )}
            >
              {galleryThumbnails.map((item, idx) => (
                <ImageViewerItem key={idx} src={item.src}>
                  <div className="group relative h-16 sm:h-20 w-full overflow-hidden rounded-control border border-border bg-surface-secondary cursor-zoom-in select-none">
                    <Image
                      src={item.src}
                      alt={item.alt ?? `Plates perspective ${idx + 1}`}
                      fill
                      sizes="(max-width: 640px) 25vw, (max-width: 1024px) 20vw, 15vw"
                      className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-transparent transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Eye className="h-4 w-4 text-white drop-shadow-md" />
                    </div>
                  </div>
                </ImageViewerItem>
              ))}
            </div>
          </div>
        )}
      </div>
    </ImageViewerProvider>
  );
}
