'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    FaCode, 
    FaBars, 
    FaTimes, 
    FaHome, 
    FaUser, 
    FaProjectDiagram, 
    FaEnvelope} from 'react-icons/fa';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);    const navItems = [
        { name: 'Home', href: '/', icon: FaHome },
        { name: 'About', href: '#about', icon: FaUser },
        { name: 'Contact', href: '#contact', icon: FaEnvelope },
        { name: 'Skills', href: '#skills', icon: FaCode },
        { name: 'Projects', href: '/projects', icon: FaProjectDiagram },
    ];

    return (
        <motion.nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled 
                    ? 'bg-black/80 backdrop-blur-md border-b border-[#9D3BE1]/20' 
                    : 'bg-transparent'
            }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">                    
                    {/* Logo */}
                    <div className="flex">
                        <motion.div
                            className="flex items-center gap-2 cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            onClick={() => window.location.href = '/'}
                        >
                            <div className="relative">                                
                                <FaCode className="text-2xl text-[#9D3BE1]" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-[#9D3BE1] to-[#2BA233] bg-clip-text text-transparent">
                                Aman Anil
                            </span>
                        </motion.div>
                    </div>

                    {/* Desktop Navigation */}                    
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <motion.div
                                key={item.name}
                                className="flex items-center gap-2 text-gray-300 hover:text-[#9D3BE1] transition-colors duration-300 group"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    if (item.href.startsWith('#')) {
                                        const element = document.querySelector(item.href);
                                        element?.scrollIntoView({ behavior: 'smooth' });
                                    } else {
                                        window.location.href = item.href;
                                    }
                                }}
                            >
                                <item.icon className="text-sm group-hover:text-[#9D3BE1] transition-colors duration-300" />
                                <span className="relative cursor-pointer">
                                    {item.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#9D3BE1] to-[#2BA233] group-hover:w-full transition-all duration-300" />
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}                    
                    <button
                        className="md:hidden text-2xl text-[#9D3BE1] hover:text-[#8423D0] transition-colors duration-300"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                <motion.div
                    className={`md:hidden mt-4 ${isOpen ? 'block' : 'hidden'}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                        opacity: isOpen ? 1 : 0, 
                        height: isOpen ? 'auto' : 0 
                    }}
                    transition={{ duration: 0.3 }}
                >                    <div className="bg-black/90 backdrop-blur-sm rounded-lg border border-[#9D3BE1]/20 p-4">
                        {navItems.map((item, index) => (
                            <motion.div
                                key={item.name}
                                className="flex items-center gap-3 py-3 px-2 text-gray-300 hover:text-[#9D3BE1] hover:bg-[#9D3BE1]/10 rounded-lg transition-all duration-300"
                                onClick={() => {
                                    if (item.href.startsWith('#')) {
                                        const element = document.querySelector(item.href);
                                        element?.scrollIntoView({ behavior: 'smooth' });
                                    } else {
                                        window.location.href = item.href;
                                    }
                                    setIsOpen(false);
                                }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <item.icon className="text-[#9D3BE1]" />
                                <span>{item.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.nav>
    );
}