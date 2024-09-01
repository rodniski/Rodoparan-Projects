"use client";
import React from "react";
import { motion } from "framer-motion";
import productsData from "@/data/productsData";

const CategoriesPage = () => {
  const categories = Object.keys(productsData);

  return (
    <div className="bg-slate-100 mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-red-700 mb-8">Categorias</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const categoryData = productsData[category];
            const numProducts =
              categoryData && Object.keys(categoryData.products).length;

            return (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col justify-between h-full"
                >
                  <a
                    href={categoryData?.href}
                    className="block p-4 flex flex-col"
                  >
                    <h3 className="text-xl font-semibold text-stone-900 mb-2">
                      {category}
                    </h3>
                    <div className="h-48 flex items-center justify-center mb-2">
                      <img
                        src={categoryData?.image}
                        alt={category}
                        className="w-auto h-full max-w-full max-h-full"
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {categoryData?.description}
                    </p>
                  </a>
                </motion.div>
                <div className="p-4 flex justify-center">
                  <a
                    href={categoryData?.href}
                    className="text-sm font-semibold text-red-600 hover:text-red-700"
                  >
                    Ver {numProducts} produtos disponíveis
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
