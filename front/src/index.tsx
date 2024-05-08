import 'dayjs/locale/zh-cn'
import './assets/stylus/index.styl'
import '@reach/dialog/styles.css'
import '../node_modules/@ui/ui/dist/index.css'

// import '@zypher-game/toolkit/dist/index.css'
import { IsMobileProvider, RainbowKitWithThemeProvider, RecoilRoot, supportedChainIds } from '@ui/src'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import AppRouter from '@/router'
import store from '@/store'

import { env } from './utils/config'

render(
  <Provider store={store}>
    <RecoilRoot>
      <RainbowKitWithThemeProvider env={env} chainIdList={supportedChainIds(env)} type="pixel">
        <HashRouter>
          <IsMobileProvider>
            <AppRouter />
          </IsMobileProvider>
        </HashRouter>
      </RainbowKitWithThemeProvider>
    </RecoilRoot>
  </Provider>,
  document.getElementById('root')
)
