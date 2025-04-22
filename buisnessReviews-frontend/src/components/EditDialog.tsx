import { Card, CardHeader } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { StarsMeter } from "./ui/starsMeter";
import { handleEdit } from "@/services/review.service";
import { useToast } from "./ui/use-toast";
import { IReview } from "@/pages/BusinessesDetailsPage";

interface EditDialogProps {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleClick: (index: number) => void;
  handleMouseEnter: (index: number) => void;
  handleMouseLeave: () => void;
  hoveredStars: number;
  selectedStars: number;
  editMessage: React.RefObject<HTMLTextAreaElement>;
  editingReview: IReview | null;
  editSelectedStars: number;
}

function EditDialog({
  isEditDialogOpen,
  setIsEditDialogOpen,
  handleClick,
  handleMouseEnter,
  handleMouseLeave,
  hoveredStars,
  selectedStars,
  editMessage,
  editingReview,
  editSelectedStars,
}: EditDialogProps) {
  const { toast } = useToast();

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit your review here</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>

        <Card>
          <CardHeader>
            <StarsMeter
              handleClick={handleClick}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              hoveredStars={hoveredStars}
              selectedStars={selectedStars}
            />
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
          onClick={() =>
            editingReview &&
            handleEdit(
              editingReview._id,
              editMessage,
              editSelectedStars,
              setIsEditDialogOpen,
              toast
            )
          }
        >
          Save changes
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default EditDialog;
