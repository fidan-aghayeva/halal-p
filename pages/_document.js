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
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
