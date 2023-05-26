import { useRef } from 'react';
import ReactImageGallery from 'react-image-gallery';
import { ArrowLeftIcon, ArrowRightIcon } from 'assets/icons';
import { SERVICE_URL } from 'utils/constants';

import styles from './ImageGallery.module.scss';

const ImageGallery = props => {
    const { images, showFullscreenButton = true, showThumbnails = true } = props;

    const ref = useRef();

    const reFormattedImages = images.map(image => ({
        original: SERVICE_URL + image.path,
        thumbnail: SERVICE_URL + image.path,
    }));

    return (
        <ReactImageGallery
            showPlayButton={false}
            autoPlay={false}
            items={reFormattedImages}
            additionalClass={styles.imageGallery}
            onClick={() => ref.current.toggleFullScreen()}
            ref={ref}
            infinite={false}
            showFullscreenButton={showFullscreenButton}
            showThumbnails={showThumbnails}
            renderLeftNav={(onClick, disabled) => (
                <button onClick={onClick} disabled={disabled} className={'galleryNav leftNav'}>
                    <ArrowLeftIcon />
                </button>
            )}
            renderRightNav={(onClick, disabled) => (
                <button onClick={onClick} disabled={disabled} className={'galleryNav rightNav'}>
                    <ArrowRightIcon />
                </button>
            )}
        />
    );
};

export default ImageGallery;
