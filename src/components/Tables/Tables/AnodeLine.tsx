import { Button, Table } from "react-bootstrap";
import styles from "../Tables.module.scss";
import { useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { IAnodeLine } from "stores/AnodeLineStore";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "stores/RootStore";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import moment from "moment";
import Pagination from "components/Pagination";

const AnodeLine = observer(() => {
  const {
    AnodeLineStore: {
      getAllAnodeLines,
      addAnodeLine,
      editAnodeLine,
      anodeLines,
      deleteAnodeLine,
    },
  } = useContext(RootStoreContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const newParams = new URLSearchParams(searchParams);

  const pageNumber = searchParams.get("pageNumber");
  const addressID = searchParams.get("id");

  useEffect(() => {
    if (addressID) {
      getAllAnodeLines(addressID, Number(pageNumber));
    }
  }, [getAllAnodeLines, pageNumber, addressID]);

  const [anodeLine, setAnodeLine] = useState<IAnodeLine>({
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
          {anodeLines &&
            anodeLines?.itesm.map((anodeLine) => {
              return (
                <tr key={anodeLine.id}>
                  <td>{anodeLine.name}</td>
                  <td>{anodeLine.params.mark}</td>
                  <td>{anodeLine.params.wireCrossSection}</td>
                  <td>{anodeLine.params.lineLength}</td>
                  <td>{anodeLine.params.technicalCondition}</td>
                  <td>
                    {moment(anodeLine.params.dateOfDecommissioning).format(
                      "DD.MM.YYYY"
                    )}
                  </td>
                  <td style={{ cursor: "pointer" }}>
                    <MdEdit
                      size={24}
                      onClick={() => {
                        setAnodeLine(anodeLine);
                        setEditId(anodeLine.id ? anodeLine.id : "");
                      }}
                    />
                  </td>
                  <td style={{ cursor: "pointer" }}>
                    <MdDeleteOutline
                      size={24}
                      onClick={() => {
                        deleteAnodeLine(
                          addressID ? addressID : "",
                          anodeLine.id ? anodeLine.id : ""
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
                value={anodeLine?.name}
                onChange={(e) => {
                  setAnodeLine((state) => {
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
                value={anodeLine?.params.mark}
                onChange={(e) => {
                  setAnodeLine((state) => {
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
                value={anodeLine?.params.wireCrossSection}
                onChange={(e) => {
                  setAnodeLine((state) => {
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
                value={anodeLine?.params.lineLength}
                onChange={(e) => {
                  setAnodeLine((state) => {
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
                value={anodeLine?.params.technicalCondition}
                onChange={(e) => {
                  setAnodeLine((state) => {
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
                value={moment(anodeLine.params.dateOfDecommissioning).format(
                  "YYYY-MM-DD"
                )}
                onChange={(e) => {
                  setAnodeLine((state) => {
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
                    editAnodeLine(
                      addressID ? addressID : "",
                      editId,
                      anodeLine
                    ).then(() => {
                      setEditId("");
                      setAnodeLine({
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
                    addAnodeLine(addressID ? addressID : "", anodeLine).then(
                      () => {
                        setAnodeLine({
                          name: "",
                          params: {
                            mark: "",
                            wireCrossSection: 0,
                            lineLength: 0,
                            technicalCondition: "",
                            dateOfDecommissioning: "",
                          },
                        });
                      }
                    );
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
                    setAnodeLine({
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
      {anodeLines && anodeLines.totalCount / 20 > 1 && pageNumber && (
        <div className={styles.pagination}>
          <Pagination
            page={Number(pageNumber)}
            totalPages={Math.floor(anodeLines.totalCount / 20)}
            handlePagination={handlePages}
          />
        </div>
      )}
    </div>
  );
});

export default AnodeLine;
