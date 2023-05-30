import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { Carousel } from '@mantine/carousel';
import DeviceDetector from '@shared/DeviceDetector';
import BlogCard from './BlogCard';
import { ArrowLeftIcon, ArrowRightIcon } from 'assets/icons';
import { DEVICE_TYPES } from 'utils/device-detection';
import { getHomeBlogsByType } from 'utils/service';
import { PAGE_TYPES } from 'utils/constants';

import styles from './BlogCarousel.module.scss';

const BlogCarousel = () => {
    const router = useRouter();
    const { locale } = router;

    const { currentDevice } = useSelector(state => state.global);

    const [blogs, setBlogs] = useState([]);

    const getBlogData = async lang => {
        const data = await getHomeBlogsByType({ lang, type: PAGE_TYPES.blog });

        setBlogs(data);
    };

    useEffect(() => {
        getBlogData(locale);
    }, [locale]);

    return (
        <div className={classNames('flex justify-center flex-column', styles.container)}>
            <DeviceDetector hidden={[DEVICE_TYPES.mobile]}>
                <Carousel
                    withIndicators={true}
                    align={'start'}
                    slideSize={'100%'}
                    nextControlIcon={<ArrowRightIcon />}
                    previousControlIcon={<ArrowLeftIcon />}
                    className={styles.carousel}
                    withControls={currentDevice.type === DEVICE_TYPES.desktop}
                >
                    {blogs.map(blog => (
                        <Carousel.Slide className={styles.slide} key={blog.id}>
                            <BlogCard blog={blog} />
                        </Carousel.Slide>
                    ))}
                </Carousel>
            </DeviceDetector>
            <DeviceDetector visible={[DEVICE_TYPES.mobile]}>
                {blogs.slice(0, 2).map(blog => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </DeviceDetector>
        </div>
    );
};

export default BlogCarousel;
