export interface NavLink {
    name: string;
    label: string;
    icon: string;
    disabled: boolean;
    active: boolean;
    parent: boolean;
    root: boolean;
    description: string;
    linkURL: string;
    isExternalLink: boolean;
    children?: NavLink[] | null;
}

export interface NavMenu {
    navigations: NavLink[];
}
