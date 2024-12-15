import remarkGfm from 'remark-gfm'
import createMDX from '@next/mdx'
import rehypePrism from "rehype-prism";
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
  // Optionally, add any other Next.js config below
  // Configure images to accept any domain
  images: {
    remotePatterns: [
      remotePattern1,
      remotePattern2
    ],
  },
}


const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
})

// Combine MDX and Next.js config
export default withMDX(nextConfig)