import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-content', {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: '.about-content',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-gradient-dark relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="about-content max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="relative mb-6">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 text-gradient-gold relative z-10">
              About MSJ Traders
            </h2>
          </div>
          
          {/* Company Established Badge */}
          <div className="inline-block bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-full px-4 py-2 mb-6 max-w-xs mx-auto">
            <p className="text-orange-300 font-semibold text-sm md:text-lg">
              Est. 1987 • 35+ Years
            </p>
          </div>

          {/* Content Text - Mobile Optimized */}
          <div className="space-y-4 text-base md:text-lg lg:text-xl text-foreground/90 leading-relaxed">
            <p className="text-sm md:text-base lg:text-lg text-left md:text-center">
              Founded in <span className="text-primary font-semibold">1987</span> by our visionary leader{' '}
              <span className="text-primary font-semibold">Mr. J. Mohideen</span>, MSJ Traders has been 
              a pioneering force in the industry for over three decades.
            </p>
            
            <p className="text-sm md:text-base lg:text-lg text-left md:text-center">
              We are committed to delivering the <span className="text-primary font-semibold">best quality services</span> 
              with exceptional speed and efficiency, ensuring every project is completed within the shortest possible timeframe 
              without compromising on excellence.
            </p>
            
            <p className="text-sm md:text-base lg:text-lg text-left md:text-center font-semibold">
              Equipped with <span className="text-primary font-semibold">Chennai's most advanced machinery</span> and 
              backed by <span className="text-primary font-semibold">35 years of hands-on experience</span>, we bring 
              unmatched expertise and reliability to every project we undertake.
            </p>
          </div>

          {/* Enhanced Services Button */}
          <div className="mt-8 md:mt-12">
            <Link 
              to="/services"
              className="inline-flex items-center px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-orange-500/30 relative overflow-hidden group"
            >
              <span className="relative z-10">View Our Services</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>

          {/* Enhanced Stats Section - Non-scrolling Grid Layout */}
          <div className="mt-8 md:mt-12 lg:mt-16">
            {/* Desktop Grid - 3 cards in one row (unchanged) */}
            <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
              <div className="bg-card/50 backdrop-blur-sm p-6 lg:p-8 rounded-xl border border-border hover:border-orange-500 transition-all duration-300 hover:scale-105 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <h3 className="text-4xl lg:text-5xl font-bold text-primary mb-3 relative z-10 group-hover:scale-110 transition-transform duration-300">35+</h3>
                <p className="text-muted-foreground text-base relative z-10 font-semibold">Years of Experience</p>
                <p className="text-orange-400 text-sm mt-2 relative z-10">Since 1987</p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm p-6 lg:p-8 rounded-xl border border-border hover:border-yellow-500 transition-all duration-300 hover:scale-105 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <h3 className="text-4xl lg:text-5xl font-bold text-primary mb-3 relative z-10 group-hover:scale-110 transition-transform duration-300">1000+</h3>
                <p className="text-muted-foreground text-base relative z-10 font-semibold">Projects Completed</p>
                <p className="text-yellow-400 text-sm mt-2 relative z-10">Across Chennai</p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm p-6 lg:p-8 rounded-xl border border-border hover:border-orange-500 transition-all duration-300 hover:scale-105 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <h3 className="text-4xl lg:text-5xl font-bold text-primary mb-3 relative z-10 group-hover:scale-110 transition-transform duration-300">100%</h3>
                <p className="text-muted-foreground text-base relative z-10 font-semibold">Quality Commitment</p>
                <p className="text-orange-400 text-sm mt-2 relative z-10">Best in Class</p>
              </div>
            </div>

            {/* Mobile Layout - 2x1 Grid */}
            <div className="md:hidden">
              {/* First Row - 2 Cards */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-card/50 backdrop-blur-sm p-4 rounded-xl border border-orange-500/50 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 opacity-100 transition-opacity duration-300"></div>
                  <h3 className="text-3xl font-bold text-primary mb-2 relative z-10">35+</h3>
                  <p className="text-muted-foreground text-xs relative z-10 font-semibold">Years Experience</p>
                  <p className="text-orange-400 text-xs mt-1 relative z-10">Since 1987</p>
                </div>
                
                <div className="bg-card/50 backdrop-blur-sm p-4 rounded-xl border border-yellow-500/50 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-100 transition-opacity duration-300"></div>
                  <h3 className="text-3xl font-bold text-primary mb-2 relative z-10">1000+</h3>
                  <p className="text-muted-foreground text-xs relative z-10 font-semibold">Projects Done</p>
                  <p className="text-yellow-400 text-xs mt-1 relative z-10">Across Chennai</p>
                </div>
              </div>
              
              {/* Second Row - 1 Card (Centered) */}
              <div className="flex justify-center">
                <div className="bg-card/50 backdrop-blur-sm p-4 rounded-xl border border-orange-500/50 transition-all duration-300 group relative overflow-hidden w-full max-w-[calc(50%-0.5rem)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 opacity-100 transition-opacity duration-300"></div>
                  <h3 className="text-3xl font-bold text-primary mb-2 relative z-10">100%</h3>
                  <p className="text-muted-foreground text-xs relative z-10 font-semibold">Quality Commitment</p>
                  <p className="text-orange-400 text-xs mt-1 relative z-10">Best in Class</p>
                </div>
              </div>
            </div>
          </div>

          {/* Our Quality Section - Mobile Optimized */}
          <div className="mt-8 md:mt-12">
            <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-xl md:rounded-2xl backdrop-blur-sm overflow-hidden">
              {/* Header with Background */}
              <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 px-4 py-3 md:px-6 md:py-4 border-b border-orange-500/30">
                <h4 className="text-lg md:text-2xl font-bold text-white text-left">Our Quality</h4>
              </div>
              
              {/* Content */}
              <div className="p-4 md:p-6 lg:p-8">
                <p className="text-foreground/90 text-sm md:text-base lg:text-lg leading-relaxed text-left md:text-center">
                  We are renowned for completing demolition jobs more quickly and cost-effectively than our competitors. 
                  We have got high quality equipments for Dismantling and Demolitions, ensuring superior results 
                  with unmatched efficiency and precision.
                </p>
                
                {/* Quality Highlights for Mobile */}
                <div className="mt-4 md:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 md:hidden">
                  <div className="flex items-center space-x-2 text-sm text-orange-300">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Quick Project Completion</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-yellow-300">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>Cost-Effective Solutions</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-orange-300">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Advanced Equipment</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-yellow-300">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>Superior Results</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;