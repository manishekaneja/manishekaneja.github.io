/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // NO basePath, NO assetPrefix — root user-pages site
}
export default nextConfig
