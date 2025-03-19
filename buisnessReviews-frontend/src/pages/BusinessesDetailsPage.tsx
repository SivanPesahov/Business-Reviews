import React, { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";
import { toast, useToast } from "@/components/ui/use-toast";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import api from "@/services/api.service";
import { User } from "../components/AuthProvider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Heart, Pencil, Star, Trash2 } from "lucide-react";

interface IReview {
  stars: number;
  _id: string;
  content: string;
  business: string;
  user: string;
  likes: string[];
}

interface IBusiness {
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
  const eventListenersAdded = useRef(false); // Ref to track event listeners

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
  }, [businessesId, reviews]);

  const handleMouseEnter = (index: number) => {
    setHoveredStars(index + 1);
  };

  const handleMouseLeave = () => {
    setHoveredStars(0);
  };

  const handleClick = (index: number) => {
    setSelectedStars(index + 1);
  };

  const handleClickEditStars = (index: number) => {
    setEditSelectedStars(index + 1);
  };

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
      toast({
        title: "Review Added",
        description: "Review added successfully",
        variant: "success",
      });

      setReviews((prevReviews) => sortReviews([response.data, ...prevReviews]));

      // Clear the form
      setMessage("");
      setSelectedStars(0);

      // Close accordion
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

  const handleLike = useCallback(
    async (review: IReview, loggedInUser: User) => {
      const userId = (loggedInUser?._id ?? null) as string;
      const hasLiked = review.likes.includes(userId);

      try {
        if (hasLiked) {
          await api.patch(`/Reviews/unLike/${review._id}`);
          setReviews((prevReviews) =>
            prevReviews.map((r) =>
              r._id === review._id
                ? { ...r, likes: r.likes.filter((like) => like !== userId) }
                : r
            )
          );
          toast({
            title: "You disliked this review",
            description: "Review disliked",
            variant: "success",
          });
        } else {
          await api.patch(`/Reviews/like/${review._id}`);
          setReviews((prevReviews) =>
            prevReviews.map((r) =>
              r._id === review._id ? { ...r, likes: [...r.likes, userId] } : r
            )
          );
          toast({
            title: "You liked this review",
            description: "Review liked",
            variant: "success",
          });
        }
      } catch (error: any) {
        toast({
          title: "Failed to handle like!",
          description: "like failed!",
          variant: "destructive",
        });
        console.error("Error handling like:", error.message);
      }
    },
    []
  );

  const handleDelete = useCallback(async (id: string) => {
    try {
      await api.delete(`/Reviews/${id}`);
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review._id !== id)
      );
      toast({
        title: "Review Deleted",
        description: "Review deleted successfully",
        variant: "success",
      });
    } catch (error: any) {
      toast({
        title: "Failed to delete review!",
        description: "delete failed!",
        variant: "destructive",
      });
      console.log(error.message);
    }
  }, []);

  const handleEditClick = (review: IReview) => {
    setEditingReview(review);
    setEditSelectedStars(review.stars);
    setIsEditDialogOpen(true);
  };

  const handleEdit = useCallback(
    async (id: string) => {
      try {
        const updatedReview = await api.patch(`/Reviews/${id}`, {
          content: editMessage.current?.value,
          stars: editSelectedStars,
        });
        toast({
          title: "Review updated",
          description: "updated Review succsesfully",
          variant: "success",
        });
        setIsEditDialogOpen(false);
      } catch (error) {
        toast({
          title: "Failed to update review!",
          description: "update failed!",
          variant: "destructive",
        });
        console.log("Error updating review:", error);
      }
    },
    [editSelectedStars]
  );

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
    business.stars.reduce((acc, cur) => acc + cur, 0) / business.stars.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 bg-gray-100 dark:bg-gray-900 min-h-screen"
    >
      <motion.div initial={{ y: -50 }} animate={{ y: 0 }} className="mb-8">
        <img
          src={business.imageUrl || "https://via.placeholder.com/1200x300"}
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
        <div className="flex items-center space-x-1 justify-center mt-3">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              size={20}
              color="grey"
              fill={index < averageStars ? "yellow" : "white"}
            />
          ))}
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-400"
      >
        Reviews
      </motion.h2>

      <div className="space-y-4">
        {reviews.map((review, index) => (
          <motion.div
            key={review._id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 transform hover:scale-105">
              <CardHeader className="pb-2">
                <div className="flex justify-center">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      size={20}
                      className={
                        index < review.stars
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  {review.content}
                </p>
              </CardContent>
              <CardFooter className="flex justify-end items-center pt-2">
                <div className="flex items-center space-x-1 text-gray-500">
                  <span>{review.likes.length}</span>
                  <Heart
                    size={16}
                    className={
                      review.likes.includes(
                        (loggedInUser?._id ?? null) as string
                      )
                        ? "text-red-500 fill-current"
                        : "text-gray-400"
                    }
                    onClick={() => handleLike(review, loggedInUser as User)}
                  />
                  {review.user === loggedInUser?._id && (
                    <>
                      <Button variant="ghost">
                        <Trash2 onClick={() => handleDelete(review._id)} />
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => handleEditClick(review)}
                      >
                        <Pencil />
                      </Button>
                    </>
                  )}
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
        <div className="flex justify-center ">
          {loggedInUser && (
            <Accordion
              type="single"
              collapsible
              value={isAccordionOpen ? "item-1" : undefined}
              onValueChange={(value) => setIsAccordionOpen(value === "item-1")}
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>Leave a Review</AccordionTrigger>
                <AccordionContent>
                  <div className="flex justify-center">
                    <Card className="w-[350px] flex flex-col justify-center items-center">
                      <CardHeader>
                        <p className="text-xl">Leave a review</p>
                        <div className="flex items-center justify-center">
                          {Array.from({ length: 5 }, (_, index) => (
                            <Star
                              key={index}
                              size={20}
                              color="grey"
                              fill={
                                index < (hoveredStars || selectedStars)
                                  ? "yellow"
                                  : "white"
                              }
                              onMouseEnter={() => handleMouseEnter(index)}
                              onMouseLeave={handleMouseLeave}
                              onClick={() => handleClick(index)}
                              style={{ cursor: "pointer" }}
                            />
                          ))}
                        </div>
                      </CardHeader>
                      <div className="grid w-full gap-2">
                        <Textarea
                          placeholder="Type your message here."
                          value={message}
                          onChange={handleMessageChange}
                        />
                        <Button onClick={handleSubmit}>Send message</Button>
                      </div>
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit your review here</DialogTitle>
          </DialogHeader>
          <DialogDescription></DialogDescription>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    size={20}
                    color="grey"
                    fill={
                      index < (hoveredStars || editSelectedStars)
                        ? "yellow"
                        : "white"
                    }
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClickEditStars(index)}
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </div>
            </CardHeader>
            <div className="grid w-full gap-2">
              <Textarea
                placeholder="Type here."
                ref={editMessage}
                defaultValue={editingReview?.content || ""}
              />
            </div>
          </Card>
          <Button
            onClick={() => editingReview && handleEdit(editingReview._id)}
          >
            Save changes
          </Button>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

export default BusinessesDetailsPage;
