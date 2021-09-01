module.exports = {
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  env: {
    KAKAO_REST_API_KEY: process.env.KAKAO_REST_API_KEY,
    KAKAO_REDIRECT_URI: process.env.KAKAO_REDIRECT_URI,
    NEXT_PUBLIC_BUKCY_BASE_END_POINT: process.env.NEXT_PUBLIC_BUKCY_BASE_END_POINT,
    S3_UPLOAD_KEY: process.env.S3_UPLOAD_KEY,
    S3_UPLOAD_SECRET: process.env.S3_UPLOAD_SECRET,
    UPLOAD_BUCKET: process.env.S3_UPLOAD_BUCKET,
    UPLOAD_REGION: process.env.S3_UPLOAD_REGION,
  },
  async rewrites() {
    return [
      {
        source: '/api/s3-upload',
        destination: '/api/s3-upload'
      },
      {
        source: '/api/:path*',
        destination: `http://buckybackend-env.eba-fusamz79.ap-northeast-2.elasticbeanstalk.com/api/:path*`,
      },
    ]
  },
}
