import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Drawer } from '@mantine/core';
import DeviceDetector from '@shared/DeviceDetector';
import Search from '../Header/Search';
import { ArrowDownIcon, CloseIcon, FacebookIcon, InstagramIcon, LinkedinIcon, SearchIcon } from 'assets/icons';
import { DEVICE_TYPES } from 'utils/device-detection';
import { globalActions } from 'redux/slices/global';
import productCategories from '../Header/ProductsSubMenu/mock';

import styles from './MobileMenu.module.scss';

const MobileMenu = () => {
    const dispatch = useDispatch();

    const [showSubMenu, setShowSubMenu] = useState(false);

    const { isVisible: isSearchVisible } = useSelector(state => state.global.headerSearchProps);
    const { mobileMenuVisibility: isVisible } = useSelector(state => state.global);

    const onClose = () => {
        dispatch(globalActions.changeMobileMenuVisibility(false));
        dispatch(globalActions.changeHeaderSearchProps({ isVisible: false }));
        setShowSubMenu(false);
    };

    const onSearchClick = () => {
        dispatch(globalActions.changeHeaderSearchProps({ isVisible: true }));
    };

    const onSubMenuClick = e => {
        e.preventDefault();
        setShowSubMenu(!showSubMenu);
    };

    return (
        <Drawer
            opened={isVisible}
            onClose={onClose}
            className={styles.container}
            withCloseButton={false}
            overlayOpacity={0.5}
        >
            <div className={styles.content}>
                {isSearchVisible ? (
                    <Search />
                ) : (
                    <div className={styles.drawerHeader}>
                        <DeviceDetector visible={[DEVICE_TYPES.mobile]}>
                            <SearchIcon onClick={onSearchClick} />
                        </DeviceDetector>
                        <CloseIcon onClick={onClose} className={styles.closeIcon} />
                    </div>
                )}
                <nav className={styles.menu}>
                    <Link className={styles.linkItem} href={'/about'}>
                        <span>Haqqımızda</span>
                    </Link>
                    <Link className={styles.linkItem} href={'/products'}>
                        <span>Məhsullar</span>
                        <ArrowDownIcon onClick={e => onSubMenuClick(e)} />
                    </Link>
                    {showSubMenu &&
                        productCategories.map(category => (
                            <Link key={category.id} href={'/'} className={styles.subLinkItem}>
                                {category.name}
                            </Link>
                        ))}
                    <Link className={styles.linkItem} href={'/service'}>
                        <span>Servis</span>
                    </Link>
                    <Link className={styles.linkItem} href={'/blog'}>
                        <span>Bloq</span>
                    </Link>
                    <Link className={styles.linkItem} href={'/contact'}>
                        <span>Əlaqə</span>
                    </Link>
                </nav>
                <a href={'https://shop.halal.az/'} target={'_blank'} className={styles.eShopping}>
                    E-alışa keç
                </a>
            </div>
            <div className={styles.socialMediaLinks}>
                <a className={styles.icon} href={''} target={'_blank'}>
                    <FacebookIcon />
                </a>
                <a className={styles.icon} href={''} target={'_blank'}>
                    <InstagramIcon />
                </a>
                <a className={styles.icon} href={''} target={'_blank'}>
                    <LinkedinIcon />
                </a>
            </div>
        </Drawer>
    );
};

export default MobileMenu;
