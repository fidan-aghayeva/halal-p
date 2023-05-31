import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Drawer } from '@mantine/core';
import DeviceDetector from '@shared/DeviceDetector';
import Search from '../Header/Search';
import { ArrowDownIcon, CloseIcon, FacebookIcon, InstagramIcon, LinkedinIcon } from 'assets/icons';
import { DEVICE_TYPES } from 'utils/device-detection';
import { globalActions } from 'redux/slices/global';
import useTranslations from 'hooks/use-translations';

import styles from './MobileMenu.module.scss';

const MobileMenu = () => {
    const dispatch = useDispatch();
    const T = useTranslations();

    const [showSubMenu, setShowSubMenu] = useState({ about: false, products: false });

    const {
        mobileMenuVisibility: isVisible,
        sections,
        siteData,
        contact,
        language,
    } = useSelector(state => state.global);

    const onClose = () => {
        dispatch(globalActions.changeMobileMenuVisibility(false));
        setShowSubMenu({ about: false, products: false });
    };

    const onSubMenuClick = (e, key) => {
        e.preventDefault();
        setShowSubMenu({ ...showSubMenu, [key]: !showSubMenu[key] });
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
                <div className={styles.drawerHeader}>
                    <DeviceDetector visible={[DEVICE_TYPES.mobile]}>
                        <Search />
                    </DeviceDetector>
                    <CloseIcon onClick={onClose} className={styles.closeIcon} />
                </div>
                <nav className={styles.menu}>
                    <span className={styles.linkItem}>
                        {T.menu_item_1}
                        <ArrowDownIcon onClick={e => onSubMenuClick(e, 'about')} />
                    </span>
                    {showSubMenu.about && (
                        <>
                            <Link href={'/about'} className={styles.subLinkItem} onClick={onClose} locale={language}>
                                {T.sub_menu_item_1}
                            </Link>
                            <Link
                                href={'/projects?page=1'}
                                className={styles.subLinkItem}
                                onClick={onClose}
                                locale={language}
                            >
                                {T.sub_menu_item_2}
                            </Link>
                            <Link
                                href={'/events?page=1'}
                                className={styles.subLinkItem}
                                onClick={onClose}
                                locale={language}
                            >
                                {T.sub_menu_item_3}
                            </Link>
                            <Link
                                href={'/vacancies'}
                                className={styles.subLinkItem}
                                onClick={onClose}
                                locale={language}
                            >
                                {T.sub_menu_item_4}
                            </Link>
                        </>
                    )}
                    <span className={styles.linkItem}>
                        {T.menu_item_2}
                        <ArrowDownIcon onClick={e => onSubMenuClick(e, 'products')} />
                    </span>
                    {showSubMenu.products &&
                        sections.map(section => (
                            <Link
                                key={section.id}
                                href={`/products/${section.slug}/${section.id}?page=1`}
                                className={styles.subLinkItem}
                                onClick={onClose}
                                locale={language}
                            >
                                {section.name}
                            </Link>
                        ))}
                    <Link className={styles.linkItem} href={'/service'} locale={language}>
                        <span>{T.menu_item_3}</span>
                    </Link>
                    <Link className={styles.linkItem} href={'/blog?page=1'} locale={language}>
                        <span>{T.menu_item_4}</span>
                    </Link>
                    <Link className={styles.linkItem} href={'/contact'} locale={language}>
                        <span>{T.menu_item_5}</span>
                    </Link>
                </nav>
                <a href={siteData?.shopUrl} target={'blank'} className={styles.eShopping}>
                    {T.go_to_eShop}
                </a>
            </div>
            <div className={styles.socialMediaLinks}>
                <a className={styles.icon} href={contact?.Facebook} target={'blank'}>
                    <FacebookIcon />
                </a>
                <a className={styles.icon} href={contact?.Instagram} target={'blank'}>
                    <InstagramIcon />
                </a>
                <a className={styles.icon} href={contact?.Linkedin} target={'blank'}>
                    <LinkedinIcon />
                </a>
            </div>
        </Drawer>
    );
};

export default MobileMenu;
