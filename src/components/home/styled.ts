import styled from "styled-components";

interface IItheme {
  Itheme: string;
}

export const StyledDiv = styled.div<IItheme>`
  margin-top: ${(props) => props.theme.gutters.big};
  button {
    width: 200px;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: ${(props) => props.theme.radius.small};
    border: none;
    background-color: ${(props) =>
      props.Itheme === "light"
        ? props.theme.colors.softBlue
        : props.theme.colors.green};
    color: ${(props) =>
      props.Itheme === "light"
        ? props.theme.colors.white
        : props.theme.colors.white};
    :hover {
      background-color: ${(props) =>
        props.Itheme === "light"
          ? props.theme.colors.green
          : props.theme.colors.darkGreen};
    }
  }
`;
