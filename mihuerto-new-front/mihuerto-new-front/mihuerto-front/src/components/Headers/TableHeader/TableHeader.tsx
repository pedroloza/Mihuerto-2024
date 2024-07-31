import { Button, CardHeader } from "reactstrap";
import { AddNewUser } from "../../../../utils/Constant";

interface commonCardHeadingPropsType {
  bigHeadingClassName?: string;
  Heading?: string;
  headingClassName?: string;
  button?: {
    title: string;
    onClick: () => void;
  };
}

const TableHeader = ({
  headingClassName,
  Heading,
  bigHeadingClassName,
  button,
}: commonCardHeadingPropsType) => {
  return (
    <div className={`d-flex justify-content-between`}>
      <h4 className={bigHeadingClassName ? bigHeadingClassName : ""}>
        {Heading}
      </h4>

      {button && (
        <Button color="primary" className="mb-3" onClick={button.onClick}>
          {button.title}
        </Button>
      )}
    </div>
  );
};

export default TableHeader;
