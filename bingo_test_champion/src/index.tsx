import 'dayjs/locale/zh-cn'
import './assets/stylus/index.styl'
import '@reach/dialog/styles.css'
import './react-extras.d.ts'
import './polyfills'

// import '../node_modules/@ui/ui/dist/index.css'
import { bingoSupportedChainId, IsW768Provider, RainbowKitWithThemeProvider, RecoilRoot, TonConnectUIProvider } from '@ui/src'
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
      <TonConnectUIProvider>
        <RainbowKitWithThemeProvider env={env} chainIdList={bingoSupportedChainId}>
          <ConfigProvider locale={enGB}>
            <BrowserRouter>
              <ThemeProvider>
                <IsW768Provider>
                  <AppRouter />
                </IsW768Provider>
              </ThemeProvider>
            </BrowserRouter>
          </ConfigProvider>
        </RainbowKitWithThemeProvider>
      </TonConnectUIProvider>
    </RecoilRoot>
  </Provider>,
  document.getElementById('root')
)
