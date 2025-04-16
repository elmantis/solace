import { ilike, or } from "drizzle-orm";
import { advocates } from '@/db/schema/advocates';
import db from "../../../db";


export async function GET(request: Request) {
  const searchQuery: any = {}
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get("searchTerm");

  if (searchTerm) {

    searchQuery.where =
      or(
        ilike(advocates.firstName, `%${searchTerm}%`),
        ilike(advocates.lastName, `%${searchTerm}%`)
      )
  }

  searchQuery.with = {
    specialties: {
      with: {
        specialty: true
      }
    }
  }


  const data = await db.query.advocates.findMany({
    ...searchQuery
  })

  return Response.json({ data });
}
