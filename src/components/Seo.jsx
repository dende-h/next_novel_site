/* eslint-disable indent */
/* eslint-disable react/prop-types */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-tabs */
import Head from "next/head";

const Seo = ({ pageTitle, pageDescription, pagePath, pageImg, pageImgWidth, pageImgHeight }) => {
	const defaultTitle = "ShortNovelVillage";
	const defaultDescription =
		"世界中の才能ある作家が創作した短編小説の数々を発見し、楽しむことができます。掌編、ショートショート、短編までの短い物語専門の小説サイトです。会員登録不要で無料で閲覧できます。";

	const title = pageTitle ? `${pageTitle} | ${defaultTitle}` : defaultTitle;
	const description = pageDescription || defaultDescription;
	const url = pagePath;
	const imgUrl = pageImg;
	const imgWidth = pageImgWidth || 1280;
	const imgHeight = pageImgHeight || 640;

	return (
		<Head>
			<title>{title}</title>
			<meta name="viewport" content="width=device-width,initial-scale=1.0" />
			<meta name="description" content={description} />
			<meta property="og:url" content={url} />
			<meta property="og:title" content={title} />
			<meta property="og:site_name" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:type" content="website" />
			<meta property="og:image" content={imgUrl} />
			<meta property="og:image:width" content={String(imgWidth)} />
			<meta property="og:image:height" content={String(imgHeight)} />
			<link rel="preconnect" href="https://fonts.gstatic.com" />
			<link rel="canonical" href={url} />
			<link rel="icon" href="/favicon.ico" />
			<meta name="google-site-verification" content="26u2b3-4uum3ZXDKrS6jWfPzCaWa9I8dPyp5TD2ekrE" />
		</Head>
	);
};

export default Seo;
