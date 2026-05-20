import { useState, useEffect } from 'react';

export default function App() {
  const whatsappNumber = '918450972317';

  const [language, setLanguage] = useState('en'); // 'en' or 'hi'

  const t = (en, hi) => language === 'en' ? en : hi;

  const luxuryImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1542314831-068cd1ad952d?auto=format&fit=crop&w=1600&q=80"
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    destination: '',
    fromDate: '',
    toDate: '',
    adults: 2,
    children: 0,
    childAges: [],
    budgetPerDay: '',
    travelType: 'all'
  });

  // Carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % luxuryImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAdultsChildren = (type, value) => {
    if (type === 'adults') {
      setForm(prev => ({ ...prev, adults: parseInt(value) || 1 }));
    } else {
      const newChildren = parseInt(value) || 0;
      let newAges = [...form.childAges];
      if (newChildren > form.childAges.length) {
        newAges = [...newAges, ...Array(newChildren - form.childAges.length).fill(5)];
      } else {
        newAges = newAges.slice(0, newChildren);
      }
      setForm(prev => ({ ...prev, children: newChildren, childAges: newAges }));
    }
  };

  const updateChildAge = (index, age) => {
    const newAges = [...form.childAges];
    newAges[index] = parseInt(age);
    setForm(prev => ({ ...prev, childAges: newAges }));
  };

  const handleWhatsApp = () => {
    if (!form.destination) {
      alert(t("Please enter destination", "कृपया गंतव्य दर्ज करें"));
      return;
    }

    setIsSubmitting(true);

    const childInfo = form.children > 0 
      ? `Children: ${form.children} (${form.childAges.join(', ')} yrs)` 
      : 'No children';

    const msg = `*Premium Hotel Enquiry - StaySaathi*\n\n` +
      `📍 Destination: ${form.destination}\n` +
      `📅 From: ${form.fromDate || 'Flexible'}\n` +
      `📅 Till: ${form.toDate || 'Flexible'}\n` +
      `👨‍👩‍👧 Adults: ${form.adults}\n` +
      `👦 ${childInfo}\n` +
      `💰 Budget: ₹${form.budgetPerDay || 'Not specified'} per room/day\n` +
      `🏷️ Type: ${form.travelType.toUpperCase()}\n\n` +
      `Please suggest best luxury/comfort options.`;

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    setTimeout(() => setIsSubmitting(false), 1200);
  };

  const popularDestinations = [
    { name: "Goa", desc: t("Beach & Party", "समुद्र तट") },
    { name: "Jaipur", desc: t("Royal Heritage", "शाही विरासत") },
    { name: "Manali", desc: t("Snow & Mountains", "बर्फ और पहाड़") },
    { name: "Udaipur", desc: t("City of Lakes", "झीलों का शहर") },
    { name: "Kerala", desc: t("Backwaters & Ayurveda", "बैकवाटर") },
    { name: "Leh Ladakh", desc: t("High Altitude Adventure", "ऊंचाई का साहस") },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 text-gray-900 font-sans">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">S</div>
            <div>
              <h1 className="text-3xl font-serif tracking-tight">StaySaathi</h1>
              <p className="text-xs text-amber-600 -mt-1">Book as a friend</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="px-4 py-2 text-sm border rounded-full hover:bg-gray-100 transition"
            >
              {language === 'en' ? 'हिंदी' : 'English'}
            </button>

            <button
              onClick={handleWhatsApp}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-medium flex items-center gap-2 transition"
            >
              💬 WhatsApp Us
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section - Same as before */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src={luxuryImages[currentImage]}
          alt="Luxury Stay"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h2 className="text-white text-5xl md:text-6xl font-serif font-medium leading-tight mb-6">
            {t("Discover Luxury Stays in India", "भारत में लग्जरी ठहराव की खोज करें")}
          </h2>
          <p className="text-white/90 text-xl md:text-2xl mb-10">
            {t("Real human help • Personalized • Trusted", "सच्ची मानवीय मदद • व्यक्तिगत • भरोसेमंद")}
          </p>
          
          <button
            onClick={() => document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-black px-10 py-4 rounded-2xl text-lg font-medium hover:bg-amber-100 transition"
          >
            {t("Get Personalized Options", "व्यक्तिगत विकल्प प्राप्त करें")}
          </button>
        </div>
      </section>

      {/* Booking Form - Same as before */}
      <section id="booking-form" className="max-w-5xl mx-auto px-6 -mt-12 relative z-20">
        {/* ... (Form code remains unchanged) ... */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Form content same as previous version */}
          {/* (Keeping it short here - copy the full form from previous response) */}
        </div>
      </section>

      {/* === NEW: Popular Destinations Grid === */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h3 className="text-center text-4xl font-semibold mb-4">
          {t("Popular Destinations", "लोकप्रिय गंतव्य")}
        </h3>
        <p className="text-center text-gray-600 mb-12">
          {t("Handpicked places loved by Indian travellers", "भारतीय यात्रियों द्वारा पसंद किए जाने वाले जगहें")}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularDestinations.map((dest, index) => (
            <div
              key={index}
              onClick={() => setForm(prev => ({ ...prev, destination: dest.name }))}
              className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="h-56 bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center text-6xl">
                {dest.name === "Goa" && "🏖️"}
                {dest.name === "Jaipur" && "🏰"}
                {dest.name === "Manali" && "🏔️"}
                {dest.name === "Udaipur" && "🪷"}
                {dest.name === "Kerala" && "🌴"}
                {dest.name === "Leh Ladakh" && "⛰️"}
              </div>
              <div className="p-6">
                <h4 className="text-2xl font-semibold mb-1">{dest.name}</h4>
                <p className="text-amber-600 font-medium">{dest.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer - Updated */}
      <footer className="bg-zinc-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center text-white font-bold">S</div>
            <span className="text-3xl font-serif">StaySaathi</span>
          </div>
          
          <p className="mt-2 opacity-75">
            {t("Assistance Hours: 9 AM – 9 PM IST", "सहायता समय: सुबह 9 बजे – रात 9 बजे IST")}
          </p>
          
          <p className="text-sm opacity-60 mt-8">
            Payments are made directly to hotels • StaySaathi is a personal assistance service
          </p>
        </div>
      </footer>
    </div>
  );
}
