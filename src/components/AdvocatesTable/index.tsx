import { Advocate } from "@/types/types";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import Link from "next/link";

type AdvocatesTable = {
  data: Advocate[];
};
const AdvocatesTable: React.FC<AdvocatesTable> = ({ data }) => {
  return (
    <Table striped>
      <TableHead>
        <TableRow>
          <TableHeadCell>Full Name</TableHeadCell>
          <TableHeadCell>City</TableHeadCell>
          <TableHeadCell>Degree</TableHeadCell>
          <TableHeadCell>Years of Experience</TableHeadCell>
          <TableHeadCell>Phone Number</TableHeadCell>
          <TableHeadCell>Specialties</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(
          ({
            id,
            firstName,
            lastName,
            city,
            degree,
            yearsOfExperience,
            phoneNumber,
            specialties,
          }) => {
            return (
              <TableRow key={id}>
                <TableCell>
                  <Link href={`advocates/${id}`} className="navbar-item">
                    {firstName} {lastName}
                  </Link>
                </TableCell>
                <TableCell>{city}</TableCell>
                <TableCell>{degree}</TableCell>
                <TableCell>{yearsOfExperience}</TableCell>
                <TableCell>{phoneNumber}</TableCell>
                <TableCell>
                  {specialties.map(({ specialty }) => {
                    return (
                      <Button
                        key={specialty.id}
                        size="m"
                        outline
                        disabled
                        color="light"
                      >
                        {specialty.name}
                      </Button>
                    );
                  })}
                </TableCell>
              </TableRow>
            );
          }
        )}
      </TableBody>
    </Table>
  );
};

export default AdvocatesTable;
