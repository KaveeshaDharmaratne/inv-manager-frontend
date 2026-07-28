const valueOrFallback = (
  value: string | undefined,
  fallback: string,
): string => value?.trim() || fallback

export const appMode =
  import.meta.env.VITE_APP_MODE?.trim().toLowerCase() === 'demo'
    ? 'demo'
    : 'production'

export const isDemoMode = appMode === 'demo'

export const appName = valueOrFallback(
  import.meta.env.VITE_APP_NAME,
  isDemoMode ? 'Inventory Manager Demo' : 'Inventory Manager',
)

export const appSubtitle = valueOrFallback(
  import.meta.env.VITE_APP_SUBTITLE,
  'Inventory Management System',
)

export const businessProfile = {
  name: valueOrFallback(
    import.meta.env.VITE_BUSINESS_NAME,
    isDemoMode ? 'Demo Distribution (Pvt) Ltd' : '',
  ),

  address: valueOrFallback(
    import.meta.env.VITE_BUSINESS_ADDRESS,
    isDemoMode ? '123 Lake Street, Colombo' : '',
  ),

  phone: valueOrFallback(
    import.meta.env.VITE_BUSINESS_PHONE,
    isDemoMode ? '+94 11 234 1234' : '',
  ),

  email: valueOrFallback(
    import.meta.env.VITE_BUSINESS_EMAIL,
    isDemoMode ? 'demo@biz.com' : '',
  ),

  authorizedForName: valueOrFallback(
    import.meta.env.VITE_AUTHORIZED_FOR_NAME,
    isDemoMode ? 'Demo Manufacturing Group' : '',
  ),

  authorizedForAddress: valueOrFallback(
    import.meta.env.VITE_AUTHORIZED_FOR_ADDRESS,
    isDemoMode ? 'Colombo, Sri Lanka' : '',
  ),

  authorizedForPhone: valueOrFallback(
    import.meta.env.VITE_AUTHORIZED_FOR_PHONE,
    isDemoMode ? '+94 11 234 1235' : '',
  ),
}
