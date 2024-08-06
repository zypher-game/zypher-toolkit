import 'dayjs/locale/zh-cn'
import './assets/stylus/index.styl'
import '@reach/dialog/styles.css'
import './react-extras.d.ts'
import './polyfills'

// import '../node_modules/@ui/ui/dist/index.css'
import { IsW768Provider, RainbowKitWithThemeProvider, RecoilRoot, supportedChainIds } from '@ui/src'
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
      <RainbowKitWithThemeProvider env={env} chainIdList={supportedChainIds(env)}>
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
