import { Tab, Tabs } from "react-bootstrap";
import styles from "./Tables.module.scss";
import { useSearchParams } from "react-router-dom";
import AnodeLine from "./Tables/AnodeLine";
import CathodeLine from "./Tables/CathodeLine";
import MonthlyOperatingExpense from "./Tables/MonthlyOperatingExpenses";
import PerformanceSpecification from "./Tables/PerformanceSpecification";
import ProtectiveGrounding from "./Tables/ProtectiveGrounding";
import SimpleType from "./Tables/SimpleType";

const Tables = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");

  return (
    <div className={styles.root}>
      <p className={styles.title}>{name}</p>
      <div className={styles.wrapper}>
        <Tabs
          defaultActiveKey="anodeLine"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="anodeLine" title="Анодная линия">
            <AnodeLine />
          </Tab>

          <Tab eventKey="cathodeLine" title="Катодная линия">
            <CathodeLine />
          </Tab>
          <Tab
            eventKey="monthlyOperatingExpenses"
            title="Ежемесячные операционные расходы"
          >
            <MonthlyOperatingExpense />
          </Tab>
          <Tab
            eventKey="performanceSpecification"
            title="Технические характеристики"
          >
            <PerformanceSpecification />
          </Tab>
          <Tab eventKey="protectiveGrounding" title="Защитное заземление">
            <ProtectiveGrounding />
          </Tab>
          <Tab eventKey="simpleType" title="Простой тип">
            <SimpleType />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Tables;
