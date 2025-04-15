import db from "../../../db";


export async function GET() {
  const data = await db.query.advocates.findMany({
    with: {
      specialties: {
        with: {
          specialty: true
        }
      }

    }
  })

  return Response.json({ data });
}
