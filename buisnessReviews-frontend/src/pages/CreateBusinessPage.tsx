import { useState } from "react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { StarsMeter } from "@/components/ui/starsMeter";
import {
  handleMouseEnter,
  handleMouseLeave,
  handleClick,
} from "@/services/starts.service";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const businessSchema = z.object({
  name: z.string().min(1, "Business name is required"),
  description: z.string().min(1, "Description is required"),
});

type BusinessFormData = z.infer<typeof businessSchema>;

function CreateBusinessPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
  });
  const [selectedStars, setSelectedStars] = useState(1);
  const [hoveredStars, setHoveredStars] = useState(1);

  const onSubmit = (data: BusinessFormData) => {
    console.log({ ...data, selectedStars });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center px-4 py-8 bg-gray-100 dark:bg-gray-900 min-h-screen"
    >
      <motion.h1
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="text-4xl font-bold mb-6 text-blue-900 dark:text-blue-300"
      >
        Create a New Business
      </motion.h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg space-y-4"
      >
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Business Name
          </label>
          <input
            type="text"
            {...register("name")}
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <Textarea
            {...register("description")}
            className="w-full"
            placeholder="Write a short description..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Initial Star Rating
          </label>
          <StarsMeter
            handleClick={(index) => handleClick(index, setSelectedStars)}
            handleMouseEnter={(index) =>
              handleMouseEnter(index, setHoveredStars)
            }
            handleMouseLeave={() => handleMouseLeave(setHoveredStars)}
            hoveredStars={hoveredStars}
            selectedStars={selectedStars}
          />
        </div>

        <Button type="submit" className="w-full">
          Create Business
        </Button>
      </form>
    </motion.div>
  );
}

export default CreateBusinessPage;
