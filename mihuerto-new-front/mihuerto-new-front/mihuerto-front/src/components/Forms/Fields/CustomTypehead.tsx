import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { ErrorMessage, FieldProps } from "formik";
import { FormFeedback, FormGroup } from "reactstrap";
import { Option } from "react-bootstrap-typeahead/types/types";

type CustomTypehead = {
  isInvalid?: boolean;
  multiple: boolean;
  options: any[];
  placeholder?: string;
  optionKey: string;
} & FieldProps;

type OptionProps = {
  _id: string;
  name: string;
};

const CustomTypehead = ({
  field,
  multiple,
  options,
  placeholder = "",
  form,
  meta,
}: CustomTypehead) => {
  const handleOnChange = (selected: Option[]) => {
    let filterIdSelected: OptionProps[] = [];

    if (selected.length > 0) {
      filterIdSelected = selected.map((item) => ({
        // @ts-ignore
        _id: item?._id,
        // @ts-ignore
        name: item?.name,
      }));
    }
    form.setFieldValue(field.name, filterIdSelected);
  };

  return (
    <FormGroup>
      <Typeahead
        id={field.name}
        labelKey="name"
        defaultSelected={
          field.value && field.value[0]?._id && field.value[0]?.name
            ? field.value
            : undefined
        }
        isInvalid={!!meta?.touched && !!meta.error}
        multiple={multiple}
        options={options}
        placeholder={placeholder}
        onChange={handleOnChange}
      />
      <ErrorMessage name={field.name} component={FormFeedback} />
    </FormGroup>
  );
};

export default CustomTypehead;
