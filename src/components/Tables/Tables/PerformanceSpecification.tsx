import { Button, Table } from "react-bootstrap";
import styles from "../Tables.module.scss";
import { useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { IPerformanceSpecification } from "stores/PerformanceSpecificationStore";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "stores/RootStore";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import moment from "moment";
import Pagination from "components/Pagination";

const PerformanceSpecification = observer(() => {
  const {
    PerformanceSpecificationStore: {
      getAllPerformanceSpecifications,
      addPerformanceSpecification,
      editPerformanceSpecification,
      performanceSpecifications,
      deletePerformanceSpecification,
    },
  } = useContext(RootStoreContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const newParams = new URLSearchParams(searchParams);

  const pageNumber = searchParams.get("pageNumber");
  const addressID = searchParams.get("id");

  useEffect(() => {
    if (addressID) {
      getAllPerformanceSpecifications(addressID, Number(pageNumber));
    }
  }, [getAllPerformanceSpecifications, pageNumber, addressID]);

  const [performanceSpecification, setPerformanceSpecification] =
    useState<IPerformanceSpecification>({
      name: "",
      params: {
        skzType: "",
        type: "",
        productionNumber: "",
        yearOfManufacturing: 0,
        installationsDate: "",
        hourMeterType: "",
        energyMeterType: "",
        conversionOutputPower: 0,
        decommissioningDate: "",
        technicalCondition: "",
        note: "",
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
            <th>Тип skz</th>
            <th>Тип</th>
            <th>Номер производства</th>
            <th>Год производства</th>
            <th>Дата установки</th>
            <th>Тип счетчика часов</th>
            <th>Тип счетчика энергии</th>
            <th>Выходная мощность преобразования</th>
            <th>Дата вывода из эксплуатации</th>
            <th>Техническое состояние</th>
            <th>Примечание</th>
            <th colSpan={2}></th>
          </tr>
        </thead>
        <tbody>
          {performanceSpecifications &&
            performanceSpecifications?.itesm.map((performanceSpecification) => {
              return (
                <tr key={performanceSpecification.id}>
                  <td>{performanceSpecification.name}</td>
                  <td>{performanceSpecification.params.skzType}</td>
                  <td>{performanceSpecification.params.type}</td>
                  <td>{performanceSpecification.params.productionNumber}</td>
                  <td>{performanceSpecification.params.yearOfManufacturing}</td>
                  <td>
                    {moment(
                      performanceSpecification.params.installationsDate
                    ).format("DD.MM.YYYY")}
                  </td>
                  <td>{performanceSpecification.params.hourMeterType}</td>
                  <td>{performanceSpecification.params.energyMeterType}</td>
                  <td>
                    {performanceSpecification.params.conversionOutputPower}
                  </td>
                  <td>
                    {moment(
                      performanceSpecification.params.decommissioningDate
                    ).format("DD.MM.YYYY")}
                  </td>
                  <td>{performanceSpecification.params.technicalCondition}</td>
                  <td>{performanceSpecification.params.note}</td>
                  <td style={{ cursor: "pointer" }}>
                    <MdEdit
                      size={24}
                      onClick={() => {
                        setPerformanceSpecification(performanceSpecification);
                        setEditId(
                          performanceSpecification.id
                            ? performanceSpecification.id
                            : ""
                        );
                      }}
                    />
                  </td>
                  <td style={{ cursor: "pointer" }}>
                    <MdDeleteOutline
                      size={24}
                      onClick={() => {
                        deletePerformanceSpecification(
                          addressID ? addressID : "",
                          performanceSpecification.id
                            ? performanceSpecification.id
                            : ""
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
                value={performanceSpecification?.name}
                onChange={(e) => {
                  setPerformanceSpecification((state) => {
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
                value={performanceSpecification?.params.skzType}
                onChange={(e) => {
                  setPerformanceSpecification((state) => {
                    return {
                      ...state,
                      params: { ...state.params, skzType: e.target.value },
                    };
                  });
                }}
              />
            </td>
            <td>
              <input
                type="text"
                value={performanceSpecification?.params.type}
                onChange={(e) => {
                  setPerformanceSpecification((state) => {
                    return {
                      ...state,
                      params: { ...state.params, type: e.target.value },
                    };
                  });
                }}
              />
            </td>
            <td>
              <input
                type="text"
                value={performanceSpecification?.params.productionNumber}
                onChange={(e) => {
                  setPerformanceSpecification((state) => {
                    return {
                      ...state,
                      params: {
                        ...state.params,
                        productionNumber: e.target.value,
                      },
                    };
                  });
                }}
              />
            </td>
            <td>
              <input
                type="number"
                value={performanceSpecification?.params.yearOfManufacturing}
                onChange={(e) => {
                  setPerformanceSpecification((state) => {
                    return {
                      ...state,
                      params: {
                        ...state.params,
                        yearOfManufacturing: Number(e.target.value),
                      },
                    };
                  });
                }}
              />
            </td>
            <td>
              <input
                type="date"
                value={moment(
                  performanceSpecification.params.installationsDate
                ).format("YYYY-MM-DD")}
                onChange={(e) => {
                  setPerformanceSpecification((state) => {
                    return {
                      ...state,
                      params: {
                        ...state.params,
                        installationsDate: e.target.value,
                      },
                    };
                  });
                }}
              />
            </td>
            <td>
              <input
                type="text"
                value={performanceSpecification?.params.hourMeterType}
                onChange={(e) => {
                  setPerformanceSpecification((state) => {
                    return {
                      ...state,
                      params: {
                        ...state.params,
                        hourMeterType: e.target.value,
                      },
                    };
                  });
                }}
              />
            </td>
            <td>
              <input
                type="text"
                value={performanceSpecification?.params.energyMeterType}
                onChange={(e) => {
                  setPerformanceSpecification((state) => {
                    return {
                      ...state,
                      params: {
                        ...state.params,
                        energyMeterType: e.target.value,
                      },
                    };
                  });
                }}
              />
            </td>
            <td>
              <input
                type="number"
                value={performanceSpecification?.params.conversionOutputPower}
                onChange={(e) => {
                  setPerformanceSpecification((state) => {
                    return {
                      ...state,
                      params: {
                        ...state.params,
                        conversionOutputPower: Number(e.target.value),
                      },
                    };
                  });
                }}
              />
            </td>
            <td>
              <input
                type="date"
                value={moment(
                  performanceSpecification.params.decommissioningDate
                ).format("YYYY-MM-DD")}
                onChange={(e) => {
                  setPerformanceSpecification((state) => {
                    return {
                      ...state,
                      params: {
                        ...state.params,
                        decommissioningDate: e.target.value,
                      },
                    };
                  });
                }}
              />
            </td>
            <td>
              <input
                type="text"
                value={performanceSpecification?.params.technicalCondition}
                onChange={(e) => {
                  setPerformanceSpecification((state) => {
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
                type="text"
                value={performanceSpecification?.params.note}
                onChange={(e) => {
                  setPerformanceSpecification((state) => {
                    return {
                      ...state,
                      params: {
                        ...state.params,
                        note: e.target.value,
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
                    editPerformanceSpecification(
                      addressID ? addressID : "",
                      editId,
                      performanceSpecification
                    ).then(() => {
                      setEditId("");
                      setPerformanceSpecification({
                        name: "",
                        params: {
                          skzType: "",
                          type: "",
                          productionNumber: "",
                          yearOfManufacturing: 0,
                          installationsDate: "",
                          hourMeterType: "",
                          energyMeterType: "",
                          conversionOutputPower: 0,
                          decommissioningDate: "",
                          technicalCondition: "",
                          note: "",
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
                    addPerformanceSpecification(
                      addressID ? addressID : "",
                      performanceSpecification
                    ).then(() => {
                      setPerformanceSpecification({
                        name: "",
                        params: {
                          skzType: "",
                          type: "",
                          productionNumber: "",
                          yearOfManufacturing: 0,
                          installationsDate: "",
                          hourMeterType: "",
                          energyMeterType: "",
                          conversionOutputPower: 0,
                          decommissioningDate: "",
                          technicalCondition: "",
                          note: "",
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
                    setPerformanceSpecification({
                      name: "",
                      params: {
                        skzType: "",
                        type: "",
                        productionNumber: "",
                        yearOfManufacturing: 0,
                        installationsDate: "",
                        hourMeterType: "",
                        energyMeterType: "",
                        conversionOutputPower: 0,
                        decommissioningDate: "",
                        technicalCondition: "",
                        note: "",
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
      {performanceSpecifications &&
        performanceSpecifications.totalCount / 20 > 1 &&
        pageNumber && (
          <div className={styles.pagination}>
            <Pagination
              page={Number(pageNumber)}
              totalPages={Math.floor(performanceSpecifications.totalCount / 20)}
              handlePagination={handlePages}
            />
          </div>
        )}
    </div>
  );
});

export default PerformanceSpecification;
