import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

export const LogoContainer = styled(Link)`
  display: flex;
  height: 100%;
  width: 70px;
  padding: 10px;
  align-items: center; 
  justify-content: center;
`;

export const NavLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 499px) {
    width: 70%;

    @media screen and (max-width: 379px) {
      width: 75%;
`;

export const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;