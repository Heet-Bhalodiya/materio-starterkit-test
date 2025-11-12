import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASEPATH,
  redirects: async () => {
    return [{
      source: '/',
      destination: '/dashboards/crm',
      permanent: true
    }]
  }
}

export default nextConfig
