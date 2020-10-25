import styled from 'styled-components';

export const Container = styled.div`
  & {
    padding: 100px 200px;
  }
`;

export const Content = styled.div`
  & {
    margin-top: 20px;
    border-radius: 8px;
    padding: 10px;

    h3 {
      text-align: center;
      font-weight: bold;
      margin-bottom: 20px;
    }

    div {
      margin-top: 10px;
    }

    #blockchain-pagination {
      svg {
      }
      .MuiInputBase-root.MuiTablePagination-input.MuiTablePagination-selectRoot {
        margin-top: 0;
        div {
          margin-top: 0;
        }
      }

      .MuiTablePagination-actions {
        margin-top: 0;
      }
    }
  }
`;

