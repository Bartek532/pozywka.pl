import Image from "next/image";
import Link from "next/link";
import React from "react";

const Custom404 = () => {
  return (
    <div className="error-page">
      <Link href="/">
        <a>
          <Image src="/svg/not-found.svg" alt="" width="860" height="326" />
          <span className="sr-only">powrót do strony głównej</span>
        </a>
      </Link>
    </div>
  );
};

export default Custom404;
