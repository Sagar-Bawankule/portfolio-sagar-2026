import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Project from '@/models/Project'
import Skill from '@/models/Skill'
import Experience from '@/models/Experience'
import Certification from '@/models/Certification'
import About from '@/models/About'
import Hero from '@/models/Hero'
import Admin from '@/models/Admin'

export async function GET() {
    try {
        await dbConnect()

        // Clear existing data
        await Promise.all([
            Project.deleteMany({}),
            Skill.deleteMany({}),
            Experience.deleteMany({}),
            Certification.deleteMany({}),
            About.deleteMany({}),
            Hero.deleteMany({}),
            Admin.deleteMany({})
        ])

        // Seed Projects
        const projects = [
            {
                title: "AI Interview Question Generator & Evaluator",
                description: "A full-stack web app built using Flask and Hugging Face models to help users prepare for technical interviews with AI-generated questions and intelligent answer evaluation.",
                technologies: ["Python", "Flask", "Hugging Face", "JavaScript", "HTML", "CSS", "Sentence Transformers", "Bootstrap"],
                githubUrl: "https://github.com/Sagar-Bawankule/AI-Interview-Question-Generator",
                liveUrl: "https://ai-interview-question-generator-vl2w.onrender.com",
                image: "/AIQuestion.jpg",
                featured: true,
                icon: "Brain",
                color: "from-purple-500 to-pink-500",
                order: 1
            },
            {
                title: "EcoTrack – Carbon Footprint Tracker",
                description: "A responsive, minimalist web application to track, calculate, and reduce your personal carbon footprint (CO₂e). Features a carbon dial dashboard, category breakdowns for Energy/Transport/Food/Shopping, trend charts, AI recommendations, and budget alerts.",
                technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS", "Vite", "Framer Motion", "Recharts", "JWT", "Express.js"],
                githubUrl: "https://github.com/Sagar-Bawankule/carbon-project",
                liveUrl: "https://carbon-project-client.vercel.app/",
                featured: true,
                icon: "Leaf",
                color: "from-green-500 to-emerald-500",
                order: 2
            },
            {
                title: "MeetMatch – Event Management System",
                description: "A centralized event management platform for educational institutions to streamline the entire lifecycle of college events — from proposal and approval to student registration. Features Student, HOD, and Admin portals with role-based access control.",
                technologies: ["Next.js", "React", "Tailwind CSS", "Radix UI", "MongoDB", "Mongoose", "NextAuth.js", "bcryptjs"],
                githubUrl: "https://github.com/Sagar-Bawankule/event-management",
                liveUrl: "https://event-management-51bt.onrender.com/",
                featured: true,
                icon: "Monitor",
                color: "from-indigo-500 to-violet-500",
                order: 3
            },
            {
                title: "FarmCareAI",
                description: "An intelligent platform for crop recommendations and plant disease detection using AI. Features crop suggestion system and plant disease detection via image input.",
                technologies: ["React", "TypeScript", "Flask", "Tailwind CSS", "Supabase", "Machine Learning", "Pandas", "Numpy", "Scikit-learn"],
                githubUrl: "https://github.com/Sagar-Bawankule/FarmCareAi",
                liveUrl: "https://github.com/Sagar-Bawankule/FarmCareAi",
                image: "/Farmcare.jpg",
                featured: true,
                icon: "Leaf",
                color: "from-green-500 to-emerald-500",
                status: "In Progress",
                order: 4
            },
            {
                title: "Electric Vehicle Adoption Forecasting System",
                description: "A machine learning project that predicts EV adoption trends across the U.S. using historical data from 2017–2024 with forecasting using 4 ML models.",
                technologies: ["Python", "Pandas", "scikit-learn", "Matplotlib", "Seaborn", "Machine Learning", "Plotly", "Streamlit", "Joblib"],
                githubUrl: "https://github.com/Sagar-Bawankule/Electrical_vehical_prediction",
                liveUrl: "https://github.com/Sagar-Bawankule/Electrical_vehical_prediction",
                image: "/Elretrical_vehical.jpg",
                featured: true,
                icon: "Zap",
                color: "from-blue-500 to-cyan-500",
                order: 5
            },
            {
                title: "Sagar Bawankule – Portfolio Website",
                description: "A modern, responsive, and animated portfolio built using Next.js and Tailwind CSS to showcase skills, projects, and background with clean UI and smooth animations.",
                technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Lucide React"],
                githubUrl: "https://github.com/Sagar-Bawankule/portfolio",
                liveUrl: "https://github.com/Sagar-Bawankule/portfolio",
                image: "/Portfolio.jpg",
                featured: false,
                icon: "Monitor",
                color: "from-indigo-500 to-purple-500",
                order: 6
            }
        ]

        await Project.insertMany(projects)

        // Seed Skills
        const skills = [
            {
                title: "Programming Languages",
                icon: "Code2",
                description: "Core languages I use for development",
                skills: [
                    { name: "Python", icon: "🐍", color: "from-blue-500 to-blue-600" },
                    { name: "Java", icon: "☕", color: "from-red-500 to-red-600" },
                    { name: "C++", icon: "⚙️", color: "from-purple-500 to-purple-600" },
                    { name: "C", icon: "🔧", color: "from-gray-600 to-gray-700" },
                    { name: "JavaScript", icon: "⚡", color: "from-yellow-500 to-yellow-600" }
                ],
                order: 1
            },
            {
                title: "Web Development",
                icon: "Globe",
                description: "Modern web technologies and frameworks",
                skills: [
                    { name: "React", icon: "⚛️", color: "from-cyan-500 to-cyan-600" },
                    { name: "HTML", icon: "🌐", color: "from-orange-500 to-orange-600" },
                    { name: "CSS", icon: "🎨", color: "from-pink-500 to-pink-600" },
                    { name: "Tailwind CSS", icon: "🎯", color: "from-teal-500 to-teal-600" },
                    { name: "Node.js", icon: "🟢", color: "from-green-500 to-green-600" },
                    { name: "Flask", icon: "🔥", color: "from-red-400 to-red-500" }
                ],
                order: 2
            },
            {
                title: "AI & Machine Learning",
                icon: "Brain",
                description: "Artificial intelligence and data science",
                skills: [
                    { name: "PyTorch", icon: "🔥", color: "from-orange-500 to-orange-600" },
                    { name: "Scikit-learn", icon: "📊", color: "from-blue-500 to-blue-600" },
                    { name: "Computer Vision", icon: "👁️", color: "from-violet-500 to-violet-600" },
                    { name: "Natural Language Processing", icon: "💬", color: "from-rose-500 to-rose-600" },
                    { name: "Data Analysis", icon: "📈", color: "from-teal-500 to-teal-600" }
                ],
                order: 3
            },
            {
                title: "Database & Cloud",
                icon: "Cloud",
                description: "Data storage and cloud infrastructure",
                skills: [
                    { name: "MongoDB", icon: "🍃", color: "from-green-500 to-green-600" },
                    { name: "PostgreSQL", icon: "🐘", color: "from-blue-500 to-blue-600" },
                    { name: "Firebase", icon: "🔥", color: "from-orange-400 to-orange-500" },
                    { name: "AWS", icon: "☁️", color: "from-yellow-500 to-yellow-600" }
                ],
                order: 4
            },
            {
                title: "Tools & DevOps",
                icon: "Shield",
                description: "Development tools and practices",
                skills: [
                    { name: "Git", icon: "📝", color: "from-gray-700 to-gray-800" },
                    { name: "GitHub", icon: "🐙", color: "from-gray-800 to-gray-900" },
                    { name: "Linux", icon: "🐧", color: "from-yellow-500 to-yellow-600" },
                    { name: "VS Code", icon: "💻", color: "from-blue-500 to-blue-600" },
                    { name: "Testing", icon: "🧪", color: "from-green-500 to-green-600" }
                ],
                order: 5
            }
        ]

        await Skill.insertMany(skills)

        // Seed Experience
        const experiences = [
            {
                type: "Education",
                title: "B.Tech in Artificial Intelligence",
                institution: "G H Raisoni College of Engineering",
                location: "Nagpur, Maharashtra",
                duration: "2022 - 2026",
                description: "Currently pursuing my undergraduate degree with focus on AI, machine learning, and software engineering.",
                gpa: "8.5/10",
                highlights: ["AI/ML Fundamentals", "Data Structures & Algorithms", "Software Engineering", "Database Management"],
                icon: "GraduationCap",
                color: "bg-white",
                order: 1
            },
            {
                type: "Education",
                title: "Higher Secondary Education",
                institution: "Maharashtra State Board",
                location: "Nagpur, Maharashtra",
                duration: "2020 - 2022",
                description: "Completed higher secondary education with focus on science and mathematics.",
                gpa: "85%",
                highlights: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
                icon: "BookOpen",
                color: "bg-red-600",
                order: 2
            },
            {
                type: "Certifications",
                title: "Professional Certifications",
                institution: "Various Platforms",
                location: "Online",
                duration: "2023 - 2024",
                description: "Earned multiple certifications in AI, cloud computing, and software development.",
                gpa: "6+",
                highlights: ["AWS Technical Essentials", "AI For All Program", "Advanced Software Engineering", "Database Management"],
                icon: "Award",
                color: "bg-white",
                order: 3
            }
        ]

        await Experience.insertMany(experiences)

        // Seed Certifications
        const certifications = [
            {
                title: 'AWS Technical Essentials',
                issuer: 'AWS Training & Certification',
                date: 'July 10, 2025',
                skills: ['Cloud Computing', 'AWS Services', 'Foundational Knowledge'],
                description: 'Core concepts of cloud computing and foundational knowledge of key AWS services.',
                certificateUrl: '/AWS%20Technical%20Essentials.pdf',
                order: 1
            },
            {
                title: 'AI For All Program',
                issuer: 'Intel & Digital India',
                date: 'July 8, 2025',
                skills: ['Artificial Intelligence', 'Real-world Applications'],
                description: 'Fundamental principles of Artificial Intelligence and its real-world applications.',
                certificateUrl: '/AI%20For%20All%20Program.png',
                order: 2
            },
            {
                title: 'PHP and MySQL Training',
                issuer: 'Spoken Tutorial Project, IIT Bombay',
                date: 'June 24, 2025',
                skills: ['PHP', 'MySQL', 'Server-side Web Development'],
                description: 'Server-side web development using the PHP language and MySQL database management.',
                certificateUrl: '/PHP%20and%20MySQL%20Training.pdf',
                order: 3
            },
            {
                title: 'Introduction to Data Analytics',
                issuer: 'Simplilearn SkillUp',
                date: 'February 1, 2025',
                skills: ['Data Analytics', 'Trend Analysis', 'Data Insights'],
                description: 'The foundational process of analyzing data to identify trends and derive insights.',
                certificateUrl: '/Simplilearn%20Certificate.pdf',
                order: 4
            },
            {
                title: 'Advanced Software Engineering Job Simulation',
                issuer: 'Walmart Global Tech & Forage',
                date: 'January 29, 2025',
                skills: ['Software Architecture', 'Advanced Data Structures', 'Database Design'],
                description: 'Practical skills in Software Architecture, Advanced Data Structures, and Database Design.',
                certificateUrl: '/Advanced%20Software%20Engineering%20Job%20Simulation.pdf',
                order: 5
            },
            {
                title: 'Operations Job Simulation',
                issuer: 'Goldman Sachs & Forage',
                date: 'January 29, 2025',
                skills: ['Financial Operations', 'Transaction Processing', 'Corporate Setting'],
                description: 'Practical understanding of financial operations and transaction processing in a corporate setting.',
                certificateUrl: '/Operations%20Job%20Simulation.pdf',
                order: 6
            },
            {
                title: 'Basics of Python',
                issuer: 'Infosys Springboard',
                date: 'January 27, 2025',
                skills: ['Python', 'Programming Principles', 'Syntax'],
                description: 'Core programming principles and fundamental syntax of the Python language.',
                certificateUrl: '/infosysspringboard.pdf',
                order: 7
            },
            {
                title: 'RDBMS PostgreSQL Training',
                issuer: 'Spoken Tutorial Project, IIT Bombay',
                date: 'January 6, 2025',
                skills: ['PostgreSQL', 'Relational Databases', 'SQL'],
                description: 'Principles of Relational Databases and data management using PostgreSQL and SQL.',
                certificateUrl: '/RDBMS%20PostgreSQL%20Training.pdf',
                order: 8
            },
            {
                title: 'The VR Evolution: Redefining Our Digital Experience',
                issuer: 'GH Raisoni College of Engineering, Nagpur',
                date: 'July 2, 2024',
                skills: ['Virtual Reality', 'Digital Experience'],
                description: 'Core concepts of Virtual Reality (VR) technology and its impact on digital experiences.',
                certificateUrl: '/The%20VR%20Evolution%20Redefining%20Our%20Digital%20Experience.pdf',
                order: 9
            }
        ]

        await Certification.insertMany(certifications)

        // Seed About
        await About.create({
            name: "Sagar Bawankule",
            title: "AI & Software Developer",
            introduction: "I'm a passionate AI & Software Developer currently pursuing B.Tech in Artificial Intelligence. I specialize in building intelligent applications that solve real-world problems.",
            quote: "When I'm not coding, you'll find me exploring the latest AI research papers or experimenting with new technologies.",
            coreTechnologies: ['Python', 'JavaScript', 'Java', 'React', 'Node.js', 'Flask', 'MySQL', 'PostgreSQL', 'ML', 'AI'],
            profileImage: "/profilephoto.webp"
        })

        // Seed Hero
        await Hero.create({
            name: "Sagar Bawankule",
            tagline: "Full Stack Developer & UI/UX Designer crafting digital experiences that blend innovation with functionality.",
            description: "Available for work",
            resumeUrl: "/resume.pdf",
            skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB'],
            profileImage: "/profilephoto.webp"
        })

        // Create admin user (uses environment variables for security)
        const adminUsername = process.env.ADMIN_USERNAME || 'admin'
        const adminPassword = process.env.ADMIN_PASSWORD || 'changeme123'
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@portfolio.com'

        await Admin.create({
            username: adminUsername,
            password: adminPassword, // Will be hashed by the pre-save hook
            email: adminEmail
        })

        return NextResponse.json({
            success: true,
            message: 'Database seeded successfully',
            data: {
                projects: projects.length,
                skills: skills.length,
                experiences: experiences.length,
                certifications: certifications.length,
                about: 1,
                hero: 1,
                admin: 1
            }
        })
    } catch (error: any) {
        console.error('Seed error:', error)
        return NextResponse.json(
            { error: 'Failed to seed database', details: error.message },
            { status: 500 }
        )
    }
}
