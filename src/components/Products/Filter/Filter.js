import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { Radio } from '@mantine/core';
import Link from 'next/link';
import { ArrowDownIcon, PlusIcon } from 'assets/icons';

import styles from './Filter.module.scss';

const Filter = () => {
    const router = useRouter();
    const {
        query: { category },
    } = router;

    const [slug] = category;

    const { sections, categories } = useSelector(state => state.global);

    const [accordionItems, setAccordionItems] = useState({ [slug]: true });

    const onSubCategoryChange = value => {
        const [slug, id] = value.split('&');

        router.push(`/products/${slug}/${id}?page=1`, undefined, { scroll: false });
    };

    const onSectionClick = slug => {
        if (accordionItems[slug]) {
            setAccordionItems(prevState => ({ ...prevState, [slug]: !prevState[slug] }));
        } else {
            setAccordionItems(prevState => ({ ...prevState, [slug]: true }));
        }
    };

    useEffect(() => {
        if (!sections.find(section => section.slug === slug)) {
            const selectedCategory = categories.find(
                category =>
                    category.slug === slug || category.subCategories.some(subCategory => subCategory.slug === slug)
            );

            if (selectedCategory) {
                const selectedCategorySection = sections.find(
                    section => section.id === selectedCategory.sectionId
                )?.slug;

                setAccordionItems(prevState => ({
                    ...prevState,
                    [selectedCategorySection]: true,
                    [selectedCategory.slug]: true,
                }));
            }
        }
    }, [slug, sections, categories]);

    return sections.map(section => (
        <div key={section.id} className={styles.accordionItem}>
            <div className={classNames(styles.accordionHeader, { expanded: accordionItems[section.slug] })}>
                <Link href={`/products/${section.slug}/${section.id}?page=1`} scroll={false}>
                    {section.name}
                </Link>
                <ArrowDownIcon onClick={() => onSectionClick(section.slug)} />
            </div>
            {accordionItems[section.slug] && (
                <div className={styles.accordionPanel}>
                    {categories
                        .filter(category => category.sectionId === section.id)
                        ?.map(category => (
                            <div key={category.id} className={styles.categoryAccordionItem}>
                                <div
                                    className={classNames(styles.categoryAccordionHeader, styles.accordionHeader, {
                                        expanded: accordionItems[category.slug],
                                    })}
                                >
                                    <Link href={`/products/${category.slug}/${category.id}?page=1`} scroll={false}>
                                        {category.name}
                                    </Link>
                                    <PlusIcon onClick={() => onSectionClick(category.slug)} />
                                </div>
                                {accordionItems[category.slug] && (
                                    <div className={styles.categoryAccordionPanel}>
                                        {category.subCategories.map(subCategory => (
                                            <Radio
                                                key={subCategory.id}
                                                value={`${subCategory.slug}&${subCategory.id}`}
                                                label={subCategory.name}
                                                name={'subCategory'}
                                                checked={slug === subCategory.slug}
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
