import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@shared/Pagination';
import Filter from './Filter';
import ProductCard from './ProductCard';
import { globalActions } from 'redux/slices/global';
import { getProducts } from 'utils/service';
import { PAGINATION_SIZE, PRODUCTS_FILTER_TYPES } from 'utils/constants';
import useTranslations from 'hooks/use-translations';

import styles from './Products.module.scss';
import { Loader } from '@mantine/core';

const Products = () => {
    const T = useTranslations();
    const dispatch = useDispatch();

    const {
        locale,
        query: { page, category },
    } = useRouter();

    const [slug, id] = category;

    const { pagination: paginationProps, sections } = useSelector(state => state.global);
    const { isFetching } = paginationProps;

    const [products, setProducts] = useState([]);

    const getProductsData = async params => {
        dispatch(
            globalActions.setPagination({
                isFetching: true,
            })
        );

        const data = await getProducts(params);

        if (!data) {
            dispatch(
                globalActions.setPagination({
                    isFetching: false,
                })
            );
        }

        setProducts(data.products);

        dispatch(
            globalActions.setPagination({
                totalPage: data.totalPage,
                isFetching: false,
            })
        );
    };

    useEffect(() => {
        const type = sections.find(section => section.id === Number(id))
            ? PRODUCTS_FILTER_TYPES.section
            : PRODUCTS_FILTER_TYPES.category;

        const params = {
            lang: locale,
            type,
            page,
            filterData: id,
            pageSize: PAGINATION_SIZE,
        };

        getProductsData(params);
    }, [locale, page, id, sections]);

    return (
        <div className={styles.container}>
            <h1 className={'title'}>{T.products}</h1>
            <div className={styles.content}>
                <div className={styles.filter}>
                    <Filter slug={slug} />
                </div>
                <div className={styles.productsContainer}>
                    {isFetching ? (
                        <Loader className={styles.loader} variant={'bars'} color={'#1ca29b'} />
                    ) : (
                        <>
                            <div className={styles.products}>
                                {products.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                            <Pagination />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Products;
