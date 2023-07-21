import Image from "next/image";
import Link from "next/link";

const NotFoundPage = () => (
  <div className="error-page">
    <Link href="/">
      <Image src="/svg/not-found.svg" alt="" width="860" height="326" />
      <span className="sr-only">powrót do strony głównej</span>
    </Link>
  </div>
);

export default NotFoundPage;
