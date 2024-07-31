import CardHead from "CommonElements/CardHead";
import { Alert, Card, CardBody, FormFeedback, FormGroup } from "reactstrap";
import { SubmitForm } from "utils/Constant";
import { Button, Col, Input, Label } from "reactstrap";
import * as Yup from "yup";
import { ErrorMessage, Field, Formik, FormikHelpers } from "formik";
import { ICategory } from "../../../Types/ICategory";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { validIfIsBase64 } from "../../../utils/utils";

interface CategoryFormProps {
  onSubmit: (data: ICategory, formikHelpers: FormikHelpers<ICategory>) => void;
  data?: ICategory;
  title?: string;
  action?: string;
}

const CategoryForm = ({
  onSubmit,
  data,
  title,
  action = "create",
}: CategoryFormProps) => {
  const validations = Yup.object().shape({
    name: Yup.string()
      .min(3, "El rol debe tener minimo 3 caracteres")
      .required("El rol es requerido"),
    description: Yup.string()
      .min(3, "La descripción debe tener minimo 3 caracteres")
      .required("La descripción es requerida"),
    active: Yup.boolean().default(true),
    image: Yup.string().required("La imagen es requerida"),
  });

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>,
    setFieldValue: any,
  ): void => {
    const file: File | null = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader: FileReader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target) {
          setFieldValue("image", e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
    setFieldValue("image", null);
  };

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
                  image: "",
                  submit: undefined,
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
              values,
              setFieldValue,
            } = props;
            return (
              <form noValidate onSubmit={handleSubmit} className={`row g-3`}>
                <Col xs={6}>
                  <Label for="name">Categoria</Label>
                  <Field
                    name="name"
                    as={Input}
                    placeholder="Categoria..."
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
                    type="textarea"
                    minRows="3"
                  />
                  <ErrorMessage name="description" component={FormFeedback} />
                </Col>
                <Col xs={6}>
                  <Label for="image">Imagen</Label>

                  <Image
                    src={
                      values.image && validIfIsBase64(values.image)
                        ? values.image
                        : values.image
                          ? `${process.env.SERVER_URL}${values.image}`
                          : "/assets/images/no-image.jpeg"
                    }
                    alt="uploaded image"
                    className={`img-fluid`}
                    width={"355"}
                    height="400"
                  />

                  <Field
                    type="file"
                    as={Input}
                    name="image-temp"
                    accept="image/*"
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      handleImageChange(event, setFieldValue)
                    }
                    invalid={touched.image && !!errors.image}
                  />
                  <div style={{ color: "red", marginTop: "10px" }}>
                    Para mejor experiencia del usuario se recomienda una imagen
                    sin fondo.
                  </div>
                  <ErrorMessage name="image" component={FormFeedback} />
                </Col>
                <Col xs={6}>
                  <Label>Estado</Label>
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

                <Col xs={12} className="gap-2">
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

export default CategoryForm;
