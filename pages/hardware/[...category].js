import AppLayout from 'components/layouts/AppLayout';
import Products from 'components/Products';
import { SERVICE_URL } from 'utils/constants';

const ProductsPage = props => {
    const { serverData } = props;

    return <Products serverData={serverData} />;
};

export const getServerSideProps = async context => {
    const {
        params: { category },
        locale,
    } = context;

    const id = category.at(-1);

    const res = await fetch(`${SERVICE_URL}/${locale}/categories/${id}/seo?isOld=true`);
    const serverData = await res.json();

    if (serverData.Success === false) {
        return { props: { serverData: {} } };
    }

    return { props: { serverData } };
};

ProductsPage.getLayout = page => {
    return <AppLayout>{page}</AppLayout>;
};

export default ProductsPage;
