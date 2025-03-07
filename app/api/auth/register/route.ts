import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export async function POST(req: Request) {
  try {
    const { email, name, password } = await req.json();

    // const { data, error } = await supabase.auth.signUp({
    //   email,
    //   password,
    //   options: {
    //     data: { name }, // Guardar el nombre en Supabase
    //   },
    // });

    // if (error) {
    //   return NextResponse.json({ error: error.message }, { status: 400 });
    // }
    console.log({ email, name, password });


    const { data, error } = await supabase
    .from('users')
    .insert([
      { email, name, password },
    ])
    .select()

    return NextResponse.json({ user: data }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}
