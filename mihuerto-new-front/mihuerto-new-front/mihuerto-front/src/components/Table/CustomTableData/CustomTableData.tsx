import React, { ReactNode, useEffect, useMemo, useState } from "react";
import DataTable, { TableProps } from "react-data-table-component";
import { Card, CardBody, Col, FormGroup, Input, Label } from "reactstrap";
import TableHeader from "@/components/Headers/TableHeader/TableHeader";
import { useRouter } from "next/router";
import { setQueryStringValue } from "../../../../utils/utils";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

type CustomTableProps = {
  title?: string;
  button?: {
    title: string;
    onClick: () => void;
  };
  data: any[];
  filterData?: any[];
  columns: any[];
  hasPadding?: boolean;
  filter?: ReactNode;
} & TableProps<any>;

const NoData = () => (
  <React.Fragment>
    <p className="pt-3 pb-3">No hay datos disponibles</p>
  </React.Fragment>
);

const CustomTableData = ({
  title,
  button,
  data,
  columns,
  subHeader = true,
  hasPadding = true,
  filterData = [],
  ...otherProps
}: CustomTableProps) => {
  const router = useRouter();
  const [filterText, setFilterText] = useState("");

  const filteredItems = data?.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
  );

  useEffect(() => {
    setQueryStringValue(
      "page",
      router.query.page ? Number(router.query.page) : 1,
      router,
    );
    setQueryStringValue(
      "rowPerPage",
      router.query.rowPerPage ? Number(router.query.rowPerPage) : 10,
      router,
    );
  }, []);

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <div className="dataTables_filter filter-wrapper">
        {otherProps?.filter && otherProps.filter}
        <FormGroup className="search-input">
          <Label>Search: </Label>
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setQueryStringValue("search", e.target.value, router);
              setFilterText(e.target.value);
            }}
            type="search"
            value={filterText}
          />
        </FormGroup>
      </div>
    );
  }, [filterText, ...filterData]);

  const renderBody = () => {
    return (
      <>
        <TableHeader
          headingClassName="pb-0 card-no-border"
          Heading={title}
          button={button}
        />

        <div className="table-responsive">
          <DataTable
            columns={columns}
            data={filteredItems}
            subHeader={subHeader}
            subHeaderComponent={subHeaderComponentMemo}
            persistTableHead
            noDataComponent={<NoData />}
            pagination
            {...otherProps}
          />
        </div>
      </>
    );
  };

  return (
    <Col sm={12}>
      <Card className="main-zero-config">
        {hasPadding ? (
          <CardBody>{renderBody()}</CardBody>
        ) : (
          <div>{renderBody()}</div>
        )}
      </Card>
    </Col>
  );
};

export default CustomTableData;
