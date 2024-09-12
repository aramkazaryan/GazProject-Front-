import { Button, Table } from "react-bootstrap";
import styles from "../Tables.module.scss";
import { useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "stores/RootStore";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import moment from "moment";
import Pagination from "components/Pagination";
import { IMonthlyOperatingExpense } from "stores/MonthlyOperatingExpenseStore";

const MonthlyOperatingExpense = observer(() => {
  const {
    MonthlyOperatingExpenseStore: {
      getAllMonthlyOperatingExpenses,
      addMonthlyOperatingExpense,
      editMonthlyOperatingExpense,
      monthlyOperatingExpenses,
      deleteMonthlyOperatingExpense,
    },
  } = useContext(RootStoreContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const newParams = new URLSearchParams(searchParams);

  const pageNumber = searchParams.get("pageNumber");
  const addressID = searchParams.get("id");

  useEffect(() => {
    if (addressID) {
      getAllMonthlyOperatingExpenses(addressID, Number(pageNumber));
    }
  }, [getAllMonthlyOperatingExpenses, pageNumber, addressID]);

  const [monthlyOperatingExpense, setMonthlyOperatingExpense] =
    useState<IMonthlyOperatingExpense>({
      name: "",
      params: {
        dateOfReport: "",
        monthlyConsumption: 0,
        toque: 0,
        outputVoltage: 0,
        monthlyReport: "",
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
            <th>Дата отчета</th>
            <th>Ежемесячное потребление</th>
            <th>Ток</th>
            <th>Выходное напряжение</th>
            <th>Ежемесячный отчет</th>
            <th colSpan={2}></th>
          </tr>
        </thead>
        <tbody>
          {monthlyOperatingExpenses &&
            monthlyOperatingExpenses?.itesm.map((monthlyOperatingExpense) => {
              return (
                <tr key={monthlyOperatingExpense.id}>
                  <td>{monthlyOperatingExpense.name}</td>
                  <td>
                    {moment(monthlyOperatingExpense.params.dateOfReport).format(
                      "DD.MM.YYYY"
                    )}
                  </td>
                  <td>{monthlyOperatingExpense.params.monthlyConsumption}</td>
                  <td>{monthlyOperatingExpense.params.toque}</td>
                  <td>{monthlyOperatingExpense.params.outputVoltage}</td>
                  <td>
                    {moment(
                      monthlyOperatingExpense.params.monthlyReport
                    ).format("DD.MM.YYYY")}
                  </td>
                  <td style={{ cursor: "pointer" }}>
                    <MdEdit
                      size={24}
                      onClick={() => {
                        setMonthlyOperatingExpense(monthlyOperatingExpense);
                        setEditId(
                          monthlyOperatingExpense.id
                            ? monthlyOperatingExpense.id
                            : ""
                        );
                      }}
                    />
                  </td>
                  <td style={{ cursor: "pointer" }}>
                    <MdDeleteOutline
                      size={24}
                      onClick={() => {
                        deleteMonthlyOperatingExpense(
                          addressID ? addressID : "",
                          monthlyOperatingExpense.id
                            ? monthlyOperatingExpense.id
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
                value={monthlyOperatingExpense?.name}
                onChange={(e) => {
                  setMonthlyOperatingExpense((state) => {
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
                value={moment(
                  monthlyOperatingExpense.params.dateOfReport
                ).format("YYYY-MM-DD")}
                onChange={(e) => {
                  setMonthlyOperatingExpense((state) => {
                    return {
                      ...state,
                      params: {
                        ...state.params,
                        dateOfReport: e.target.value,
                      },
                    };
                  });
                }}
              />
            </td>
            <td>
              <input
                type="number"
                value={monthlyOperatingExpense?.params.monthlyConsumption}
                onChange={(e) => {
                  setMonthlyOperatingExpense((state) => {
                    return {
                      ...state,
                      params: {
                        ...state.params,
                        monthlyConsumption: Number(e.target.value),
                      },
                    };
                  });
                }}
              />
            </td>
            <td>
              <input
                type="number"
                value={monthlyOperatingExpense?.params.toque}
                onChange={(e) => {
                  setMonthlyOperatingExpense((state) => {
                    return {
                      ...state,
                      params: {
                        ...state.params,
                        toque: Number(e.target.value),
                      },
                    };
                  });
                }}
              />
            </td>
            <td>
              <input
                type="number"
                value={monthlyOperatingExpense?.params.outputVoltage}
                onChange={(e) => {
                  setMonthlyOperatingExpense((state) => {
                    return {
                      ...state,
                      params: {
                        ...state.params,
                        outputVoltage: Number(e.target.value),
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
                  monthlyOperatingExpense.params.monthlyReport
                ).format("YYYY-MM-DD")}
                onChange={(e) => {
                  setMonthlyOperatingExpense((state) => {
                    return {
                      ...state,
                      params: {
                        ...state.params,
                        monthlyReport: e.target.value,
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
                    editMonthlyOperatingExpense(
                      addressID ? addressID : "",
                      editId,
                      monthlyOperatingExpense
                    ).then(() => {
                      setEditId("");
                      setMonthlyOperatingExpense({
                        name: "",
                        params: {
                          dateOfReport: "",
                          monthlyConsumption: 0,
                          toque: 0,
                          outputVoltage: 0,
                          monthlyReport: "",
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
                    addMonthlyOperatingExpense(
                      addressID ? addressID : "",
                      monthlyOperatingExpense
                    ).then(() => {
                      setMonthlyOperatingExpense({
                        name: "",
                        params: {
                          dateOfReport: "",
                          monthlyConsumption: 0,
                          toque: 0,
                          outputVoltage: 0,
                          monthlyReport: "",
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
                    setMonthlyOperatingExpense({
                      name: "",
                      params: {
                        dateOfReport: "",
                        monthlyConsumption: 0,
                        toque: 0,
                        outputVoltage: 0,
                        monthlyReport: "",
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
      {monthlyOperatingExpenses &&
        monthlyOperatingExpenses.totalCount / 20 > 1 &&
        pageNumber && (
          <div className={styles.pagination}>
            <Pagination
              page={Number(pageNumber)}
              totalPages={Math.floor(monthlyOperatingExpenses.totalCount / 20)}
              handlePagination={handlePages}
            />
          </div>
        )}
    </div>
  );
});

export default MonthlyOperatingExpense;
