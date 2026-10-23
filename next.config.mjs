/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Keep metadata in the initial HTML for major search and social crawlers.
  // This is especially important for async generateMetadata on project pages.
  htmlLimitedBots: /Googlebot|Twitterbot|Slackbot|facebookexternalhit|LinkedInBot|WhatsApp/i,
};

export default nextConfig;
