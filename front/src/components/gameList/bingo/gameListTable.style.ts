import styled, { css } from 'styled-components'

import { TableStyled } from '@/utils/tableStyles'

export const MyTable = styled(TableStyled)<{ isMobile: boolean }>`
  border: none;
  border-radius: 0;
  overflow: hidden;
  table th {
    font-size: 16px;
    @media (max-width: 1400px) {
      font-size: 13px;
    }
  }
  table td {
    font-size: 16px;
  }

  tr > td,
  & tr > th {
    &:first-child {
      padding-left: 40px;
      @media (max-width: 1400px) {
        padding-left: 20px;
      }
    }

    &:last-child {
      text-align: right;
      padding-right: 40px;
      @media (max-width: 1400px) {
        padding-right: 20px;
      }
      p {
        justify-content: right;
      }
    }
  }
  &.table {
    tr > td,
    & tr > th {
      &:nth-child(1) {
        max-width: 140px;
        width: 10%;
      }
      &:nth-child(2) {
        max-width: 140px;
        width: 10%;
      }
      &:nth-child(3) {
        max-width: 140px;
        width: 10%;
      }
      &:nth-child(4) {
        width: 15%;
        max-width: 280px;
      }
      @media (max-width: 1400px) {
        &:nth-child(1) {
          width: 90px;
        }
        &:nth-child(2) {
          width: 90px;
        }
        &:nth-child(3) {
          width: 90px;
        }
        &:nth-child(4) {
          width: 15%;
          max-width: 220px;
        }
      }
    }
  }
  .ant-table-row {
    height: 70px;
  }
  .editable-row {
    // background-color: #131313;
    transition: background-color 0.3s;
    &:hover {
      background-color: rgba(255, 255, 255, 0.04);
    }
  }
  .ant-table table {
    border-radius: 0;
  }
  .ant-table-body {
    border-radius: 0 0 20px 20px;
    overflow: hidden;
    padding-bottom: 30px;
  }
`
