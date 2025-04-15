import { specialties } from "@/db/schema/specialties";
import db from "../../../db";
import { advocates } from "../../../db/schema/advocates";


export async function GET() {
  const data = await db.query.advocates.findMany({
    with: {
      specialties: true
    }
  })

  return Response.json({ data });
}
