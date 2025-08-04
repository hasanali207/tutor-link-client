"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import {
  updateUser,
  selectCurrentUser,
} from "@/Redux/Features/Auth/authSlice";
import Image from "next/image";

interface Availability {
  from: string;
  to: string;
}

interface FormDataType {
  name: string;
  email: string;
  phone: string;
  address: string;
  image: string;
  bio: string;
  subjects: string;
  gradeLevel: string;
  availability: Availability;
  price: string | number;
}


export default function TutorProfileCard() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  console.log('current user from Redux', currentUser)
  console.log('user from DB', user)
  
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    phone: "",
    address: "",
    image: "",
    bio: "",
    subjects: "",
    gradeLevel: "",
    availability: {
      from: "",
      to: "",
    },
    price: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!currentUser?._id) return;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/api/users/${currentUser._id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data.data);

        setFormData({
          name: data.data.name || "",
          email: data.data.email || "",
          phone: data.data.phone || "",
          address: data.data.address || "",
          image: data.data.image || "",
          bio: data.data.bio || "",
          subjects: data.data.subjects || "",
          gradeLevel: data.data.gradeLevel || "",
          availability: {
            from: data.data.availability?.from?.slice(0, 10) || "",
            to: data.data.availability?.to?.slice(0, 10) || "",
          },
          price: data.data.price || "",
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [currentUser]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "from" || name === "to") {
      setFormData({
        ...formData,
        availability: { ...formData.availability, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      availability: {
        from: new Date(formData.availability.from),
        to: new Date(formData.availability.to),
      },
      price:
        typeof formData.price === "string"
          ? parseFloat(formData.price)
          : formData.price,
      isProfileComplete: true,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/api/users/${formData.email}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );

      const updated = await res.json();
      const updatedUser = updated.user || updated.data || updated;
      
      if (updatedUser) {
        // ✅ Only update name and image in Redux
        dispatch(
          updateUser({
            ...currentUser,
            name: updatedUser.name,
            image: updatedUser.image,
            isProfileComplete: updatedUser.isProfileComplete,
          })
        );
        
        setEditMode(false);
      } else {
        console.error("Updated tutor data missing");
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
      {!editMode ? (
        <>
          <div className="bg-white dark:bg-gray-600 shadow-xl rounded-xl p-6 w-[350px] text-center space-y-2">
            <Image
              src={formData.image || "https://github.com/shadcn.png"}
              width={500}
              height={400}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <p>
              <strong>Name:</strong> {formData.name}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Phone:</strong> {formData.phone}
            </p>
            <p>
              <strong>Address:</strong> {formData.address}
            </p>
            <p>
              <strong>Bio:</strong> {formData.bio}
            </p>
            <p>
              <strong>Subjects:</strong> {formData.subjects}
            </p>
            <p>
              <strong>Grade Level:</strong> {formData.gradeLevel}
            </p>
            <p>
              <strong>Availability:</strong> {formData.availability.from} to{" "}
              {formData.availability.to}
            </p>
            <p>
              <strong>Price:</strong> {formData.price}
            </p>
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
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
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full border px-3 py-2 rounded"
          />
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Bio"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="subjects"
            value={formData.subjects}
            onChange={handleChange}
            placeholder="Subjects (comma separated)"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="gradeLevel"
            value={formData.gradeLevel}
            onChange={handleChange}
            placeholder="Grade Level"
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex gap-2">
            <input
              type="date"
              name="from"
              value={formData.availability.from}
              onChange={handleChange}
              className="w-1/2 border px-3 py-2 rounded"
            />
            <input
              type="date"
              name="to"
              value={formData.availability.to}
              onChange={handleChange}
              className="w-1/2 border px-3 py-2 rounded"
            />
          </div>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Hourly Price"
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              type="button"
              className="bg-red-600 text-white px-4 py-2 rounded"
              onClick={() => {
                if (user) {
                  setFormData({
                    name: user.name || "",
                    email: user.email || "",
                    phone: user.phone || "",
                    address: user.address || "",
                    image: user.image || "",
                    bio: user.bio || "",
                    subjects: user.subjects || "",
                    gradeLevel: user.gradeLevel || "",
                    availability: {
                      from: user.availability?.from?.slice(0, 10) || "",
                      to: user.availability?.to?.slice(0, 10) || "",
                    },
                    price: user.price || "",
                  });
                }
                setEditMode(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
