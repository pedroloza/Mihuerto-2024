import CardHead from "CommonElements/CardHead";
import { Card, CardBody, FormFeedback, FormGroup, Media } from "reactstrap";
import { Role, SubmitForm } from "utils/Constant";
import { Button, Col, Input, Label } from "reactstrap";
import * as Yup from "yup";
import { ErrorMessage, Field, FieldProps, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import { ICrop } from "../../../Types/ICrop";
import {
  climateTypes,
  initialStateCrop,
  irrigationAmounts,
  soilTypes,
  solarLights,
  sowingSeasons,
  transplantSoils,
} from "../../../utils/constants";
import useSWR from "swr";
import { getAllCategoryActive } from "../../../helper/api/categories";
import { ICategory } from "../../../Types/ICategory";
import CustomTypehead from "@/components/Forms/Fields/CustomTypehead";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import {
  getAllFertiliser,
  getAllFertiliserWithoutPagination,
} from "../../../helper/api/fertilizer";
import { getAllPlague } from "../../../helper/api/plague";
import { getAllReproductions } from "../../../helper/api/reproduction";
import { getAllCultivation } from "../../../helper/api/crops";
import { validIfIsBase64 } from "../../../utils/utils";
import { getAllOrganicFertiliserWithoutPagination } from "../../../helper/api/organic-fertilizer";

interface CropFormProps {
  onSubmit: (data: ICrop, formikHelpers: FormikHelpers<ICrop>) => void;
  data?: ICrop;
  title: string;
  action?: string;
}

const CropForm = ({
  onSubmit,
  data,
  title,
  action = "create",
}: CropFormProps) => {
  const router = useRouter();

  const validations = Yup.object().shape({
    name: Yup.string()
      .min(3, "El nombre debe tener minimo 3 caracteres")
      .required("El nombre es requerido"),
    description: Yup.string()
      .min(3, "La descripción debe tener minimo 3 caracteres")
      .required("La descripción es requerida"),
    image: Yup.string().required("La imagen es requerida"),
    scientificName: Yup.string()
      .min(3, "El nombre científico debe tener minimo 3 caracteres")
      .required("El nombre científico es requerido"),
    active: Yup.boolean().default(true),
    categoryId: Yup.string().required("La categoria es requerida"),
    beneficalNeighboursId: Yup.array(),
    germinationTime: Yup.number().min(
      1,
      "El tiempo minimo de germinación debe ser 1",
    ),
    harvestTime: Yup.number().min(1, "El tiempo de coseña minimo debe ser 1"),
    sowingSeason: Yup.string().required(
      "La temporada de plantación es requerida",
    ),
    plantedAtHome: Yup.boolean().default(true),
    plotSize: Yup.string().min(1, "El tamaño minimo debe ser 1").default("1"),
    thermalFloor: Yup.string().required("El tipo de clima es requerido"),
    irrigationAmount: Yup.string().required(
      "La cantidad de riego es requerida",
    ),
    typeOfSoil: Yup.string().required("El tipo de suelo es requerido"),
    plaguesId: Yup.array().required(),
    harmfulNeighboursId: Yup.array().required(),
    reproductionsId: Yup.array().required(),
    transplantSoil: Yup.string().required("El pH del suelo es requerido"),
    solarLight: Yup.string().required("La cantidad de luz solar es requerida"),
    temperatureMax: Yup.number().required("La temperatura máxima es requerida"),
    temperatureMin: Yup.number().required("La temperatura minima es requerida"),
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

  const categories = useSWR([`/getAllCategoryActive`], () =>
    getAllCategoryActive(),
  );
  const fertiliser = useSWR([`/getAllFertiliserWithoutPagination`], () =>
    getAllFertiliserWithoutPagination(),
  );

  const organicFertiliser = useSWR(
    [`/getAllOrganicFertiliserWithoutPagination`],
    () => getAllOrganicFertiliserWithoutPagination(),
  );

  console.log(organicFertiliser.data);
  const plagues = useSWR([`/getAllPlague`], () => getAllPlague());
  const reproductionsMethods = useSWR([`/getAllReproductions`], () =>
    getAllReproductions(),
  );
  const cultivates = useSWR([`/getAllCultivation`], () => getAllCultivation());

  return (
    <Card className="height-equal w-100">
      <CardHead title={title} headClass="custom-card-pd" />
      <CardBody className="custom-card-pd">
        <Formik
          initialValues={
            data
              ? {
                  ...data,
                }
              : initialStateCrop
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
                    invalid={touched.name && !!errors.name}
                  />
                  <ErrorMessage name="name" component={FormFeedback} />
                </Col>
                <Col xs={6}>
                  <Label for="description">Descripción</Label>
                  <Field
                    name="description"
                    as={Input}
                    type="textarea"
                    minRows={1}
                    invalid={touched.description && !!errors.description}
                  />
                  <ErrorMessage name="description" component={FormFeedback} />
                </Col>
                <Col xs={6}>
                  <Label for="scientificName">Nombre científico</Label>
                  <Field
                    name="scientificName"
                    as={Input}
                    invalid={touched.scientificName && !!errors.scientificName}
                  />
                  <ErrorMessage
                    name="scientificName"
                    component={FormFeedback}
                  />
                </Col>
                <Col xs={6}>
                  <Label for="categoryId">Categoria</Label>
                  <Field
                    name="categoryId"
                    as={Input}
                    type="select"
                    invalid={touched.categoryId && !!errors.categoryId}
                  >
                    <option value="">Selecciona una opción</option>
                    {categories?.data?.data?.data?.map(
                      (category: ICategory, index: number) =>
                        category.name !== "app" && (
                          <option
                            value={category._id}
                            key={`category-plant-key-${index}`}
                          >
                            {category.name}
                          </option>
                        ),
                    )}
                  </Field>
                  <ErrorMessage name="categoryId" component={FormFeedback} />
                </Col>
                <Col xs={6}>
                  <Label for="sowingSeason">Temporada de siembra</Label>
                  <Field
                    name="sowingSeason"
                    as={Input}
                    type="select"
                    invalid={touched.sowingSeason && !!errors.sowingSeason}
                  >
                    <option value="">Selecciona una opción</option>
                    {sowingSeasons.map((season: string, index: number) => (
                      <option value={season} key={`season-plant-key-${index}`}>
                        {season}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="sowingSeason" component={FormFeedback} />
                </Col>
                <Col xs={6}>
                  <Label for="solarLight">Luz solar</Label>
                  <Field
                    name="solarLight"
                    as={Input}
                    type="select"
                    invalid={touched.solarLight && !!errors.solarLight}
                  >
                    <option value="">Selecciona una opción</option>
                    {solarLights.map((light: string, index: number) => (
                      <option value={light} key={`light-key-${index}`}>
                        {light}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="solarLight" component={FormFeedback} />
                </Col>{" "}
                <Col xs={6}>
                  <Label for="irrigationAmount">Cantidad de riego</Label>
                  <Field
                    name="irrigationAmount"
                    as={Input}
                    type="select"
                    invalid={
                      touched.irrigationAmount && !!errors.irrigationAmount
                    }
                  >
                    <option value="">Selecciona una opción</option>
                    {irrigationAmounts.map(
                      (irragation: string, index: number) => (
                        <option
                          value={irragation}
                          key={`irragation-key-${index}`}
                        >
                          {irragation}
                        </option>
                      ),
                    )}
                  </Field>
                  <ErrorMessage
                    name="irrigationAmount"
                    component={FormFeedback}
                  />
                </Col>{" "}
                <Col xs={6}>
                  <Label for="thermalFloor">Tipo de clima</Label>
                  <Field
                    name="thermalFloor"
                    as={Input}
                    type="select"
                    invalid={touched.thermalFloor && !!errors.thermalFloor}
                  >
                    <option value="">Selecciona una opción</option>
                    {climateTypes.map((climate: string, index: number) => (
                      <option
                        value={climate}
                        key={`climate-plant-key-${index}`}
                      >
                        {climate}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="thermalFloor" component={FormFeedback} />
                </Col>
                <Col xs={6}>
                  <Label for="typeOfSoil">Tipo de suelo</Label>
                  <Field
                    name="typeOfSoil"
                    as={Input}
                    type="select"
                    invalid={touched.typeOfSoil && !!errors.typeOfSoil}
                  >
                    <option value="">Selecciona una opción</option>
                    {soilTypes.map((soil: string, index: number) => (
                      <option value={soil} key={`soil-plant-key-${index}`}>
                        {soil}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="typeOfSoil" component={FormFeedback} />
                </Col>
                <Col xs={6}>
                  <Label for="transplantSoil">pH del suelo de trasplante</Label>
                  <Field
                    name="transplantSoil"
                    as={Input}
                    type="select"
                    invalid={touched.transplantSoil && !!errors.transplantSoil}
                  >
                    <option value="">Selecciona una opción</option>
                    {transplantSoils.map((soil: string, index: number) => (
                      <option value={soil} key={`soil-transplant-key-${index}`}>
                        {soil}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="transplantSoil"
                    component={FormFeedback}
                  />
                </Col>
                <Col xs={6}>
                  <Label for="plotSize">
                    Separación entre plantas(centímetros)
                  </Label>
                  <Field
                    name="plotSize"
                    type="number"
                    as={Input}
                    invalid={touched.plotSize && !!errors.plotSize}
                  />
                  <ErrorMessage name="plotSize" component={FormFeedback} />
                </Col>
                <Col xs={6}>
                  <Label for="germinationTime">
                    Tiempo de germinación(días)
                  </Label>
                  <Field
                    name="germinationTime"
                    type="number"
                    as={Input}
                    invalid={
                      touched.germinationTime && !!errors.germinationTime
                    }
                  />
                  <ErrorMessage
                    name="germinationTime"
                    component={FormFeedback}
                  />
                </Col>
                <Col xs={6}>
                  <Label for="harvestTime">Tiempo de cosecha(días)</Label>
                  <Field
                    name="harvestTime"
                    type="number"
                    as={Input}
                    invalid={touched.harvestTime && !!errors.harvestTime}
                  />
                  <ErrorMessage name="harvestTime" component={FormFeedback} />
                </Col>
                <Col xs={6}>
                  <Label for="temperatureMax">Temperatura máxima(°C)</Label>
                  <Field
                    name="temperatureMax"
                    type="number"
                    as={Input}
                    invalid={touched.temperatureMax && !!errors.temperatureMax}
                  />
                  <ErrorMessage
                    name="temperatureMax"
                    component={FormFeedback}
                  />
                </Col>
                <Col xs={6}>
                  <Label for="temperatureMin">Temperatura mínima(°C)</Label>
                  <Field
                    name="temperatureMin"
                    type="number"
                    as={Input}
                    invalid={touched.temperatureMin && !!errors.temperatureMin}
                  />
                  <ErrorMessage
                    name="temperatureMin"
                    component={FormFeedback}
                  />
                </Col>
                <Col xs={6}>
                  <Label for="beneficalNeighboursId">
                    Vecinos Beneficiosos
                  </Label>

                  <Field
                    multiple
                    name="beneficalNeighboursId"
                    optionKey="beneficalNeighbourId"
                    placeholder="Seleccione vecinos beneficiosos"
                    options={cultivates?.data?.data?.data}
                    component={CustomTypehead}
                  />
                </Col>
                <Col xs={6}>
                  <Label for="harmfulNeighboursId">Vecinos Dañinos</Label>

                  <Field
                    multiple
                    name="harmfulNeighboursId"
                    placeholder="Seleccione vecinos dañinos"
                    options={cultivates?.data?.data?.data}
                    optionKey="harmfulNeighbourId"
                    component={CustomTypehead}
                  />
                </Col>
                <Col xs={6}>
                  <Label for="plaguesId">Plagas</Label>

                  <Field
                    multiple
                    name="plaguesId"
                    optionKey="plagueId"
                    placeholder="Seleccione vecinos plagas"
                    options={plagues?.data?.data?.data}
                    component={CustomTypehead}
                  />
                </Col>
                <Col xs={6}>
                  <Label for="organicFertilisersId">Abono orgánicos</Label>

                  <Field
                    placeholder={"Selecciona los Abono orgánicos"}
                    multiple
                    name="organicFertilisersId"
                    options={organicFertiliser?.data?.data?.data}
                    component={CustomTypehead}
                  />
                </Col>
                <Col xs={6}>
                  <Label for="fertilisersId">Fertilizante Inorgánicos</Label>

                  <Field
                    placeholder={"Selecciona los Fertilizante Inorgánicos"}
                    multiple
                    name="fertilisersId"
                    options={fertiliser?.data?.data?.data}
                    component={CustomTypehead}
                  />
                </Col>
                <Col xs={6}>
                  <Label for="reproductionsId">Metodos de reprodución</Label>

                  <Field
                    placeholder={"Selecciona los metodos de reproducción"}
                    multiple
                    name="reproductionsId"
                    options={reproductionsMethods?.data?.data?.data}
                    optionKey="reproductionId"
                    component={CustomTypehead}
                  />
                </Col>
                <Col xs={6} className="d-flex flex-column align-items-center">
                  <Label for="image" className="w-100">
                    Imagen
                  </Label>

                  {action === "edit" && values.image && (
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
                  )}

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
                  <p
                    style={{
                      color: "red",
                      marginTop: "10px",
                      alignSelf: "start",
                    }}
                  >
                    Para mejor experiencia del usuario se recomienda una imagen
                    sin fondo.
                  </p>
                  <ErrorMessage name="image" component={FormFeedback} />
                </Col>
                <Col xs={6}>
                  <Label for="plantedAtHome" className="m-l-10">
                    Se puede plantar en casa?
                  </Label>
                  <Media body>
                    <Label className="switch mb-0">
                      <Field
                        id="plantedAtHome"
                        name="plantedAtHome"
                        as={Input}
                        type="checkbox"
                        defaultChecked={false}
                      ></Field>
                      <span
                        className={`switch-state ${values.plantedAtHome ? "bg-success" : "bg-secondary"}`}
                      />
                    </Label>
                  </Media>
                </Col>
                <Col xs={6}>
                  <Label for="active" className="m-l-10">
                    Esta activo
                  </Label>
                  <Media body>
                    <Label className="switch mb-0">
                      <Field
                        id="active"
                        name="active"
                        as={Input}
                        type="checkbox"
                        defaultChecked={true}
                      ></Field>
                      <span
                        className={`switch-state ${values.active ? "bg-success" : "bg-secondary"}`}
                      />
                    </Label>
                  </Media>
                </Col>
                <Col xs={12}>
                  <Button color="primary" type="submit" disabled={isSubmitting}>
                    {SubmitForm}
                  </Button>
                  &nbsp; &nbsp;
                  <Button
                    color="danger"
                    onClick={() => {
                      router.push("/dashboard/crops");
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

export default CropForm;
