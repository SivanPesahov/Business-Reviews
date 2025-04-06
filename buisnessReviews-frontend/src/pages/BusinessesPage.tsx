import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import api from "@/services/api.service";
import { Star } from "lucide-react";

interface IBusiness {
  _id: string;
  name: string;
  description: string;
  stars: number[];
  imageUrl: string; // Add this property for the image URL
}

function BusinessesPage() {
  const [businesses, setBusinesses] = useState<IBusiness[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getBusinesses() {
      try {
        const response = await api.get("/Business/businesses");
        console.log(response);
        setBusinesses(response.data);
      } catch (error: any) {
        setError(error.response ? error.response.data.message : error.message);
      } finally {
        setLoading(false);
      }
    }
    getBusinesses();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 bg-gray-100 dark:bg-gray-900 min-h-screen"
    >
      <motion.h1
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="text-4xl font-bold text-center mb-8 text-blue-900 dark:text-blue-300"
      >
        Discover Amazing Businesses
      </motion.h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {businesses.map((business: IBusiness, index) => (
          <motion.div
            key={business._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg bg-white dark:bg-gray-800 transform hover:scale-105">
              <Link to={`/businesses/${business._id}`} className="block h-full">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={business.imageUrl || "https://via.placeholder.com/300"}
                    alt={business.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold truncate text-blue-800 dark:text-blue-300">
                    {business.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {business.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-end p-4">
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star
                        key={index}
                        size={16}
                        fill={
                          index <
                          business.stars.reduce(
                            (acc: number, cur) => acc + cur,
                            0
                          ) /
                            business.stars.length -
                            1
                            ? "yellow"
                            : "white"
                        }
                      />
                    ))}
                  </div>
                </CardFooter>
              </Link>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default BusinessesPage;
