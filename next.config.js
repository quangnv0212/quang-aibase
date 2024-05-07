module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*', // Match any request starting with '/api'
          destination: 'https://aibase.nobisoft.vn/:path*',
        },
      ]
    },
  }