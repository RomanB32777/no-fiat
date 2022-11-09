import React from "react";
import { ConfigProvider, Table } from "antd";
import type { TableProps } from "antd/es/table";
import EmptyBlock from "../EmptyBlock";
import "./styles.sass";

interface ITableData<T> extends TableProps<T> {}

const TableComponent = <T extends object>({
  dataSource,
  columns,
  pagination,
  loading,
}: React.PropsWithChildren<ITableData<T>>): React.ReactElement => {
  return (
    <ConfigProvider renderEmpty={EmptyBlock}>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
        loading={loading}
      />
    </ConfigProvider>
  );
};

export default TableComponent;
