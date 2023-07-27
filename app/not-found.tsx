import Link from "next/link";

import { DEFAULT_METADATA } from "lib/metadata";
import NotFoundIcon from "public/svg/not-found.svg";

export const metadata = DEFAULT_METADATA;

const NotFoundPage = () => (
  <div className="error">
    <Link href="/" className="link">
      <NotFoundIcon className="icon" />
      <span className="sr-only">powrót do strony głównej</span>
    </Link>
  </div>
);

export default NotFoundPage;
