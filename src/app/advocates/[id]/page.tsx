"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Advocate } from "@/types/types";

export default function AdvocatePage() {
  const params = useParams();
  const [advocate, setAdvocate] = useState<Advocate>();

  useEffect(() => {
    console.log("fetching advocates...");
    fetch(`/api/advocates/${params.id}`).then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocate(jsonResponse.data);
      });
    });
  }, []);

  if (!advocate) return null;

  return <div>{advocate.firstName}</div>;
}
