import { useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import dompurify from 'isomorphic-dompurify';
import { ArrowRightLongIcon } from 'assets/icons';
import { SERVICE_URL } from 'utils/constants';
import useTranslations from 'hooks/use-translations';

import styles from './BlogCard.module.scss';

const BlogCard = props => {
    const { blog } = props;

    const T = useTranslations();
    const { language } = useSelector(state => state.global);

    const sanitizer = dompurify.sanitize;

    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                {blog.mainImage && (
                    <Image
                        src={SERVICE_URL + blog.mainImage}
                        alt={blog.title}
                        fill
                        sizes='(max-width: 768px) 100vw,  50vw'
                    />
                )}
            </div>
            <div className={styles.content}>
                <div>
                    <h3 className={styles.title}>{blog.title}</h3>
                    <div className={styles.text} dangerouslySetInnerHTML={{ __html: sanitizer(blog.content) }} />
                </div>
                <div className={styles.actions}>
                    <Link href={`/blog/${blog.slug}-${blog.id}`} className={styles.read} locale={language}>
                        {T.read}
                    </Link>
                    <Link href={'/blog?page=1'} className={styles.showAll} locale={language}>
                        {T.show_all}
                        <ArrowRightLongIcon />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
