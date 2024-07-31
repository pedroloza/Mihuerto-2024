import CardHead from "CommonElements/CardHead";
import { Alert, Card, CardBody, FormFeedback, FormGroup } from "reactstrap";
import { SubmitForm } from "utils/Constant";
import { Button, Col, Input, Label } from "reactstrap";
import * as Yup from "yup";
import { ErrorMessage, Field, Formik, FormikHelpers } from "formik";
import { ICategory } from "../../../Types/ICategory";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { IProtection } from "../../../Types/IProtection";
import { validIfIsBase64 } from "../../../utils/utils";

interface ProtectionFormProps {
  onSubmit: (
    data: IProtection,
    formikHelpers: FormikHelpers<IProtection>,
  ) => void;
  data?: IProtection;
  title?: string;
  action?: string;
}

const ProtectionForm = ({
  onSubmit,
  data,
  title,
  action = "create",
}: ProtectionFormProps) => {
  const validations = Yup.object().shape({
    name: Yup.string()
      .min(3, "El nombre debe tener minimo 3 caracteres")
      .required("El nombre es requerido"),
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
                  <Label for="name">Nombre</Label>
                  <Field
                    name="name"
                    as={Input}
                    placeholder="Nombre..."
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

export default ProtectionForm;
