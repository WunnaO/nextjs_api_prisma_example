import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const prisma = new PrismaClient();

export const GET = async (req: Request, res: Response) => {
  try {
    if (req.method === "GET") {
      const users = await prisma.user.findMany();
      console.log(users);
      if (users) {
        return NextResponse.json({ message: "OK", users }, { status: 200 });
      } else {
        return NextResponse.json(
          { message: "Data Not Found" },
          { status: 404 }
        );
      }
    }
  } catch (err) {
    return NextResponse.json({ message: "ERROR", err }, { status: 500 });
  }
};

export const POST = async (req: Request, res: Response) => {
  try {
    const { id, name, age, gender, city } = await req.json();
    const newUser = await prisma.user.createMany({
      data: { id, name, age, gender, city },
    });
    if (newUser) {
      return NextResponse.json({ message: "OK", newUser }, { status: 201 });
    } else {
      return NextResponse.json({ message: "ERROR" }, { status: 404 });
    }
  } catch (err) {
    return NextResponse.json({ message: "ERROR", err }, { status: 500 });
  }
};
