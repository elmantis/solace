"use client";

import { Advocate, AdvocatesSearch } from "@/types/types";
import { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import AdvocatesTable from "@/components/AdvocatesTable";
import AdvocateSearchForm from "../forms/AdvocateForm";
import api from "@/services/api";

const Advocates = () => {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const fetchUsers = async () => {
    const advocatesList = await api.advocates.loadAll();
    setAdvocates(advocatesList);
  };

  const handleSubmit = async (data: AdvocatesSearch) => {
    const advocatesList = await api.advocates.loadAll(data);
    setAdvocates(advocatesList);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (!advocates.length) return null;

  return (
    <Card>
      <AdvocateSearchForm
        initialValues={{ searchTerm: "" }}
        onSubmit={handleSubmit}
      />
      <AdvocatesTable data={advocates} />
    </Card>
  );
};

export default Advocates;
