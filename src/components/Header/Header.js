import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { HoverCard } from '@mantine/core';
import DeviceDetector from '@shared/DeviceDetector';
import Logo from 'components/Logo';
import Language from './Language';
import Search from './Search';
import ProductsSubMenu from './ProductsSubMenu';
import { MenuIcon, SearchIcon } from 'assets/icons';
import { DEVICE_TYPES } from 'utils/device-detection';
import { globalActions } from 'redux/slices/global';
import useWindowSize from 'hooks/use-window-size';

import styles from './Header.module.scss';

const Header = props => {
    const { homePage } = props;

    const dispatch = useDispatch();

    const [windowWidth] = useWindowSize();

    const [isHomePage, setIsHomePage] = useState(false);

    const currentDevice = useSelector(state => state.global.currentDevice);
    const { isVisible: isSearchVisible } = useSelector(state => state.global.headerSearchProps);

    const isDesktop = useMemo(() => {
        return currentDevice.type === DEVICE_TYPES.desktop;
    }, [currentDevice.type]);

    const onSearchClick = () => {
        dispatch(globalActions.changeHeaderSearchProps({ isVisible: true }));
    };

    const onMenuClick = () => {
        dispatch(globalActions.changeMobileMenuVisibility(true));
    };

    const onMenuItemHover = () => {
        if (window.scrollY <= 200) {
            setIsHomePage(!isHomePage);
        }
    };

    const onScroll = () => {
        if (isDesktop) {
            if (isSearchVisible) {
                setIsHomePage(false);
            } else {
                if (window.scrollY > 200) {
                    setIsHomePage(false);
                } else {
                    setIsHomePage(true);
                }
            }
        }
    };

    useEffect(() => {
        if (!isSearchVisible && isDesktop && homePage) {
            setIsHomePage(true);
        } else {
            setIsHomePage(false);
        }
    }, [homePage, isDesktop, isSearchVisible]);

    useEffect(() => {
        window.addEventListener('scroll', onScroll);

        return () => {
            setIsHomePage(false);
            window.removeEventListener('scroll', onScroll);
        };
    }, [isDesktop, isSearchVisible]);

    return (
        <header className={classNames(styles.header, { homePage: isHomePage })}>
            {isSearchVisible && windowWidth >= 768 ? (
                <Search />
            ) : (
                <>
                    <Logo whiteLogo={isHomePage} />
                    <div className={styles.content}>
                        <DeviceDetector visible={[DEVICE_TYPES.desktop]}>
                            <nav>
                                <span className={classNames(styles.linkItem, { homePage: isHomePage })}>
                                    Haqqımızda
                                </span>
                                <HoverCard
                                    width={windowWidth}
                                    onOpen={onMenuItemHover}
                                    onClose={onMenuItemHover}
                                    transition={'scale-y'}
                                    transitionDuration={300}
                                >
                                    <HoverCard.Target>
                                        <span className={classNames(styles.linkItem, { homePage: isHomePage })}>
                                            Məhsullar
                                        </span>
                                    </HoverCard.Target>
                                    <HoverCard.Dropdown className={styles.productsDropdown}>
                                        <ProductsSubMenu />
                                    </HoverCard.Dropdown>
                                </HoverCard>
                                <Link
                                    className={classNames(styles.linkItem, { homePage: isHomePage })}
                                    href={'/service'}
                                >
                                    <span>Servis</span>
                                </Link>
                                <Link className={classNames(styles.linkItem, { homePage: isHomePage })} href={'/blog'}>
                                    <span>Bloq</span>
                                </Link>
                                <Link
                                    className={classNames(styles.linkItem, { homePage: isHomePage })}
                                    href={'/contact'}
                                >
                                    <span>Əlaqə</span>
                                </Link>
                            </nav>
                            <a
                                href={'https://shop.halal.az/'}
                                target={'_blank'}
                                className={classNames(styles.eShopping, { homePage: isHomePage })}
                            >
                                E-alışa keç
                            </a>
                        </DeviceDetector>
                        <DeviceDetector hidden={[DEVICE_TYPES.desktop]}>
                            <Language />
                        </DeviceDetector>
                        <DeviceDetector hidden={[DEVICE_TYPES.mobile]}>
                            <SearchIcon onClick={onSearchClick} className={styles.searchIcon} />
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
