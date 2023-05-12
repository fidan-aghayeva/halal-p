import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { HoverCard, Popover } from '@mantine/core';
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

    const dispatch = useDispatch();
    const T = useTranslations();

    const [windowWidth] = useWindowSize();

    const [isHomePage, setIsHomePage] = useState(false);

    const currentDevice = useSelector(state => state.global.currentDevice);
    const { isVisible: isSearchVisible } = useSelector(state => state.global.headerSearchProps);

    const isDesktop = useMemo(() => {
        return currentDevice.type === DEVICE_TYPES.desktop;
    }, [currentDevice.type]);

    const onSearchClick = () => {
        dispatch(globalActions.changeHeaderSearchProps({ isVisible: !isSearchVisible }));
    };

    const onMenuClick = () => {
        dispatch(globalActions.changeMobileMenuVisibility(true));
    };

    const onMouseEnter = () => {
        if (homePage && isDesktop && window.scrollY <= 200) {
            setIsHomePage(false);
        }
    };

    const onMouseLeave = () => {
        if (homePage && isDesktop && window.scrollY <= 200) {
            setIsHomePage(true);
        }
    };

    const onScroll = () => {
        if (isDesktop) {
            setIsHomePage(window.scrollY <= 200);
        }

        if (isSearchVisible) {
            setIsHomePage(false);
        }
    };

    useEffect(() => {
        setIsHomePage(isDesktop && homePage);
    }, [homePage, isDesktop]);

    useEffect(() => {
        if (homePage) {
            window.addEventListener('scroll', onScroll);

            if (isDesktop && window.scrollY <= 200) {
                setIsHomePage(!isSearchVisible);
            }

            return () => {
                setIsHomePage(false);
                window.removeEventListener('scroll', onScroll);
            };
        }
    }, [isDesktop, isSearchVisible, homePage]);

    return (
        <header
            className={classNames(styles.header, { homePage: isHomePage })}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <>
                <Logo whiteLogo={isHomePage} />
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
                            <Link className={classNames(styles.linkItem, { homePage: isHomePage })} href={'/service'}>
                                <span>{T.menu_item_3}</span>
                            </Link>
                            <Link
                                className={classNames(styles.linkItem, { homePage: isHomePage })}
                                href={'/blog/page=1'}
                            >
                                <span>{T.menu_item_4}</span>
                            </Link>
                            <Link className={classNames(styles.linkItem, { homePage: isHomePage })} href={'/contact'}>
                                <span>{T.menu_item_5}</span>
                            </Link>
                        </nav>
                        <a
                            href={'https://shop.halal.az/'}
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
                        <Popover position='bottom' opened={isSearchVisible}>
                            <Popover.Target>
                                <SearchIcon onClick={onSearchClick} className={styles.searchIcon} />
                            </Popover.Target>
                            <Popover.Dropdown className={styles.searchDropdown}>
                                <Search />
                            </Popover.Dropdown>
                        </Popover>
                    </DeviceDetector>
                    <DeviceDetector visible={[DEVICE_TYPES.desktop]}>
                        <Language homePage={isHomePage} />
                    </DeviceDetector>
                    <DeviceDetector hidden={[DEVICE_TYPES.desktop]}>
                        <MenuIcon className={styles.mobileMenu} onClick={onMenuClick} />
                    </DeviceDetector>
                </div>
            </>
        </header>
    );
};

export default Header;
