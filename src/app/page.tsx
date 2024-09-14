"use client";

import { Button } from "@/components/ui/button";
import { Grid, Heart, Share2 } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-purple-600">
          InterestGallery
        </Link>

        <Link href={"/auth/signup"}>
          <Button>Sign Up</Button>
        </Link>
      </header>

      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800">
            Discover and Collect Your Interests
          </h1>
          <p className="text-xl mb-8 text-gray-600">
            Explore, save, and share ideas that inspire you.
          </p>
          <div className="transition-opacity duration-300 ease-in-out delay-200 opacity-0 animate-fade-in">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 transition-colors"
            >
              Get Started
            </Button>
          </div>
        </section>

        <section id="features" className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
            Why Choose InterestGallery?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Grid className="w-12 h-12 text-purple-600" />,
                title: "Organize Your Ideas",
                description:
                  "Create boards and collections to keep your interests neatly arranged.",
              },
              {
                icon: <Heart className="w-12 h-12 text-purple-600" />,
                title: "Discover New Passions",
                description:
                  "Explore a vast array of topics and find new things you love.",
              },
              {
                icon: <Share2 className="w-12 h-12 text-purple-600" />,
                title: "Share with Friends",
                description:
                  "Collaborate on boards and share your discoveries with others.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="explore" className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
            Explore Trending Interests
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Travel",
              "Recipes",
              "Home Decor",
              "Fashion",
              "Technology",
              "Art",
              "Fitness",
              "DIY",
            ].map((interest, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
              >
                <img
                  src={`/placeholder.svg?height=300&width=300&text=${interest}`}
                  alt={interest}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-xl font-bold">
                    {interest}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Ready to Start Your Collection?
          </h2>
          <p className="text-xl mb-8 text-gray-600">
            Join InterestGallery today and start curating your digital
            inspiration board.
          </p>
        </section>
      </main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 mb-4 md:mb-0">
            © 2023 InterestGallery. All rights reserved.
          </div>
          <nav className="flex space-x-4">
            <Link
              href="#"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
