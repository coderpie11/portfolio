import type { Metadata } from "next";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const canonical = path.startsWith("/") ? path : `/${path}`;
  const url = `https://coderpie.tech${canonical}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "website",
      url,
      siteName: "CoderPie",
      title,
      description,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}
