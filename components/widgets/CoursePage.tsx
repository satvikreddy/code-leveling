import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  course: {
    title: string;
    description: string;
    courseIndex: string[];
    url: string;
  };
};

const CoursePage = ({ course }: Props) => {
  return (
    <div className="min-h-screen bg-card text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="text-green-400 font-mono text-xl font-bold">
              &lt;/&gt; CodeLevelUp
            </div>
          </div>
          <div className="flex items-center space-x-8">
            {/* <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white"
              >
                Login
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Start Quest
              </Button>
            </div> */}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] max-w-7xl mx-auto">
        {/* Left Side - Course Info */}
        <div className="flex-1 px-6 md:px-12 py-6 flex flex-col justify-center max-w-2xl lg:max-w-2xl mx-auto lg:mx-0">
          <div>
            <div className="inline-block px-3 py-1 bg-purple-900/50 border border-purple-700 rounded-full text-purple-300 text-xs font-mono mb-6">
              v0.0.1 EARLY ACCESS
            </div>

            <h1 className="text-5xl font-bold mb-6 leading-tight">
              <span className="text-green-400">Learn</span>{" "}
              <span className="text-purple-400"></span>
            </h1>

            <h2 className="text-3xl font-bold mb-4 text-white">
              {course.title}
            </h2>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              {course.description}
            </p>

            <div className="flex space-x-4 mb-8">
              <Button
                asChild
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
              >
                <a href={course.url}>Start Leveling →</a>
              </Button>
            </div>

            <div className="flex items-center text-gray-400">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2 mt-1"></div>
              <span>created by ex-microsoft dev with 7+ years experience</span>
            </div>
          </div>
        </div>

        {/* Right Side - Terminal */}
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="w-full max-w-2xl">
            <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-2xl">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-gray-700 rounded-t-lg border-b border-gray-600">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-gray-300 text-sm font-mono">
                  code-level-up
                </div>
                <div className="text-gray-400 text-sm">bash</div>
              </div>

              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm relative">
                <div className="text-green-400 mb-2">
                  Welcome to CodeLevelUp
                </div>
                <div className="text-gray-400 mb-4">
                  The simplest way to level up your coding skills
                </div>

                <div className="mt-4 text-purple-400">
                  <div>🚀 Why CodeLevelUp?</div>
                  <div className="text-gray-300 mt-2 space-y-1">
                    <div>• Practical real-world examples.</div>
                    <div>• Derive solution from problem.</div>
                    <div>• No setup. Works in browser.</div>
                    <div>• Free. No login. No paywall. </div>
                  </div>
                </div>

                <div className="mt-4 mb-2">
                  <span className="text-blue-400">$</span>{" "}
                  <span className="text-green-400 mb-2">Course Content</span>
                </div>

                <div className="space-y-2 text-gray-300">
                  {course.courseIndex.map((e, i) => (
                    <div key={i}>{e}</div>
                  ))}

                  <div className="text-green-400 pt-2">→ Start leveling up</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CoursePage;
