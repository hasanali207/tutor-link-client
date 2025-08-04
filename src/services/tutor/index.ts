/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const getAllTutors = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/users/tutors`,
      {
        next: {
          tags: ["TUTORS"],
        },
      }
    );
    // console.log(res, "res");
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return await res.json();
  } catch (error: any) {
    return Error("error to fetch data", error?.message);
  }
};

export const getSingleTutor = async (tutorId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/users/tutors/${tutorId}`,
      {
        next: {
          tags: ["TUTORS"],
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return await res.json();
  } catch (error: any) {
    return Error("error to fetch data", error?.message);
  }
};
