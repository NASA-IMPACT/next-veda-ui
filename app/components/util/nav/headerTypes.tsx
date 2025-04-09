export interface InternalNavLink {
  id: string;
  title: string;
  to: string;
  customClassNames?: string;
  type: 'internalLink';
}
export interface ExternalNavLink {
  id: string;
  title: string;
  href: string;
  customClassNames?: string;
  type: 'externalLink';
}
export type NavLinkItem = ExternalNavLink | InternalNavLink;

export interface DropdownNavLink {
  id: string;
  title: string;
  type: 'dropdown';
  children: NavLinkItem[];
}

export type AlignmentEnum = 'left' | 'right';

export enum NavItemType {
  INTERNAL_LINK = 'internalLink',
  EXTERNAL_LINK = 'externalLink',
  DROPDOWN = 'dropdown',
  ACTION = 'action', // styled as the link but performs some type of action instead of re-routing
}

export type ActionId = 'open-google-form' | undefined; // @NOTE: ActionIds are nav items that perform some type of action but without it being a button

interface BaseNavItems {
  id: string;
  title: string;
}

export interface ActionNavItem extends BaseNavItems {
  actionId: ActionId;
  src?: string;
  type: NavItemType.ACTION;
  customClassNames?: string;
}

export interface DropdownNavLink extends BaseNavItems {
  type: NavItemType.DROPDOWN;
  children: NavLinkItem[];
}

export type NavItem = NavLinkItem | DropdownNavLink | ActionNavItem;

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
