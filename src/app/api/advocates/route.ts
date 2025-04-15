import db from "../../../db";
import { advocates } from "../../../db/schema/advocates";

export async function GET() {
  // Uncomment this line to use a database
  const data = await db.select().from(advocates);


  return Response.json({ data });
}
