'use client'

// Next Imports
import { redirect, usePathname } from 'next/navigation'

// Config Imports
import { i18n } from '@configs/i18n'

import { ensurePrefix } from '@/utils/string'

const LangRedirect = ({ redirectPrefix }: { redirectPrefix: string }) => {
  const pathname = usePathname()

  let redirectUrl = `/${i18n.defaultLocale}${pathname}`

  redirectUrl = ensurePrefix(redirectUrl, redirectPrefix)

redirect(redirectUrl)
}

export default LangRedirect
