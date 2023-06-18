import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { Radio } from '@mantine/core';
import Link from 'next/link';
import { ArrowDownIcon, PlusIcon } from 'assets/icons';
import { PRODUCTS_FILTER_TYPES } from 'utils/constants';

import styles from './Filter.module.scss';

const Filter = props => {
    const { type } = props;

    const router = useRouter();
    const {
        query: { category },
    } = router;

    const id = category.at(-1);

    const { sections, categories, language } = useSelector(state => state.global);

    const [activeSection, setActiveSection] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);
    const [activeSubCategory, setActiveSubCategory] = useState(null);

    const onSubCategoryChange = value => {
        const [slug, id] = value.split('&');

        setActiveSubCategory(Number(id));

        router.push(`/products/${slug}/${id}?page=1`, undefined, { scroll: false, locale: language });
    };

    const onSectionClick = id => {
        setActiveSection(prevState => (prevState === id && !activeCategory ? 'close' : id));

        setActiveCategory(null);
        setActiveSubCategory(null);
    };

    const onCategoryClick = id => {
        setActiveCategory(prevState => (prevState === id && !activeSubCategory ? 'close' : id));

        setActiveSubCategory(null);
    };

    useEffect(() => {
        switch (type) {
            case PRODUCTS_FILTER_TYPES.section: {
                setActiveSection(Number(id));

                break;
            }
            case PRODUCTS_FILTER_TYPES.category: {
                const selectedCategory = categories.find(cat => cat.id === Number(id));

                setActiveSection(selectedCategory?.sectionId);
                setActiveCategory(Number(id));

                break;
            }
            default: {
                const selectedSubCategory = categories
                    .flatMap(cat => cat.subCategories)
                    .find(cat => cat.id === Number(id));

                setActiveSection(selectedSubCategory?.sectionId);
                setActiveCategory(selectedSubCategory?.parentId);
                setActiveSubCategory(Number(id));
            }
        }
    }, [sections, categories]);

    useEffect(() => {
        console.log({ activeSection, activeCategory, activeSubCategory });
    }, [activeSection, activeCategory, activeSubCategory]);

    return sections.map(section => (
        <div key={section.id} className={styles.accordionItem}>
            <Link
                className={classNames(styles.accordionHeader, {
                    expanded: activeSection === section.id,
                })}
                onClick={() => onSectionClick(section.id)}
                href={`/products/${section.slug}/${section.id}?page=1`}
                scroll={false}
                locale={language}
            >
                {section.name}
                <ArrowDownIcon />
            </Link>
            {activeSection === section.id && (
                <div className={styles.accordionPanel}>
                    {categories
                        .filter(category => category.sectionId === section.id)
                        ?.map(category => (
                            <div key={category.id} className={styles.categoryAccordionItem}>
                                <Link
                                    className={classNames(styles.categoryAccordionHeader, styles.accordionHeader, {
                                        expanded: activeCategory === category.id,
                                    })}
                                    href={`/products/${category.slug}/${category.id}?page=1`}
                                    scroll={false}
                                    locale={language}
                                    onClick={() => onCategoryClick(category.id)}
                                >
                                    {category.name}
                                    <PlusIcon />
                                </Link>
                                {activeCategory === category.id && (
                                    <div className={styles.categoryAccordionPanel}>
                                        {category.subCategories.map(subCategory => (
                                            <Radio
                                                key={subCategory.id}
                                                value={`${subCategory.slug}&${subCategory.id}`}
                                                label={subCategory.name}
                                                name={'subCategory'}
                                                checked={activeSubCategory === subCategory.id}
                                                onChange={value => onSubCategoryChange(value.target.value)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
            )}
        </div>
    ));
};

export default Filter;
