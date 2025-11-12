// Next Imports
import { headers, cookies } from 'next/headers'

// Third-party Imports
import 'server-only'

// Type Imports
import type { Settings } from '@core/contexts/settingsContext'
import type { DemoName, SystemMode } from '@core/types'

// Config Imports
import themeConfig from '@configs/themeConfig'
import demoConfigs from '@configs/demoConfigs'

export const getDemoName = async (): Promise<DemoName> => {
  const headersList = await headers()
  const demoName = headersList.get('X-server-header')

  return demoName as DemoName | null
}

export const getSettingsFromCookie = async (): Promise<Settings> => {
  const cookieStore = await cookies()

  const demoName = await getDemoName()

const cookieName = demoName ? themeConfig.settingsCookieName.replace('demo-1', demoName) : themeConfig.settingsCookieName


  return JSON.parse(cookieStore.get(cookieName)?.value || '{}')
}

export const getMode = async () => {
  const settingsCookie = await getSettingsFromCookie()

const demoName = await getDemoName()

  // Get mode from cookie or fallback to theme config
  const _mode = settingsCookie.mode || (demoName && demoConfigs[demoName].mode) || themeConfig.mode

  return _mode
}

export const getSystemMode = async (): Promise<SystemMode> => {
  const cookieStore = await cookies()
  const mode = await getMode()

  const colorPrefCookie = (cookieStore.get('colorPref')?.value || 'light') as SystemMode

  return (mode === 'system' ? colorPrefCookie : mode) || 'light'
}

export const getServerMode = async () => {
  const mode = await getMode()
  const systemMode = await getSystemMode()

  return mode === 'system' ? systemMode : mode
}

export const getSkin = async () => {
  const settingsCookie = await getSettingsFromCookie()

  return settingsCookie.skin || 'default'
}
