"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import { updateUser, selectCurrentUser } from "@/Redux/Features/Auth/authSlice";
import Image from "next/image";

type ProfileForm = {
  name: string;
  email: string;
  address: string;
  phone: string;
  image: string;
};

export default function ProfileCard() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const [user, setUser] = useState(null)

  console.log('user from db', user)
  console.log('user from redux', currentUser)

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<ProfileForm>({
    name: "",
    email: "",
    address: "",
    phone: "",
    image: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!currentUser?.email) return;
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/api/users/${currentUser._id}`
        );
        const data = await res.json();
         setUser(data.data)
        setFormData({
          name: data.data.name || "",
          email: data.data.email || "",
          address: data.data.address || "",
          phone: data.data.phone || "",
          image: data.data.image || "https://github.com/shadcn.png",
        });
      } catch (err) {
        console.error("Failed to fetch user profile", err);
      }
    };

    fetchUser();
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        isProfileComplete: true,
        
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/api/users/${formData.email}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();
      const updated = result.data || result.user;

      dispatch(
        updateUser({
                    ...currentUser,
                    name: updated.name,
                    image: updated.image,
                    isProfileComplete: updated.isProfileComplete,
                  })
      );

      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      {!editMode ? (
        <div className="bg-white dark:bg-gray-600 shadow-xl rounded-xl p-6 w-[350px] text-center space-y-2">
          <Image
            src={formData.image || "https://github.com/shadcn.png"}
            width={500}
            height={400}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
          <p>
            <span className="font-semibold">Name:</span> {formData.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {formData.email}
          </p>
          <p>
            <span className="font-semibold">Address:</span> {formData.address}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {formData.phone}
          </p>
          <button
            onClick={() => setEditMode(true)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-600 shadow-lg rounded-xl p-6 w-[350px] space-y-4"
        >
          <h2 className="text-lg font-semibold text-center">Edit Profile</h2>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="email"
            value={formData.email}
            disabled
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full border px-3 py-2 rounded"
          />

          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
