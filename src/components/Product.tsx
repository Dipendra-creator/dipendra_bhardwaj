"use client";

import { Product } from "@/types/products";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star } from 'lucide-react';

export const SingleProduct = ({ product }: { product: Product }) => {
  const [activeImage, setActiveImage] = useState<string>(product.thumbnail);

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col-reverse"
          >
            <div className="mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
              <div className="grid grid-cols-4 gap-6">
                {product.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(image)}
                    className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                  >
                    <span className="sr-only">View {product.title} image {idx + 1}</span>
                    <span className="absolute inset-0 rounded-md overflow-hidden">
                      <Image
                        src={image}
                        alt=""
                        className="w-full h-full object-center object-cover"
                        width={96}
                        height={96}
                      />
                    </span>
                    <span
                      className={`absolute inset-0 rounded-md ring-2 ring-offset-2 ${
                        activeImage === image ? 'ring-indigo-500' : 'ring-transparent'
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full aspect-w-1 aspect-h-1">
              <Image
                src={activeImage}
                alt={product.title}
                className="w-full h-full object-center object-cover sm:rounded-lg"
                width={600}
                height={600}
              />
            </div>
          </motion.div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.title}</h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
            </div>

            {/* Reviews */}
            <div className="mt-3">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                </div>
                {/*<p className="sr-only">{product.rating} out of 5 stars</p>*/}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-gray-700 space-y-6">{product.description}</div>
            </div>

            <div className="mt-6">
              <div className="flex items-center space-x-2">
                {product.stack?.map((stack: string) => (
                  <span
                    key={stack}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {stack}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10 flex sm:flex-col1">
              <a
                href={product.href}
        target="__blank"
        className="inline-flex items-center gap-1 group/button rounded-full hover:scale-105 focus:outline-none transition ring-offset-gray-900 bg-gray-800 text-white shadow-lg shadow-black/20 sm:backdrop-blur-sm group-hover/button:bg-gray-50/15 group-hover/button:scale-105 focus-visible:ring-1 focus-visible:ring-offset-2 ring-gray-50/60 text-sm font-medium px-4 py-2 mt-auto origin-left"
              >
                Live Preview
                <svg
                  xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
                  viewBox="0 0 24 24"
          fill="none"
                  stroke="currentColor"
          strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
          className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform">
          <path d="M5 12l14 0"></path>
          <path d="M13 18l6 -6"></path>
          <path d="M13 6l6 6"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Content section */}
        {product.content && (
          <div className="mt-16 lg:mt-20 border-t border-gray-200 pt-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Additional Details</h3>
            <div className="prose prose-lg max-w-none text-gray-500">
              {product.content}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

