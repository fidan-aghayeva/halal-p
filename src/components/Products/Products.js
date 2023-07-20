import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import { Loader } from '@mantine/core';
import Pagination from '@shared/Pagination';
import Filter from './Filter';
import ProductCard from './ProductCard';
import { globalActions } from 'redux/slices/global';
import { getProducts } from 'utils/service';
import { PAGINATION_SIZES } from 'utils/constants';
import useTranslations from 'hooks/use-translations';

import styles from './Products.module.scss';

const Products = props => {
    const { serverData } = props;

    const T = useTranslations();
    const dispatch = useDispatch();

    const {
        locale,
        query: { page = 1, category },
        pathname,
    } = useRouter();

    const id = category.at(-1);

    const { pagination: paginationProps } = useSelector(state => state.global);
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
            type: serverData?.type,
            page,
            filterData: id,
            isOld: pathname.includes('hardware'),
            pageSize: PAGINATION_SIZES.products,
        };

        getProductsData(params);
    }, [locale, page, id]);

    return (
        <>
            <Head>
                <title>{serverData?.seo?.title}</title>
                <meta name='description' content={serverData?.seo?.description} />
                <meta name='keywords' content={serverData?.seo?.keyword} />
            </Head>
            <div className={styles.container}>
                <h1 className={'title'}>{T.products}</h1>
                <div className={styles.content}>
                    <div className={styles.filter}>
                        <Filter type={serverData?.type} />
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
        </>
    );
};

export default Products;
