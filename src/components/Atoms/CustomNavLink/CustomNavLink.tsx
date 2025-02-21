import { NavLink } from 'react-router-dom';

export type CustomNavLinkType = {
  to: string;
  header: string;
  activeClassName?: string;
};

export const CustomNavLink = ({
  to,
  header,
  activeClassName = 'bg-black',
}: CustomNavLinkType) => (
  <NavLink
    className={({ isActive }) => (isActive ? activeClassName : undefined)}
    to={to}
  >
    {header}
  </NavLink>
);

export const MeteoNavLink = (props: CustomNavLinkType) => (
  <CustomNavLink {...props} activeClassName='!bg-stone-500 !text-white' />
);
