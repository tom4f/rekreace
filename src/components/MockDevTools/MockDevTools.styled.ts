import styled from 'styled-components';

export const DevToolsWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #c8d6e5;
  z-index: 999999999;
  border-top: 5px solid #576574;
  color: #344054;
  font-size: 13.5px;
`;

export const TableWrapper = styled.div`
  padding: 10px;
  overflow: auto;
  height: 450px;
`;

export const Label = styled.span`
  line-height: 28px;
  padding: 0 10px;
`;

export const Table = styled.table`
  width: 100%;
  border-spacing: 0;
`;

export const Tr = styled.tr``;

export const Td = styled.td<{ hasRedBg?: boolean }>`
  border-bottom: 1px solid #99a7b6;
  padding: 5px 5px 5px 2px;
  background: ${({ hasRedBg }) => (hasRedBg ? '#ffe3dd' : '')};
`;

export const Th = styled.th`
  border-bottom: 1px solid #99a7b6;
  text-align: left;
  color: #2b2b2b;
  padding-bottom: 9px;
  text-transform: uppercase;
`;

export const Headline = styled.div`
  border-bottom: 1px solid #99a7b6;
  color: #424242;
  padding: 5px;
  font-weight: normal;
  display: flex;
`;

export const Input = styled.input`
  border: 1px solid #99a7b6;
  border-radius: 4px;
  height: 28px;
  margin-right: 15px;
  width: 150px;
`;

export const Tag = styled.span<{ selected?: boolean }>`
  border: 1px solid;
  color: #424242;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 5px;
  display: inline-block;
  margin-right: 10px;
  align-items: center;
  background: #fff;
  background: ${({ selected }) => (selected ? '#27ae60' : '#fff')};
  border-color: ${({ selected }) => (selected ? '#118e46' : '#99a7b6')};
  color: ${({ selected }) => (selected ? '#fff' : '#424242')};
  cursor: ${({ selected }) => (selected ? 'default' : 'pointer')};

  &:hover {
    background: ${({ selected }) => (selected ? '#27ae60' : '#eff5fc')};
  }
`;

export const CustomCol = styled.div`
  padding: 0 8px;
`;

export const ClickableButton = styled.button`
  border: 1px solid;
  color: #424242;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 5px;
  display: inline-block;
  margin-right: 10px;
  align-items: center;
  background: #fff;
  background: #fff;
  border-color: #99a7b6;
  color: #424242;
  cursor: pointer;

  &:hover {
    background: #eff5fc;
  }
`;

export const Button = styled.div<{ $isVisible: boolean }>`
  bottom: ${({ $isVisible }) => ($isVisible ? 494 : 10)}px;
  right: 130px;
  z-index: 999999998;
  width: 50px;
  height: 50px;
  position: fixed;
  background: #c8d6e5;
  border-radius: 40px;
  border: 5px solid #576574;
  text-transform: uppercase;
  text-align: center;
  line-height: 39px;
  font-weight: bold;
  cursor: pointer;
  color: #576574;
  transition: all 200ms;
  font-size: 13px;

  &:hover {
    background: #8395a7;
    border-color: #222f3e;
    color: #222f3e;
  }

  ${({ $isVisible }) =>
    $isVisible &&
    `
    border-bottom: none;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    height: 35px;
    bottom: 494px;
  z-index: 999999997;
`}
`;
