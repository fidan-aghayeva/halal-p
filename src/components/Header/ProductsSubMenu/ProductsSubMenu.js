import Link from 'next/link';
import productCategories from './mock';

import styles from './ProductsSubMenu.module.scss';

const ProductsSubMenu = () => {
    return (
        <div className={styles.container}>
            {productCategories.map(category => (
                <div key={category.id} className={styles.category}>
                    <Link href={'/'} className={styles.categoryLink}>{category.name}</Link>
                    {category.subCategories.map(subCategory => (
                        <Link href={'/category'} key={subCategory.id} className={styles.subCategoryLink}>{subCategory.name}</Link>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ProductsSubMenu;
