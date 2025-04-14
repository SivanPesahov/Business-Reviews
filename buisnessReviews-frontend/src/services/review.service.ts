import { User } from "@/components/AuthProvider";
import { IReview } from "@/pages/BusinessesDetailsPage";
import api from "./api.service";
import { useToast } from "@/components/ui/use-toast";

export const handleLike = async (
  review: IReview,
  loggedInUser: User,
  setFunc: React.Dispatch<React.SetStateAction<IReview[]>>,
  toast: ReturnType<typeof useToast>["toast"]
) => {
  const userId = (loggedInUser?._id ?? null) as string;
  const hasLiked = review.likes.includes(userId);

  try {
    if (hasLiked) {
      await api.patch(`/Reviews/unLike/${review._id}`);
      setFunc((prevReviews: IReview[]) =>
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
      setFunc((prevReviews: IReview[]) =>
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
};

export const handleDelete = async (
  id: string,
  setFunc: React.Dispatch<React.SetStateAction<IReview[]>>,
  toast: ReturnType<typeof useToast>["toast"]
) => {
  try {
    await api.delete(`/Reviews/${id}`);
    setFunc((prevReviews: IReview[]) =>
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
};

export const handleEditClick = (
  review: IReview,
  setEditingReview: React.Dispatch<React.SetStateAction<IReview | null>>,
  setEditSelectedStars: React.Dispatch<React.SetStateAction<number>>,
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setEditingReview(review);
  setEditSelectedStars(review.stars);
  setIsEditDialogOpen(true);
};

export const handleEdit = async (
  id: string,
  editMessage: React.RefObject<HTMLTextAreaElement>,
  editSelectedStars: number,
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  toast: ReturnType<typeof useToast>["toast"]
) => {
  try {
    await api.patch(`/Reviews/${id}`, {
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
};
