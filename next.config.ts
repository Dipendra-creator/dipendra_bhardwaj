import createMDX from '@next/mdx'
import {NextConfig} from "next";
import {RemotePattern} from "next/dist/shared/lib/image-config";


const remotePattern1: RemotePattern= {
  protocol: 'https',
  hostname: '**',
}

const remotePattern2: RemotePattern= {
  protocol: 'http',
  hostname: '**',
}

const nextConfig: NextConfig = {
  // Allow .mdx extensions for files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Configure images to accept any domain
  images: {
    remotePatterns: [
      remotePattern1,
      remotePattern2
    ],
  }
}

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: ['@mapbox/rehype-prism'],
  },
})

// Combine MDX and Next.js config
export default withMDX(nextConfig)