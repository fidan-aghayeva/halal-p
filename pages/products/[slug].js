import ProductDetail from 'components/ProductDetail';
import AppLayout from 'components/layouts/AppLayout';

const ProductPage = () => {
    return <ProductDetail />;
};

ProductPage.getLayout = page => {
    return <AppLayout>{page}</AppLayout>;
};

export default ProductPage;
