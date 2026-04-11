import styled from '@emotion/styled';
import { UserRole } from 'oa-shared';
import { useContext } from 'react';
import { NavLink } from 'react-router';
import MenuCurrent from 'src/assets/images/menu-current.svg';
import { AuthWrapper } from 'src/common/AuthWrapper';
import { getSupportedModules } from 'src/modules';
import { getAvailablePageList } from 'src/pages/PageList';
import { Flex } from 'theme-ui';

import { EnvironmentContext } from '../../EnvironmentContext';

const MenuLink = styled(NavLink)`
  padding: 0px ${(props) => props.theme.space[4]}px;
  color: ${'black'};
  position: relative;
  > div {
    // z-index: ${(props) => props.theme.zIndex.default};
    position: relative;
    display: inline-block;
    &:hover {
      opacity: 0.7;
    }
  }
  &.active > div::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 100%;
    height: 1.5px;
    background-color: black;
  }
`;

export const MenuDesktop = () => {
  const env = useContext(EnvironmentContext);

  return (
    <Flex sx={{ alignItems: 'center', width: '100%' }}>
      {getAvailablePageList(getSupportedModules(env?.VITE_SUPPORTED_MODULES || '')).map((page) => (
        <Flex key={page.path}>
          <MenuLink to={page.path} data-cy="page-link">
            <Flex>{page.title}</Flex>
          </MenuLink>
        </Flex>
      ))}
      <AuthWrapper roleRequired={UserRole.ADMIN}>
        <Flex>
          <MenuLink to="/admin/initiatives" data-cy="admin-link">
            <Flex>Admin</Flex>
          </MenuLink>
        </Flex>
      </AuthWrapper>
    </Flex>
  );
};

export default MenuDesktop;
