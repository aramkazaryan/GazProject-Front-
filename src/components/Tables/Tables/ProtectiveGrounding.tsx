import { Button, Table } from "react-bootstrap";
import styles from "../Tables.module.scss";
import { useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { IProtectiveGrounding } from "stores/ProtectiveGroundingStore";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "stores/RootStore";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import moment from "moment";
import Pagination from "components/Pagination";

const ProtectiveGrounding = observer(() => {
  const {
    ProtectiveGroundingStore: {
      getAllProtectiveGroundings,
      addProtectiveGrounding,
      editProtectiveGrounding,
      protectiveGroundings,
      deleteProtectiveGrounding,
    },
  } = useContext(RootStoreContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const newParams = new URLSearchParams(searchParams);

  const pageNumber = searchParams.get("pageNumber");
  const addressID = searchParams.get("id");

  useEffect(() => {
    if (addressID) {
      getAllProtectiveGroundings(addressID, Number(pageNumber));
    }
  }, [getAllProtectiveGroundings, pageNumber, addressID]);

  const [protectiveGrounding, setProtectiveGrounding] =
    useState<IProtectiveGrounding>({
      name: "",
      params: {
        material: "",
        countOfGroundingElectrodes: "",
        note: "",
        dateOfMeasurement: "",
        soilResistivity: 0,
        currentSpreadingResistance: 0,
      },
    });

  const handlePages = (updatePage: number) => {
    newParams.set("pageNumber", `${updatePage}`);
    setSearchParams(newParams);
  };

  const [editId, setEditId] = useState<string>("");
  return (
    <div>
      <Table striped hover>
        <thead>
          <tr>
            <th>Название</th>
            <th>Материал</th>
            <th>Количество заземляющих электродов</th>
            <th>Примечание</th>
            <th>Дата измерения</th>
            <th>Сопротивление почвы</th>
            <th>Сопротивление распространению тока</th>
            <th colSpan={2}></th>
          </tr>
        </thead>
        <tbody>
          {protectiveGroundings &&
            protectiveGroundings?.itesm.map((protectiveGrounding) => {
              return (
                <tr key={protectiveGrounding.id}>
                  <td>{protectiveGrounding.name}</td>
                  <td>{protectiveGrounding.params.material}</td>
                  <td>
                    {protectiveGrounding.params.countOfGroundingElectrodes}
                  </td>
                  <td>{protectiveGrounding.params.note}</td>
                  <td>
                    {moment(
                      protectiveGrounding.params.dateOfMeasurement
                    ).format("DD.MM.YYYY")}
                  </td>
                  <td>{protectiveGrounding.params.soilResistivity}</td>{" "}
                  <td>
                    {protectiveGrounding.params.currentSpreadingResistance}
                  </td>
                  <td style={{ cursor: "pointer" }}>
                    <MdEdit
                      size={24}
                      onClick={() => {
                        setProtectiveGrounding(protectiveGrounding);
                        setEditId(
                          protectiveGrounding.id ? protectiveGrounding.id : ""
                        );
                      }}
                    />
                  </td>
                  <td style={{ cursor: "pointer" }}>
                    <MdDeleteOutline
                      size={24}
                      onClick={() => {
                        deleteProtectiveGrounding(
                          addressID ? addressID : "",
                          protectiveGrounding.id ? protectiveGrounding.id : ""
                        );
                      }}
                      className={styles.deleteIcon}
                      color={"#f33"}
                    />
                  </td>
                </tr>
              );
            })}
          <tr>
            <td>
              <input
                type="text"
                value={protectiveGrounding?.name}
                onChange={(e) => {
                  setProtectiveGrounding((state) => {
                    return {
                      ...state,
                      name: e.target.value,
                    };
                  });
                }}
              />
            </td>
            <td>
              <input
                type="text"
                value={protectiveGrounding?.params.material}
                onChange={(e) => {
                  setProtectiveGrounding((state) => {
                    return {
                      ...state,
                      params: { ...state.params, material: e.target.value },
                    };
                  });
                }}
              />
            </td>
            <td>
              <input
                type="text"
                value={protectiveGrounding?.params.countOfGroundingElectrodes}
                onChange={(e) => {
                  setProtectiveGrounding((state) => {
                    return {
                      ...state,
                      params: {
                        ...state.params,
                        countOfGroundingElectrodes: e.target.value,
                      },
                    };
                  });
                }}
              />
            </td>
            <td>
              <input
                type="text"
                value={protectiveGrounding?.params.note}
                onChange={(e) => {
                  setProtectiveGrounding((state) => {
                    return {
                      ...state,
                      params: { ...state.params, note: e.target.value },
                    };
                  });
                }}
              />
            </td>
            <td>
              <input
                type="date"
                value={moment(
                  protectiveGrounding.params.dateOfMeasurement
                ).format("YYYY-MM-DD")}
                onChange={(e) => {
                  setProtectiveGrounding((state) => {
                    return {
                      ...state,
                      params: {
                        ...state.params,
                        dateOfMeasurement: e.target.value,
                      },
                    };
                  });
                }}
              />
            </td>
            <td>
              <input
                type="number"
                value={protectiveGrounding?.params.soilResistivity}
                onChange={(e) => {
                  setProtectiveGrounding((state) => {
                    return {
                      ...state,
                      params: {
                        ...state.params,
                        soilResistivity: Number(e.target.value),
                      },
                    };
                  });
                }}
              />
            </td>
            <td>
              <input
                type="number"
                value={protectiveGrounding?.params.currentSpreadingResistance}
                onChange={(e) => {
                  setProtectiveGrounding((state) => {
                    return {
                      ...state,
                      params: {
                        ...state.params,
                        currentSpreadingResistance: Number(e.target.value),
                      },
                    };
                  });
                }}
              />
            </td>
            <td colSpan={2}>
              {editId ? (
                <Button
                  variant="success"
                  onClick={() => {
                    editProtectiveGrounding(
                      addressID ? addressID : "",
                      editId,
                      protectiveGrounding
                    ).then(() => {
                      setEditId("");
                      setProtectiveGrounding({
                        name: "",
                        params: {
                          material: "",
                          countOfGroundingElectrodes: "",
                          note: "",
                          dateOfMeasurement: "",
                          soilResistivity: 0,
                          currentSpreadingResistance: 0,
                        },
                      });
                    });
                  }}
                >
                  Сохранить
                </Button>
              ) : (
                <Button
                  variant="success"
                  onClick={() => {
                    addProtectiveGrounding(
                      addressID ? addressID : "",
                      protectiveGrounding
                    ).then(() => {
                      setProtectiveGrounding({
                        name: "",
                        params: {
                          material: "",
                          countOfGroundingElectrodes: "",
                          note: "",
                          dateOfMeasurement: "",
                          soilResistivity: 0,
                          currentSpreadingResistance: 0,
                        },
                      });
                    });
                  }}
                >
                  Добавить
                </Button>
              )}
              {editId ? (
                <Button
                  variant="danger"
                  onClick={() => {
                    setEditId("");
                    setProtectiveGrounding({
                      name: "",
                      params: {
                        material: "",
                        countOfGroundingElectrodes: "",
                        note: "",
                        dateOfMeasurement: "",
                        soilResistivity: 0,
                        currentSpreadingResistance: 0,
                      },
                    });
                  }}
                  style={{ marginTop: "5px" }}
                >
                  Отмена
                </Button>
              ) : (
                ""
              )}
            </td>
          </tr>
        </tbody>
      </Table>
      {protectiveGroundings &&
        protectiveGroundings.totalCount / 20 > 1 &&
        pageNumber && (
          <div className={styles.pagination}>
            <Pagination
              page={Number(pageNumber)}
              totalPages={Math.floor(protectiveGroundings.totalCount / 20)}
              handlePagination={handlePages}
            />
          </div>
        )}
    </div>
  );
});

export default ProtectiveGrounding;
