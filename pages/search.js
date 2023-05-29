import ProductSearch from 'components/ProductSearch';
import AppLayout from 'components/layouts/AppLayout';

const ProductSearchPage = () => {
    return <ProductSearch />;
};

ProductSearchPage.getLayout = page => {
    return <AppLayout>{page}</AppLayout>;
};

export default ProductSearchPage;
