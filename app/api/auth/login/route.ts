import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import { comparaPassword, generaHash } from "@/utils/hash";

interface Users {
    id: number;
    username: string;
    password: string;
}

export async function POST(req: Request) {
    try {


        const { username, password } = await req.json();
        const email = username


        // busca el usuario
        const { data: users, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .limit(1);


        if (users && users?.length > 0) {
           const respuesta =  await comparaPassword(users[0].password,password )
            if (respuesta) {
                return NextResponse.json(users)
            } else {
                return NextResponse.json(
                    { error: "Password Invalido" },
                    { status: 401 }
                );
            }
        }

            return NextResponse.json(
                { error: "Usuario Invalido" },
                { status: 401 }
            );


    } catch (err) {
        return NextResponse.json(
            { error: "Error en el servidor" },
            { status: 500 }
        );
    }
}
