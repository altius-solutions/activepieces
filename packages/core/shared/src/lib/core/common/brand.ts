const PRODUCT_NAME = 'Altius Flow'
const COMPANY_NAME = 'Altius Solutions'
const WEBSITE_URL = 'https://altiusol.com'

const BRAND_ASSET_PATHS = {
    fullLogoUrl: '/brand/altius-wordmark.svg',
    fullLogoDarkUrl: '/brand/altius-wordmark-on-dark.svg',
    emailLogoUrl: '/brand/altius-wordmark.png',
    favIconUrl: '/brand/altius-icon.svg',
    logoIconUrl: '/brand/altius-icon.svg',
} as const

function envValue(name: string): string | undefined {
    if (typeof process === 'undefined' || process.env === undefined) {
        return undefined
    }
    const value = process.env[name]
    if (typeof value !== 'string') {
        return undefined
    }
    const trimmed = value.trim()
    return trimmed.length > 0 ? trimmed : undefined
}

function envFlag({ name, fallback }: { name: string, fallback: boolean }): boolean {
    const value = envValue(name)
    if (value === undefined) {
        return fallback
    }
    return value === 'true'
}

function withPublicOrigin(url: string): string {
    if (/^https?:\/\//i.test(url)) {
        return url
    }
    const origin = envValue('AP_FRONTEND_URL')
    if (origin === undefined) {
        return url
    }
    const base = origin.replace(/\/$/, '')
    return `${base}${url.startsWith('/') ? url : `/${url}`}`
}

function linkValue({ envName, fallback }: { envName: string, fallback: string }): string {
    return envValue(envName) ?? fallback
}

export function resolvedBrand(): Brand {
    const website = linkValue({ envName: 'AP_BRAND_WEBSITE_URL', fallback: WEBSITE_URL })
    const links: BrandLinks = {
        website,
        docs: linkValue({ envName: 'AP_BRAND_DOCS_URL', fallback: website }),
        community: linkValue({ envName: 'AP_BRAND_COMMUNITY_URL', fallback: website }),
        support: linkValue({ envName: 'AP_BRAND_SUPPORT_URL', fallback: website }),
        pricing: linkValue({ envName: 'AP_BRAND_PRICING_URL', fallback: website }),
        changelog: linkValue({ envName: 'AP_BRAND_CHANGELOG_URL', fallback: website }),
        privacy: linkValue({ envName: 'AP_BRAND_PRIVACY_URL', fallback: website }),
        terms: linkValue({ envName: 'AP_BRAND_TERMS_URL', fallback: website }),
        sales: linkValue({ envName: 'AP_BRAND_SALES_URL', fallback: website }),
        feedback: linkValue({ envName: 'AP_BRAND_FEEDBACK_URL', fallback: website }),
    }
    return {
        productName: envValue('AP_BRAND_PRODUCT_NAME') ?? PRODUCT_NAME,
        companyName: envValue('AP_BRAND_COMPANY_NAME') ?? COMPANY_NAME,
        colors: {
            primary: envValue('AP_BRAND_PRIMARY_COLOR') ?? '#4F46E5',
            primaryHover: envValue('AP_BRAND_PRIMARY_HOVER') ?? '#4338CA',
            accent: '#6366F1',
            navy: '#1E1B4B',
            navyMid: '#312E81',
            tint: '#EEF2FF',
            nearBlack: '#020617',
        },
        logos: {
            fullLogoUrl: withPublicOrigin(envValue('AP_BRAND_FULL_LOGO_URL') ?? BRAND_ASSET_PATHS.fullLogoUrl),
            fullLogoDarkUrl: withPublicOrigin(envValue('AP_BRAND_FULL_LOGO_DARK_URL') ?? BRAND_ASSET_PATHS.fullLogoDarkUrl),
            emailLogoUrl: withPublicOrigin(envValue('AP_BRAND_EMAIL_LOGO_URL') ?? BRAND_ASSET_PATHS.emailLogoUrl),
            favIconUrl: withPublicOrigin(envValue('AP_BRAND_FAVICON_URL') ?? BRAND_ASSET_PATHS.favIconUrl),
            logoIconUrl: withPublicOrigin(envValue('AP_BRAND_LOGO_ICON_URL') ?? BRAND_ASSET_PATHS.logoIconUrl),
        },
        links,
        showPoweredBy: envFlag({ name: 'AP_BRAND_SHOW_POWERED_BY', fallback: false }),
        showEnterpriseUpsells: envFlag({ name: 'AP_BRAND_SHOW_ENTERPRISE_UPSELLS', fallback: false }),
        forwardNewsletterToUpstream: envFlag({ name: 'AP_BRAND_FORWARD_NEWSLETTER', fallback: false }),
    }
}

export function brandDocsUrl(path?: string): string {
    const base = resolvedBrand().links.docs.replace(/\/$/, '')
    if (path === undefined || path.length === 0 || !base.endsWith('/docs')) {
        return base
    }
    return `${base}/${path.replace(/^\//, '')}`
}

export const brand = {
    productName: PRODUCT_NAME,
    companyName: COMPANY_NAME,
    colors: {
        primary: '#4F46E5',
        primaryHover: '#4338CA',
        accent: '#6366F1',
        navy: '#1E1B4B',
        navyMid: '#312E81',
        tint: '#EEF2FF',
        nearBlack: '#020617',
    },
    logos: BRAND_ASSET_PATHS,
    links: {
        website: WEBSITE_URL,
        docs: WEBSITE_URL,
        community: WEBSITE_URL,
        support: WEBSITE_URL,
        pricing: WEBSITE_URL,
        changelog: WEBSITE_URL,
        privacy: WEBSITE_URL,
        terms: WEBSITE_URL,
        sales: WEBSITE_URL,
        feedback: WEBSITE_URL,
    },
    showPoweredBy: false,
    showEnterpriseUpsells: false,
    forwardNewsletterToUpstream: false,
} as const

export const DEFAULT_BRAND_LOGOS = {
    fullLogoUrl: BRAND_ASSET_PATHS.fullLogoUrl,
    favIconUrl: BRAND_ASSET_PATHS.favIconUrl,
    logoIconUrl: BRAND_ASSET_PATHS.logoIconUrl,
} as const

export type BrandLinks = {
    website: string
    docs: string
    community: string
    support: string
    pricing: string
    changelog: string
    privacy: string
    terms: string
    sales: string
    feedback: string
}

export type BrandLogos = {
    fullLogoUrl: string
    fullLogoDarkUrl: string
    emailLogoUrl: string
    favIconUrl: string
    logoIconUrl: string
}

export type Brand = {
    productName: string
    companyName: string
    colors: {
        primary: string
        primaryHover: string
        accent: string
        navy: string
        navyMid: string
        tint: string
        nearBlack: string
    }
    logos: BrandLogos
    links: BrandLinks
    showPoweredBy: boolean
    showEnterpriseUpsells: boolean
    forwardNewsletterToUpstream: boolean
}
