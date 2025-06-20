'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaHeart } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="relative bg-gradient-to-tr from-gray-900 via-black to-gray-900 border-t border-gray-700 overflow-hidden">
            <div className="relative z-10 container mx-auto px-6 py-20">
                <motion.div
                    className="border-t border-gray-700/50 pt-10 mt-10 w-full"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <div className="flex flex-col items-center justify-center gap-8">
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <span>Crafted with</span>
                            <FaHeart className="text-red-400 animate-pulse" />
                            <span>and</span>
                            <FaCode className="text-[#9D3BE1]" />
                            <span>by Aman Anil</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
