/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable no-tabs */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-multi-spaces */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
import Script from "next/script";
import { existsGaId, GA_ID } from "../lib/gtag";

const GoogleAnalytics = () => (
	<>
		{existsGaId && (
			<>
				<Script defer src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
				<Script
					id="ga"
					defer
					dangerouslySetInnerHTML={{
						__html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());    
              gtag('config', '${GA_ID}');
            `
					}}
					strategy="afterInteractive"
				/>
			</>
		)}
	</>
);

export default GoogleAnalytics;
