import { Button, Table } from "react-bootstrap";
import styles from "../Tables.module.scss";
import { useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ICathodeLine } from "stores/CathodeLineStore";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "stores/RootStore";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import moment from "moment";
import Pagination from "components/Pagination";

const CathodeLine = observer(() => {
  const {
    CathodeLineStore: {
      getAllCathodeLines,
      addCathodeLine,
      editCathodeLine,
      cathodeLines,
      deleteCathodeLine,
    },
  } = useContext(RootStoreContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const newParams = new URLSearchParams(searchParams);

  const pageNumber = searchParams.get("pageNumber");
  const addressID = searchParams.get("id");

  useEffect(() => {
    if (addressID) {
      getAllCathodeLines(addressID, Number(pageNumber));
    }
  }, [getAllCathodeLines, pageNumber, addressID]);

  const [cathodeLine, setCathodeLine] = useState<ICathodeLine>({
    name: "",
    params: {
      mark: "",
      wireCrossSection: 0,
      lineLength: 0,
      technicalCondition: "",
      dateOfDecommissioning: "",
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
            <th>Отметка</th>
            <th>Сечение провода</th>
            <th>Длина линии</th>
            <th>Техническое состояние</th>
            <th>Дата вывода из эксплуатации</th>
            <th colSpan={2}></th>
          </tr>
        </thead>
        <tbody>
          {cathodeLines &&
            cathodeLines?.itesm.map((cathodeLine) => {
              return (
                <tr key={cathodeLine.id}>
                  <td>{cathodeLine.name}</td>
                  <td>{cathodeLine.params.mark}</td>
                  <td>{cathodeLine.params.wireCrossSection}</td>
                  <td>{cathodeLine.params.lineLength}</td>
                  <td>{cathodeLine.params.technicalCondition}</td>
                  <td>
                    {moment(cathodeLine.params.dateOfDecommissioning).format(
                      "DD.MM.YYYY"
                    )}
                  </td>
                  <td style={{ cursor: "pointer" }}>
                    <MdEdit
                      size={24}
                      onClick={() => {
                        setCathodeLine(cathodeLine);
                        setEditId(cathodeLine.id ? cathodeLine.id : "");
                      }}
                    />
                  </td>
                  <td style={{ cursor: "pointer" }}>
                    <MdDeleteOutline
                      size={24}
                      onClick={() => {
                        deleteCathodeLine(
                          addressID ? addressID : "",
                          cathodeLine.id ? cathodeLine.id : ""
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
                value={cathodeLine?.name}
                onChange={(e) => {
                  setCathodeLine((state) => {
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
                value={cathodeLine?.params.mark}
                onChange={(e) => {
                  setCathodeLine((state) => {
                    return {
                      ...state,
                      params: { ...state.params, mark: e.target.value },
                    };
                  });
                }}
              />
            </td>
            <td>
              <input
                type="number"
                value={cathodeLine?.params.wireCrossSection}
                onChange={(e) => {
                  setCathodeLine((state) => {
                    return {
                      ...state,
                      params: {
                        ...state.params,
                        wireCrossSection: Number(e.target.value),
                      },
                    };
                  });
                }}
              />
            </td>
            <td>
              <input
                type="number"
                value={cathodeLine?.params.lineLength}
                onChange={(e) => {
                  setCathodeLine((state) => {
                    return {
                      ...state,
                      params: {
                        ...state.params,
                        lineLength: Number(e.target.value),
                      },
                    };
                  });
                }}
              />
            </td>
            <td>
              <input
                type="text"
                value={cathodeLine?.params.technicalCondition}
                onChange={(e) => {
                  setCathodeLine((state) => {
                    return {
                      ...state,
                      params: {
                        ...state.params,
                        technicalCondition: e.target.value,
                      },
                    };
                  });
                }}
              />
            </td>
            <td>
              <input
                type="date"
                value={moment(cathodeLine.params.dateOfDecommissioning).format(
                  "YYYY-MM-DD"
                )}
                onChange={(e) => {
                  setCathodeLine((state) => {
                    return {
                      ...state,
                      params: {
                        ...state.params,
                        dateOfDecommissioning: e.target.value,
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
                    editCathodeLine(
                      addressID ? addressID : "",
                      editId,
                      cathodeLine
                    ).then(() => {
                      setEditId("");
                      setCathodeLine({
                        name: "",
                        params: {
                          mark: "",
                          wireCrossSection: 0,
                          lineLength: 0,
                          technicalCondition: "",
                          dateOfDecommissioning: "",
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
                    addCathodeLine(
                      addressID ? addressID : "",
                      cathodeLine
                    ).then(() => {
                      setCathodeLine({
                        name: "",
                        params: {
                          mark: "",
                          wireCrossSection: 0,
                          lineLength: 0,
                          technicalCondition: "",
                          dateOfDecommissioning: "",
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
                    setCathodeLine({
                      name: "",
                      params: {
                        mark: "",
                        wireCrossSection: 0,
                        lineLength: 0,
                        technicalCondition: "",
                        dateOfDecommissioning: "",
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
      {cathodeLines && cathodeLines.totalCount / 20 > 1 && pageNumber && (
        <div className={styles.pagination}>
          <Pagination
            page={Number(pageNumber)}
            totalPages={Math.floor(cathodeLines.totalCount / 20)}
            handlePagination={handlePages}
          />
        </div>
      )}
    </div>
  );
});

export default CathodeLine;
