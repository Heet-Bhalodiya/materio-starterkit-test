// MUI Imports
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'

// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Type Imports
import type { ChildrenType } from '@core/types'
import type { Locale } from '@configs/i18n'

// Component Imports
import BuyNowButton from '@components/buy-now-button'

// HOC Imports
import TranslationWrapper from '@/hocs/TranslationWrapper'

// Config Imports
import { i18n } from '@configs/i18n'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'

export const metadata = {
  title: 'Materio - Material Design Next.js Admin Template',
  description:
    'Materio - Material Design Next.js Admin Dashboard Template - is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.'
}

// Generate static params for all supported locales
export function generateStaticParams() {
  return i18n.locales.map(locale => ({
    lang: locale
  }))
}


const RootLayout = async (props: ChildrenType & { params: Promise<{ lang: string }> }) => {
  const params = await props.params

  const { children } = props

  // Type guard to ensure lang is a valid Locale
  const lang: Locale = i18n.locales.includes(params.lang as Locale) ? (params.lang as Locale) : i18n.defaultLocale

  // Vars
  const direction = i18n.langDirection[lang]

  return (
    <TranslationWrapper lang={lang}>
      <html id='__next' lang={lang} dir={direction} suppressHydrationWarning>
        <body className='flex is-full min-bs-full flex-auto flex-col'>
          <InitColorSchemeScript attribute='data' defaultMode='light' />
          {children}
          <BuyNowButton />
        </body>
      </html>
    </TranslationWrapper>
  )
}

export default RootLayout
