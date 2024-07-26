import  "./Sidebar.scss"
import {Menu, MenuItem, MenuItemStyles, Sidebar, SubMenu,} from "react-pro-sidebar";
// @ts-ignore
import data from "./data.tsx"
import {MdOutlineAddLocationAlt, MdOutlineLocationOn} from "react-icons/md";
// @ts-ignore
import AddAddressModal from "./AddAddressModal.tsx";
import {useState} from "react";

const AppSidebar = () => {

    const [modalShow, setModalShow] = useState(false)
    const [selectCountry, setSelectCountry] = useState("")

    const [menu, setMenu] = useState(data)
    const themes = {
        light: {
            sidebar: {
                backgroundColor: "#ffffff",
                color: "#607489",
            },
            menu: {
                menuContent: "#ffffff",
                icon: "rgb(157,163,172)",
                hover: {
                    backgroundColor: "rgba(244, 145, 0, 0.2)",
                    color: "#44596e",
                },
            },
        },
    };

    const menuItemStyles: MenuItemStyles = {
        root: {
            fontSize: "13px",
            fontWeight: 400,
        },
        icon: ({ active }) => ({
            color: active ? "rgb(244, 145, 0)" : themes.light.menu.icon,
        }),
        SubMenuExpandIcon: {
            color: "#b6b7b9",
        },
        subMenuContent: ({ level }) => ({
            backgroundColor:
                level === 0 ? themes.light.menu.menuContent : "transparent",
        }),
        button: {
            "&:hover": {
                backgroundColor: themes.light.menu.hover.backgroundColor,
                color: themes.light.menu.hover.color,
            },
        },
        label: ({ open, active }) => ({
            fontWeight: open || active ? 600 : undefined,
        }),
    };
    // @ts-ignore
    return (
        <div
            style={{
                display: "flex",
                height: "100%",
                direction: "ltr",
            }}
        >
            <Sidebar
                collapsed={false}
                toggled={true}
                onBackdropClick={() => {}}
                onBreakPoint={() => {}}
                rtl={false}
                breakPoint="md"
                backgroundColor={themes.light.sidebar.backgroundColor}
                rootStyles={{
                    color: themes.light.sidebar.color,
                }}
            >

                    <div className="sideBarNav">
                        <Menu menuItemStyles={menuItemStyles}>
                            <SubMenu label={"УКЗ"}>
                                <SubMenu label={"СМЭХ"}>
                                    {
                                        menu.map(({name, addresses}) => {
                                            return(
                                                <SubMenu label={name} key={name}>
                                                    <MenuItem className="addButton" onClick={() => {
                                                        setSelectCountry(name)
                                                        setModalShow(true)
                                                    }}><MdOutlineAddLocationAlt size={25} color={"#36c3aa"} style={{marginRight:"5px"}}/>Создать</MenuItem>
                                                    {
                                                        addresses.map(i => {
                                                            return <MenuItem key={i}> <MdOutlineLocationOn size={25} color={"rgb(244, 145, 0)"} style={{marginRight:"5px"}}/>{i}</MenuItem>
                                                        })
                                                    }
                                                </SubMenu>
                                            )
                                        })
                                    }
                                </SubMenu>
                            </SubMenu>
                        </Menu>
                    </div>
            </Sidebar>
            <AddAddressModal show={modalShow} country={selectCountry} onHide={() => setModalShow(false)} setMenu={setMenu}/>
        </div>
    );
}

export default AppSidebar
