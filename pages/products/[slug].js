import ProductDetail from 'components/ProductDetail';
import AppLayout from 'components/layouts/AppLayout';
import { SERVICE_URL } from 'utils/constants';

const ProductPage = props => {
    return <ProductDetail product={props.product} />;
};

export const getServerSideProps = async context => {
    const {
        params: { slug },
        locale,
    } = context;

    const id = slug.split('-').at(-1);

    const res = await fetch(`${SERVICE_URL}/${locale}/products/${id}`);
    const product = await res.json();

    if (product.Success === false) {
        return { props: { product: {} } };
    }

    return { props: { product } };
};

ProductPage.getLayout = page => {
    return <AppLayout>{page}</AppLayout>;
};

export default ProductPage;
