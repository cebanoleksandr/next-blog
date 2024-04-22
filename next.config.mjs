/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {
  if (phase === 'development') {
    return {
      reactStrictMode: true,
      env: {
        mongodb_database: 'my-site-dev',
        mongodb_uri: 'mongodb://0.0.0.0:27017'
      }
    }
  }

  return {
    reactStrictMode: true,
    env: {
      mongodb_database: 'my-site',
      mongodb_uri: 'mongodb://0.0.0.0:27017'
    }
  }
};

export default nextConfig;
