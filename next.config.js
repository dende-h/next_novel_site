/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable indent */
/* eslint-disable no-tabs */
module.exports = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'enjzxtbbcyrptkkutovq.supabase.co'
			}
		]
	},
	experimental: {
		scrollRestoration: true
	},
	// 以下はPWAでISRを利用するための設定
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
				urlPattern: /\/_next\/data\/.+\/.+\.json/,
				handler: 'NetworkFirst',
				options: {
					networkTimeoutSeconds: 10,
					cacheName: 'next-data',
					cacheableResponse: {
						statuses: [200]
					}
				}
			},
			{
				urlPattern: /\/api\/.+/,
				handler: 'NetworkFirst',
				options: {
					cacheableResponse: {
						statuses: [0, 200]
					}
				}
			},
			{
				urlPattern: /.*/,
				handler: 'NetworkFirst',
				options: {
					cacheableResponse: {
						statuses: [0, 200]
					}
				}
			}
		]
	},
	generateEtags: false
};
