import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await pool.query<{ database: string; user: string }>(
      "select current_database() as database, current_user as user",
    );
    return NextResponse.json({ ok: true, database: result.rows[0]?.database, user: result.rows[0]?.user });
  } catch {
    return NextResponse.json(
      { ok: false, message: "تعذر الوصول إلى قاعدة البيانات، ويستمر العرض بالبيانات التجريبية." },
      { status: 503 },
    );
  }
}
