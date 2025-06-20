'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaCode, FaExclamationTriangle } from 'react-icons/fa';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
            {/* Animated background elements */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#9D3BE1]/20 to-[#2BA233]/20 rounded-full blur-xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [360, 180, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-l from-[#9D3BE1]/15 to-[#2BA233]/15 rounded-full blur-xl"
                />
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#9D3BE1]/20 rounded-full blur-xl"
                />
            </div>

            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                {/* 404 Animation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="mb-8"
                >
                    <motion.h1
                        className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-[#9D3BE1] to-[#2BA233] bg-clip-text text-transparent mb-4"
                        animate={{ 
                            textShadow: [
                                "0 0 10px rgba(157, 59, 225, 0.5)",
                                "0 0 20px rgba(157, 59, 225, 0.8)",
                                "0 0 10px rgba(157, 59, 225, 0.5)"
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        404
                    </motion.h1>
                </motion.div>

                {/* Warning Icon Animation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mb-8"
                >
                    <motion.div
                        animate={{ 
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="inline-block"
                    >
                        <FaExclamationTriangle className="text-6xl text-yellow-500 mb-6" />
                    </motion.div>
                </motion.div>

                {/* Error Message */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="mb-8"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-xl text-gray-300 mb-2">
                        Oops! The page you're looking for doesn't exist.
                    </p>
                    <p className="text-lg text-gray-400">
                        It might have been moved, deleted, or you entered the wrong URL.
                    </p>
                </motion.div>

                {/* Code Icon with Animation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="mb-12"
                >
                    <motion.div
                        animate={{ 
                            rotate: [0, 360],
                        }}
                        transition={{ 
                            duration: 10, 
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="inline-block"
                    >
                        <FaCode className="text-4xl text-[#9D3BE1] opacity-60" />
                    </motion.div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Link href="/">
                        <motion.button
                            whileHover={{ 
                                scale: 1.05,
                                boxShadow: "0 0 20px rgba(157, 59, 225, 0.4)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#9D3BE1] to-[#8423D0] text-white rounded-lg font-semibold hover:from-[#8423D0] hover:to-[#7A1FB8] transition-all duration-300 shadow-lg"
                        >
                            <FaHome className="text-lg" />
                            Back to Home
                        </motion.button>
                    </Link>

                    <Link href="/projects">
                        <motion.button
                            whileHover={{ 
                                scale: 1.05,
                                borderColor: "rgba(157, 59, 225, 0.8)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-3 px-8 py-4 border-2 border-gray-700 text-white rounded-lg font-semibold hover:border-[#9D3BE1] hover:bg-[#9D3BE1]/10 transition-all duration-300"
                        >
                            <FaCode className="text-lg" />
                            View Projects
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Footer Message */}                
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                    className="mt-16 text-center"
                >
                    <p className="text-gray-500 text-sm">
                        If you believe this is an error, please{' '}
                        <Link href="/#contact" className="text-[#9D3BE1] hover:text-[#8423D0] transition-colors">
                            contact me
                        </Link>
                    </p>
                </motion.div>
            </div>            {/* Floating particles effect */}
            <div className="absolute inset-0 z-0">
                {[
                    { left: 20, top: 30, moveX: 40, moveY: -30, duration: 4, delay: 0 },
                    { left: 80, top: 70, moveX: -50, moveY: 20, duration: 5, delay: 0.5 },
                    { left: 40, top: 80, moveX: 30, moveY: -40, duration: 3.5, delay: 1 },
                    { left: 70, top: 20, moveX: -40, moveY: 50, duration: 4.5, delay: 1.5 },
                    { left: 10, top: 60, moveX: 60, moveY: -20, duration: 3, delay: 0.3 },
                    { left: 90, top: 40, moveX: -30, moveY: 40, duration: 5.5, delay: 0.8 }
                ].map((particle, i) => (
                    <motion.div
                        key={i}
                        className={`absolute w-2 h-2 bg-[#9D3BE1]/30 rounded-full`}
                        animate={{
                            x: [0, particle.moveX],
                            y: [0, particle.moveY],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            delay: particle.delay,
                        }}
                        style={{
                            left: `${particle.left}%`,
                            top: `${particle.top}%`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}