import Document, { Head, Html, Main, NextScript } from 'next/document';
import { DEFAULT_LANGUAGE } from 'utils/constants';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);

        return { ...initialProps, locale: ctx?.locale || DEFAULT_LANGUAGE };
    }

    render() {
        return (
            <Html lang={this.props.locale}>
                <Head>
                    <link rel='preconnect' href='https://fonts.googleapis.com' />
                    <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
                    <link rel='icon' type='image/x-icon' href='/images/favicon.png' />
                    <link
                        href='https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap'
                        rel='stylesheet'
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-P47Q9BBR');`,
                        }}
                    />
                </Head>
                <body>
                    <noscript
                        dangerouslySetInnerHTML={{
                            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P47Q9BBR" height="0" width="0" style="display: none; visibility: hidden;" />`,
                        }}
                    />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
