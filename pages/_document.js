import Document, { Head, Html, Main, NextScript } from 'next/document';
import { DEFAULT_LANGUAGE } from 'utils/constants';

class MyDocument extends Document {

    render() {
        return (
            <Html lang={DEFAULT_LANGUAGE}>
                <Head>
                    <link rel='preconnect' href='https://fonts.googleapis.com' />
                    <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
                    <link
                        href='https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap'
                        rel='stylesheet'
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />

                    <div id='scrollbar-root' className='scrollbar-root' />
                    <div id='tooltip-root' />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
