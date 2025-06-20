'use client'

import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
    FaCode,
    FaGlobe,
    FaShieldAlt,
    FaDownload,
    FaEnvelope,
    FaPhone,
    FaGithub,
    FaLinkedin,
    FaInstagram,
    FaExternalLinkAlt,
    FaAward,
    FaCoffee,
    FaMusic,
    FaUsers,
    FaPaperPlane,
    FaCheckCircle,
    FaUserSecret,
    FaBrain,
    FaBug,
    FaChartLine,
    FaProjectDiagram,
    FaRobot,
    FaSearch,
    FaBook,
    FaDumbbell,
    FaFacebook
} from 'react-icons/fa';
import { HiOutlineShieldCheck } from 'react-icons/hi';
import { RiMentalHealthLine } from 'react-icons/ri';
import { TbStack3, TbDatabaseSearch, TbReportSearch } from 'react-icons/tb';
import { GiSpy } from 'react-icons/gi';
import { PiChartLineUpBold } from 'react-icons/pi';

// Interfaces
interface TimelineItemProps {
    year: string;
    title: string;
    institution: string;
    description: string;
    icon: React.ReactNode;
}

interface FunFactCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
}

interface CertificationCardProps {
    title: string;
    issuer: string;
    date: string;
    icon: React.ReactNode;
}

interface TypingTextProps {
    texts: string[];
    speed?: number;
    deleteSpeed?: number;
    pauseTime?: number;
}

const services = [
    {
        icon: <TbStack3 className="w-8 h-8 text-orange-500" />,
        title: "Full-Stack Systems Engineering",
        description: "Architect component-driven apps with real-time backends, edge functions, and serverless infra tailored for scale."
    },
    {
        icon: <RiMentalHealthLine className="w-8 h-8 text-indigo-500" />,
        title: "AI/ML Scientist & Engineering",
        description: "Build brain-inspired AI models, deploy learning pipelines, and automate intelligent decision-making for future-ready applications."
    },
    {
        icon: <PiChartLineUpBold className="w-8 h-8 text-green-500" />,
        title: "Data Scientist & Engineering",
        description: "Merge big data with ML to forecast outcomes, detect trends, and deliver actionable insights with hybrid analytics engines."
    },
    {
        icon: <TbDatabaseSearch className="w-8 h-8 text-yellow-500" />,
        title: "Business Intelligence Analyst & Engineering",
        description: "Design robust data pipelines and analytics systems that transform raw data into actionable business insights using modern BI tools and engineering best practices."
    },
    {
        icon: <HiOutlineShieldCheck className="w-8 h-8 text-red-500" />,
        title: "Cyber Defense & Cyber Warfare Strategies",
        description: "Build proactive digital armor with live threat monitoring, zero-trust design, and security workflows aligned to global standards."
    },
    {
        icon: <TbReportSearch className="w-8 h-8 text-purple-500" />,
        title: "Digital Forensics & Incident Response",
        description: "Expose digital footprints, track threat actors, and investigate breaches using deep-forensic tooling."
    },
    {
        icon: <GiSpy className="w-8 h-8 text-blue-500" />,
        title: "Cyber Intelligence",
        description: "Strategic cyber intelligence solutions combining adversary profiling, AI-powered threat detection, OSINT operations, and proactive reconnaissance to predict and neutralize evolving threats."
    },
    {
        icon: <FaUserSecret className="w-8 h-8 text-pink-500" />,
        title: "Ethical Hacking & Vulnerability Assessment",
        description: "Identify weaknesses with professional ethical hacking, penetration testing, and end-to-end vulnerability assessment."
    }
];

const socialLinks = [
    { icon: <FaGithub className="w-5 h-5" />, url: "https://www.github.com/amananilofficial", label: "GitHub" },
    { icon: <FaLinkedin className="w-5 h-5" />, url: "https://in.linkedin.com/in/amananilofficial", label: "LinkedIn" },
    { icon: <FaInstagram className="w-5 h-5" />, url: "https://www.instagram.com/amananilofficial", label: "Instagram" },
    { icon: <FaFacebook className="w-5 h-5" />, url: "https://www.facebook.com/amananilofficial", label: "Facebook" }
];

const education = [
    {
        year: "2020-2024",
        title: "Bachelor of Computer Science",
        institution: "Tech University",
        description: "Specialized in Software Engineering and AI",
        icon: <FaAward className="w-5 h-5" />
    },
    {
        year: "2018-2020",
        title: "Advanced Diploma",
        institution: "Coding Institute",
        description: "Full-stack development and database management",
        icon: <FaCode className="w-5 h-5" />
    }
];

const experience = [
    {
        year: "2023-Present",
        title: "Senior Full Stack Developer",
        institution: "TechCorp Solutions",
        description: "Leading development of enterprise applications",
        icon: <FaUsers className="w-5 h-5" />
    },
    {
        year: "2021-2023",
        title: "Frontend Developer",
        institution: "StartupXYZ",
        description: "Built responsive web applications and user interfaces",
        icon: <FaCode className="w-5 h-5" />
    }
];

const skillCategories = [
    {
        category: "Full-Stack Systems Engineering",
        icon: <FaCode className="w-8 h-8 text-blue-600" />,
        skills: [
            "System Design & Architecture",
            "REST/GraphQL API Development",
            "Microservices & Containerization",
            "CI/CD & DevOps",
            "Cloud-Native App Deployment"
        ],
        tools: [
            "Next.js & Flutter",
            "Django",
            "PostgreSQL",
            "Docker & Kubernetes",
            "GitHub Actions"
        ]
    },
    {
        category: "AI/ML Scientist & Engineering",
        icon: <FaRobot className="w-8 h-8 text-purple-600" />,
        skills: [
            "Deep Learning (CNNs, Transformers)",
            "Supervised & Unsupervised Learning",
            "Model Evaluation & Tuning",
            "NLP & Computer Vision",
            "MLOps & Model Deployment"
        ],
        tools: [
            "PyTorch / TensorFlow",
            "Scikit-learn",
            "Hugging Face Transformers",
            "Weights & Biases",
            "FastAPI / Flask"
        ]
    },
    {
        category: "Data Scientist & Engineering",
        icon: <FaChartLine className="w-8 h-8 text-green-600" />,
        skills: [
            "Exploratory Data Analysis (EDA)",
            "Data Cleaning & Preprocessing",
            "Predictive Modeling",
            "Feature Engineering",
            "Data Pipeline Engineering"
        ],
        tools: [
            "Python (Pandas, NumPy)",
            "SQL",
            "Apache Airflow",                                            
            "Jupyter & GitHub",
            "Power BI"
        ]
    },
    {
        category: "Business Intelligence Analyst & Engineering",
        icon: <FaProjectDiagram className="w-8 h-8 text-orange-500" />,
        skills: [
            "ETL/ELT Design",
            "Data Modeling",
            "Dashboard Creation",
            "KPI Analysis",
            "Stakeholder Communication"
        ],
        tools: [
            "Power BI",
            "SQL",
            "Microsoft Excel (Advanced)",
            "Looker Studio",
            "Google Sheets (Advanced)"
        ]
    },
    {
        category: "Cyber Defense & Cyber Warfare Strategies",
        icon: <FaShieldAlt className="w-8 h-8 text-red-600" />,
        skills: [
            "Threat Modeling & SOC Operations",
            "Intrusion Detection & Prevention",
            "Vulnerability Management",
            "Network Hardening",
            "Threat Hunting"
        ],
        tools: [
            "Splunk / ELK Stack",
            "Suricata / Zeek",
            "Nessus / OpenVAS",
            "Wireshark",
            "MITRE ATT&CK Navigator"
        ]
    },
    {
        category: "Digital Forensics & Incident Response",
        icon: <FaSearch className="w-8 h-8 text-yellow-600" />,
        skills: [
            "Chain of Custody & Evidence Handling",
            "Disk & Memory Forensics",
            "Log Correlation & Timeline Analysis",
            "Malware Analysis",
            "Incident Reporting"
        ],
        tools: [
            "Autopsy / Sleuth Kit",
            "FTK / X-Ways",
            "Volatility",
            "Magnet AXIOM",
            "Wireshark"
        ]
    },
    {
        category: "Cyber Intelligence",
        icon: <FaBrain className="w-8 h-8 text-pink-600" />,
        skills: [
            "Threat Actor Profiling",
            "OSINT & Dark Web Monitoring",
            "IOC Creation",
            "Infrastructure Mapping",
            "Intelligence Report Generation"
        ],
        tools: [
            "MISP",
            "Shodan / Censys",
            "Maltego",
            "VirusTotal",
            "MITRE ATT&CK"
        ]
    },
    {
        category: "Ethical Hacking & Vulnerability Assessment",
        icon: <FaBug className="w-8 h-8 text-lime-600" />,
        skills: [
            "Reconnaissance & Enumeration",
            "Web Application Pentesting",
            "Network Exploitation",
            "Privilege Escalation",
            "Red Team Tactics"
        ],
        tools: [
            "Burp Suite",
            "Nmap",
            "Metasploit",
            "Nessus",
            "Parrot Sec OS"
        ]
    }
];


