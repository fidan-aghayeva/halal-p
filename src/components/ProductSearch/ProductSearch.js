import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Loader } from '@mantine/core';
import Pagination from '@shared/Pagination';
import ProductCard from 'components/Products/ProductCard';
import { globalActions } from 'redux/slices/global';
import { getProducts } from 'utils/service';
import { PAGINATION_SIZES, PRODUCTS_FILTER_TYPES } from 'utils/constants';
import useTranslations from 'hooks/use-translations';

import styles from './ProductSearch.module.scss';

const ProductSearch = () => {
    const T = useTranslations();
    const dispatch = useDispatch();
    const {
        locale,
        query: { name, page },
    } = useRouter();

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
        const params = {
            lang: locale,
            type: PRODUCTS_FILTER_TYPES.name,
            page,
            filterData: name,
            pageSize: PAGINATION_SIZES.products,
        };

        getProductsData(params);
    }, [locale, page, name, sections]);

    return (
        <div className={styles.container}>
            <div className={styles.searchTitle}>
                «{name}» {T.found_on_search}
                <span className={styles.productsCount}>
                    {products.length} {T.product}
                </span>
            </div>
            {isFetching ? (
                <Loader className={styles.loader} variant={'bars'} color={'#1ca29b'} />
            ) : (
                <>
                    <div className={styles.productsContainer}>
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    <Pagination />
                </>
            )}
        </div>
    );
};

export default ProductSearch;
