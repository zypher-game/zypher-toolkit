import 'dayjs/locale/zh-cn'
import './assets/stylus/index.styl'
import '@reach/dialog/styles.css'
import '@zypher-game/toolkit/ui/dist/index.css'

import { bingoSupportedChainId, IsMobileProvider, RainbowKitWithThemeProvider, RecoilRoot } from '@zypher-game/toolkit/ui'
import { ConfigProvider } from 'antd'
import enGB from 'antd/es/locale/en_GB'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import AppRouter from '@/router'
import store from '@/store'

import { ThemeProvider } from './theme'
import { env } from './utils/config'

render(
  <Provider store={store}>
    <RecoilRoot>
      <RainbowKitWithThemeProvider env={env} chainIdList={bingoSupportedChainId}>
        <ConfigProvider locale={enGB}>
          <BrowserRouter>
            <ThemeProvider>
              <IsMobileProvider>
                <AppRouter />
              </IsMobileProvider>
            </ThemeProvider>
          </BrowserRouter>
        </ConfigProvider>
      </RainbowKitWithThemeProvider>
    </RecoilRoot>
  </Provider>,
  document.getElementById('root')
)