const stats = [
    { number: "10+", label: "Projects Completed" },
    { number: "1.5+", label: "Years Experience" },
    { number: "5+", label: "Happy Clients" },
    { number: "100%", label: "Success Rate" }
];

const certifications = [
    {
        title: "AWS Solutions Architect",
        issuer: "Amazon Web Services",
        date: "2023",
        icon: <FaShieldAlt className="w-5 h-5" />
    },
    {
        title: "React Developer Certification",
        issuer: "Meta",
        date: "2022",
        icon: <FaCode className="w-5 h-5" />
    },
    {
        title: "Google Cloud Professional",
        issuer: "Google",
        date: "2023",
        icon: <FaGlobe className="w-5 h-5" />
    }
];

const funFacts = [
    {
        icon: <FaCoffee className="w-6 h-6" />,
        title: "Coffee Enthusiast",
        description: "I drink at least 4 cups of coffee daily. It fuels my coding marathons and deep focus sessions.",
        color: "from-amber-500 to-orange-600"
    },
    {
        icon: <FaMusic className="w-6 h-6" />,
        title: "Music Lover",
        description: "I play guitar and produce electronic music. Music helps me stay creative and in rhythm with life.",
        color: "from-purple-500 to-pink-600"
    },
    {
        icon: <FaDumbbell className="w-6 h-6" />,
        title: "MMA & Gym",
        description: "Training in MMA and hitting the gym keeps my mind sharp and body strong. Discipline in fitness powers discipline in life.",
        color: "from-red-600 to-orange-500"
    },
    {
        icon: <FaBook className="w-6 h-6" />,
        title: "Reading Books",
        description: "Avid reader of tech and logical thinking books. Reading expands my mindset and inspires better solutions.",
        color: "from-green-500 to-emerald-600"
    }
];

// Typing Text Component
const TypingText: React.FC<TypingTextProps> = memo(({
    texts,
    speed = 100,
    deleteSpeed = 50,
    pauseTime = 2000
}) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false); useEffect(() => {
        if (typeof window === 'undefined') return; // Only run on client

        const text = texts[currentTextIndex];

        const timeout = setTimeout(() => {
            if (isDeleting) {
                setCurrentText(text.substring(0, currentText.length - 1));
                if (currentText === '') {
                    setIsDeleting(false);
                    setCurrentTextIndex((prev) => (prev + 1) % texts.length);
                }
            } else {
                setCurrentText(text.substring(0, currentText.length + 1));
                if (currentText === text) {
                    setTimeout(() => setIsDeleting(true), pauseTime);
                }
            }
        }, isDeleting ? deleteSpeed : speed);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentTextIndex, texts, speed, deleteSpeed, pauseTime]); return (
        <span className="text-[#9D3BE1] font-bold" suppressHydrationWarning>
            {currentText}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="ml-1"
            >
                |
            </motion.span>
        </span>
    );
});

