import { FC, MouseEventHandler, useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { navigations } from '../../navigations';

const NavRoot = styled.nav`
  display: flex;
  transform: translateX(-20px);
`;

const NavButton = styled(NavLink)`
  padding: 10px 20px;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  color: #000;
  z-index: 2;
  border-radius: 4px;

  &.active {
    &:before {
      content: "";
      display: block;
      position: absolute;
      height: 0;
      left: 9px;
      right: 9px;
      bottom: -10px;
      border-bottom: 2px solid;
    }
  }
`;

const NavButtonBg = styled.div`
  contain: strict;
  background: #eaeaea;
  position: absolute;
  z-index: 1;
  border-radius: 4px;
  height: 40px;
  transition-duration: .15s;
  transition-timing-function: ease;
  transition-property: width, transform, opacity;
`;

export const AppNavigator: FC = () => {
  const [bgRec, setBgReg] = useState({
    width: '100px',
    transform: 'translateX(0)',
    opacity: 0,
  });

  const handleMouseOver: MouseEventHandler<HTMLElement> = (evt) => {
    const target = evt.target as any;
    const relatedTarget = evt.relatedTarget as any;

    const isBrandNew = relatedTarget.getAttribute('data-role') !== 'navi-button';
    setBgReg((style) => ({
      ...style,
      transitionDuration: isBrandNew ? '0s' : '.15s',
      width: `${target.offsetWidth}px`,
      transform: `translateX(${target.offsetLeft}px)`,
      opacity: 1,
    }));
  };

  const handleMouseOut: MouseEventHandler<HTMLElement> = () => {
    setBgReg((style) => ({
      ...style,
      opacity: 0,
      transitionDuration: '.15s',
    }));
  };

  return (
    <NavRoot>
      <NavButtonBg style={bgRec} />
      {navigations.map((item) => (
        <NavButton
          to={item.to}
          key={item.name}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          data-role="navi-button"
        >
          {item.name}
        </NavButton>
      ))}
    </NavRoot>
  );
};
