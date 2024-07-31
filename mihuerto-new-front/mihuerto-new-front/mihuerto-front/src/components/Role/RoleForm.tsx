import { ChangeEvent } from "react";
import CardHead from "CommonElements/CardHead";
import { Card, CardBody, FormFeedback, FormGroup } from "reactstrap";
import { SubmitForm } from "utils/Constant";
import { Button, Col, Input, Label } from "reactstrap";
import * as Yup from "yup";
import { ErrorMessage, Field, Formik, FormikHelpers } from "formik";
import { IRol } from "../../../Types/IRol";

interface RolFormProps {
  onSubmit: (data: IRol, formikHelpers: FormikHelpers<IRol>) => void;
  data?: IRol;
  title?: string;
  action?: string;
}

const RoleForm = ({
  onSubmit,
  data,
  title,
  action = "create",
}: RolFormProps) => {
  const validations = Yup.object().shape({
    name: Yup.string()
      .min(3, "El rol debe tener minimo 3 caracteres")
      .required("El rol es requerido"),
    description: Yup.string()
      .min(3, "La descripción debe tener minimo 3 caracteres")
      .required("La descripción es requerida"),
    active: Yup.boolean().default(true),
  });

  return (
    <Card className="height-equal w-100">
        {title && <CardHead title={title} headClass="custom-card-pd"/>}
      <CardBody className="custom-card-pd">
        <Formik
          initialValues={
            data
              ? {
                  ...data,
                }
              : {
                  name: "",
                  description: "",
                  active: true,
                  submit: undefined,
                }
          }
          validationSchema={validations}
          onSubmit={onSubmit}
        >
          {(props) => {
            const { errors, handleSubmit, isSubmitting, touched } = props;
            return (
              <form noValidate onSubmit={handleSubmit} className={`row g-3`}>
                <Col xs={6}>
                  <Label for="name">Rol</Label>
                  <Field
                    name="name"
                    as={Input}
                    placeholder="Admin"
                    invalid={touched.name && !!errors.name}
                  />
                  <ErrorMessage name="name" component={FormFeedback} />
                </Col>
                <Col xs={6}>
                  <Label for="description">Descripción</Label>
                  <Field
                    name="description"
                    as={Input}
                    placeholder="Descripción..."
                    invalid={touched.description && !!errors.description}
                  />
                  <ErrorMessage name="description" component={FormFeedback} />
                </Col>

                <Col xs={6}>
                  <FormGroup check>
                    <Field
                      id="active"
                      name="active"
                      as={Input}
                      type="checkbox"
                    />{" "}
                    &nbsp;
                    <Label for="active" className="form-check-label">
                      Esta activo
                    </Label>
                  </FormGroup>
                </Col>

                <Col xs={12}>
                  <Button color="primary" type="submit" disabled={isSubmitting}>
                    {SubmitForm}
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

export default RoleForm;
