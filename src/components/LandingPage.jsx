import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
  const [showBanner, setShowBanner] = useState(true);
  const [showCookieConsent, setShowCookieConsent] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAcceptedCookies = localStorage.getItem('cookieConsent');
    if (hasAcceptedCookies) {
      setShowCookieConsent(false);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowCookieConsent(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Cookie Consent Popup */}
      {showCookieConsent && (
        <div className="fixed left-0 right-0 bottom-0 w-full z-50">
          <div className="mx-auto w-[85%] bg-gradient-to-r from-[#d1c4e9] to-[#90caf9] rounded-2xl shadow-xl border border-[#e0e0e0] px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4 mb-4">
            <div className="flex-1 min-w-0">
              <div className="font-bold text-base text-[#3B2175] mb-0.5">Help us improve your experience</div>
              <div className="text-xs text-[#23232B] max-w-2xl leading-snug">
                We use cookies and similar technologies to deliver, maintain, and improve our services, and for security purposes. We also use these technologies to understand how users interact with our services (including the effectiveness of our ad campaigns). Learn more in our{' '}
                <Link to="/cookie-policy" className="underline text-[#3B2175] hover:text-[#6C4A7C]">Cookie Policy</Link>.
              </div>
            </div>
            <div className="flex gap-3 items-center justify-center mt-2 md:mt-0 flex-shrink-0">
              <button
                onClick={() => setShowCookieConsent(false)}
                className="px-5 py-2 rounded-full bg-white text-[#7C3AED] font-semibold shadow-md border border-[#e0e0e0] hover:bg-[#f3e8ff] transition-all text-sm"
              >
                Reject non-essential
              </button>
              <button
                onClick={handleAcceptCookies}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#7C6CFA] text-white font-semibold shadow-md border-0 hover:opacity-90 transition-all text-sm"
              >
                Accept all
              </button>
            </div>
          </div>
          <div className="w-full text-center text-xs text-[#3B2175] opacity-80 pb-2">
            By messaging NexusHive, you agree to our <a href="#" className="underline">Terms</a> and have read our <a href="#" className="underline">Privacy Policy</a>.
          </div>
        </div>
      )}

      {/* Announcement Bar */}
      {showBanner && (
        <div className="w-full bg-[#3B5B7C] text-white text-center px-4 py-2 flex items-center justify-center relative text-sm">
          <span>
            Introducing NexusHive CRM with AI for meetings + Seal every deal with confidence—everything you need, all in one place. <a href="#" className="underline ml-1">Learn more.</a>
          </span>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-200 text-lg"
            onClick={() => setShowBanner(false)}
            aria-label="Close announcement"
          >
            ×
          </button>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/marlnlogopng.png"
              alt="NexusHive Logo"
              className="h-12 w-12 object-contain"
            />
            <div>
              <div className="text-2xl font-bold text-[#3B2175] leading-none">NexusHive</div>
              <div className="text-xs tracking-wide text-[#3B2175] font-medium">KEEP LEARNING, KEEP BUZZING</div>
            </div>
          </div>
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-[15px]">
            <div className="relative group">
              <a href="#" className="text-black font-medium flex items-center gap-1">Products <span className="text-xs">▼</span></a>
            </div>
            <div className="relative group">
              <a href="#" className="text-black font-medium flex items-center gap-1">Solutions <span className="text-xs">▼</span></a>
            </div>
            <div className="relative group">
              <a href="#" className="text-black font-medium flex items-center gap-1">Resources <span className="text-xs">▼</span></a>
            </div>
            <a href="#" className="text-black font-medium">Enterprise</a>
            <a href="#" className="text-black font-medium">Pricing</a>
            <Button
              className="bg-[#E3F0FF] text-[#3B5B7C] font-semibold px-6 py-2 rounded-full shadow-none hover:bg-[#d0e6ff] transition-colors"
              style={{boxShadow: 'none'}}
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button variant="ghost" className="border border-[#E3F0FF] text-[#3B5B7C] font-semibold px-6 py-2 rounded-full shadow-none hover:bg-[#f5faff] transition-colors">Contact Sales</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full bg-[#F2F8FF] py-24 border-t border-[#E3F0FF]">
        <div className="container mx-auto px-6 flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl md:text-6xl font-semibold text-[#241B6B] mb-6">One platform. Every customer. Total control.</h1>
          <p className="text-xl md:text-2xl text-[#241B6B] opacity-80 mb-2 font-normal">
            Record and share AI-enhanced customer updates across your CRM to streamline teamwork and accelerate sales cycles.
          </p>
        </div>
      </section>

      {/* Product Video Section - styled as per screenshot */}
      <section className="relative w-full bg-[#F6F7FA] py-24 overflow-x-clip">
        {/* Testimonial bubble */}
        <div className="absolute right-10 top-0 z-10 flex items-center gap-2">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] flex items-center justify-center shadow-md border-2 border-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="absolute -top-3 -left-3 text-2xl">💬</span>
          </div>
          <div className="bg-white rounded-full px-6 py-4 shadow-lg text-sm text-gray-700 font-medium max-w-xs">
            <span className="italic">We are building an economic experience based on quality and excellence.</span><br/>
            <span className="text-xs text-gray-500">— King Salman bin Abdulaziz Al Saud</span>
          </div>
        </div>
        {/* Large ellipse background */}
        <div className="absolute -left-1/4 top-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-white rounded-full z-0" style={{filter:'blur(0.5px)'}}></div>
        <div className="relative z-10 flex flex-col items-center justify-center">
          {/* Playful heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-[#23232B] mb-10 mt-8 text-center font-[cursive]">
            <span className="relative inline-block mr-2">
              <span className="relative z-10"> <span className="font-bold italic">L</span>evel <span className="font-bold italic">up</span></span>
              <span className="absolute left-0 bottom-1 w-full h-3 bg-[#FFB3B3] z-0 rounded rotate-[-2deg]" style={{zIndex:0}}></span>
            </span>
            your quality of
            <span className="relative inline-block ml-2">
              <span className="relative z-10 font-bold italic">work</span>
              <span className="absolute left-0 bottom-0 w-full h-1 bg-[#1DE9B6] z-0 rounded" style={{zIndex:0}}></span>
            </span>
          </h2>
          {/* Custom Video Player */}
          <CustomVideoPlayer />
        </div>
      </section>

      {/* App Grid Section */}
      <section className="relative w-full bg-[#F6F7FA] pb-24 pt-0 overflow-x-clip min-h-[600px] flex flex-col items-center">
        {/* Large, soft white curve in the background */}
        <div className="absolute top-0 left-0 w-full" style={{height: '340px', zIndex: 0}}>
          <svg viewBox="0 0 1440 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M0,340 Q720,0 1440,340 L1440,0 L0,0 Z" fill="white"/>
          </svg>
        </div>
        {/* App grid content */}
        <div className="relative w-full z-10 pb-12" style={{marginTop: '0'}}>
          <div className="grid grid-cols-4 md:grid-cols-6 gap-8 w-full max-w-5xl mx-auto">
            {appGridData.map((app, i) => (
              <div
                key={app.label + i}
                className="flex flex-col items-center group transition-transform duration-200"
              >
                <div
                  className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center mb-2 transition-transform duration-200 group-hover:scale-90"
                  style={{ boxShadow: '0 4px 16px 0 rgba(60,60,100,0.07)' }}
                >
                  <img src={app.icon} alt={app.label} className="w-10 h-10 object-contain" />
                </div>
                <span className="text-sm text-gray-700 font-medium text-center mt-1">{app.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI-powered lead updates section */}
      <section className="w-full flex justify-center items-center py-24 px-2">
        <div className="w-full max-w-5xl bg-[#2C238A] rounded-tl-[400px] rounded-bl-[400px] rounded-tr-3xl rounded-br-3xl flex flex-col md:flex-row items-center p-8 md:p-12 gap-8 min-h-[500px]">
          {/* Image */}
          <div className="flex-1 flex justify-center items-center">
            <img
              src="https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/NexusHiveCRM/Image-1.png"
              alt="AI-powered lead updates"
              className="w-full max-w-md rounded-2xl object-cover"
              style={{minWidth: '260px', minHeight: '260px', background: '#e5e7fa'}}
            />
          </div>
          {/* Text */}
          <div className="flex-1 text-white flex flex-col justify-center items-center md:items-start text-center md:text-left">
            <div className="text-xl md:text-2xl font-semibold mb-6">
              "Instantly record and share AI-powered lead updates to keep your team aligned and conversions on track."
            </div>
            <div className="text-base md:text-sm mb-4">
              <span className="font-bold">Mobile-Focused Version:</span><br/>
              Capture and share AI-powered lead updates—anytime, anywhere.<br/>
              With mobile-first CRM tools, your team stays informed on the go.<br/>
              Speed up responses, stay connected, and close deals faster.
            </div>
            <div className="text-base md:text-sm">
              <span className="font-bold">Enterprise Collaboration-Focused Version:</span><br/>
              AI-powered insights shared across your enterprise CRM.<br/>
              Enable cross-functional teams to collaborate in real time.<br/>
              Unify efforts, eliminate silos, and drive faster deal closures at scale.
            </div>
          </div>
        </div>
      </section>

      {/* Sales Pipeline Management Video Section (NEW) */}
      <section className="w-full flex flex-col md:flex-row items-center justify-center py-16 px-4 bg-white">
        {/* Video Block */}
        <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0 md:mr-8">
          <div className="border-2 border-[#B388FF] rounded-lg overflow-hidden shadow-sm w-full max-w-lg">
            <video
              controls
              poster="https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/marlnlogopng.png"
              className="w-full h-[300px] object-cover bg-black"
              src="https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/NexusHiveCRM/CollaborativeLearningwithNexusHive.mp4"
            />
          </div>
        </div>
        {/* Text Block */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div className="mb-6">
            <span className="font-semibold text-lg">Sales Pipeline Management:</span>
            <p className="mt-2 text-base">
              "Easily record and broadcast key deal updates using AI-powered video or voice notes—keeping your pipeline moving and your team aligned."
            </p>
          </div>
          <div>
            <span className="font-semibold text-lg">No more guessing where deals stand.</span>
            <p className="mt-2 text-base">
              Just hit record—share quick, AI-powered video or voice updates with your team.<br />
              Keep everyone in the loop, move deals forward, and make pipeline management feel effortless.<br />
              Because closing should be smooth, not stressful.
            </p>
          </div>
        </div>
      </section>

      {/* Collaborative Learning Image Section (NEW) */}
      <section className="w-full flex flex-col md:flex-row items-center justify-center py-16 px-4 bg-white">
        {/* Image Block */}
        <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0 md:mr-8">
          <div className="border-2 border-[#B388FF] rounded-lg overflow-hidden shadow-sm w-full max-w-lg">
            <img
              src="https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/NexusHiveCRM/Image-2.png"
              alt="Collaborative Learning"
              className="w-full h-[300px] object-cover bg-white"
            />
          </div>
        </div>
        {/* Text Block */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div className="mb-6">
            <span className="font-semibold text-lg">Sales Pipeline Management:</span>
            <p className="mt-2 text-base">
              "Easily record and broadcast key deal updates using AI-powered video or voice notes—keeping your pipeline moving and your team aligned."
            </p>
          </div>
          <div>
            <span className="font-semibold text-lg">No more guessing where deals stand.</span>
            <p className="mt-2 text-base">
              Just hit record—share quick, AI-powered video or voice updates with your team.<br />
              Keep everyone in the loop, move deals forward, and make pipeline management feel effortless.<br />
              Because closing should be smooth, not stressful.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-muted/50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Student Management",
                description: "Easily track student information, enrollment status, and academic progress."
              },
              {
                title: "Faculty Collaboration",
                description: "Enable seamless communication and collaboration between faculty members."
              },
              {
                title: "Administrative Tools",
                description: "Powerful tools for managing courses, schedules, and university resources."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-background p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-primary text-primary-foreground rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your University?</h2>
          <p className="text-lg mb-8">Join leading universities that trust NexusHiveCRM</p>
          <Button size="lg" variant="secondary">Get Started Now</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">NexusHiveCRM</h3>
              <p className="text-muted-foreground">Empowering universities with modern management solutions.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Features</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Pricing</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">About</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Contact</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} NexusHiveCRM. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Custom Video Player Component
function CustomVideoPlayer() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const updateProgress = () => {
      setProgress(video.currentTime);
      setDuration(video.duration || 0);
    };
    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("loadedmetadata", updateProgress);
    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("loadedmetadata", updateProgress);
    };
  }, []);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleProgressClick = (e) => {
    const bar = e.target;
    const rect = bar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    const newTime = percent * duration;
    videoRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  return (
    <div className="mt-6 bg-white rounded-2xl shadow-xl p-2 md:p-4 w-full max-w-5xl mx-auto relative flex flex-col items-center" style={{minHeight:'520px'}}>
      <video
        ref={videoRef}
        src="https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/NexusHiveCRM/NexusHive-LandingPage-AI-Video.mp4"
        poster="https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/marlnlogopng.png"
        className="w-full h-[500px] object-contain rounded-xl bg-[#F6F7FA]"
        style={{outline: 'none'}}
        onClick={handlePlayPause}
      />
      {/* Custom Controls */}
      <div className="w-full flex items-center gap-3 mt-2 px-2">
        <button
          onClick={handlePlayPause}
          className="focus:outline-none text-[#6C4A7C] hover:text-[#3B2175] text-xl"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="4" height="12" rx="1.5" fill="currentColor"/><rect x="11" y="3" width="4" height="12" rx="1.5" fill="currentColor"/></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 3V15L15 9L4 3Z" fill="currentColor"/></svg>
          )}
        </button>
        <div
          className="relative flex-1 h-2 cursor-pointer group"
          onClick={handleProgressClick}
        >
          <div className="absolute top-1/2 left-0 w-full h-1 bg-[#E3E3E3] rounded-full -translate-y-1/2" />
          <div
            className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#6C4A7C] to-[#3B2175] rounded-full -translate-y-1/2 transition-all"
            style={{ width: duration ? `${(progress / duration) * 100}%` : '0%' }}
          />
          <div
            className="absolute top-1/2"
            style={{ left: duration ? `calc(${(progress / duration) * 100}% - 7px)` : '-7px', transform: 'translateY(-50%)' }}
          >
            <div className="w-3 h-3 bg-[#3B2175] rounded-full shadow-md border-2 border-white group-hover:scale-110 transition-transform" />
          </div>
        </div>
        <span className="text-xs text-gray-500 min-w-[48px] text-right">
          {formatTime(progress)} / {formatTime(duration)}
        </span>
      </div>
    </div>
  );
}

function formatTime(sec) {
  if (!sec || isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// App grid data and icons
const appGridData = [
  { label: "Enterprise Files", icon: "https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/NexusHiveCRM/NexusHiveProductLogo/documents.png" },
  { label: "Accounting", icon: "https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/NexusHiveCRM/NexusHiveProductLogo/accounting.png" },
  { label: "Sales", icon: "https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/NexusHiveCRM/NexusHiveProductLogo/sales.png" },
  { label: "Team Collaboration", icon: "https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/NexusHiveCRM/NexusHiveProductLogo/discussion.png" },
  { label: "Media Library", icon: "https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/NexusHiveCRM/NexusHiveProductLogo/contentHub.png" },
  { label: "Reports", icon: "https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/NexusHiveCRM/NexusHiveProductLogo/reports.png" },
  { label: "HR", icon: "https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/NexusHiveCRM/NexusHiveProductLogo/hr.png" },
  { label: "E-Signature", icon: "https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/NexusHiveCRM/NexusHiveProductLogo/esign.gif" },
  { label: "Help Desk", icon: "https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/NexusHiveCRM/NexusHiveProductLogo/helpDesk.png" },
  { label: "On-Site Service", icon: "https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/NexusHiveCRM/NexusHiveProductLogo/fieldService.png" },
  { label: "Planning", icon: "https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/NexusHiveCRM/NexusHiveProductLogo/planning.png" },
  { label: "Digital Campaigns", icon: "https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/NexusHiveCRM/NexusHiveProductLogo/socialMarketing.png" },
  { label: "CPQ", icon: "https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/NexusHiveCRM/NexusHiveProductLogo/cpq.png" },
  { label: "Email Marketing", icon: "https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/NexusHiveCRM/NexusHiveProductLogo/emailMarketing.png" },
  { label: "Subscriptions", icon: "https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/NexusHiveCRM/NexusHiveProductLogo/subscriptions.png" },
  { label: "Design Studio", icon: "https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/NexusHiveCRM/NexusHiveProductLogo/designStudio.png" },
  { label: "Projects", icon: "https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/NexusHiveCRM/NexusHiveProductLogo/projects.png" },
  { label: "Purchase", icon: "https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/NexusHiveCRM/NexusHiveProductLogo/purchase.png" },
]; 