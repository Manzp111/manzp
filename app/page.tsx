"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Linkedin, Mail, ExternalLink, Code, Database, Server } from "lucide-react";
import ContactForm from "@/components/contactForm";

export default function Portfolio() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-slate-900 dark:text-white">Gilbert</div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">About</a>
              <a href="#skills" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Skills</a>
              <a href="#projects" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Projects</a>
              <a href="#contact" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Contact</a>
              <a href="https://drive.google.com/file/d/1LN2sSX10VopwH-CEZg-WeR4vRK5oTOab/view?usp=sharing" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"> CV</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-6xl mx-auto">
          <img
            src="/mypicture.png"
            alt="Gilbert - Software Engineer"
            className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white shadow-lg"
          />
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4">
            Hi, I'm <span className="text-blue-600 dark:text-blue-400">Gilbert</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
            Software Developer specialized in Web Development
          </p>

          {/* Badges */}
          <div className="flex justify-center gap-4 mb-8">
            <Badge variant="secondary" className="text-sm px-3 py-1">Django Expert</Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">Node.js Developer</Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">Next.js Full-Stack</Badge>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
                    onClick={() => setIsContactOpen(true)}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Me
                  </Button>

                  {/* Modal */}
                  {isContactOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                      <ContactForm onClose={() => setIsContactOpen(false)} />
                    </div>
                  )}
            <a href="https://github.com/Manzp111" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="cursor-pointer">
                <Github className="w-4 h-4 mr-2" />
                View GitHub
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/gilbert-nshimyimana-132b68376/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="cursor-pointer">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
            </a>
          </div>

          {/* Contact Form Popup */}
          {isContactOpen && <ContactForm onClose={() => setIsContactOpen(false)} />}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-12">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                I'm a passionate Web Developer with expertise in building scalable web applications using Django and Node.js and Next.js.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                I create robust solutions that deliver exceptional user experiences. Always eager to learn new technologies and tackle challenging problems.
              </p>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/in/gilbert-nshimyimana-132b68376/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                </a>
                <a href="https://github.com/Manzp111" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                </a>
              </div>
            </div>
            <div className="relative">
              <img src="/me.png" alt="Gilbert coding" className="rounded-lg shadow-xl h-[400px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-12">Technical Skills</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Code className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>Backend Development</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Badge className="mr-2 mb-2">Python/Django</Badge>
                <Badge className="mr-2 mb-2">JavaScript/node.js</Badge>                
                <Badge className="mr-2 mb-2">Typerscript/Next.js</Badge>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Database & Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Badge className="mr-2 mb-2">PostgreSQL</Badge>
                <Badge className="mr-2 mb-2">MongoDB</Badge>
                <Badge className="mr-2 mb-2">Docker</Badge>
                <Badge className="mr-2 mb-2">Git</Badge>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Server className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>Frontend & DevOps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Badge className="mr-2 mb-2">React</Badge>
                <Badge className="mr-2 mb-2">Next.js</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

{/* Projects Section */}
<section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-12">
      Featured Projects
    </h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

      {/* Project 1: Blog Platform */}
      <div className="group hover:shadow-xl transition-shadow bg-white dark:bg-slate-900 rounded-lg shadow-md overflow-hidden">
        {/* Image */}
        <div className="h-48 w-full overflow-hidden rounded-t-lg">
          <img 
            src="/blog.png" 
            alt="Blog Platform Screenshot" 
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Blog Platform</h3>
          <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">
            A full-featured Django blog platform with SEO optimization, Stripe payments for book purchases, and smooth user experience.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 py-1 rounded text-xs">Django</span>
            <span className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 px-2 py-1 rounded text-xs">SEO</span>
            <span className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 px-2 py-1 rounded text-xs">Stripe</span>
          </div>
          <div className="flex gap-2">
            <a href="https://github.com/Manzp111/Manzp-Content-Managment-System-CMS-.git" 
              className="flex items-center gap-1 bg-gray-700 hover:bg-gray-800 text-white text-sm font-semibold px-3 py-1 rounded shadow transition"            >View Code</a>
            <a href="https://manzip.pythonanywhere.com/" 
             className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded shadow transition"
            >Live </a>
          </div>
        </div>
      </div>

      {/* Project 2: Min Procured Payment */}
      <div className="group hover:shadow-xl transition-shadow bg-white dark:bg-slate-900 rounded-lg shadow-md overflow-hidden">
        {/* Image */}
        <div className="h-48 w-full overflow-hidden rounded-t-lg">
          <img 
            src="/mini.png" 
            alt="Min Procured Payment Screenshot" 
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Min Procured Payment</h3>
          <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">
            A Django & React platform with different user roles (staff, mager, general manage,finance), AI data extraction, and background jobs using Celery.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 py-1 rounded text-xs">Django</span>
            <span className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 px-2 py-1 rounded text-xs">React</span>
            <span className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 px-2 py-1 rounded text-xs">AI</span>
            <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 px-2 py-1 rounded text-xs">Celery</span>
            <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 px-2 py-1 rounded text-xs">Docker </span>
          </div>
          <div className="flex gap-2">
            <a href="https://github.com/Manzp111/Procured-Payment.git" 
                className="flex items-center gap-1 bg-gray-700 hover:bg-gray-800 text-white text-sm font-semibold px-3 py-1 rounded shadow transition"            >View Code</a>
            <a href="https://gilb.onrender.com/" 
             className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded shadow transition"
            >Live</a>
          </div>
        </div>
      </div>

      {/* Project 3: Nimipiko Studio */}
      <div className="group hover:shadow-xl transition-shadow bg-white dark:bg-slate-900 rounded-lg shadow-md overflow-hidden">
        {/* Image */}
        <div className="h-48 w-full overflow-hidden rounded-t-lg">
          <img 
            src="/nimi.png" 
            alt="Nimipiko Studio Screenshot" 
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Nimipiko Studio</h3>
          <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">
            A Next.js based web application for https://voices.nimipiko.com/, featuring dynamic audio management and professional UI. i worked as collaborator
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 py-1 rounded text-xs">Next.js</span>
            <span className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 px-2 py-1 rounded text-xs">React</span>
          </div>
          <div className="flex gap-2">
            <a href="https://voices.nimipiko.com/" target="_blank" rel="noopener noreferrer" 
              className="flex items-center gap-1 bg-gray-700 hover:bg-gray-800 text-white text-sm font-semibold px-3 py-1 rounded shadow transition"            >
              Visit Studio
            </a>
              <a href="https://github.com/Martin-MBASABAGUJIZWA/voices-showroom.git" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded shadow transition"
               >
              github
            </a>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>


    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8">
        Let's Work Together
      </h2>
      <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
        I'm always interested in new opportunities. Whether you need a Django backend, Node.js API, or full-stack solution, let's connect!
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <a href="mailto:gilbertnshimyimana11@gmail.com">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Mail className="w-4 h-4 mr-2" />
            Email Me
          </Button>
        </a>

        <a
          href="https://www.linkedin.com/in/gilbert-nshimyimana-132b68376/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" size="lg">
            <Linkedin className="w-4 h-4 mr-2" />
            LinkedIn
          </Button>
        </a>

        <a
          href="https://github.com/Manzp111"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" size="lg">
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </Button>
        </a>
      </div>

      {/* Contact Form as a component */}
      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 p-8 rounded-lg shadow-lg">
        <ContactForm />
      </div>
    </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400">© 2024 Gilbert. Built with Next.js and Tailwind CSS and Postgres databases.</p>
        </div>
      </footer>
    </div>
  );
}
