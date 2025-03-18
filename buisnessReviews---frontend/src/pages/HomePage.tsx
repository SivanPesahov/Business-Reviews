import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Star, Users, TrendingUp } from "lucide-react";

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-blue-100 dark:from-gray-900 dark:to-blue-950">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <h1 className="text-6xl font-bold mb-4 text-blue-900 dark:text-blue-300">
            Welcome to SHOWBIZ
          </h1>
          <p className="text-xl mb-8 text-gray-700 dark:text-gray-300">
            Discover top-rated businesses in your area. Read reviews, compare
            ratings, and find the best services to meet your needs.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/businesses" className="inline-block">
              <Button className="bg-amber-500 hover:bg-amber-400 text-blue-900 px-8 py-3 rounded-full text-lg font-semibold transition duration-300 shadow-lg hover:shadow-xl">
                Explore Businesses
              </Button>
            </Link>
          </motion.div>
        </motion.div>
        <div className="absolute top-0 left-0 w-full h-full">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ repeat: Infinity, duration: 10 }}
            className="w-64 h-64 bg-yellow-300 rounded-full opacity-20 absolute -top-20 -left-20"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -5, 5, 0],
            }}
            transition={{ repeat: Infinity, duration: 12 }}
            className="w-96 h-96 bg-pink-300 rounded-full opacity-20 absolute -bottom-40 -right-40"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-blue-600 dark:text-blue-400">
            Our Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: Search,
                title: "Easy Search",
                description:
                  "Find businesses quickly with our advanced search and filter options.",
              },
              {
                icon: Star,
                title: "Ratings & Reviews",
                description:
                  "Read genuine reviews and ratings from other users to help you make informed decisions.",
              },
              {
                icon: Users,
                title: "Community Driven",
                description:
                  "Join a thriving community of users sharing their experiences and recommendations.",
              },
              {
                icon: TrendingUp,
                title: "Trending Businesses",
                description:
                  "Discover popular and trending businesses in your area.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                  y: -5,
                }}
                className="p-6 rounded-lg shadow-lg text-center bg-gradient-to-br from-white to-blue-50 dark:from-gray-700 dark:to-gray-600"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-blue-50 dark:bg-blue-950">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-blue-600 dark:text-blue-400">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "SHOWBIZ helped me find the best coffee shop in town. The reviews were spot on!",
                author: "Jane Doe",
                role: "Coffee Enthusiast",
              },
              {
                quote:
                  "Thanks to SHOWBIZ, I found a reliable plumber within minutes. Saved me so much time!",
                author: "John Smith",
                role: "Homeowner",
              },
              {
                quote:
                  "As a small business owner, SHOWBIZ has been instrumental in helping me reach new customers.",
                author: "Alice Johnson",
                role: "Local Business Owner",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                  y: -5,
                }}
                className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 cursor-pointer"
              >
                <motion.p
                  className="mb-4 text-gray-600 dark:text-gray-300 italic"
                  whileHover={{ scale: 1.02 }}
                >
                  "{testimonial.quote}"
                </motion.p>
                <motion.div whileHover={{ x: 5 }}>
                  <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {testimonial.author}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="container mx-auto px-4 text-center"
        >
          <h2 className="text-4xl font-bold mb-4">
            Ready to Discover Top Businesses?
          </h2>
          <p className="text-xl mb-8">
            Sign up today and start exploring the best businesses in your area.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/auth/register" className="inline-block">
              <Button className="bg-white text-blue-600 hover:bg-blue-100 px-8 py-3 rounded-full text-lg font-semibold transition duration-300 shadow-lg hover:shadow-xl">
                Sign Up Now
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

export default HomePage;
