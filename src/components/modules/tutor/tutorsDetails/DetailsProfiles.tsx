"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IUser } from "@/types/user";
import { sendTutorPermit } from "@/services/sendTutorPermits";
import { getReviews, postReview } from "@/services/review";
import { useUser } from "@/context/UserContext";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { CardContent } from "@/components/ui/card";
import {
  BookDown,
  CalendarCheck2,
  CalendarDays,
  CheckCircle,
  Clock3,
  GraduationCap,
  Mail,
  MapPinHouse,
  MessageSquareDiff,
  PhoneCall,
  UserRound,
  UserSearch,
} from "lucide-react";
import tutorImg from "../../../../../public/tutor.jpg";
import StarRating from "@/components/shared/starRating";

export interface IReview {
  tutorId: string;
  name: string;
  rating: number;
  reviewText: string;
}

const DetailsProfiles = ({ tutor }: { tutor: IUser | null }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [requestStatus, setRequestStatus] = useState<string | null>(null);
  const user = useUser();
  const router = useRouter();



  useEffect(() => {
    if (tutor?._id) {
      fetchReviews();
    }
  }, [tutor?._id]);

  const fetchReviews = async () => {
    try {
      const response = await getReviews(tutor!._id);
      if (response.success) {
        setReviews(response.data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleOpenDialog = () => {
    if (!user?.user?.email) {
      toast.error("Log in first to leave a review.");
      router.push("/login");
      return;
    }
    setIsDialogOpen(true);
  };

  const handleReviewSubmit = async () => {
    if (!reviewText.trim()) {
      toast.error("Review cannot be empty!");
      return;
    }

    const response = await postReview(
      tutor!._id,
      reviewerName,
      rating,
      reviewText
    );

    if (response.success) {
      toast.success("Review submitted successfully!");
      setIsDialogOpen(false);
      setReviewText("");
      fetchReviews();
    } else {
      toast.error(response.message || "Failed to submit review.");
    }
  };

  const handleRequest = async () => {
    try {
      if (!user?.user?.email) {
        toast.error("Please log in to book.");
        router.push("/login");
        return;
      }

      if (!tutor?._id) {
        toast.error("Tutor ID not found.");
        return;
      }

      console.log("Booking request:", {
        tutorId: tutor._id,
        userEmail: user.user.email,
        price: tutor?.price ?? 0,
      });

      setRequestStatus("pending");

      const response = await sendTutorPermit(
        tutor._id,
        user.user.email,
        tutor?.price ?? 0
      );

      console.log("Permit response:", response);

      if (response.success) {
        toast.success(response.message);
        setRequestStatus("sent");
      } else {
        toast.error(response.message || "Permit request failed.");
        setRequestStatus(null);
      }
    } catch (error) {
      console.error("Error in booking:", error);
      toast.error("Failed to send request.");
      setRequestStatus(null);
    }
  };

  if (!tutor) {
    return <p className="text-center">Loading tutor data...</p>;
  }

  return (
    <div>
      <div className="rounded-lg my-6">
        <h2 className="text-xl md:text-3xl font-bold text-center">
          {tutor.name}`s <span className="text-blue-600">Profile</span>
        </h2>
      </div>

      <div className="p-4 border border-black shadow-[0px_0px_15px_rgba(37,99,235,0.6)] rounded-lg">
        <div className="w-full mx-auto max-w-sm rounded-xl shadow-lg">
          <CardContent className="flex flex-col items-center pb-5">
            <div className="relative w-48 h-48">
              <Image
                src={tutor.profilePicture || tutorImg}
                alt="Profile"
                width={200}
                height={200}
                className="object-cover rounded-full border-4 border-white"
              />
              <div className="absolute bottom-1 right-7 bg-green-600 p-1 rounded-full">
                <CheckCircle className="text-white w-8 h-8" />
              </div>
            </div>
            <h2 className="text-xl mb-1 font-semibold mt-3">{tutor.name}</h2>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <StarRating rating={tutor.averageRating ?? 0} />
              <span className="font-bold">5.0</span>
            </div>
            <div className="flex flex-wrap gap-2 my-4">
              {tutor.subjects?.split(",").map((subject, index) => (
                <span
                  key={index}
                  className="rounded-full border border-blue-600 px-5 py-1 text-base font-semibold text-blue-600"
                >
                  {subject.trim()}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <h2 className="text-xl font-semibold">Hourly rate:</h2>
              <span className="text-lg text-red-500 font-bold">
                $ {tutor.price}
              </span>
            </div>
          </CardContent>
        </div>

        <div className="mt-6 flex flex-col items-center gap-2">
          <h2 className="text-xl font-semibold flex gap-3">
            <CalendarCheck2 color="#155dfc" size={30} />
            Available Time Slots
          </h2>
          <div className="py-5 bg-blue-800/20 flex gap-3 md:w-1/2 rounded-lg px-5 my-4">
            <CalendarDays color="#155dfc" size={18} />
            {new Date(tutor.availability?.from || "").toLocaleDateString()} -{" "}
            {new Date(tutor.availability?.to || "").toLocaleDateString()}
          </div>
        </div>

        <Tabs defaultValue="about" className="w-full mt-4">
          <TabsContent value="about">
            <div className="my-6">
              <h2 className="text-xl font-semibold flex gap-3">
                <UserRound color="#155dfc" size={30} /> About
              </h2>
              <p className="text-gray-500 mt-2">{tutor.bio}</p>
            </div>

            <hr className="border-blue-400" />

            <div className="my-6 flex flex-col md:flex-row gap-12">
              <div>
                <h2 className="text-xl font-semibold flex gap-3">
                  <GraduationCap color="#155dfc" size={30} />
                  Education
                </h2>
                <ul className="list-disc text-gray-500 marker:text-green-600 px-6">
                  <li>
                    Master`s in{" "}
                    {tutor.subjects
                      ?.split(",")
                      .map((s, i) => (i > 0 ? " and " + s : s))}{" "}
                    from Oxford (2020–2022)
                  </li>
                  <li>B.Sc in Mathematics, University of Dhaka</li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-semibold flex gap-3">
                  <Clock3 color="#155dfc" size={30} />
                  Experience
                </h2>
                <ul className="list-disc text-gray-500 marker:text-green-600 px-6">
                  <li>5+ years of tutoring experience</li>
                  <li>Worked with 50+ students</li>
                </ul>
              </div>
            </div>

            <hr className="border-blue-400" />

            <div className="my-6">
              <h2 className="text-xl font-semibold flex gap-3">
                <UserSearch color="#155dfc" size={30} />
                Contact
              </h2>
              <h2 className="text-sm text-gray-500 mb-1 flex gap-2 font-bold mt-1">
                <PhoneCall size={18} /> {tutor.phone || "N/A"}
              </h2>
              <h2 className="text-sm text-gray-500 mb-1 flex gap-2 font-bold mt-1">
                <Mail size={18} /> {tutor.email}
              </h2>
              <h2 className="text-sm text-gray-500 font-semibold mt-1 flex gap-2">
                <MapPinHouse size={18} /> {tutor.address || "N/A"}
              </h2>
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-end flex justify-center mt-6 items-center gap-3">
          <Button
            variant="outline"
            className="bg-blue-600 text-lg text-white w-1/2 hover:text-blue-600 border-blue-600 flex items-center gap-2"
            onClick={handleRequest}
            disabled={requestStatus === "pending"}
          >
            <BookDown size={30} />
            {requestStatus === "pending" ? "Booking Pending..." : "Book Now"}
          </Button>
        </div>
      </div>

      {/* Review Section */}
      <div className="mt-16 shadow-[0px_0px_10px_theme(colors.blue.400)] rounded-lg bg-blue-800/20 p-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-100">Student Reviews</h2>
          <Button
            variant="outline"
            className="bg-blue-600 text-white hover:text-blue-600 border-blue-600 flex items-center gap-2"
            onClick={handleOpenDialog}
          >
            <MessageSquareDiff />
            Add Review
          </Button>
        </div>

        <div className="p-5 rounded-lg mt-6">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="border p-3 rounded mt-2">
                <div className="flex justify-between">
                  <h2 className="text-lg uppercase font-semibold mb-3">
                    {review.name}
                  </h2>
                  <StarRating rating={review.rating} />
                </div>
                <p>{review.reviewText}</p>
                <hr className="my-2 border-blue-800" />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center text-xl">No reviews yet...</p>
          )}
        </div>
      </div>

      {/* Review Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#0d142d] border-black">
          <DialogHeader>
            <DialogTitle className="text-gray-100">Write a Review</DialogTitle>
          </DialogHeader>
          <label className="text-gray-100">Enter Name</label>
          <Input
            type="text"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            placeholder="Your Name"
            className="mb-3 text-white"
          />
          <label className="text-gray-100">Rating</label>
          <Input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            placeholder="1–5"
            className="mb-3 text-white"
          />
          <label className="text-gray-100">Your Feedback</label>
          <Textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review..."
            className="mb-3 text-white"
          />
          <DialogFooter className="flex justify-center">
            <Button
              variant="outline"
              className="bg-blue-600 text-white hover:text-blue-600 border-blue-600"
              onClick={handleReviewSubmit}
            >
              Submit Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DetailsProfiles;
