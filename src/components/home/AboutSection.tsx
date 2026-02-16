'use client'

import Image from 'next/image'

export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/img/0103.JPG"
                alt="При Бари - Нашата сладкарница"
                width={400}
                height={400}
                className="w-full h-auto object-cover"
                style={{ backgroundColor: '#f6edf6' }}
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="order-1 lg:order-2">
            <h2
              className="text-4xl md:text-5xl font-bold mb-2"
              style={{ color: '#500050', fontFamily: "'Marck Script', cursive" }}
            >
              Добре дошли При Бари
            </h2>
            
            <h3
              className="text-2xl font-semibold mb-6"
              style={{ color: '#500050', fontFamily: 'IdealistSans, sans-serif' }}
            >
              Нашата история
            </h3>

            <div
              className="space-y-4 text-gray-700 leading-relaxed"
              style={{ fontFamily: 'IdealistSans, sans-serif' }}
            >
              <p>
                Нашият малък семеен бизнес е основан на опита, набран през годините. Опит трупан, както у нас така и в чужбина. Дългогодишната любов към сладкарското изкуство ни подтикна към осъществяване на настоящия проект – сладкарска работилничка с малка сладкарничка към него на тихо и спокойно място, създаваща перфектно преживяване за небцето.
              </p>

              <p>
                Нашата сладкарничка предлага домашни, вкусни и красиви, ръчно изработени торти, бисквити, бонбони, кексчета и всякакви други десерти. Съвършеното качество постигаме с използването на висококачествени и натурални продукти - белг.шоколад, брашно с проверен произход, прясна сметана, плодове и т.н. Десертите се приготвят ден преди да стигнат до Вашата трапеза.
              </p>
            </div>

            <div className="mt-8">
              <a
                href="/za-nas"
                className="inline-block px-8 py-3 rounded-full font-medium transition-all hover:scale-105 border-2"
                style={{
                  backgroundColor: 'transparent',
                  color: '#500050',
                  borderColor: '#500050',
                  fontFamily: 'IdealistSans, sans-serif',
                }}
              >
                Научете повече
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
