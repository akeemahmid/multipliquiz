"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import multiimage from "../public/multiimage.png";
import Entrypage from "@/components/Entry";

export default function Home() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <div>
      <div className="flex items-center w-full min-h-full justify-center">
        {open && (
          <AnimatePresence>
            <>
              {/* Backdrop */}
              <motion.div
                key="backdrop"
                className="fixed inset-0 z-40 bg-black/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* Centered modal container */}
              <motion.div
                key="modal"
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="bg-[#08090b] flex flex-col justify-center items-center gap-5 text-center w-auto md:max-w-[400px] rounded-xl p-6 shadow-lg shadow-[#a66cff]">
                  <Image src={multiimage} alt="name" width={150} height={70} />
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Welcome to the Multipli Quiz
                  </h2>
                  <p className="text-[16px] md:text-lg font-semibold text-[#a66cff]">
                    Test your knowledge and see how much you know about
                    Multipli!
                  </p>
                  <button
                    onClick={() => setOpen(false)}
                    className="mt-5 py-4 px-7 font-bold bg-transparent border-2 cursor-pointer border-[#6e7777] text-white rounded-2xl text-sm hover:text-lg md:text-lg hover:md:text-xl hover:bg-gradient-to-r hover:from-[#a66cff] hover:to-[#3E3170] hover:border-none"
                  >
                    Start Quiz
                  </button>
                </div>
              </motion.div>
            </>
          </AnimatePresence>
        )}
      </div>

      {!open && <Entrypage />}
    </div>
  );
}
