import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { StarsMeter } from "./ui/starsMeter";

interface ReviewCardProps {
  isAccordionOpen: boolean;
  setIsAccordionOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hoveredStars: number;
  selectedStars: number;
  handleMouseEnter: (index: number) => void;
  handleMouseLeave: () => void;
  handleClick: (index: number) => void;
  message: string;
  handleMessageChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: () => Promise<void>;
}

function LeaveAReviewCard({
  isAccordionOpen,
  setIsAccordionOpen,
  hoveredStars,
  selectedStars,
  handleMouseEnter,
  handleMouseLeave,
  handleClick,
  message,
  handleMessageChange,
  handleSubmit,
}: ReviewCardProps) {
  return (
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
  );
}

export default LeaveAReviewCard;
