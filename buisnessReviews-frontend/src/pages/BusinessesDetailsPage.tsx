import React, { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/components/AuthProvider";
import { useToast } from "@/components/ui/use-toast";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

import api from "@/services/api.service";

import { StarsPresentetaionMeter } from "@/components/ui/starsMeter";
import ReviewToggle from "@/components/ReviewToggle";
import EditDialog from "@/components/EditDialog";
import LeaveAReviewCard from "@/components/ReviewCard";

import {
  handleMouseEnter,
  handleMouseLeave,
  handleClick,
  handleClickEditStars,
} from "@/services/starts.service";

export interface IReview {
  stars: number;
  _id: string;
  content: string;
  business: string;
  user: string;
  likes: string[];
}

export interface IBusiness {
  _id: string;
  name: string;
  description: string;
  stars: number[];
  imageUrl: string;
}

function BusinessesDetailsPage() {
  const { businessesId } = useParams<{ businessesId: string }>();
  const [business, setBusiness] = useState<IBusiness | null>(null);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [hoveredStars, setHoveredStars] = useState<number>(0);
  const [selectedStars, setSelectedStars] = useState<number>(0);
  const [editSelectedStars, setEditSelectedStars] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [isAccordionOpen, setIsAccordionOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [editingReview, setEditingReview] = useState<IReview | null>(null);
  const editMessage = useRef<HTMLTextAreaElement>(null);
  const { loggedInUser } = useAuth();
  const { toast } = useToast();
  const eventListenersAdded = useRef(false);

  const sortReviews = useCallback(
    (reviewsToSort: IReview[]) => {
      return reviewsToSort.sort((a, b) => {
        if (a.user === loggedInUser?._id && b.user !== loggedInUser?._id)
          return -1;
        if (a.user !== loggedInUser?._id && b.user === loggedInUser?._id)
          return 1;
        return 0;
      });
    },
    [loggedInUser?._id]
  );

  useEffect(() => {
    async function getBusinessAndReviews() {
      try {
        const [businessResponse, reviewsResponse] = await Promise.all([
          api.get(`/Business/${businessesId}`),
          api.get(`/Reviews/${businessesId}`),
        ]);

        setBusiness(businessResponse.data);
        setReviews(reviewsResponse.data);
      } catch (err: any) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    }

    getBusinessAndReviews();

    if (!eventListenersAdded.current) {
      socket.on("reviewCreated", (review) =>
        setReviews((prev) => [...prev, review])
      );
      socket.on("reviewDeleted", (reviewId) => {
        console.log("delete front");

        setReviews((prev) => prev.filter((review) => review._id !== reviewId));
      });
      socket.on("reviewEdited", (updatedReview) => {
        setReviews((prev) =>
          prev.map((review) =>
            review._id === updatedReview._id ? updatedReview : review
          )
        );
      });
      socket.on("reviewLiked", (updatedReview) => {
        setReviews((prev) =>
          prev.map((review) =>
            review._id === updatedReview._id ? updatedReview : review
          )
        );
      });
      socket.on("reviewUnLiked", (updatedReview) => {
        setReviews((prev) =>
          prev.map((review) =>
            review._id === updatedReview._id ? updatedReview : review
          )
        );
      });

      eventListenersAdded.current = true;
    }

    return () => {
      socket.off("reviewCreated");
      socket.off("reviewDeleted");
      socket.off("reviewEdited");
      socket.off("reviewLiked");
      socket.off("reviewUnLiked");
    };
  }, [businessesId]);

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post("/Reviews/create", {
        content: message,
        business: businessesId,
        stars: selectedStars,
      });
      const updatedBusiness = await api.get(`/Business/${businessesId}`);
      setBusiness(updatedBusiness.data);
      toast({
        title: "Review Added",
        description: "Review added successfully",
        variant: "success",
      });

      setReviews((prevReviews) => sortReviews([response.data, ...prevReviews]));

      setMessage("");
      setSelectedStars(0);

      setIsAccordionOpen(false);
    } catch (error) {
      toast({
        title: "Failed to add review",
        description: "Review failed",
        variant: "destructive",
      });
      console.error("Error submitting review:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No business found</p>
      </div>
    );
  }
  const averageStars =
    business.stars.length > 0
      ? business.stars.reduce((acc, cur) => acc + cur, 0) /
        business.stars.length
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex mx-auto px-4 py-8 bg-gray-100 dark:bg-gray-900 min-h-screen justify-between"
    >
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="mb-8 w-auto"
      >
        <img
          src={business.imageUrl || "https://placehold.co/900x300"}
          alt={business.name}
          className="w-full h-[300px] object-cover rounded-lg shadow-lg mb-4"
        />
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2 text-blue-900 dark:text-blue-300">
            {business.name}
          </h1>
          <p className="text-gray-700 dark:text-gray-400">
            {business.description}
          </p>
        </div>
        <StarsPresentetaionMeter averageStars={averageStars} />
      </motion.div>

      <motion.div>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-400 "
        >
          Reviews
        </motion.h2>
        <div className="flex justify-center ">
          {loggedInUser && (
            <LeaveAReviewCard
              handleClick={(index) => handleClick(index, setSelectedStars)}
              handleMessageChange={handleMessageChange}
              handleMouseEnter={(index) =>
                handleMouseEnter(index, setHoveredStars)
              }
              handleMouseLeave={() => handleMouseLeave(setHoveredStars)}
              handleSubmit={handleSubmit}
              hoveredStars={hoveredStars}
              isAccordionOpen={isAccordionOpen}
              message={message}
              selectedStars={selectedStars}
              setIsAccordionOpen={setIsAccordionOpen}
            />
          )}
        </div>

        <ReviewToggle
          reviews={reviews}
          setEditSelectedStars={setEditSelectedStars}
          setEditingReview={setEditingReview}
          setIsEditDialogOpen={setIsEditDialogOpen}
          setReviews={setReviews}
        />
      </motion.div>

      <EditDialog
        editMessage={editMessage}
        editSelectedStars={editSelectedStars}
        editingReview={editingReview}
        handleClick={(index) =>
          handleClickEditStars(index, setEditSelectedStars)
        }
        handleMouseEnter={(index) => handleMouseEnter(index, setHoveredStars)}
        handleMouseLeave={() => handleMouseLeave(setHoveredStars)}
        hoveredStars={hoveredStars}
        isEditDialogOpen={isEditDialogOpen}
        selectedStars={editSelectedStars}
        setIsEditDialogOpen={setIsEditDialogOpen}
      />
    </motion.div>
  );
}

export default BusinessesDetailsPage;
