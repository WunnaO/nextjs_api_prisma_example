import { NextResponse } from "next/server";
import { prisma } from "../route";

// Get limit--------------------------------------------------------------

export const GET = async (req: Request, res: Response) => {
  const id = req.url.split("users/")[1];
  console.log(id);
  try {
    const user = await prisma.user.findMany({
      where: { id: parseInt(id) },
    });
    // console.log(res.json());

    if (user) {
      return NextResponse.json({ message: "OK", user }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Data Not Found" }, { status: 404 });
    }
  } catch (err) {
    return NextResponse.json({ message: "ERROR", err }, { status: 500 });
  }
};

// Update where------------------------------------------------------------

export const PUT = async (req: Request, res: Response) => {
  try {
    const { name, age, gender, city } = await req.json();
    const id = req.url.split("users/")[1];

    const updateUser = await prisma.user.updateMany({
      where: { id: parseInt(id) },
      data: {
        name,
        age,
        gender,
        city,
      },
    });
    if (updateUser) {
      return NextResponse.json({ message: "OK", updateUser }, { status: 201 });
    } else {
      return NextResponse.json({ message: "Data Not Found" }, { status: 404 });
    }
  } catch (err) {
    return NextResponse.json({ message: "ERROR", err }, { status: 500 });
  }
};

//Delete where-------------------------------------------------------------

export const DELETE = async (req: Request) => {
  try {
    const id = req.url.split("users/")[1];
    console.log(id);
    const deleteUser = await prisma.user.deleteMany({
      where: { id: parseInt(id) },
    });
    // if (deleteUser) {
    return NextResponse.json({ message: "OK", deleteUser }, { status: 200 });
    // } else {
    //   return NextResponse.json({ message: "Data Not Found" }, { status: 404 });
    // }
  } catch (err) {
    return NextResponse.json({ message: "ERROR", err }, { status: 500 });
  }
};
