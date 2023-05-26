import { useSelector } from 'react-redux';
import Link from 'next/link';

import styles from './ProductsSubMenu.module.scss';

const ProductsSubMenu = () => {
    const { sections, categories } = useSelector(state => state.global);

    return (
        <div className={styles.container}>
            {sections.map(section => (
                <div key={section.id} className={styles.category}>
                    <Link href={`/products/${section.slug}/${section.id}?page=1`} className={styles.categoryLink}>
                        {section.name}
                    </Link>
                    {categories
                        .filter(category => category.sectionId === section.id)
                        .map(subCategory => (
                            <Link
                                href={`/products/${subCategory.slug}/${subCategory.id}?page=1`}
                                key={subCategory.id}
                                className={styles.subCategoryLink}
                            >
                                {subCategory.name}
                            </Link>
                        ))}
                </div>
            ))}
        </div>
    );
};

export default ProductsSubMenu;
