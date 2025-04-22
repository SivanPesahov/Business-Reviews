import React, { useState } from "react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function CreateBusinessPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, description, stars });
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
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg space-y-4"
      >
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Business Name
          </label>
          <input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <Textarea
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
            className="w-full"
            placeholder="Write a short description..."
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Initial Star Rating
          </label>
          <select
            value={stars}
            onChange={(e) => setStars(Number(e.target.value))}
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star}
              </option>
            ))}
          </select>
        </div>

        <Button type="submit" className="w-full">
          Create Business
        </Button>
      </form>
    </motion.div>
  );
}

export default CreateBusinessPage;
