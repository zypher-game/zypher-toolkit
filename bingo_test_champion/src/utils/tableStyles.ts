import { Table } from 'antd'
import styled, { css } from 'styled-components'

export const TableStyled = styled(Table)<{ isMobile: boolean }>`
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  p {
    margin: 0;
    padding: 0;
  }
  th {
    background: rgba(255, 255, 255, 0.04) !important;
    color: #fff !important;
    border: 0px !important;
    opacity: 0.6000000238418579;
    white-space: nowrap;
  }
  .ant-table-thead > tr > th {
    font-weight: 400;
  }
  .ant-table-tbody > tr > td {
    white-space: nowrap;
    border: 0px;
    &:hover {
      background: transparent;
    }
  }
  .ant-table-tbody > tr.ant-table-placeholder:hover > td {
    background: none;
  }
  .ant-table {
    background: transparent;
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
`
