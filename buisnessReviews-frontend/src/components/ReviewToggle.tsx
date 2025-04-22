import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Heart, Pencil, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  handleDelete,
  handleEditClick,
  handleLike,
} from "@/services/review.service";
import { IReview } from "@/pages/BusinessesDetailsPage";
import { useAuth, User } from "./AuthProvider";
import { useToast } from "./ui/use-toast";

interface ReviewToggleProps {
  reviews: IReview[];
  setReviews: React.Dispatch<React.SetStateAction<IReview[]>>;
  setEditingReview: React.Dispatch<React.SetStateAction<IReview | null>>;
  setEditSelectedStars: React.Dispatch<React.SetStateAction<number>>;
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ReviewToggle({
  reviews,
  setReviews,
  setEditingReview,
  setEditSelectedStars,
  setIsEditDialogOpen,
}: ReviewToggleProps) {
  const { toast } = useToast();
  const { loggedInUser } = useAuth();

  return (
    <div className="space-y-4 max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
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
                    review.likes.includes((loggedInUser?._id ?? null) as string)
                      ? "text-red-500 fill-current"
                      : "text-gray-400"
                  }
                  onClick={() =>
                    handleLike(review, loggedInUser as User, setReviews, toast)
                  }
                />
                {review.user === loggedInUser?._id && (
                  <>
                    <Button variant="ghost">
                      <Trash2
                        onClick={() =>
                          handleDelete(review._id, setReviews, toast)
                        }
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() =>
                        handleEditClick(
                          review,
                          setEditingReview,
                          setEditSelectedStars,
                          setIsEditDialogOpen
                        )
                      }
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
    </div>
  );
}

export default ReviewToggle;
