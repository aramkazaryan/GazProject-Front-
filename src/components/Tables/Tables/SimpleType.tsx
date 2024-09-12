import { Button, Table } from "react-bootstrap";
import styles from "../Tables.module.scss";
import { useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ISimpleType } from "stores/SimpleTypeStore";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "stores/RootStore";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import moment from "moment";
import Pagination from "components/Pagination";

const SimpleType = observer(() => {
  const {
    SimpleTypeStore: {
      getAllSimpleTypes,
      addSimpleType,
      editSimpleType,
      simpleTypes,
      deleteSimpleType,
    },
  } = useContext(RootStoreContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const newParams = new URLSearchParams(searchParams);

  const pageNumber = searchParams.get("pageNumber");
  const addressID = searchParams.get("id");

  useEffect(() => {
    if (addressID) {
      getAllSimpleTypes(addressID, Number(pageNumber));
    }
  }, [getAllSimpleTypes, pageNumber, addressID]);

  const [simpleType, setSimpleType] = useState<ISimpleType>({
    name: "",
    params: {
      dateOfRestoration: "",
      dateOfRefusal: "",
      downTime: 0,
      uzk: 0,
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
            <th>Дата восстановления</th>
            <th>Дата возврата</th>
            <th>Время простоя</th>
            <th>UZK</th>
            <th colSpan={2}></th>
          </tr>
        </thead>
        <tbody>
          {simpleTypes &&
            simpleTypes?.itesm.map((simpleType) => {
              return (
                <tr key={simpleType.id}>
                  <td>{simpleType.name}</td>
                  <td>
                    {moment(simpleType.params.dateOfRestoration).format(
                      "DD.MM.YYYY"
                    )}
                  </td>
                  <td>
                    {moment(simpleType.params.dateOfRefusal).format(
                      "DD.MM.YYYY"
                    )}
                  </td>
                  <td>{simpleType.params.downTime}</td>
                  <td>{simpleType.params.uzk}</td>
                  <td style={{ cursor: "pointer" }}>
                    <MdEdit
                      size={24}
                      onClick={() => {
                        setSimpleType(simpleType);
                        setEditId(simpleType.id ? simpleType.id : "");
                      }}
                    />
                  </td>
                  <td style={{ cursor: "pointer" }}>
                    <MdDeleteOutline
                      size={24}
                      onClick={() => {
                        deleteSimpleType(
                          addressID ? addressID : "",
                          simpleType.id ? simpleType.id : ""
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
                value={simpleType?.name}
                onChange={(e) => {
                  setSimpleType((state) => {
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
                type="date"
                value={moment(simpleType.params.dateOfRestoration).format(
                  "YYYY-MM-DD"
                )}
                onChange={(e) => {
                  setSimpleType((state) => {
                    return {
                      ...state,
                      params: {
                        ...state.params,
                        dateOfRestoration: e.target.value,
                      },
                    };
                  });
                }}
              />
            </td>
            <td>
              <input
                type="date"
                value={moment(simpleType.params.dateOfRefusal).format(
                  "YYYY-MM-DD"
                )}
                onChange={(e) => {
                  setSimpleType((state) => {
                    return {
                      ...state,
                      params: {
                        ...state.params,
                        dateOfRefusal: e.target.value,
                      },
                    };
                  });
                }}
              />
            </td>
            <td>
              <input
                type="number"
                value={simpleType?.params.downTime}
                onChange={(e) => {
                  setSimpleType((state) => {
                    return {
                      ...state,
                      params: {
                        ...state.params,
                        downTime: Number(e.target.value),
                      },
                    };
                  });
                }}
              />
            </td>
            <td>
              <input
                type="number"
                value={simpleType?.params.uzk}
                onChange={(e) => {
                  setSimpleType((state) => {
                    return {
                      ...state,
                      params: {
                        ...state.params,
                        uzk: Number(e.target.value),
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
                    editSimpleType(
                      addressID ? addressID : "",
                      editId,
                      simpleType
                    ).then(() => {
                      setEditId("");
                      setSimpleType({
                        name: "",
                        params: {
                          dateOfRestoration: "",
                          dateOfRefusal: "",
                          downTime: 0,
                          uzk: 0,
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
                    addSimpleType(addressID ? addressID : "", simpleType).then(
                      () => {
                        setSimpleType({
                          name: "",
                          params: {
                            dateOfRestoration: "",
                            dateOfRefusal: "",
                            downTime: 0,
                            uzk: 0,
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
                    setSimpleType({
                      name: "",
                      params: {
                        dateOfRestoration: "",
                        dateOfRefusal: "",
                        downTime: 0,
                        uzk: 0,
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
      {simpleTypes && simpleTypes.totalCount / 20 > 1 && pageNumber && (
        <div className={styles.pagination}>
          <Pagination
            page={Number(pageNumber)}
            totalPages={Math.floor(simpleTypes.totalCount / 20)}
            handlePagination={handlePages}
          />
        </div>
      )}
    </div>
  );
});

export default SimpleType;
