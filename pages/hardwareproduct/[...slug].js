import { useRouter } from 'next/router';
import AppLayout from 'components/layouts/AppLayout';
import ProductDetail from 'components/ProductDetail';
import { SERVICE_URL } from 'utils/constants';

const ProductPage = props => {
    const { product } = props;

    const router = useRouter();

    if (!product) {
        router.push('/404');
    }

    return product ? <ProductDetail product={props.product} /> : <div />;
};

export const getServerSideProps = async context => {
    const {
        params: { slug },
        locale,
    } = context;

    const [, id] = slug;

    const res = await fetch(`${SERVICE_URL}/${locale}/products/${id}?isOld=true`);
    const product = await res.json();

    if (product.Success === false) {
        return { props: { product: null } };
    }

    return { props: { product } };
};

ProductPage.getLayout = page => {
    return <AppLayout>{page}</AppLayout>;
};

export default ProductPage;
