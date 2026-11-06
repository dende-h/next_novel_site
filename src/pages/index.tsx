import Head from 'next/head';

//後継エディタ「コトノハ-leaf-」の紹介ページ
const successorEditorUrl = 'https://cotonoha-leaf.org/lp';

export default function ServiceClosed() {
	return (
		<>
			<Head>
				<title>サービス終了のお知らせ | Lit:Bite</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content="小説閲覧サイト「Lit:Bite」はサービスを終了いたしました。" />
			</Head>
			<main>
				<article className="card">
					<p className="service">Lit:Bite</p>
					<h1>サービス終了のお知らせ</h1>
					<p>
						小説閲覧サイト「Lit:Bite」は、サービスを終了いたしました。
						<br />
						作品を投稿してくださった皆さま、読んでくださった皆さまに、心より御礼申し上げます。
					</p>
					<p>
						サービス終了に伴い、掲載していた作品はご覧いただけなくなりました。また、小説エディタ「Re:terature」も同時にサービスを終了しております。
					</p>

					<section>
						<h2>後継エディタ「コトノハ-leaf-」</h2>
						<p>Re:teratureの後継となる、新しい小説エディタです。無料でお使いいただけます。</p>
						<a className="button" href={successorEditorUrl} target="_blank" rel="noopener noreferrer">
							コトノハ-leaf-を見る
						</a>
					</section>

					<p className="closing">長らくのご愛顧、誠にありがとうございました。</p>
				</article>
			</main>
		</>
	);
}
