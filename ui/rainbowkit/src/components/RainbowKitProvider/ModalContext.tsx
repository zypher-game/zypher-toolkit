import React, { createContext, ReactNode, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { useAccount, useNetwork } from 'wagmi'

import { useConnectionStatus } from '../../hooks/useConnectionStatus'
import { AccountModal } from '../AccountModal/AccountModal'
import { ChainModal } from '../ChainModal/ChainModal'
import { ConnectModal } from '../ConnectModal/ConnectModal'
import { useAuthenticationStatus } from './AuthenticationContext'

function useModalStateValue() {
  const [isModalOpen, setModalOpen] = useState(false)

  return {
    closeModal: useCallback(() => setModalOpen(false), []),
    isModalOpen,
    openModal: useCallback(() => setModalOpen(true), [])
  }
}

interface ModalContextValue {
  accountModalOpen: boolean
  chainModalOpen: boolean
  connectModalOpen: boolean
  openAccountModal?: () => void
  openChainModal?: () => void
  openConnectModal?: () => void
  closeChainModal?: () => void
  setFn?: any
}

const ModalContext = createContext<ModalContextValue>({
  accountModalOpen: false,
  chainModalOpen: false,
  connectModalOpen: false
})

interface ModalProviderProps {
  children: ReactNode
}

export function ModalProvider({ children }: ModalProviderProps) {
  const { closeModal: closeConnectModal, isModalOpen: connectModalOpen, openModal: openConnectModal } = useModalStateValue()

  const { closeModal: closeAccountModal, isModalOpen: accountModalOpen, openModal: openAccountModal } = useModalStateValue()

  const { closeModal: closeChainModal, isModalOpen: chainModalOpen, openModal: openChainModal } = useModalStateValue()
  const connectionStatus = useConnectionStatus()
  const { chain } = useNetwork()
  const chainSupported = !chain?.unsupported

  interface CloseModalsOptions {
    keepConnectModalOpen?: boolean
  }
  const fn = useRef<any>()
  function closeModals({ keepConnectModalOpen = false }: CloseModalsOptions = {}) {
    if (!keepConnectModalOpen) {
      closeConnectModal()
    }
    closeAccountModal()
    closeChainModal()
  }

  const isUnauthenticated = useAuthenticationStatus() === 'unauthenticated'
  useAccount({
    onConnect: () => closeModals({ keepConnectModalOpen: isUnauthenticated }),
    onDisconnect: () => closeModals()
  })
  return (
    <ModalContext.Provider
      value={useMemo(
        () => ({
          accountModalOpen,
          chainModalOpen,
          connectModalOpen,
          closeChainModal: closeChainModal,
          openAccountModal: chainSupported && connectionStatus === 'connected' ? openAccountModal : undefined,
          openChainModal: connectionStatus === 'connected' ? openChainModal : undefined,
          openConnectModal: connectionStatus === 'disconnected' || connectionStatus === 'unauthenticated' ? openConnectModal : undefined,
          setFn: (_fn: any) => {
            fn.current = _fn
          }
        }),
        [connectionStatus, chainSupported, accountModalOpen, chainModalOpen, connectModalOpen, openAccountModal, openChainModal, openConnectModal]
      )}
    >
      {children}
      <ConnectModal onClose={closeConnectModal} open={connectModalOpen} />
      <AccountModal onClose={closeAccountModal} open={accountModalOpen} />
      {fn.current && <ChainModal onClose={closeChainModal} open={chainModalOpen} fn={fn.current} />}
    </ModalContext.Provider>
  )
}

export function useModalState() {
  const { accountModalOpen, chainModalOpen, connectModalOpen } = useContext(ModalContext)

  return {
    accountModalOpen,
    chainModalOpen,
    connectModalOpen
  }
}

export function useAccountModal() {
  const { accountModalOpen, openAccountModal } = useContext(ModalContext)
  return { accountModalOpen, openAccountModal }
}

export function useChainModal() {
  const { chainModalOpen, openChainModal, closeChainModal, setFn } = useContext(ModalContext)
  return { chainModalOpen, openChainModal, closeChainModal, setFn }
}

export function useConnectModal() {
  const { connectModalOpen, openConnectModal } = useContext(ModalContext)
  return { connectModalOpen, openConnectModal }
}
