import styled, { css } from "styled-components";

const commonCssProps = css`
  height: 44px;
  border-right: 1px solid #5C6F81;
  background: none;
  font-size: inherit;
  color: #A7B5C2;
  text-align: left;
  padding: 0px 8px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
`;

export const TableRow = styled.div`
  width: 100%;
  height: 44px;
  border-bottom: 1px solid #5C6F81;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const CheckDiv = styled.div`
  ${commonCssProps};
  width: fit-content;
  max-width: 40px;

  input[type=checkbox] {
    width: 20px;
    height: 20px;
  }
`;

export const UserIdDiv = styled.div`
  ${commonCssProps};
  max-width: 140px;
  min-width: 140px;
  justify-content: space-between;
`;

export const NameDiv = styled.div`
  ${commonCssProps};
  max-width: 160px; 
  min-width: 160px; 
  text-transform: capitalize;
`;

export const EmailDiv = styled.div`
  ${commonCssProps};
  max-width: 170px; 
  min-width: 170px; 
`;

export const StatusDiv = styled.div`
  ${commonCssProps};
  max-width: 140px;
  min-width: 140px;
`;

export const DateDiv = styled.div`
  ${commonCssProps};
  max-width: 220px;
  min-width: 220px;
`;

export const TableCheckBoxInput = styled.input`
  width: fit-content;
  height: fit-content;
  padding: 0px;
  margin: 0px;
  cursor: pointer;
`;


