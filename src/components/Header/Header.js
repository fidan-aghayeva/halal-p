import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import classNames from 'classnames';
import { HoverCard } from '@mantine/core';
import DeviceDetector from '@shared/DeviceDetector';
import AboutSubMenu from './AboutSubMenu';
import Logo from 'components/Logo';
import Language from './Language';
import Search from './Search';
import ProductsSubMenu from './ProductsSubMenu';
import { MenuIcon, SearchIcon } from 'assets/icons';
import { DEVICE_TYPES } from 'utils/device-detection';
import { globalActions } from 'redux/slices/global';
import useTranslations from 'hooks/use-translations';
import useWindowSize from 'hooks/use-window-size';

import styles from './Header.module.scss';

const Header = props => {
    const { homePage } = props;

    const { pathname } = useRouter();
    const dispatch = useDispatch();
    const T = useTranslations();

    const [windowWidth] = useWindowSize();

    const [isHomePage, setIsHomePage] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);

    const { currentDevice, siteData } = useSelector(state => state.global);

    const isDesktop = useMemo(() => {
        return currentDevice.type === DEVICE_TYPES.desktop;
    }, [currentDevice.type]);

    const onSearchClick = () => {
        setShowSearchBar(prevState => !prevState);
    };

    const onMenuClick = () => {
        dispatch(globalActions.changeMobileMenuVisibility(true));
    };

    const onMouseEnter = () => {
        if (homePage && isDesktop && window.scrollY <= 200 && !showSearchBar) {
            setIsHomePage(false);
        }
    };

    const onMouseLeave = () => {
        if (homePage && isDesktop && window.scrollY <= 200 && !showSearchBar) {
            setIsHomePage(true);
        }
    };

    const onScroll = () => {
        if (isDesktop) {
            if (showSearchBar) {
                setIsHomePage(false);
            } else {
                setIsHomePage(window.scrollY <= 200);
            }
        }
    };

    useEffect(() => {
        if (homePage) {
            window.addEventListener('scroll', onScroll);

            if (isDesktop && window.scrollY <= 200 && !showSearchBar) {
                setIsHomePage(true);
            }

            return () => {
                setIsHomePage(false);
                window.removeEventListener('scroll', onScroll);
            };
        }
    }, [isDesktop, homePage, showSearchBar]);

    useEffect(() => {
        setShowSearchBar(false);
    }, [pathname]);

    return (
        <header
            className={classNames(styles.header, { homePage: isHomePage })}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {pathname === '/search' ? (
                <Search />
            ) : (
                <>
                    {siteData && <Logo path={isHomePage ? siteData.logoDark.path : siteData.logoLight.path} />}
                    <div className={styles.content}>
                        <DeviceDetector visible={[DEVICE_TYPES.desktop]}>
                            <nav>
                                <HoverCard width={windowWidth} transition={'scale-y'} transitionDuration={300}>
                                    <HoverCard.Target>
                                        <span className={classNames(styles.linkItem, { homePage: isHomePage })}>
                                            {T.menu_item_1}
                                        </span>
                                    </HoverCard.Target>
                                    <HoverCard.Dropdown className={styles.menuDropdown}>
                                        <AboutSubMenu />
                                    </HoverCard.Dropdown>
                                </HoverCard>
                                <HoverCard width={windowWidth} transition={'scale-y'} transitionDuration={300}>
                                    <HoverCard.Target>
                                        <span className={classNames(styles.linkItem, { homePage: isHomePage })}>
                                            {T.menu_item_2}
                                        </span>
                                    </HoverCard.Target>
                                    <HoverCard.Dropdown className={styles.menuDropdown}>
                                        <ProductsSubMenu />
                                    </HoverCard.Dropdown>
                                </HoverCard>
                                <Link
                                    className={classNames(styles.linkItem, { homePage: isHomePage })}
                                    href={'/service'}
                                >
                                    <span>{T.menu_item_3}</span>
                                </Link>
                                <Link
                                    className={classNames(styles.linkItem, { homePage: isHomePage })}
                                    href={'/blog?page=1'}
                                >
                                    <span>{T.menu_item_4}</span>
                                </Link>
                                <Link
                                    className={classNames(styles.linkItem, { homePage: isHomePage })}
                                    href={'/contact'}
                                >
                                    <span>{T.menu_item_5}</span>
                                </Link>
                            </nav>
                            <a
                                href={siteData?.shopUrl}
                                target={'blank'}
                                className={classNames(styles.eShopping, { homePage: isHomePage })}
                            >
                                {T.go_to_eShop}
                            </a>
                        </DeviceDetector>
                        <DeviceDetector hidden={[DEVICE_TYPES.desktop]}>
                            <Language />
                        </DeviceDetector>
                        <DeviceDetector hidden={[DEVICE_TYPES.mobile]}>
                            <SearchIcon onClick={onSearchClick} className={styles.searchIcon} />
                            {showSearchBar && (
                                <div className={styles.searchContainer}>
                                    <Search />
                                </div>
                            )}
                        </DeviceDetector>
                        <DeviceDetector visible={[DEVICE_TYPES.desktop]}>
                            <Language homePage={isHomePage} />
                        </DeviceDetector>
                        <DeviceDetector hidden={[DEVICE_TYPES.desktop]}>
                            <MenuIcon className={styles.mobileMenu} onClick={onMenuClick} />
                        </DeviceDetector>
                    </div>
                </>
            )}
        </header>
    );
};

export default Header;
