import { Table } from "antd";
import styled from "styled-components";

export const TableCommon = styled(Table)`
  & .ant-table .ant-table-selection-column {
    width: 60px;
    max-width: 80px;
  }
  & .ant-table {
    background-color: #f5f5f5;
    border-top: 1px solid white;
    border-radius: 20px;
    font-family: "Visby";
  }
  & .ant-table .ant-table-container .ant-table-content table .ant-table-row {
    background-color: white;
  }

  &
    .ant-table
    .ant-table-container
    .ant-table-content
    table
    thead.ant-table-thead
    .ant-table-cell {
    font-weight: bold;
  }
  & .ant-table .ant-table-container {
    border-radius: 20px;
  }

  & .ant-table .ant-table-container .ant-table-content {
    border-radius: 20px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  }

  &
    .ant-table
    .ant-table-container
    .ant-table-content
    table
    thead.ant-table-thead
    .ant-table-cell {
    background-color: white;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  &
    .ant-table
    .ant-table-container
    .ant-table-content
    table
    tbody.ant-table-tbody
    tr:last-child
    td {
    border-radius: 0px;
  }

  &
    .ant-table
    .ant-table-container
    .ant-table-content
    table
    .ant-table-row.ant-table-row-level-0:last-child
    td:first-child {
    border-bottom-left-radius: 20px;
  }

  &
    .ant-table
    .ant-table-container
    .ant-table-content
    table
    .ant-table-row.ant-table-row-level-0:last-child
    td:last-child {
    border-bottom-right-radius: 20px;
  }

  &
    .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(
      .ant-table-row-expand-icon-cell
    ):not([colspan])::before {
    content: none;
  }
  & .ant-table-footer {
    padding: 0;
    background-color: #f5f5f5;
    padding-top: 8px;
  }
  & .ant-table-pagination-right {
    display: flex;
    justify-content: center;
  }
  & .ant-space.ant-space-vertical {
    width: 100%;
  }

  &
    .ant-table
    .ant-table-container
    .ant-table-content
    table
    thead.ant-table-thead
    .ant-table-cell {
    background-color: white;
    border-radius: 0px;
  }

  &
    .ant-table
    .ant-table-container
    .ant-table-content
    table
    thead.ant-table-thead
    .ant-table-cell:first-child {
    border-top-left-radius: 20px;
  }
  &
    .ant-table
    .ant-table-container
    .ant-table-content
    table
    thead.ant-table-thead
    .ant-table-cell:last-child {
    border-top-right-radius: 20px;
  }
  & .ant-table-pagination.ant-pagination {
    margin-top: 8px;
  }
  & .ant-space .ant-space-vertical {
    width: 100% !important;
  }
  .ant-table-container {
    overflow: auto;
  }
`;
