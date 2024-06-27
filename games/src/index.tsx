import 'dayjs/locale/zh-cn'
import './assets/stylus/index.styl'
import '@reach/dialog/styles.css'

// import '../node_modules/@ui/ui/dist/index.css'
import { IsW768Provider, RainbowKitWithThemeProvider, RecoilizeDebugger, RecoilRoot, supportedChainIds } from '@ui/src'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import AppRouter from '@/router'
import store from '@/store'

import { env } from './utils/config'

render(
  <Provider store={store}>
    <RecoilRoot>
      <RecoilizeDebugger />
      <RainbowKitWithThemeProvider env={env} chainIdList={supportedChainIds(env)} type="pixel">
        <BrowserRouter>
          <IsW768Provider>
            <AppRouter />
          </IsW768Provider>
        </BrowserRouter>
      </RainbowKitWithThemeProvider>
    </RecoilRoot>
  </Provider>,
  document.getElementById('root')
)
