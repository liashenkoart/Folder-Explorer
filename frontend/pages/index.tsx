import React, { useEffect } from "react";

//  libs
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/test_folder")
  }, [router]);

}
