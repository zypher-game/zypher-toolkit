import { Table } from 'antd'
import styled, { css } from 'styled-components'

export const MyTable = styled(Table)<{ isMobile: boolean }>`
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  th {
    background: rgba(255, 255, 255, 0.04) !important;
    color: #fff !important;
    border: 0px !important;
    opacity: 0.6000000238418579;
  }
  .ant-table-thead > tr > th {
    text-align: right;
  }
  tr > td,
  & tr > th {
    text-align: right;
    // width: 20%;
    &:nth-child(1) {
      text-align: left;
      padding-left: 0;
      // width: 32%;

      // @media (max-width: 830px) {
      //   width: 25%;
      // }
    }
    // &:nth-child(2) {
    //   width: 8%;
    // }
    &:last-child {
      padding-right: 40px;
      @media (max-width: 830px) {
        padding-right: 10px;
        min-width: 50px;
      }
    }
  }
  tr > th {
    &:nth-child(1) {
      padding-left: 20px;
      @media (max-width: 830px) {
        padding-left: 10px;
      }
    }
  }
  .ant-table-tbody > tr {
    p {
      margin: 0;
      padding: 0;
    }
    &.even-row {
      background-color: #131313;
      td {
        padding-top: 30px;
        padding-bottom: 30px;

        @media (max-width: 830px) {
          padding-top: 10px;
          padding-bottom: 10px;
        }
      }
      &:hover {
        background-color: rgba(19, 19, 19, 0.4);
      }
    }
    &.odd-row {
      background-color: rgba(255, 255, 255, 0.04);
      transition: background-color 0.3s;
      &:hover {
        background-color: rgba(255, 255, 255, 0.03);
      }
    }

    & > td {
      border: 0px;
      &:last-child {
        color: #65edbc;
      }

      &:hover {
        background: transparent;
      }
    }
  }
  .ant-table {
    background: transparent;

    ${({ isMobile }) =>
      css`
        @media (max-width: 830px) {
          font-size: ${isMobile ? '12px' : '14px'};
        }
      `}

    &.ant-table-empty {
      tr {
        background-color: transparent;
        &:hover {
          background-color: transparent;
        }
      }
    }
  }
  .editable-row {
    td {
      border: 0px;
      color: #fff;
    }
    .ant-table-cell-row-hover {
      background: none !important;
    }
    &:hover {
      td {
        background: none !important;
      }
    }
  }
  tr > td,
  & tr > th {
    @media (max-width: 830px) {
      padding: 0px;
      padding-top: 10px;
      padding-bottom: 10px;
      // padding-right: 10px;
      // padding-left: 10px;
    }
  }
`
