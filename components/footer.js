import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer>
      <hr />
      <p className="flex items-center justify-center">
        <FontAwesomeIcon icon={faCopyright} />
        &nbsp; 2023
      </p>
    </footer>
  );
}
