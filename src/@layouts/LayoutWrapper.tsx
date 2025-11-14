'use client'

// React Imports
import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'

// Type Imports
import type { SystemMode } from '@core/types'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'
import useLayoutInit from '@core/hooks/useLayoutInit'

type LayoutWrapperProps = {
  verticalLayout: ReactElement
  horizontalLayout: ReactElement
}

const LayoutWrapper = (props: LayoutWrapperProps) => {
  // Props
  const { verticalLayout, horizontalLayout } = props

  // Hooks
  const { settings } = useSettings()
  const [systemMode, setSystemMode] = useState<SystemMode>('light')

  // Detect system mode on client-side
  useEffect(() => {
    if (settings.mode === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches

      setSystemMode(isDark ? 'dark' : 'light')
    } else {
      setSystemMode(settings.mode as SystemMode)
    }
  }, [settings.mode])

  useLayoutInit(systemMode)

  // Return the layout based on the layout context
  return (
    <div className='flex flex-col flex-auto' data-skin={settings.skin}>
      {settings.layout === 'horizontal' ? horizontalLayout : verticalLayout}
    </div>
  )
}

export default LayoutWrapper
