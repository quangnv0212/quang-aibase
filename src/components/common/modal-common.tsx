import { Modal } from "antd";
import styled from "styled-components";

type Props = {
  padding?: number;
  paddingBottom?: number;
};
export const ModalCommon = styled(Modal)<Props>`
  .ant-modal-content {
    border-radius: 8px;
    background-color: #f5f5f5;
  }
  .ant-modal-body {
    padding: ${(props) => props.padding}px;
    padding-bottom: ${(props) => props.paddingBottom}px;
  }
`;
