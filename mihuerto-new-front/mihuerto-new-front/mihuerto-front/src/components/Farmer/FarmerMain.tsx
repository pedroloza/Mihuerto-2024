import React, { useState } from "react";
import format from "date-fns/format";

import CardHead from "../../../CommonElements/CardHead";
import { Badge, Button, Card, CardBody, Col, Row } from "reactstrap";
import { UserProps } from "../../../Types/IUser";
import FieldDescription from "@/components/Farmer/FieldDescription";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { setStatusUser } from "../../../helper/api/users";
import { mutate } from "swr";

interface FarmerMainProps {
  title: string;
  user: UserProps;
}

const FarmerMain = ({ title, user }: FarmerMainProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeStatus = async () => {
    Swal.fire({
      title: "Esta seguro?",
      text: `Esta acción ${user?.active ? "desactivara" : "activara"} el usuario!`,
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        if (user && user._id) {
          setStatusUser(user!._id).then((res) => {
            mutate(`/getUser/${user!._id}`);
            mutate(`/getAllUsersFarmers`);
            mutate("getAllUsersFarmers");
            Swal.fire({
              text: "Acción completada con exito!",
              icon: "success",
            });
            setIsLoading(false);
          });
        } else {
          Swal.fire({
            text: "Acción no completada!",
            icon: "error",
          });
          setIsLoading(false);
        }
      }
    });
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHead title={title} headClass="custom-card-pm" />
      <CardBody>
        <Row>
          <Col xs={6}>
            <FieldDescription
              title="Nombre"
              description={`${user.name} ${user.lastName}`}
            />
          </Col>
          <Col xs={6}>
            <FieldDescription title="Cédula" description={`${user.dni}`} />
          </Col>
          <Col xs={6}>
            <FieldDescription title="Correo" description={`${user.email}`} />
          </Col>
          <Col xs={6}>
            <FieldDescription
              title="Fecha de nacimiento"
              description={`${format(new Date(user.dateOfBirth), "dd-MM-yyyy")}`}
            />
          </Col>
          <Col xs={6}>
            <FieldDescription title="Teléfono" description={user.phone} />
          </Col>
          <Col xs={6}>
            <FieldDescription title="Parroquia" description={user.parish} />
          </Col>
          <Col xs={6}>
            <FieldDescription title="Rol" description={user.position} />
          </Col>
          <Col xs={6}>
            <>
              <h6 className="pb-1">Estado</h6>
              {user.active ? (
                <Badge color="success">Activo</Badge>
              ) : (
                <Badge color="danger">Desactivado</Badge>
              )}
            </>
          </Col>
          <Col xs={12} className="pt-5 d-flex gap-3">
            <Button
              color="primary"
              onClick={() => handleChangeStatus()}
              disabled={isLoading}
            >
              {user.active ? "Desactivar" : "Activar"} Usuario
            </Button>
            <Button
              color="danger"
              onClick={() => {
                router.push("/dashboard/farmers");
              }}
            >
              Cancelar
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default FarmerMain;
