import SCSS_VARIABLES from 'styles/variables.module.scss';

export const LANGUAGES = {
    az: 'az',
    en: 'en',
    ru: 'ru',
};

export const DEFAULT_LANGUAGE = LANGUAGES.az;

export const BREAKPOINTS = {
    xs: Number(SCSS_VARIABLES.breakpoints_xs),
    s: Number(SCSS_VARIABLES.breakpoints_s),
    sm: Number(SCSS_VARIABLES.breakpoints_sm),
    md: Number(SCSS_VARIABLES.breakpoints_md),
    lg: Number(SCSS_VARIABLES.breakpoints_lg),
    xl: Number(SCSS_VARIABLES.breakpoints_xl),
};

export const SERVICE_URL = process.env.NEXT_PUBLIC_SERVICE_URL;

export const PAGINATION_SIZE = 2;

export const PAGE_TYPES = {
    about: 'About',
    projects: 'Project',
    events: 'Event',
    blog: 'Blog',
    vacancy: 'Vacancy',
};

export const PRODUCTS_FILTER_TYPES = {
    name: 'Name',
    section: 'Section',
    category: 'Category',
};

export const EMPLOYEE_SLIDE_COUNT = {
    desktop: 8,
    tablet: 3,
    mobile: 2,
};

export const CUSTOMER_TYPES = {
    chooseUs: 'ChooseUs',
    partner: 'Partner',
};

export const CUSTOMER_SLIDE_COUNT = { desktop: 12, tablet: 9, mobile: 12 };
