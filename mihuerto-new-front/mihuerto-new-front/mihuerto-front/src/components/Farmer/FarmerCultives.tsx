import React from "react";
import { setQueryStringValue } from "../../../utils/utils";
import CustomTableData from "@/components/Table/CustomTableData/CustomTableData";
import { IUserCrop } from "../../../Types/IUserCrop";
import { useRouter } from "next/router";
import CardHead from "../../../CommonElements/CardHead";
import { Card, CardBody } from "reactstrap";
import format from "date-fns/format";

interface FarmerCultives {
  crops: IUserCrop[];
  totalCount: number;
}

const FarmerCultives = ({ crops, totalCount }: FarmerCultives) => {
  const router = useRouter();
  const columns = [
    {
      name: "Cultivo",
      selector: (row: IUserCrop) => `${row?.originalCultivationName}`,
      sortable: true,
      center: false,
    },
    {
      name: "Plantado",
      selector: (row: IUserCrop) =>
        `${format(new Date(row.datePlantation), "dd-MM-yyyy")}`,
      sortable: true,
      center: false,
    },
    {
      name: "Próximo Riego",
      selector: (row: IUserCrop) =>
        `${format(new Date(row.nextWateringDate), "dd-MM-yyyy")}`,
      sortable: true,
      center: false,
      width: "170px",
    },
    {
      name: "Ubicación",
      selector: (row: IUserCrop) => `${row.location}`,
      sortable: true,
      center: false,
    },
    {
      name: "Estado",
      selector: (row: IUserCrop) => `${row.status}`,
      sortable: true,
      center: false,
      width: "170px",
    },
    {
      name: "Cant. De plantas",
      selector: (row: IUserCrop) => `${row?.harvestNumber ?? "0"}`,
      sortable: true,
      center: false,
      width: "170px",
    },
    {
      name: "Cant. De cosechas",
      selector: (row: IUserCrop) => `${row?.numberCultivation ?? "0"}`,
      sortable: true,
      center: false,
      width: "170px",
    },
  ];

  if (!crops) return null;

  return (
    <Card className="height-equal p-0">
      <CardBody className="p-0">
        <CustomTableData
          columns={columns}
          hasPadding={false}
          data={crops}
          paginationTotalRows={totalCount}
          subHeader={false}
        />
      </CardBody>
    </Card>
  );
};

export default FarmerCultives;
