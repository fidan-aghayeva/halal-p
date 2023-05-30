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

    const sanitizer = dompurify.sanitize;

    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <Image src={SERVICE_URL + blog.mainImage} alt={blog.title} fill />
            </div>
            <div className={styles.content}>
                <div>
                    <h4 className={styles.title}>{blog.title}</h4>
                    <div className={styles.text} dangerouslySetInnerHTML={{ __html: sanitizer(blog.content) }} />
                </div>
                <div className={styles.actions}>
                    <Link href={`/blog/${blog.slug}-${blog.id}`} className={styles.read}>
                        {T.read}
                    </Link>
                    <Link href={'/blog?page=1'} className={styles.showAll}>
                        {T.show_all}
                        <ArrowRightLongIcon />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
