/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa');

module.exports = withPWA({
	images: {
		domains: ['enjzxtbbcyrptkkutovq.supabase.co']
	},
	pwa: {
		disable: process.env.NODE_ENV === 'development',
		dest: 'public',
		register: true,
		skipWaiting: true,
		runtimeCaching: [
			{
				urlPattern: /^https?.*/,
				handler: 'StaleWhileRevalidate',
				options: {
					cacheName: 'https-calls',
					cacheableResponse: {
						statuses: [0, 200]
					}
				}
			},
			{
				urlPattern: /\/api\/.+/,
				handler: 'NetworkFirst',
				options: {
					cacheName: 'api-calls',
					cacheableResponse: {
						statuses: [0, 200]
					}
				}
			},
			{
				urlPattern: /^\/_next\/data\/.+\/.+\.json$/,
				handler: 'StaleWhileRevalidate',
				options: {
					cacheName: 'next-data',
					cacheableResponse: {
						statuses: [0, 200]
					}
				}
			},
			{
				urlPattern: /.*/,
				handler: 'NetworkFirst',
				options: {
					cacheName: 'others',
					cacheableResponse: {
						statuses: [0, 200]
					}
				}
			}
		]
	},
	generateEtags: false
});
