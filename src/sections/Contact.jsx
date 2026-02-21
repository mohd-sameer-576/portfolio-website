import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Github,
  Linkedin,
  Twitter,
  Code2,
} from "lucide-react";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "mohammedsameer576576@gmail.com",
    href: "mailto:mohammedsameer576576@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+916309850498",
    href: "tel:+916309850498",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Shaikpait Hyderabad",
    href: "shaikpait hyderabad",
  },
];

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/mohd-sameer-576",
    color: "cyan",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohammed-sameer-55a9653aa/",
    color: "magenta",
  },
];

const Contact = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const form = formRef.current;
    const info = infoRef.current;

    if (!section || !header || !form || !info) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        form,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: form,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        info.children,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: info,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Replace these with your actual IDs from the EmailJS Dashboard
    const SERVICE_ID = "service_ky5dzgn";
    const TEMPLATE_ID = "template_6j90udw";
    const PUBLIC_KEY = "-9ebdG62Fe4EvIfdc";

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      to_name: "Admin", // Your name
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      // SUCCESS STATE
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });

      // Hide success message after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Email failed to send:", error);
      alert("Oops! Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen w-full py-20 md:py-32"
    >
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-cyan-400/5 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-8 h-px bg-cyan-400" />
            <span className="text-cyan-400 text-sm uppercase tracking-widest">
              Contact
            </span>
            <span className="w-8 h-px bg-cyan-400" />
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I&apos;d love to hear
            from you. Drop me a message and let&apos;s create something amazing
            together.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="lg:col-span-3 glass rounded-2xl p-6 md:p-8 space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:border-cyan-400/50 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:border-cyan-400/50 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Your Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                required
                rows={5}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:border-cyan-400/50 focus:outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || submitted}
              className={`
    w-full py-4 rounded-2xl font-bold tracking-wide transition-all duration-300
    flex items-center justify-center gap-2 overflow-hidden relative
    ${
      submitted
        ? "bg-green-500 text-white"
        : "bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:shadow-[0_0_20px_rgba(192,38,211,0.5)] text-white"
    }
    ${isSubmitting ? "opacity-80 cursor-not-allowed" : "active:scale-95"}
  `}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Sending...</span>
                </>
              ) : submitted ? (
                <>
                  <svg
                    className="w-6 h-6 animate-[bounce_0.5s_ease-in-out]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Message Sent!</span>
                </>
              ) : (
                <span>Send Message</span>
              )}
            </button>
          </form>

          <div ref={infoRef} className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center gap-4 glass rounded-xl p-4 hover:border-cyan-400/30 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center group-hover:bg-cyan-400/20 transition-colors">
                      <Icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{item.label}</p>
                      <p className="text-white group-hover:text-cyan-400 transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="glass rounded-xl p-6">
              <p className="text-sm text-gray-500 mb-4">Follow me on</p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  const isCyan = social.color === "cyan";
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:scale-110 ${isCyan ? "bg-cyan-400/10 hover:bg-cyan-400/20" : "bg-[#ff003c]/10 hover:bg-[#ff003c]/20"}`}
                      title={social.label}
                    >
                      <Icon
                        className={`w-5 h-5 ${isCyan ? "text-cyan-400" : "text-[#ff003c]"}`}
                      />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="glass rounded-xl p-6 border-gradient">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-sm font-medium">
                  Available for work
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                I&apos;m currently open to freelance projects and full-time
                opportunities. Let&apos;s discuss how I can help bring your
                ideas to life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
