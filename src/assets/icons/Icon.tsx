import { SVGPropTypes } from "../../lib/types";
import Icons from "./Icons";

export default function ({
  name,
  ...props
}: SVGPropTypes & { name: keyof typeof Icons }) {
  const Icon = Icons[name];
  const exportedIcon = <Icon {...props} />;
  return exportedIcon;
}
