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

    const [accordionItems, setAccordionItems] = useState({ [id]: true });

    const onSubCategoryChange = value => {
        const [slug, id] = value.split('&');

        router.push(`/products/${slug}/${id}?page=1`, undefined, { scroll: false, locale: language });
    };

    const onSectionClick = id => {
        if (accordionItems[id]) {
            setAccordionItems(prevState => ({ ...prevState, [id]: !prevState[id] }));
        } else {
            setAccordionItems(prevState => ({ ...prevState, [id]: true }));
        }
    };

    const onLinkClick = (e, id) => {
        if (accordionItems[id]) {
            e.stopPropagation();
        }
    };

    useEffect(() => {
        if (type === PRODUCTS_FILTER_TYPES.category) {
            const selectedCategory = categories.find(
                category => category.id === id || category.subCategories.some(subCategory => subCategory.id === id)
            );

            if (selectedCategory) {
                const selectedCategorySection = sections.find(section => section.id === selectedCategory.sectionId)?.id;

                setAccordionItems(prevState => ({
                    ...prevState,
                    [selectedCategorySection]: true,
                    [selectedCategory.id]: true,
                }));
            }
        }
    }, [id, sections, categories]);

    return sections.map(section => (
        <div key={section.id} className={styles.accordionItem}>
            <div
                className={classNames(styles.accordionHeader, { expanded: accordionItems[section.id] })}
                onClick={() => onSectionClick(section.id)}
            >
                <Link
                    href={`/products/${section.slug}/${section.id}?page=1`}
                    scroll={false}
                    locale={language}
                    onClick={e => onLinkClick(e, section.id)}
                >
                    {section.name}
                </Link>
                <ArrowDownIcon />
            </div>
            {accordionItems[section.id] && (
                <div className={styles.accordionPanel}>
                    {categories
                        .filter(category => category.sectionId === section.id)
                        ?.map(category => (
                            <div key={category.id} className={styles.categoryAccordionItem}>
                                <div
                                    className={classNames(styles.categoryAccordionHeader, styles.accordionHeader, {
                                        expanded: accordionItems[category.id],
                                    })}
                                >
                                    <Link
                                        href={`/products/${category.slug}/${category.id}?page=1`}
                                        scroll={false}
                                        locale={language}
                                    >
                                        {category.name}
                                    </Link>
                                    <PlusIcon onClick={() => onSectionClick(category.id)} />
                                </div>
                                {accordionItems[category.id] && (
                                    <div className={styles.categoryAccordionPanel}>
                                        {category.subCategories.map(subCategory => (
                                            <Radio
                                                key={subCategory.id}
                                                value={`${subCategory.slug}&${subCategory.id}`}
                                                label={subCategory.name}
                                                name={'subCategory'}
                                                checked={id === subCategory.id}
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
