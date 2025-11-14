// Type Imports
import type { Locale } from '@configs/i18n'

// Component Imports
import Providers from '@components/Providers'
import BlankLayout from '@layouts/BlankLayout'
import NotFound from '@views/NotFound'

// Config Imports
import { i18n } from '@configs/i18n'

const NotFoundPage = async (props: { params: Promise<{ lang: string }> }) => {
  const params = await props.params

  // Type guard to ensure lang is a valid Locale
  const lang: Locale = i18n.locales.includes(params.lang as Locale) ? (params.lang as Locale) : i18n.defaultLocale

  // Vars
  const direction = i18n.langDirection[lang]

  return (
    <Providers direction={direction}>
      <BlankLayout>
        <NotFound />
      </BlankLayout>
    </Providers>
  )
}

export default NotFoundPage
