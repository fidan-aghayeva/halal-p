import AppLayout from 'components/layouts/AppLayout';
import Products from 'components/Products';

const ProductsPage = () => {
    return <Products />;
};

ProductsPage.getLayout = page => {
    return <AppLayout>{page}</AppLayout>;
};

export default ProductsPage;
