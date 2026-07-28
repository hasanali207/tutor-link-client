"use server";

export const getAllTutors = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/users/tutors`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching tutors:", error);
    return null;
  }
};

export const getSingleTutor = async (tutorId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/users/tutors/${tutorId}`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching tutor:", error);
    return null;
  }
};
