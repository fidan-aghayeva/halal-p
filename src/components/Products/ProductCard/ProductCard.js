import { useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { SERVICE_URL } from 'utils/constants';

import styles from './ProductCard.module.scss';

const ProductCard = props => {
    const { product } = props;

    const { language } = useSelector(state => state.global);

    return (
        <Link href={`/product/${product.slug}/${product.id}`} className={styles.container} locale={language}>
            <div className={styles.imageContainer}>
                <Image src={SERVICE_URL + product.mainImage} alt={product.name} fill />
            </div>
            <span className={styles.name}>{product.name}</span>
        </Link>
    );
};

export default ProductCard;
