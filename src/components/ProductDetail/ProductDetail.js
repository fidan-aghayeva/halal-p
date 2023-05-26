import { useRouter } from 'next/router';

import styles from './ProductDetail.module.scss';

const ProductDetail = () => {
    const {
        query: { slug },
    } = useRouter();

    const productId = slug.split('-').at(-1);

    return <div>Detail</div>;
};

export default ProductDetail;
