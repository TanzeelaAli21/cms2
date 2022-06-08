
export interface ISideBar {
    open: true | false,
    handleOpen(): void,
    Mobileopen: true | false,
    handleMobileOpen(): void, 
}
export interface IAppBar {
    open: true | false,
    handleOpen(): void,
    handleMobileOpen(): void,
}

export interface ISideBarList {
    handleOpen():  void | null
}