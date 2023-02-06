import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
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

const Header = () => {
    const dispatch = useDispatch();

    const [windowWidth] = useWindowSize();

    const { isVisible: isSearchVisible } = useSelector(state => state.global.headerSearchProps);

    const onSearchClick = () => {
        dispatch(globalActions.changeHeaderSearchProps({ isVisible: true }));
    };

    const onMenuClick = () => {
        dispatch(globalActions.changeMobileMenuVisibility(true));
    };

    return (
        <header className={styles.header}>
            {isSearchVisible && windowWidth >= 768 ? (
                <Search />
            ) : (
                <>
                    <Logo />
                    <div className={styles.content}>
                        <DeviceDetector visible={[DEVICE_TYPES.desktop]}>
                            <nav>
                                <Link className={styles.linkItem} href={'/about'}>
                                    <span>Haqqımızda</span>
                                </Link>
                                <HoverCard width={windowWidth}>
                                    <HoverCard.Target>
                                        <Link className={styles.linkItem} href={'/products'}>
                                            <span>Məhsullar</span>
                                        </Link>
                                    </HoverCard.Target>
                                    <HoverCard.Dropdown className={styles.productsDropdown}>
                                        <ProductsSubMenu />
                                    </HoverCard.Dropdown>
                                </HoverCard>
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
                        </DeviceDetector>
                        <DeviceDetector hidden={[DEVICE_TYPES.desktop]}>
                            <Language />
                        </DeviceDetector>
                        <DeviceDetector hidden={[DEVICE_TYPES.mobile]}>
                            <SearchIcon onClick={onSearchClick} className={styles.searchIcon} />
                        </DeviceDetector>
                        <DeviceDetector visible={[DEVICE_TYPES.desktop]}>
                            <Language />
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
