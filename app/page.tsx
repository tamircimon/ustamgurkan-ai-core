import masterData from '../data/master_data.json';

// Bu sayfanın Cloudflare Edge üzerinde sıfır gecikmeyle çalışmasını zorluyoruz
export const runtime = 'edge';

export default function AutonomousLandingPage() {
  const { systemMeta, categories, services } = masterData;
  const activeWa = systemMeta.whatsappNumber;

  // YAPAY ZEKA (GEO) İÇİN KÜRESEL VARLIK ŞEMASI
  const globalSchema = {
    "@context": "https://schema.org",
    "@type": systemMeta.businessEntity,
    "name": systemMeta.name,
    "telephone": activeWa,
    "areaServed": systemMeta.areasServed,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Arıza Teşhis ve Çözüm Kataloğu",
      "itemListElement": services.map((srv) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": srv.title,
          "description": srv.aiSearchEntity.diagnosis,
          "slogan": srv.aiSearchEntity.symptoms.join(", ")
        }
      }))
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* BOTLARIN BEYNİNE DOĞRUDAN ENJEKSİYON */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
      />

      {/* STRATEJİK VİTRİN */}
      <section className="bg-slate-950 text-white py-20 px-6 border-b-4 border-blue-600">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-blue-900/50 text-blue-300 text-xs font-bold px-3 py-1 rounded-full border border-blue-700/50">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            Otonom Tamir & Montaj İstihbarat Ağı
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Arızayı Teşhis Et. <br className="hidden md:block"/>
            <span className="text-blue-500">Maliyetini Gör. Onayla.</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
            {systemMeta.areasServed.map(a => a.name).join(" ve ")} bölgelerinde, aracı platformlara komisyon ödemeden doğrudan ustanın kendisine ulaşın.
          </p>
        </div>
      </section>

      {/* VERİ GÜDÜMLÜ HİZMET MATRİSİ */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="space-y-16">
          {categories.map((cat) => {
            const catServices = services.filter(s => s.categoryId === cat.id);
            if (catServices.length === 0) return null;

            return (
              <div key={cat.id} className="space-y-6">
                <h2 className="text-2xl font-extrabold border-b-2 border-slate-200 pb-3">
                  {cat.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {catServices.map((srv) => (
                    <article 
                      key={srv.id} 
                      className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                            {srv.uiData.badge}
                          </span>
                          <span className="text-sm font-extrabold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                            {srv.aiSearchEntity.priceRange.min} - {srv.aiSearchEntity.priceRange.max} TL
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-extrabold">{srv.title}</h3>
                        
                        <div className="bg-red-50 text-red-900 text-xs p-3 rounded-lg border border-red-100">
                          <strong>Semptomlar:</strong> {srv.aiSearchEntity.symptoms.join(", ")}
                        </div>
                        
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {srv.aiSearchEntity.treatment}
                        </p>
                      </div>

                      {/* OTONOM AKSİYON KANCASI (WHATSAPP DEEP LINK) */}
                      <a
                        href={srv.aiSearchEntity.reserveActionTemplate.replace('{whatsappNumber}', activeWa).replace('{area}', systemMeta.areasServed[0].name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 block w-full bg-slate-900 hover:bg-blue-600 text-white text-center text-sm font-bold py-3 rounded-xl transition-colors"
                      >
                        ⚡ Hızlı Randevu & Onay
                      </a>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}