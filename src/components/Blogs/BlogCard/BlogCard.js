import { useSelector } from 'react-redux';
import dompurify from 'isomorphic-dompurify';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightLongIcon } from 'assets/icons';
import { SERVICE_URL } from 'utils/constants';
import { getDate } from 'utils/helpers';
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
                {blog.mainImage && <Image src={SERVICE_URL + blog.mainImage} alt={blog.title} fill sizes='100vw' />}
            </div>
            <div className={'flex flex-row align-center'}>
                <span className={styles.date}>{getDate(blog.publishedDate)}</span>
                <Link
                    scroll={false}
                    className={styles.tag}
                    href={`/blog/tag/${blog.section.slug}/${blog.section.id}?page=1`}
                    locale={language}
                >
                    {blog.section.name}
                </Link>
            </div>
            <h3 className={styles.title}>{blog.title}</h3>
            <div className={styles.content} dangerouslySetInnerHTML={{ __html: sanitizer(blog.content) }} />
            <Link href={`/blog/${blog.slug}-${blog.id}`} className={styles.readMore} locale={language}>
                {T.read_more} <ArrowRightLongIcon />
            </Link>
        </div>
    );
};

export default BlogCard;