// Timeline Item Component
const TimelineItem: React.FC<TimelineItemProps> = memo(({ year, title, institution, description, icon }) => (
    <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-start space-x-4 p-6 bg-black border border-gray-800 rounded-lg hover:border-[#9D3BE1] transition-all"
    >
        <div className="flex-shrink-0 w-12 h-12 bg-[#9D3BE1]/20 rounded-full flex items-center justify-center text-[#9D3BE1]">
            {icon}
        </div>
        <div className="flex-1">
            <div className="text-sm text-[#9D3BE1] font-semibold">{year}</div>
            <h3 className="text-lg font-bold text-white mt-1">{title}</h3>
            <p className="text-[#9D3BE1] font-medium">{institution}</p>
            <p className="text-gray-300 mt-2">{description}</p>
        </div>
    </motion.div>
));


// Fun Fact Card Component
const FunFactCard: React.FC<FunFactCardProps> = memo(({ icon, title, description, color }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        className={`bg-gradient-to-r ${color} p-6 rounded-lg text-white shadow-lg`}
    >
        <div className="mb-4">{icon}</div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm opacity-90">{description}</p>
    </motion.div>
));

// Certification Card Component
const CertificationCard: React.FC<CertificationCardProps> = memo(({ title, issuer, date, icon }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-black border border-gray-800 p-6 rounded-lg hover:border-[#9D3BE1] transition-all border-l-4 border-l-[#9D3BE1]"
    >
        <div className="flex items-start justify-between">
            <div className="flex-1">
                <h3 className="font-bold text-white mb-1">{title}</h3>
                <p className="text-[#9D3BE1] font-medium">{issuer}</p>
                <p className="text-gray-400 text-sm mt-1">{date}</p>
            </div>
            <div className="text-[#9D3BE1]">{icon}</div>
        </div>
    </motion.div>
));

// Main Component
const ItsMe: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        phone: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [selectedSkillCategory, setSelectedSkillCategory] = useState<number | null>(null); const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', subject: '', phone: '', email: '', message: '' });
                setTimeout(() => setSubmitStatus('idle'), 5000);
            } else {
                setSubmitStatus('error');
                console.error('Error:', data.error);
                setTimeout(() => setSubmitStatus('idle'), 5000);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus('idle'), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const openSkillModal = (index: number) => {
        setSelectedSkillCategory(index);
    };

    const closeSkillModal = () => {
        setSelectedSkillCategory(null);
    };

    return (
        <div className="min-h-screen bg-black text-white relative">

            {/* Hero Section */}
            <section className="relative z-10 min-h-screen flex items-center justify-center px-4 overflow-hidden">
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
                </div>

                <div className="max-w-5xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Text Content */}
                        <div className="text-center lg:text-left space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="space-y-2"
                            >
                                <p className="text-[#9D3BE1] font-semibold text-lg tracking-wide">
                                    👋 Hello, I'm
                                </p>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                                    <span className="bg-gradient-to-r from-[#9D3BE1] to-[#2BA233] bg-clip-text text-transparent">
                                        Aman Anil
                                    </span>
                                </h1>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="space-y-4"
                            >
                                <div className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-medium">
                                    I'm a{' '}
                                    <TypingText
                                        texts={[
                                            "Full-Stack Systems Engineering",
                                            "AI/ML Scientist & Engineer",
                                            "Data Scientist & Engineer",
                                            "Business Intelligence Analyst & Engineering",
                                            "Cyber Defense & Cyber Warfare Strategies",
                                            "Digital Forensics & Incident Response",
                                            "Cyber Intelligence",
                                            "Ethical Hacking & Vulnerability Assessment",
                                            "Problem Solver"
                                        ]}
                                    />
                                </div>
                                <p className="text-gray-400 text-lg max-w-lg">
                                    Passionate about creating innovative digital solutions that combine beautiful design with powerful functionality.
                                </p>
                            </motion.div>                            
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
                            >
                                <a
                                    href="#contact"
                                    className="group relative px-8 py-4 bg-gradient-to-r from-[#9D3BE1] to-[#8423D0] text-white rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#9D3BE1]/25 hover:scale-105"
                                >
                                    <span className="relative z-10">Get In Touch</span>
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-[#8423D0] to-[#9D3BE1] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        whileHover={{ scale: 1.05 }}
                                    />
                                </a>
                            </motion.div>
                        </div>

                        {/* Profile Image Side */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="relative flex justify-center lg:justify-end"
                        >
                            <div className="relative">
                                {/* Glowing background effect */}
                                <motion.div
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        opacity: [0.3, 0.6, 0.3]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="absolute inset-0 bg-gradient-to-r from-[#9D3BE1] to-[#2BA233] rounded-full blur-2xl"
                                />

                                {/* Profile image container */}
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="relative w-72 h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl backdrop-blur-sm"
                                >
                                    <Image
                                        src="/me.jpg"
                                        alt="Alex Johnson - Profile"
                                        width={320}
                                        height={320}
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Animated border rings */}
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 rounded-full border-2 border-dashed border-[#9D3BE1]/50"
                                    />
                                    <motion.div
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-4 rounded-full border border-dotted border-[#2BA233]/50"
                                    />
                                </motion.div>

                                {/* Floating badges */}
                                <motion.div
                                    animate={{ y: [-10, 10, -10] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -top-4 -right-4 bg-[#9D3BE1] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                                >
                                    ⚡ Available
                                </motion.div>

                                <motion.div
                                    animate={{ y: [10, -10, 10] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute -bottom-4 -left-4 bg-[#2BA233] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                                >
                                    🚀 Hiring
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Stats Row */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="text-center p-4 bg-[#1a1a1a]/50 border border-gray-800 rounded-lg backdrop-blur-sm"
                            >
                                <div className="text-2xl md:text-3xl font-bold text-[#9D3BE1] mb-1">
                                    {stat.number}
                                </div>
                                <div className="text-sm text-gray-400 font-medium">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="relative z-10 py-20 px-4 overflow-hidden">
                {/* Enhanced Background decorative elements */}
                <div className="absolute inset-0 z-0">
                    <motion.div
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-r from-[#9D3BE1]/10 to-[#2BA233]/10 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            rotate: [360, 0],
                            scale: [1.1, 1, 1.1],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-l from-[#9D3BE1]/8 to-[#2BA233]/8 rounded-full blur-3xl"
                    />
                    {/* Additional floating elements */}
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
                    <motion.div
                        animate={{
                            x: [0, -40, 0],
                            y: [0, 40, 0],
                            opacity: [0.2, 0.5, 0.2]
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2
                        }}
                        className="absolute top-1/3 right-1/3 w-32 h-32 bg-[#2BA233]/15 rounded-full blur-2xl"
                    />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="inline-block relative"
                        >
                            {/* Decorative line above title */}
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                transition={{ duration: 1, delay: 0.3 }}
                                className="h-px bg-gradient-to-r from-transparent via-[#9D3BE1] to-transparent mb-6"
                            />

                            <span className="text-[#9D3BE1] font-semibold text-lg tracking-wide mb-4 block relative">
                                <span className="relative z-10">🚀 GET TO KNOW ME</span>
                                <motion.span
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 blur-sm bg-[#9D3BE1]/20 rounded-full"
                                />
                            </span>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 relative">
                                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                                    About Me
                                </span>
                                <motion.div
                                    animate={{ scale: [1, 1.02, 1] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="absolute inset-0 bg-gradient-to-r from-[#9D3BE1]/20 to-[#2BA233]/20 blur-2xl -z-10"
                                />
                            </h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                        >
                            Passionate developer with a love for creating innovative solutions and beautiful user experiences
                        </motion.p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-20 items-center mb-20">
                        {/* Enhanced Story Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <div className="relative">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "5rem" }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="h-1.5 bg-gradient-to-r from-[#9D3BE1] to-[#2BA233] rounded-full mb-6 shadow-lg shadow-[#9D3BE1]/25"
                                />
                                <h3 className="text-3xl md:text-4xl font-bold mb-6 relative">
                                    <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                        My Story
                                    </span>
                                    <motion.div
                                        animate={{ opacity: [0, 0.5, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                                        className="absolute -inset-2 bg-gradient-to-r from-[#9D3BE1]/10 to-[#2BA233]/10 blur-xl rounded-lg -z-10"
                                    />
                                </h3>
                            </div>

                            <div className="space-y-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className="relative pl-8 border-l-2 border-[#9D3BE1]/40 hover:border-[#9D3BE1]/60 transition-colors duration-300"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className="absolute -left-3 top-0 w-6 h-6 bg-gradient-to-r from-[#9D3BE1] to-[#8423D0] rounded-full shadow-lg shadow-[#9D3BE1]/50 border-2 border-black"
                                    />
                                    <div className="bg-gradient-to-br from-[#111111]/80 to-[#1a1a1a]/80 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-[#9D3BE1]/30 transition-all duration-300">
                                        <p className="text-gray-300 leading-relaxed text-lg">
                                            I started my journey in web development 3 years ago and have been passionate about
                                            creating digital experiences that make a difference. I specialize in full-stack
                                            development with a focus on modern technologies and best practices.
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="relative pl-8 border-l-2 border-[#2BA233]/40 hover:border-[#2BA233]/60 transition-colors duration-300"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className="absolute -left-3 top-0 w-6 h-6 bg-gradient-to-r from-[#2BA233] to-[#22A02C] rounded-full shadow-lg shadow-[#2BA233]/50 border-2 border-black"
                                    />
                                    <div className="bg-gradient-to-br from-[#111111]/80 to-[#1a1a1a]/80 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-[#2BA233]/30 transition-all duration-300">
                                        <p className="text-gray-300 leading-relaxed text-lg">
                                            When I'm not coding, you can find me exploring new technologies, contributing to
                                            open-source projects, or enjoying a good cup of coffee while planning my next project.
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Enhanced Stats Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            {/* Decorative background */}
                            <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 bg-gradient-to-r from-[#9D3BE1]/5 to-[#2BA233]/5 rounded-3xl blur-2xl"
                            />

                            <div className="relative bg-gradient-to-br from-[#0a0a0a]/80 to-[#111111]/80 backdrop-blur-lg border border-gray-800/50 rounded-3xl p-8 shadow-2xl">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="text-center mb-8"
                                >
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                                        Achievements
                                    </h3>
                                    <div className="w-16 h-1 bg-gradient-to-r from-[#9D3BE1] to-[#2BA233] rounded-full mx-auto"></div>
                                </motion.div>

                                <div className="grid grid-cols-2 gap-6">
                                    {stats.map((stat, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.6, delay: index * 0.15 }}
                                            whileHover={{ scale: 1.05, y: -5 }}
                                            className="relative group"
                                        >
                                            {/* Hover glow effect */}
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-br from-[#9D3BE1]/20 to-[#2BA233]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                animate={{ scale: [1, 1.05, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            />

                                            <div className="relative bg-gradient-to-br from-[#111111] to-[#1a1a1a] border border-gray-800 rounded-2xl p-6 text-center hover:border-[#9D3BE1]/50 transition-all duration-300 shadow-lg">
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    whileInView={{ scale: 1 }}
                                                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3, type: "spring", bounce: 0.5 }}
                                                    className="text-3xl md:text-4xl font-bold mb-2 relative"
                                                >
                                                    <span className="bg-gradient-to-r from-[#9D3BE1] to-[#2BA233] bg-clip-text text-transparent">
                                                        {stat.number}
                                                    </span>
                                                    <motion.div
                                                        animate={{ opacity: [0, 0.5, 0] }}
                                                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                                                        className="absolute inset-0 bg-gradient-to-r from-[#9D3BE1]/20 to-[#2BA233]/20 blur-lg rounded-lg"
                                                    />
                                                </motion.div>
                                                <div className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                                                    {stat.label}
                                                </div>

                                                {/* Progress indicator */}
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: "100%" }}
                                                    transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                                                    className="h-0.5 bg-gradient-to-r from-[#9D3BE1] to-[#2BA233] rounded-full mt-3 mx-auto opacity-60"
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Call to action */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.8 }}
                                    className="text-center mt-8"
                                >
                                    <Link
                                        href="#contact"
                                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#9D3BE1]/20 to-[#2BA233]/20 border border-[#9D3BE1]/30 text-white rounded-xl font-medium hover:from-[#9D3BE1]/30 hover:to-[#2BA233]/30 hover:border-[#9D3BE1]/50 transition-all duration-300 group"
                                    >
                                        <span>Let's Work Together</span>
                                        <motion.span
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                            className="ml-2"
                                        >
                                            →
                                        </motion.span>
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
            {/* Services Section */}
            <section id="services" className="relative z-10 py-20 px-4 bg-[#111111] overflow-hidden">
                {/* Enhanced Background decorative elements */}
                <div className="absolute inset-0 z-0">
                    <motion.div
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-[#9D3BE1]/5 to-[#2BA233]/5 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            rotate: [360, 0],
                            scale: [1.2, 1, 1.2],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-l from-[#9D3BE1]/5 to-[#2BA233]/5 rounded-full blur-3xl"
                    />
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="inline-block relative"
                        >
                            {/* Decorative line above title */}
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                transition={{ duration: 1, delay: 0.3 }}
                                className="h-px bg-gradient-to-r from-transparent via-[#9D3BE1] to-transparent mb-6"
                            />

                            <span className="text-[#9D3BE1] font-semibold text-lg tracking-wide mb-4 block relative">
                                <span className="relative z-10">💼 WHAT I OFFER</span>
                                <motion.span
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 blur-sm bg-[#9D3BE1]/20 rounded-full"
                                />
                            </span>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 relative">
                                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                                    Services
                                </span>
                                <motion.div
                                    animate={{ scale: [1, 1.02, 1] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="absolute inset-0 bg-gradient-to-r from-[#9D3BE1]/20 to-[#2BA233]/20 blur-2xl -z-10"
                                />
                            </h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                        >
                            I offer a comprehensive range of development services to bring your ideas to life
                        </motion.p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="group relative"
                            >
                                {/* Hover glow effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-[#9D3BE1]/20 to-[#2BA233]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    animate={{
                                        scale: [1, 1.05, 1]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />

                                <div className="relative bg-gradient-to-br from-black via-[#0a0a0a] to-[#111111] border border-gray-800 p-8 rounded-2xl hover:border-[#9D3BE1]/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-[#9D3BE1]/10 backdrop-blur-sm">
                                    {/* Service icon with enhanced styling */}
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className="relative mb-6"
                                    >
                                        <div className="w-16 h-16 bg-gradient-to-br from-[#9D3BE1]/20 to-[#2BA233]/20 rounded-2xl flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-[#9D3BE1]/25 transition-all duration-300">
                                            <div className="text-[#9D3BE1] group-hover:text-white transition-colors duration-300">
                                                {service.icon}
                                            </div>
                                        </div>

                                        {/* Floating badge */}
                                        <motion.div
                                            animate={{
                                                opacity: [0, 1, 0],
                                                scale: [0.8, 1, 0.8]
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                delay: index * 0.5
                                            }}
                                            className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-[#9D3BE1] to-[#2BA233] rounded-full shadow-lg"
                                        />
                                    </motion.div>

                                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#9D3BE1] group-hover:to-[#2BA233] group-hover:bg-clip-text transition-all duration-300">
                                        {service.title}
                                    </h3>

                                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                                        {service.description}
                                    </p>

                                    {/* Bottom accent line */}
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "100%" }}
                                        transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
                                        className="h-0.5 bg-gradient-to-r from-[#9D3BE1] to-[#2BA233] rounded-full mt-6 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                                    />

                                    {/* Decorative corner elements */}
                                    <div className="absolute top-4 right-4 w-2 h-2 bg-[#9D3BE1]/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute bottom-4 left-4 w-2 h-2 bg-[#2BA233]/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Call to action section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-center mt-16"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="inline-block"
                        >
                            <Link
                                href="#contact"
                                className="group relative px-8 py-4 bg-gradient-to-r from-[#9D3BE1]/20 to-[#2BA233]/20 border border-[#9D3BE1]/30 text-white rounded-xl font-semibold hover:from-[#9D3BE1]/30 hover:to-[#2BA233]/30 hover:border-[#9D3BE1]/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#9D3BE1]/20"
                            >
                                <span className="relative z-10">Get In Touch</span>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-[#8423D0] to-[#9D3BE1] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    whileHover={{ scale: 1.05 }}
                                />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>            
            
            {/* Education & Experience & Certifications Section */}
            <section className="relative z-10 py-20 px-4 overflow-hidden">
                {/* Enhanced Background decorative elements */}
                <div className="absolute inset-0 z-0">
                    <motion.div
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 35,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-r from-[#9D3BE1]/8 to-[#2BA233]/8 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            rotate: [360, 0],
                            scale: [1.1, 1, 1.1],
                        }}
                        transition={{
                            duration: 28,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-l from-[#9D3BE1]/6 to-[#2BA233]/6 rounded-full blur-3xl"
                    />
                    {/* Additional floating elements */}
                    <motion.div
                        animate={{
                            x: [0, 60, 0],
                            y: [0, -40, 0],
                            opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{
                            duration: 18,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-1/4 left-1/5 w-20 h-20 bg-[#9D3BE1]/15 rounded-full blur-xl"
                    />
                    <motion.div
                        animate={{
                            x: [0, -50, 0],
                            y: [0, 50, 0],
                            opacity: [0.15, 0.35, 0.15]
                        }}
                        transition={{
                            duration: 22,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 3
                        }}
                        className="absolute top-2/3 right-1/4 w-28 h-28 bg-[#2BA233]/12 rounded-full blur-2xl"
                    />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="inline-block relative"
                        >
                            {/* Decorative line above title */}
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                transition={{ duration: 1, delay: 0.3 }}
                                className="h-px bg-gradient-to-r from-transparent via-[#9D3BE1] to-transparent mb-6"
                            />

                            <span className="text-[#9D3BE1] font-semibold text-lg tracking-wide mb-4 block relative">
                                <span className="relative z-10">🎯 MY JOURNEY</span>
                                <motion.span
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 blur-sm bg-[#9D3BE1]/20 rounded-full"
                                />
                            </span>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 relative">
                                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                                    Professional Journey
                                </span>
                                <motion.div
                                    animate={{ scale: [1, 1.02, 1] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="absolute inset-0 bg-gradient-to-r from-[#9D3BE1]/20 to-[#2BA233]/20 blur-2xl -z-10"
                                />
                            </h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                        >
                            My educational background, professional experience, and achievements that shaped my career
                        </motion.p>
                    </motion.div>

                    {/* Enhanced Three-Column Layout */}
                    <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                        {/* Education Column */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="relative"
                        >
                            {/* Column Header */}
                            <div className="text-center mb-8 relative">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#9D3BE1]/20 to-[#8423D0]/20 rounded-2xl mb-4 shadow-lg"
                                >
                                    <FaAward className="w-8 h-8 text-[#9D3BE1]" />
                                </motion.div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 relative">
                                    Education
                                    <motion.div
                                        animate={{ opacity: [0, 0.3, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                                        className="absolute -inset-2 bg-gradient-to-r from-[#9D3BE1]/10 to-[#8423D0]/10 blur-xl rounded-lg -z-10"
                                    />
                                </h3>
                                <div className="w-16 h-1 bg-gradient-to-r from-[#9D3BE1] to-[#8423D0] rounded-full mx-auto"></div>
                            </div>

                            {/* Education Timeline */}
                            <div className="space-y-6 relative">
                                {/* Vertical connecting line */}
                                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#9D3BE1]/50 via-[#9D3BE1]/30 to-transparent"></div>

                                {education.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.15 }}
                                        className="relative"
                                    >
                                        <TimelineItem {...item} />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Experience Column */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            {/* Column Header */}
                            <div className="text-center mb-8 relative">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#2BA233]/20 to-[#22A02C]/20 rounded-2xl mb-4 shadow-lg"
                                >
                                    <FaUsers className="w-8 h-8 text-[#2BA233]" />
                                </motion.div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 relative">
                                    Experience
                                    <motion.div
                                        animate={{ opacity: [0, 0.3, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                                        className="absolute -inset-2 bg-gradient-to-r from-[#2BA233]/10 to-[#22A02C]/10 blur-xl rounded-lg -z-10"
                                    />
                                </h3>
                                <div className="w-16 h-1 bg-gradient-to-r from-[#2BA233] to-[#22A02C] rounded-full mx-auto"></div>
                            </div>

                            {/* Experience Timeline */}
                            <div className="space-y-6 relative">
                                {/* Vertical connecting line */}
                                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#2BA233]/50 via-[#2BA233]/30 to-transparent"></div>

                                {experience.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.15 }}
                                        className="relative"
                                    >
                                        <TimelineItem {...item} />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Certifications Column */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="relative lg:col-span-1"
                        >
                            {/* Column Header */}
                            <div className="text-center mb-8 relative">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#FF6B35]/20 to-[#F7931E]/20 rounded-2xl mb-4 shadow-lg"
                                >
                                    <FaShieldAlt className="w-8 h-8 text-[#FF6B35]" />
                                </motion.div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 relative">
                                    Certifications
                                    <motion.div
                                        animate={{ opacity: [0, 0.3, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                                        className="absolute -inset-2 bg-gradient-to-r from-[#FF6B35]/10 to-[#F7931E]/10 blur-xl rounded-lg -z-10"
                                    />
                                </h3>
                                <div className="w-16 h-1 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] rounded-full mx-auto"></div>
                            </div>

                            {/* Certifications Grid */}
                            <div className="space-y-6">
                                {certifications.map((cert, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        className="relative group"
                                    >
                                        {/* Hover glow effect */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/20 to-[#F7931E]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            animate={{ scale: [1, 1.02, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />

                                        <CertificationCard {...cert} />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom Call to Action */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-center mt-16"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="inline-block"
                        >
                            <Link
                                href="#contact"
                                className="group relative px-8 py-4 bg-gradient-to-r from-[#9D3BE1]/20 to-[#2BA233]/20 border border-[#9D3BE1]/30 text-white rounded-xl font-semibold hover:from-[#9D3BE1]/30 hover:to-[#2BA233]/30 hover:border-[#9D3BE1]/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#9D3BE1]/20"
                            >
                                <span className="relative z-10 flex items-center">
                                    Want to Know More About My Journey?
                                    <motion.span
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="ml-2"
                                    >
                                        →
                                    </motion.span>
                                </span>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-[#9D3BE1]/10 to-[#2BA233]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    animate={{
                                        scale: [1, 1.02, 1]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Skills Section with Modal Popup */}
            <section className="relative z-10 py-20 px-4 bg-[#111111] overflow-hidden">
                {/* ...existing background decorative elements... */}
                <div className="absolute inset-0 z-0">
                    <motion.div
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.15, 1],
                        }}
                        transition={{
                            duration: 40,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-[#9D3BE1]/8 to-[#2BA233]/8 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            rotate: [360, 0],
                            scale: [1.15, 1, 1.15],
                        }}
                        transition={{
                            duration: 35,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-l from-[#9D3BE1]/6 to-[#2BA233]/6 rounded-full blur-3xl"
                    />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="inline-block relative"
                        >
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                transition={{ duration: 1, delay: 0.3 }}
                                className="h-px bg-gradient-to-r from-transparent via-[#9D3BE1] to-transparent mb-6"
                            />

                            <span className="text-[#9D3BE1] font-semibold text-lg tracking-wide mb-4 block relative">
                                <span className="relative z-10">⚡ MY EXPERTISE</span>
                                <motion.span
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 blur-sm bg-[#9D3BE1]/20 rounded-full"
                                />
                            </span>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 relative">
                                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                                    Skills & Technologies
                                </span>
                                <motion.div
                                    animate={{ scale: [1, 1.02, 1] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="absolute inset-0 bg-gradient-to-r from-[#9D3BE1]/20 to-[#2BA233]/20 blur-2xl -z-10"
                                />
                            </h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                        >
                            Click on any category to explore the skills and tools I work with
                        </motion.p>
                    </motion.div>

                    {/* Skills List with Popup */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                        {skillCategories.map((category, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => openSkillModal(index)}
                                className="group relative bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] border border-gray-800 hover:border-[#9D3BE1]/50 rounded-xl p-6 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#9D3BE1]/10"
                            >
                                {/* Icon and Title */}
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gradient-to-br from-[#9D3BE1]/20 to-[#2BA233]/20 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:shadow-lg group-hover:shadow-[#9D3BE1]/25 transition-all duration-300">
                                        <div className="text-[#9D3BE1] group-hover:text-white transition-colors duration-300 text-xl">
                                            {category.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#9D3BE1] group-hover:to-[#2BA233] group-hover:bg-clip-text transition-all duration-300 mb-2">
                                        {category.category}
                                    </h3>
                                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                                        {category.skills.length} Skills • {category.tools.length} Tools • Total: {category.skills.length + category.tools.length} items
                                    </p>
                                </div>

                                {/* Click indicator */}
                                <div className="absolute top-3 right-3 w-6 h-6 bg-[#9D3BE1]/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-[#9D3BE1] text-xs">→</span>
                                </div>

                                {/* Bottom accent line */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#9D3BE1] to-[#2BA233] rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.div>
                        ))}
                    </div>

                    {/* Skill Category Popup Modal */}
                    <AnimatePresence>
                        {selectedSkillCategory !== null && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                                onClick={closeSkillModal}
                            >
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    className="bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] border border-gray-800 rounded-2xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {/* Modal Header */}
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-[#9D3BE1]/20 to-[#2BA233]/20 rounded-xl flex items-center justify-center">
                                                <div className="text-[#9D3BE1] text-lg">
                                                    {skillCategories[selectedSkillCategory].icon}
                                                </div>
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#9D3BE1] to-[#2BA233] bg-clip-text text-transparent">
                                                    {skillCategories[selectedSkillCategory].category}
                                                </h2>
                                                <p className="text-gray-400">
                                                    {skillCategories[selectedSkillCategory].skills.length} Skills • {skillCategories[selectedSkillCategory].tools.length} Tools
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={closeSkillModal}
                                            className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-200"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    {/* Modal Content */}
                                    <div className="grid md:grid-cols-2 gap-8">
                                        {/* Skills Section */}
                                        <div>
                                            <div className="flex items-center mb-6">
                                                <div className="w-3 h-3 bg-gradient-to-r from-[#9D3BE1] to-[#2BA233] rounded-full mr-3"></div>
                                                <h3 className="text-xl font-bold text-[#9D3BE1]">Skills & Technologies</h3>
                                            </div>
                                            <div className="space-y-3">
                                                {skillCategories[selectedSkillCategory].skills.map((skill, skillIndex) => (
                                                    <motion.div
                                                        key={skillIndex}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                                                        className="flex items-center space-x-3 p-3 bg-[#1a1a1a]/50 border border-gray-800/50 rounded-lg hover:border-[#9D3BE1]/30 hover:bg-[#9D3BE1]/5 transition-all duration-200 group"
                                                    >
                                                        <div className="w-2 h-2 bg-gradient-to-r from-[#9D3BE1] to-[#2BA233] rounded-full flex-shrink-0"></div>
                                                        <span className="text-gray-300 font-medium group-hover:text-white transition-colors duration-200 flex-1">
                                                            {skill}
                                                        </span>
                                                        <span className="text-[#9D3BE1] text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                            ✓
                                                        </span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Tools Section */}
                                        <div>
                                            <div className="flex items-center mb-6">
                                                <div className="w-3 h-3 bg-gradient-to-r from-[#2BA233] to-[#9D3BE1] rounded-full mr-3"></div>
                                                <h3 className="text-xl font-bold text-[#2BA233]">Tools & Platforms</h3>
                                            </div>
                                            <div className="space-y-3">
                                                {skillCategories[selectedSkillCategory].tools.map((tool, toolIndex) => (
                                                    <motion.div
                                                        key={toolIndex}
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.3, delay: toolIndex * 0.05 + 0.2 }}
                                                        className="flex items-center space-x-3 p-3 bg-[#1a1a1a]/40 border border-gray-800/40 rounded-lg hover:border-[#2BA233]/30 hover:bg-[#2BA233]/5 transition-all duration-200 group"
                                                    >
                                                        <div className="w-2 h-2 bg-gradient-to-r from-[#2BA233] to-[#9D3BE1] rounded-full flex-shrink-0"></div>
                                                        <span className="text-gray-400 font-medium group-hover:text-gray-200 transition-colors duration-200 flex-1">
                                                            {tool}
                                                        </span>
                                                        <span className="text-[#2BA233] text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                            ⚡
                                                        </span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Modal Footer */}
                                    <div className="mt-8 pt-6 border-t border-gray-800">
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm text-gray-500">
                                                Total: {skillCategories[selectedSkillCategory].skills.length + skillCategories[selectedSkillCategory].tools.length} items
                                            </div>
                                            <button
                                                onClick={closeSkillModal}
                                                className="px-6 py-2 bg-gradient-to-r from-[#9D3BE1] to-[#2BA233] text-white rounded-lg font-medium hover:shadow-lg hover:shadow-[#9D3BE1]/25 transition-all duration-300"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Enhanced Call to Action */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-center"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="inline-block relative"
                        >
                            <Link
                                href="#contact"
                                className="group relative px-8 py-4 bg-gradient-to-r from-[#9D3BE1]/20 to-[#2BA233]/20 border border-[#9D3BE1]/30 text-white rounded-xl font-semibold hover:from-[#9D3BE1]/30 hover:to-[#2BA233]/30 hover:border-[#9D3BE1]/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#9D3BE1]/20"
                            >
                                <span className="relative z-10 flex items-center">
                                    Interested in My Skills? Let's Collaborate!
                                    <motion.span
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="ml-2"
                                    >
                                        →
                                    </motion.span>
                                </span>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-[#9D3BE1]/10 to-[#2BA233]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    animate={{
                                        scale: [1, 1.02, 1]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Fun Facts Section */}
            <section className="relative z-10 py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Fun Facts</h2>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                            A little bit about my interests outside of coding
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {funFacts.map((fact, index) => (
                            <FunFactCard key={index} {...fact} />
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Contact Form Section */}
            <section id="contact" className="relative z-10 py-20 px-4 bg-[#111111] overflow-hidden">
                {/* Enhanced Background decorative elements */}
                <div className="absolute inset-0 z-0">
                    <motion.div
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 45,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-[#9D3BE1]/8 to-[#2BA233]/8 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            rotate: [360, 0],
                            scale: [1.2, 1, 1.2],
                        }}
                        transition={{
                            duration: 35,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-l from-[#9D3BE1]/6 to-[#2BA233]/6 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            x: [0, 80, 0],
                            y: [0, -60, 0],
                            opacity: [0.1, 0.3, 0.1]
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-1/3 left-1/4 w-32 h-32 bg-[#9D3BE1]/15 rounded-full blur-2xl"
                    />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Enhanced Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="inline-block relative"
                        >
                            {/* Decorative line above title */}
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                transition={{ duration: 1, delay: 0.3 }}
                                className="h-px bg-gradient-to-r from-transparent via-[#9D3BE1] to-transparent mb-6"
                            />

                            <span className="text-[#9D3BE1] font-semibold text-lg tracking-wide mb-4 block relative">
                                <span className="relative z-10">📧 LET'S COLLABORATE</span>
                                <motion.span
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 blur-sm bg-[#9D3BE1]/20 rounded-full"
                                />
                            </span>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 relative">
                                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                                    Get In Touch
                                </span>
                                <motion.div
                                    animate={{ scale: [1, 1.02, 1] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="absolute inset-0 bg-gradient-to-r from-[#9D3BE1]/20 to-[#2BA233]/20 blur-2xl -z-10"
                                />
                            </h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                        >
                            Have a project in mind? Let's discuss how we can work together to bring your ideas to life
                        </motion.p>
                    </motion.div>

                    {/* Main Content - Three Column Layout */}
                    <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                        {/* Contact Info Cards - Left Column */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-1 space-y-8"
                        >
                            {/* Contact Header */}
                            <div className="text-center lg:text-left">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#9D3BE1]/20 to-[#2BA233]/20 rounded-2xl mb-4 shadow-lg"
                                >
                                    <FaEnvelope className="w-8 h-8 text-[#9D3BE1]" />
                                </motion.div>
                                <h3 className="text-2xl font-bold text-white mb-2 relative">
                                    Let's Connect
                                    <motion.div
                                        animate={{ opacity: [0, 0.3, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                                        className="absolute -inset-2 bg-gradient-to-r from-[#9D3BE1]/10 to-[#2BA233]/10 blur-xl rounded-lg -z-10"
                                    />
                                </h3>
                                <div className="w-16 h-1 bg-gradient-to-r from-[#9D3BE1] to-[#2BA233] rounded-full mx-auto lg:mx-0"></div>
                            </div>

                            {/* Contact Cards */}
                            <div className="space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    className="group relative"
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-br from-[#9D3BE1]/20 to-[#2BA233]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        animate={{ scale: [1, 1.02, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                    <div className="relative bg-gradient-to-br from-black via-[#0a0a0a] to-[#111111] border border-gray-800 p-6 rounded-2xl hover:border-[#9D3BE1]/50 transition-all duration-300 shadow-xl">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-14 h-14 bg-gradient-to-br from-[#9D3BE1]/20 to-[#8423D0]/20 rounded-xl flex items-center justify-center text-[#9D3BE1] group-hover:shadow-lg group-hover:shadow-[#9D3BE1]/25 transition-all duration-300">
                                                <FaEnvelope className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#9D3BE1] group-hover:to-[#2BA233] group-hover:bg-clip-text transition-all duration-300">
                                                    Email
                                                </p>
                                                <a
                                                    href="mailto:info@amananilofficial.com"
                                                    className="text-gray-300 group-hover:text-gray-200 hover:text-[#9D3BE1] transition-colors duration-300"
                                                >
                                                    info@amananilofficial.com
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    className="group relative"
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-br from-[#2BA233]/20 to-[#9D3BE1]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        animate={{ scale: [1, 1.02, 1] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                    />
                                    <div className="relative bg-gradient-to-br from-black via-[#0a0a0a] to-[#111111] border border-gray-800 p-6 rounded-2xl hover:border-[#2BA233]/50 transition-all duration-300 shadow-xl">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-14 h-14 bg-gradient-to-br from-[#2BA233]/20 to-[#22A02C]/20 rounded-xl flex items-center justify-center text-[#2BA233] group-hover:shadow-lg group-hover:shadow-[#2BA233]/25 transition-all duration-300">
                                                <FaPhone className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#2BA233] group-hover:to-[#9D3BE1] group-hover:bg-clip-text transition-all duration-300">
                                                    Phone
                                                </p>
                                                <a
                                                    href="tel:+917892939127"
                                                    className="text-gray-300 group-hover:text-gray-200 hover:text-[#9D3BE1] transition-colors duration-300"
                                                >
                                                    +91 7892939127
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>                            
                            {/* Social Links Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="pt-6"
                            >
                                <h4 className="text-lg font-bold text-white mb-6 text-center lg:text-left">Follow Me</h4>
                                <div className="flex justify-center lg:justify-start space-x-4">
                                    {socialLinks.map((social, index) => (
                                        <motion.div
                                            key={index}
                                            whileHover={{ scale: 1.1, y: -2 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <a
                                                href={social.url}
                                                className="w-12 h-12 bg-gradient-to-br from-[#111111] to-[#1a1a1a] border border-gray-700 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-[#9D3BE1]/20 hover:to-[#2BA233]/20 hover:border-[#9D3BE1]/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#9D3BE1]/20"
                                                aria-label={social.label}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {social.icon}
                                            </a>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Download Resume Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="pt-6"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex justify-center lg:justify-start"
                                >
                                    <Link
                                        href="/resume.pdf"
                                        className="group relative px-8 py-4 bg-gradient-to-r from-[#9D3BE1] to-[#2BA233] text-white rounded-xl font-bold hover:shadow-lg hover:shadow-[#9D3BE1]/25 transition-all duration-300 overflow-hidden"
                                    >
                                        <span className="relative z-10 flex items-center">
                                            <FaDownload className="w-5 h-5 mr-2" />
                                            Download Resume
                                        </span>
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-[#2BA233] to-[#9D3BE1] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            animate={{
                                                scale: [1, 1.02, 1]
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        />
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        {/* Contact Form - Right Two Columns */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-2 relative"
                        >
                            {/* Form Container with Enhanced Design */}
                            <div className="relative">
                                {/* Decorative background */}
                                <motion.div
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 bg-gradient-to-r from-[#9D3BE1]/5 to-[#2BA233]/5 rounded-3xl blur-2xl"
                                />

                                <div className="relative bg-gradient-to-br from-[#0a0a0a]/90 via-[#111111]/90 to-[#1a1a1a]/90 backdrop-blur-lg border border-gray-800/50 rounded-3xl p-8 md:p-12 shadow-2xl">
                                    {/* Form Header */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6 }}
                                        className="text-center mb-8"
                                    >
                                        <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                                            Send Me a Message
                                        </h3>
                                        <div className="w-20 h-1 bg-gradient-to-r from-[#9D3BE1] to-[#2BA233] rounded-full mx-auto"></div>
                                    </motion.div>

                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        {/* First Row - Name and Subject */}
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6, delay: 0.1 }}
                                                className="relative group"
                                            >
                                                <label htmlFor="name" className="block text-sm font-bold text-[#9D3BE1] mb-3 uppercase tracking-wide">
                                                    Full Name *
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-6 py-4 bg-gradient-to-br from-[#111111] to-[#1a1a1a] border-2 border-gray-700/50 rounded-xl focus:ring-2 focus:ring-[#9D3BE1]/50 focus:border-[#9D3BE1] transition-all duration-300 text-white placeholder-gray-500 hover:border-gray-600"
                                                        placeholder="Enter your full name"
                                                    />
                                                    <motion.div
                                                        className="absolute inset-0 bg-gradient-to-r from-[#9D3BE1]/10 to-[#2BA233]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                                        animate={{ scale: [1, 1.01, 1] }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                    />
                                                </div>
                                            </motion.div>                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6, delay: 0.2 }}
                                                className="relative group"
                                            >
                                                <label htmlFor="subject" className="block text-sm font-bold text-[#2BA233] mb-3 uppercase tracking-wide">
                                                    I'm interested in this: *
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        id="subject"
                                                        name="subject"
                                                        value={formData.subject}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-6 py-4 bg-gradient-to-br from-[#111111] to-[#1a1a1a] border-2 border-gray-700/50 rounded-xl focus:ring-2 focus:ring-[#2BA233]/50 focus:border-[#2BA233] transition-all duration-300 text-white hover:border-gray-600 appearance-none cursor-pointer"
                                                    >
                                                        <option value="" className="bg-[#111111] text-gray-400">Select a service you're interested in</option>
                                                        <option value="Full-Stack Systems Engineering" className="bg-[#111111] text-white">Full-Stack Systems Engineering</option>
                                                        <option value="AI/ML Scientist & Engineering" className="bg-[#111111] text-white">AI/ML Scientist & Engineering</option>
                                                        <option value="Data Scientist & Engineering" className="bg-[#111111] text-white">Data Scientist & Engineering</option>
                                                        <option value="Business Intelligence Analyst & Engineering" className="bg-[#111111] text-white">Business Intelligence Analyst & Engineering</option>
                                                        <option value="Cyber Defense & Cyber Warfare Strategies" className="bg-[#111111] text-white">Cyber Defense & Cyber Warfare Strategies</option>
                                                        <option value="Digital Forensics & Incident Response" className="bg-[#111111] text-white">Digital Forensics & Incident Response</option>
                                                        <option value="Cyber Intelligence" className="bg-[#111111] text-white">Cyber Intelligence</option>
                                                        <option value="Ethical Hacking & Vulnerability Assessment" className="bg-[#111111] text-white">Ethical Hacking & Vulnerability Assessment</option>
                                                        <option value="General Inquiry" className="bg-[#111111] text-white">General Inquiry</option>
                                                        <option value="Other" className="bg-[#111111] text-white">Other</option>
                                                    </select>
                                                    {/* Custom dropdown arrow */}
                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                                                        <svg className="w-5 h-5 text-[#2BA233] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </div>
                                                    <motion.div
                                                        className="absolute inset-0 bg-gradient-to-r from-[#2BA233]/10 to-[#9D3BE1]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                                        animate={{ scale: [1, 1.01, 1] }}
                                                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                                    />
                                                </div>
                                            </motion.div>
                                        </div>

                                        {/* Second Row - Phone and Email */}
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6, delay: 0.3 }}
                                                className="relative group"
                                            >
                                                <label htmlFor="phone" className="block text-sm font-bold text-[#FF6B35] mb-3 uppercase tracking-wide">
                                                    Phone Number *
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        id="phone"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-6 py-4 bg-gradient-to-br from-[#111111] to-[#1a1a1a] border-2 border-gray-700/50 rounded-xl focus:ring-2 focus:ring-[#FF6B35]/50 focus:border-[#FF6B35] transition-all duration-300 text-white placeholder-gray-500 hover:border-gray-600"
                                                        placeholder="+1 (555) 123-4567"
                                                    />
                                                    <motion.div
                                                        className="absolute inset-0 bg-gradient-to-r from-[#FF6B35]/10 to-[#F7931E]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                                        animate={{ scale: [1, 1.01, 1] }}
                                                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                                                    />
                                                </div>
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6, delay: 0.4 }}
                                                className="relative group"
                                            >
                                                <label htmlFor="email" className="block text-sm font-bold text-[#9D3BE1] mb-3 uppercase tracking-wide">
                                                    Email Address *
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-6 py-4 bg-gradient-to-br from-[#111111] to-[#1a1a1a] border-2 border-gray-700/50 rounded-xl focus:ring-2 focus:ring-[#9D3BE1]/50 focus:border-[#9D3BE1] transition-all duration-300 text-white placeholder-gray-500 hover:border-gray-600"
                                                        placeholder="your.email@example.com"
                                                    />
                                                    <motion.div
                                                        className="absolute inset-0 bg-gradient-to-r from-[#9D3BE1]/10 to-[#2BA233]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                                        animate={{ scale: [1, 1.01, 1] }}
                                                        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                                                    />
                                                </div>
                                            </motion.div>
                                        </div>

                                        {/* Message Field */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.5 }}
                                            className="relative group"
                                        >
                                            <label htmlFor="message" className="block text-sm font-bold text-[#2BA233] mb-3 uppercase tracking-wide">
                                                Your Message *
                                            </label>
                                            <div className="relative">
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleInputChange}
                                                    required
                                                    rows={6}
                                                    className="w-full px-6 py-4 bg-gradient-to-br from-[#111111] to-[#1a1a1a] border-2 border-gray-700/50 rounded-xl focus:ring-2 focus:ring-[#2BA233]/50 focus:border-[#2BA233] transition-all duration-300 resize-none text-white placeholder-gray-500 hover:border-gray-600"
                                                    placeholder="Tell me about your project, goals, or any questions you have. I'm excited to hear from you!"
                                                />
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-[#2BA233]/10 to-[#9D3BE1]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                                    animate={{ scale: [1, 1.01, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                                                />
                                            </div>
                                        </motion.div>

                                        {/* Submit Button */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.6 }}
                                            className="text-center pt-4"
                                        >
                                            <motion.button
                                                type="submit"
                                                disabled={isSubmitting}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="group relative px-12 py-4 bg-gradient-to-r from-[#9D3BE1] to-[#2BA233] text-white rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-[#9D3BE1]/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 overflow-hidden min-w-[200px]"
                                            >
                                                <span className="relative z-10 flex items-center justify-center">
                                                    {isSubmitting ? (
                                                        <>
                                                            <motion.div
                                                                animate={{ rotate: 360 }}
                                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                                className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-3"
                                                            />
                                                            Sending Message...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FaPaperPlane className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                                                            Send Message
                                                        </>
                                                    )}
                                                </span>
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-[#2BA233] to-[#9D3BE1] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                    animate={{
                                                        scale: [1, 1.02, 1]
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }}
                                                />
                                            </motion.button>
                                        </motion.div>                                        {/* Success/Error Messages */}
                                        <AnimatePresence>
                                            {submitStatus === 'success' && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -20 }}
                                                    className="relative"
                                                >
                                                    <div className="flex items-center justify-center text-green-400 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 p-6 rounded-2xl shadow-lg backdrop-blur-sm">
                                                        <FaCheckCircle className="w-6 h-6 mr-3 text-green-400" />
                                                        <span className="font-semibold text-lg">
                                                            Message sent successfully! I'll get back to you soon.
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            )}
                                            {submitStatus === 'error' && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -20 }}
                                                    className="relative"
                                                >
                                                    <div className="flex items-center justify-center text-red-400 bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/30 p-6 rounded-2xl shadow-lg backdrop-blur-sm">
                                                        <FaBug className="w-6 h-6 mr-3 text-red-400" />
                                                        <span className="font-semibold text-lg">
                                                            Failed to send message. Please try again or contact me directly.
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ItsMe;