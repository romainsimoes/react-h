import styled from 'styled-components';

const InputSearch =  styled.input`
  display: block;
  padding: 8px 40px 8px 10px;
  width: 100%;
  transition: border-color .2s;
  border: 1px solid #aaa;
  border-radius: 2px;
  background-color: #f1efef;
  font-size: 16px;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  :focus {
    outline: none;
    border-color: #484848;
  }
`;

export default InputSearch;
