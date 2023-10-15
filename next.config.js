/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.resolve.extensions.push('.ts', '.tsx');
        return config;
      },
    eslint:{
      ignoreDuringBuilds: true
    },
    typescript:{
      ignoreBuildErrors: true
    }
}

module.exports = nextConfig
