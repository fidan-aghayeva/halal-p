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
    project: 'Project',
    event: 'Event',
};
