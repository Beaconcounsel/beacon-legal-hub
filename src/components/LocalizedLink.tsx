import { Link, LinkProps } from "react-router-dom";
import { useLocalizedPath } from "@/hooks/use-localized-path";

interface LocalizedLinkProps extends Omit<LinkProps, "to"> {
  to: string;
}

const LocalizedLink = ({ to, ...props }: LocalizedLinkProps) => {
  const { localePath } = useLocalizedPath();
  return <Link {...props} to={localePath(to)} />;
};

export default LocalizedLink;
