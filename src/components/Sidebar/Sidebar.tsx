import styles from "./Sidebar.module.scss";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { MdAddLocation, MdDeleteOutline, MdLocationOn } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { menuItemStyles, themes } from "./SidebarTheme";
import { RootStoreContext } from "stores/RootStore";
import AddModal from "./AddModal";
import { GlobalSVG } from "../../assets/SvgIcons";
import { useNavigate } from "react-router-dom";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { BlobOptions } from "buffer";

const AppSidebar = observer(() => {
  const {
    UKZStore: { getUKZStates, UKZStates, addUKZState, deleteUKZState },
    AddressStore: { getAddresses, addresses, addAddress, deleteAddress },
  } = useContext(RootStoreContext);

  const [collapsed, setCollapsed] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    getUKZStates();
  }, [getUKZStates]);

  const [addressModalShow, setAddressModalShow] = useState(false);
  const [stateModalShow, setStateModalShow] = useState(false);
  const [selectCountry, setSelectCountry] = useState("");

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        direction: "ltr",
      }}
    >
      <Sidebar
        collapsed={collapsed}
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
        <div className={styles.sideBarNav}>
          <Menu menuItemStyles={menuItemStyles} closeOnClick={true}>
            <SubMenu label={"УКЗ"}>
              <SubMenu label={"СМЭХ"}>
                {UKZStates &&
                  UKZStates.map(({ id, name }) => {
                    return (
                      <SubMenu
                        icon={<GlobalSVG color="rgb(244, 145, 0)" />}
                        label={name}
                        key={id}
                        onClick={() => {
                          if (
                            !addresses.filter((item) => item.state === id)
                              .length
                          ) {
                            getAddresses(id);
                          }
                        }}
                        suffix={
                          <MdDeleteOutline
                            size={20}
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteUKZState(id);
                            }}
                            className={styles.deleteIcon}
                            color={"#f33"}
                          />
                        }
                      >
                        {addresses &&
                          addresses.filter(
                            (stateAddress) => stateAddress.state === id
                          )[0] &&
                          addresses
                            .filter(
                              (stateAddress) => stateAddress.state === id
                            )[0]
                            .stateAddresses.map((i) => {
                              return (
                                <MenuItem
                                  key={i.id}
                                  icon={
                                    <MdLocationOn
                                      size={20}
                                      color={"#36c3aa"}
                                      style={{ marginRight: "5px" }}
                                    />
                                  }
                                  onClick={() =>
                                    navigate(
                                      `address?name=${i.name}&id=${i.id}`
                                    )
                                  }
                                  suffix={
                                    <MdDeleteOutline
                                      size={20}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        deleteAddress(id, i.id);
                                      }}
                                      className={styles.deleteIcon}
                                      color={"#f33"}
                                    />
                                  }
                                >
                                  {i.name}
                                </MenuItem>
                              );
                            })}
                        <MenuItem
                          icon={
                            <MdAddLocation
                              size={20}
                              color={"#36c3aa"}
                              style={{ marginRight: "5px" }}
                            />
                          }
                          className={styles.addButton}
                          onClick={() => {
                            setSelectCountry(id);
                            setAddressModalShow(true);
                          }}
                        >
                          <span style={{ color: "#36c3aa" }}>
                            Добавить адрес
                          </span>
                        </MenuItem>
                      </SubMenu>
                    );
                  })}
                <MenuItem
                  icon={<GlobalSVG color="#36c3aa" />}
                  className={styles.addButton}
                  onClick={() => {
                    setStateModalShow(true);
                  }}
                >
                  <span style={{ color: "#36c3aa" }}>Добавить город</span>
                </MenuItem>
              </SubMenu>
            </SubMenu>
          </Menu>
        </div>
      </Sidebar>
      <AddModal
        type={"address"}
        show={addressModalShow}
        countryID={selectCountry}
        onHide={() => setAddressModalShow(false)}
        text={"Введите адрес"}
        addFunc={addAddress}
      />
      <AddModal
        type={"state"}
        show={stateModalShow}
        onHide={() => setStateModalShow(false)}
        text={"Введите название города"}
        addFunc={addUKZState}
      />
      <div className={styles.collapsedDiv}>
        {!collapsed ? (
          <CiCircleChevLeft
            className={styles.collapsedIcon}
            size={32}
            color="rgb(244, 145, 0)"
            onClick={() => setCollapsed(!collapsed)}
          />
        ) : (
          <CiCircleChevRight
            className={styles.collapsedIcon}
            size={32}
            color="rgb(244, 145, 0)"
            onClick={() => setCollapsed(!collapsed)}
          />
        )}
      </div>
    </div>
  );
});

export default AppSidebar;
