import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/solid";

export function Footer({ brandName, brandLink, routes }) {
  const year = new Date().getFullYear();

  return (
    <footer className="py-2">
  
    </footer>
  );
}

Footer.defaultProps = {
  brandName: "Paragon Geeks",
  brandLink: "#",
  routes: [
    { name: "Paragon Geeks", path: "#" },
    { name: "About Us", path: "#" },
    { name: "License", path: "#" },
  ],
};

Footer.propTypes = {
  brandName: PropTypes.string,
  brandLink: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
