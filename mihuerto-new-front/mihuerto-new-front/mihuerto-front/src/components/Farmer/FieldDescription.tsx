import React from "react";

interface FieldDescriptionProps {
  title: string;
  description: string;
}

const FieldDescription = ({ title, description }: FieldDescriptionProps) => {
  return (
    <div className="pb-3">
      <h6 className="pb-1">{title}</h6>
      <p>{description}</p>
    </div>
  );
};

export default FieldDescription;
