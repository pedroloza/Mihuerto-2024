import { ChangeEvent, useContext, useState } from "react";
import CardHead from "CommonElements/CardHead";
import { Card, CardBody, FormFeedback, FormGroup } from "reactstrap";
import {
  Address,
  BirthDate,
  dniRegExp,
  Emailaddress,
  FirstName,
  IdCard,
  LastName,
  Parish,
  Password,
  Phone,
  Position,
  Role,
  SubmitForm,
} from "utils/Constant";
import { Button, Col, Input, Label } from "reactstrap";
import * as Yup from "yup";
import { ErrorMessage, Field, Formik, FormikHelpers } from "formik";

import { parse } from "date-fns";
import { UserProps } from "../../../Types/IUser";
import useSWR from "swr";
import { getActiveRoles } from "../../../helper/api/role";
import { IRol } from "../../../Types/IRol";
import { PARISHES } from "../../../utils/constants";
import layoutContext from "helper/Layout";
import CustomPasswordInput from "@/components/Inputs/CustomPasswordInput";
import { useRouter } from "next/router";

interface UserFormProps {
  onSubmit: (data: UserProps, formikHelpers: FormikHelpers<UserProps>) => void;
  data?: any;
  title: string;
  action?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

const UserForm = ({
  onSubmit,
  data,
  title,
  action = "create",
  disabled = false,
  isLoading = false,
}: UserFormProps) => {
  const router = useRouter();
  const { showLoadingModal, hideLoadingModal } = useContext(layoutContext);
  const roles = useSWR(`/getRolesActives`, () => {
    showLoadingModal();
    const activeRoles = getActiveRoles();
    hideLoadingModal();
    return activeRoles;
  });

  const validations = Yup.object().shape({
    name: Yup.string()
      .min(3, "El nombre debe tener minimo 3 caracteres")
      .required("El nombre es requerido"),
    lastName: Yup.string()
      .min(3, "El apellido debe tener minimo 3 caracteres")
      .required("El apellido es requerido"),
    username: Yup.string()
      .required("El nombre de usuario es requerido")
      .min(3, "El nombre de usuario debe tener minimo 4 caracteres"),
    password: Yup.string()
      .required("La contraseña es requerida")
      .min(3, "La contraseña debe tener minimo 3 caracteres"),
    dni: Yup.string()
      .matches(dniRegExp, "El número de cédula es invalido")
      .min(10, "El número debe contener 10 caracteres")
      .max(10, "El número debe contener 10 caracteres")
      .required("El número de cédula"),
    address: Yup.string().required("La dirección es requerida"),
    dateOfBirth: Yup.date()
      .transform((value, originalValue, schema) => {
        if (schema.isType(value)) {
          return value;
        }
        const result = parse(originalValue, "dd.MM.yyyy", new Date());
        return result;
      })
      .typeError("Ingrese una fecha valida")
      .required(),
    email: Yup.string()
      .email("El email debe ser valido")
      .max(255)
      .required("El email es requerido"),
    phone: Yup.string()
      .min(10, "El número debe contener 10 caracteres")
      .max(10, "El número debe contener 10 caracteres")
      .required("El número de teléfono es requerido"),
    position: Yup.string().required("El cargo es requerido"),
    parish: Yup.string().required("La parroquia es requerida"),
    idRole: Yup.string().required("El rol es requerido"),
    active: Yup.boolean().default(true),
  });

  if (!roles?.data?.data) return null;

  return (
    <Card className="height-equal">
      <CardHead title={title} />
      <CardBody>
        <Formik
          initialValues={
            data
              ? {
                  ...data,
                  dateOfBirth: data.dateOfBirth
                    ? data.dateOfBirth.split("T")[0]
                    : new Date(),
                  active: !!data.active,
                }
              : {
                  name: "",
                  lastName: "",
                  username: "",
                  password: "",
                  dni: "",
                  address: "",
                  dateOfBirth: "",
                  email: "",
                  phone: "",
                  position: "",
                  parish: "",
                  idRole: "",
                  active: true,
                  submit: null,
                }
          }
          validationSchema={validations}
          onSubmit={onSubmit}
        >
          {(props) => {
            const {
              errors,
              handleSubmit,
              isSubmitting,
              touched,
              setFieldValue,
            } = props;
            return (
              <form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
                className={`row g-3`}
              >
                <Col xs={6}>
                  <Label for="name">{FirstName}</Label>
                  <Field
                    name="name"
                    as={Input}
                    invalid={touched.name && !!errors.name}
                    disabled={disabled}
                  />
                  <ErrorMessage name="name" component={FormFeedback} />
                </Col>
                <Col xs={6}>
                  <Label for="lastName">{LastName}</Label>
                  <Field
                    name="lastName"
                    as={Input}
                    invalid={touched.lastName && !!errors.lastName}
                    disabled={disabled}
                  />
                  <ErrorMessage name="lastName" component={FormFeedback} />
                </Col>
                <Col xs={6}>
                  <Label for="username">Nombre de Usuario</Label>
                  <Field
                    name="username"
                    as={Input}
                    invalid={touched.username && !!errors.username}
                    autoComplete="off"
                    disabled={disabled}
                  />
                  <ErrorMessage name="lastName" component={FormFeedback} />
                </Col>
                <Col xs={6}>
                  <Label for="password">{Password}</Label>
                  <Field
                    name="password"
                    as={CustomPasswordInput}
                    invalid={touched.password && !!errors.password}
                    disabled={disabled}
                    form={{ errors, touched }}
                  />
                  <ErrorMessage name="password" component={FormFeedback} />
                </Col>
                <Col xs={6}>
                  <Label for="dni">{IdCard}</Label>
                  <Field
                    name="dni"
                    as={Input}
                    invalid={touched.dni && !!errors.dni}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const text = e.target.value;
                      if (/^\d*$/.test(text) && text.length <= 10) {
                        setFieldValue("dni", text);
                      }
                    }}
                    disabled={disabled}
                  />
                  <ErrorMessage name="dni" component={FormFeedback} />
                </Col>
                <Col xs={6}>
                  <Label for="address">{Address}</Label>
                  <Field
                    name="address"
                    as={Input}
                    invalid={touched.address && !!errors.address}
                    disabled={disabled}
                  />
                  <ErrorMessage name="address" component={FormFeedback} />
                </Col>
                <Col xs={6}>
                  <Label for="dateOfBirth">{BirthDate}</Label>
                  <Field
                    name="dateOfBirth"
                    as={Input}
                    type="date"
                    placeholder="dd/mm/yyyy"
                    invalid={touched.dateOfBirth && !!errors.dateOfBirth}
                    disabled={disabled}
                  />
                  <ErrorMessage name="dateOfBirth" component={FormFeedback} />
                </Col>
                <Col xs={6}>
                  <Label for="email">{Emailaddress}</Label>
                  <Field
                    name="email"
                    as={Input}
                    invalid={touched.email && !!errors.email}
                    disabled={disabled}
                  />
                  <ErrorMessage name="email" component={FormFeedback} />
                </Col>
                <Col xs={6}>
                  <Label for="phone">{Phone}</Label>
                  <Field
                    name="phone"
                    as={Input}
                    invalid={touched.dni && !!errors.dni}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const text = e.target.value;
                      if (/^\d*$/.test(text) && text.length <= 10) {
                        setFieldValue("phone", text);
                      }
                    }}
                    disabled={disabled}
                  />
                  <ErrorMessage name="phone" component={FormFeedback} />
                </Col>
                <Col xs={6}>
                  <Label for="position">{Position}</Label>
                  <Field
                    name="position"
                    as={Input}
                    invalid={touched.position && !!errors.position}
                    disabled={disabled}
                  />
                  <ErrorMessage name="position" component={FormFeedback} />
                </Col>
                <Col xs={6}>
                  <Label for="parish">{Parish}</Label>
                  <Field
                    name="parish"
                    as={Input}
                    type="select"
                    invalid={touched.parish && !!errors.parish}
                    disabled={disabled}
                  >
                    <option value="">Selecciona una opción</option>
                    {PARISHES.map((parish, index) => (
                      <option value={parish} key={`parish-${index}`}>
                        {parish}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="parish" component={FormFeedback} />
                </Col>
                <Col xs={6}>
                  <Label for="idRole">{Role}</Label>
                  <Field
                    name="idRole"
                    as={Input}
                    type="select"
                    invalid={touched.idRole && !!errors.idRole}
                    disabled={disabled}
                  >
                    <option value="">Selecciona una opción</option>
                    {roles.data.data.map(
                      (role: IRol, index: number) =>
                        role.name !== "app" && (
                          <option value={role._id} key={`role-key-${index}`}>
                            {role.name}
                          </option>
                        ),
                    )}
                  </Field>
                  <ErrorMessage name="idRole" component={FormFeedback} />
                </Col>
                {action === "edit" && (
                  <Col xs={6}>
                    <Field
                      name="active"
                      as={Input}
                      type="checkbox"
                      disabled={disabled}
                    />{" "}
                    &nbsp;
                    <Label for="active" className="form-check-label">
                      Esta activo
                    </Label>
                  </Col>
                )}
                <Col xs={12}>
                  {!disabled && (
                    <Button
                      color="primary"
                      type="submit"
                      disabled={isSubmitting || isLoading}
                    >
                      {SubmitForm}
                    </Button>
                  )}
                  &nbsp; &nbsp;
                  <Button
                    color="danger"
                    onClick={() => {
                      router.push("/dashboard/users");
                    }}
                  >
                    Cancelar
                  </Button>
                </Col>
              </form>
            );
          }}
        </Formik>
      </CardBody>
    </Card>
  );
};

export default UserForm;
