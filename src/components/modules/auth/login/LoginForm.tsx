"use client";
import { verifyToken } from "@/lib/verifyToken";
import { setUser, TUser } from "@/Redux/Features/Auth/authSlice";
import { useAppDispatch } from "@/Redux/hook";
import { loginUser } from "@/services/auth";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaGithub, FaGoogle } from "react-icons/fa";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");

  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await loginUser(formData);

    if (res?.success) {
      const userFromToken = verifyToken(res?.data?.accessToken) as TUser;

           
      const userRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/api/users/${userFromToken._id}`
      );
      if (!userRes.ok) throw new Error("Failed to fetch full user profile");
      const fullUserData = await userRes.json();

      const user = fullUserData.data || fullUserData.user || fullUserData;

       // এখানে important data আলাদা করে নিচ্ছি
      const importantUserData = {
        _id:user._id,
        email: user.email,
        name: user.name,
        image: user.image,
        role: user.role,
        isProfileComplete: user.isProfileComplete,
      };

      dispatch(setUser({ user: importantUserData, token: res?.data?.accessToken }));
      
   

      toast.success(res?.message);

      if (user.isProfileComplete == false) {
        if (user.role === "Student") {
          router.push("/studentdashboard/profile");
        } else if (user.role === "Tutor") {
          router.push("/tutor/profile");
        }
      } else if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    } else {
      toast.error(res?.message);
    }
  } catch (err: any) {
    console.error(err);
    toast.error("Login failed");
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-r flex items-center justify-center px-4 py-5">
      <div className="md:w-[450px] w-[350px] shadow-[0px_0px_20px_theme(colors.blue.600)] overflow-hidden rounded-lg border border-[#066ccb] py-6 px-8 bg-gray-100 dark:border-zinc-700 dark:bg-zinc-900">
        <h2 className="text-3xl font-extrabold text-blue-800 text-center py-5 border-b">
          Login Now
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 mt-5">
          {/* Email Input */}
          <div className="relative">
            <label className="text-md font-semibold">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border text-black rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label className="text-md font-semibold">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border text-black rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <div
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-[50%] transform -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? (
                <AiFillEyeInvisible size={24} color="#6B7280" />
              ) : (
                <AiFillEye size={24} color="#6B7280" />
              )}
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-semibold text-lg text-blue-600 hover:underline"
            >
              Register here
            </a>
          </p>
        </form>

        {/* Social Login Buttons */}
        <div className="text-center mt-6 space-y-4">
          <p className="text-sm text-gray-600">Or login with</p>

          <button className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-md bg-gray-100 text-black hover:bg-gray-200 transition duration-300">
            <FaGithub size={20} className="mr-3" />
            GitHub
          </button>

          <button className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-md bg-gray-100 text-black hover:bg-gray-200 transition duration-300">
            <FaGoogle size={20} className="mr-3" />
            Google
          </button>

          <p className="flex items-center justify-center mt-6">
            <Link
              href="/"
              className="flex gap-3 items-center text-base font-semibold text-gray-400 hover:text-[#066ccb]"
            >
              <MoveLeft /> Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
