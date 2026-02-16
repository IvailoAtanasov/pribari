'use client'

export default function HeroSection() {
  return (
    <section className="relative w-full h-[55vh] min-h-[500px] overflow-hidden">
      {/* Background Image with Zoom Animation */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-slow-zoom"
        style={{
          backgroundImage: "url('/img/hero.JPG')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1
          className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg"
          style={{ fontFamily: "'Marck Script', cursive" }}
        >
          При Бари
        </h1>
        <p
          className="text-xl md:text-2xl text-white/90 max-w-2xl drop-shadow-md"
          style={{ fontFamily: 'IdealistSans, sans-serif' }}
        >
          Домашно приготвени торти, бисквити и десерти с много любов
        </p>
        <a
          href="/torti"
          className="mt-8 px-8 py-3 rounded-full font-medium transition-all hover:scale-105 hover:bg-[#500050] hover:text-[#f6edf6] border-2"
          style={{
            backgroundColor: 'transparent',
            color: '#ffffff',
            borderColor: '#ffffff',
            fontFamily: 'IdealistSans, sans-serif',
          }}
        >
          Разгледай менюто
        </a>
      </div>
    </section>
  )
}
