import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // The /_next/image optimizer writes a cache under .next/cache/images.
    // On this macOS volume (which can't store xattrs natively) the OS drops
    // an AppleDouble "._" sidecar next to every cache file; it sorts first,
    // so the optimizer serves 4 KB of octet-stream junk and every image
    // breaks locally. Vercel's Linux fs has no such problem, so keep the
    // optimizer ON there and serve images directly everywhere else.
    unoptimized: !process.env.VERCEL,
  },
}

export default nextConfig
