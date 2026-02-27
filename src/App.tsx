/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Beef, 
  ChevronRight, 
  CheckCircle2, 
  MessageCircle, 
  Phone, 
  User, 
  ShoppingBag, 
  TrendingUp,
  Star,
  Truck,
  Bell
} from 'lucide-react';

type Step = 'welcome' | 'basic' | 'habits' | 'future' | 'final';

interface FormData {
  name: string;
  phone: string;
  frequency: string;
  favoriteProduct: string;
  averageSpend: string;
  pickupInterest: boolean;
  deliveryInterest: boolean;
  switchReason: string;
  promoConsent: string;
}

export default function App() {
  const [step, setStep] = useState<Step>('welcome');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    frequency: '',
    favoriteProduct: '',
    averageSpend: '',
    pickupInterest: false,
    deliveryInterest: false,
    switchReason: '',
    promoConsent: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = (target: Step) => setStep(target);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer: formData }),
      });
      if (response.ok) {
        nextStep('final');
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-orange-500/30">
      {/* Background Accent */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-orange-600/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-zinc-800/20 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-md mx-auto px-6 py-12 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-500/20 mb-4 rotate-3">
             <Beef className="w-12 h-12 text-black" />
          </div>
          <h1 className="text-2xl font-bold tracking-tighter uppercase italic">
            SuKarNeppo’S
          </h1>
          <p className="text-[10px] tracking-[0.3em] uppercase opacity-50 font-mono">
            Wolf Cuts • Born to Provide
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step === 'welcome' && (
            <motion.div 
              key="welcome"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex-1 flex flex-col justify-center text-center"
            >
              <h2 className="text-4xl font-bold mb-6 leading-tight">
                ¿Listo para la <span className="text-orange-500 italic">mejor carne</span> de tu vida?
              </h2>
              <p className="text-zinc-400 mb-10 text-lg">
                Ayúdanos a mejorar y llévate un beneficio exclusivo para nuestra reapertura. Solo te tomará 1 minuto.
              </p>
              <button 
                onClick={() => nextStep('basic')}
                className="group relative w-full py-5 bg-white text-black font-bold rounded-xl overflow-hidden transition-transform active:scale-95"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
                  COMENZAR <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </motion.div>
          )}

          {step === 'basic' && (
            <motion.div 
              key="basic"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex-1"
            >
              <div className="mb-8">
                <span className="text-orange-500 font-mono text-sm uppercase tracking-widest">01 / Datos Básicos</span>
                <h2 className="text-3xl font-bold mt-2">Queremos conocerte, patrón.</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest opacity-50 mb-2 ml-1">¿Cómo te llamas?</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
                    <input 
                      type="text"
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:border-orange-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest opacity-50 mb-2 ml-1">¿Cuál es tu WhatsApp?</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
                    <input 
                      type="tel"
                      placeholder="Número a 10 dígitos"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:border-orange-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                <button 
                  disabled={!formData.name || !formData.phone}
                  onClick={() => nextStep('habits')}
                  className="w-full py-5 bg-orange-600 disabled:opacity-30 disabled:grayscale font-bold rounded-xl mt-8 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  SIGUIENTE <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 'habits' && (
            <motion.div 
              key="habits"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex-1"
            >
              <div className="mb-8">
                <span className="text-orange-500 font-mono text-sm uppercase tracking-widest">02 / Hábitos de Compra</span>
                <h2 className="text-3xl font-bold mt-2">¿Cómo es tu ritual carnívoro?</h2>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="block text-xs uppercase tracking-widest opacity-50 mb-4 ml-1">¿Cada cuánto compras carne?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Cada semana', 'Cada 15 días', 'Una vez al mes', 'Ocasional'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => updateField('frequency', opt)}
                        className={`py-3 px-4 rounded-xl border text-sm transition-all ${formData.frequency === opt ? 'bg-white text-black border-white' : 'bg-transparent border-white/10 text-zinc-400'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest opacity-50 mb-4 ml-1">¿Qué producto es el rey en tu mesa?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Bistec', 'Costilla', 'Molida', 'Arrachera', 'Mixto'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => updateField('favoriteProduct', opt)}
                        className={`py-3 px-4 rounded-xl border text-sm transition-all ${formData.favoriteProduct === opt ? 'bg-white text-black border-white' : 'bg-transparent border-white/10 text-zinc-400'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest opacity-50 mb-4 ml-1">
                    Cuando haces carne asada o compras para la familia, normalmente tu compra es de:
                  </label>
                  <div className="space-y-3">
                    {[
                      { id: 'under200', label: 'Menos de $200' },
                      { id: '200to400', label: '$200 – $400' },
                      { id: '400to800', label: '$400 – $800' },
                      { id: 'over800', label: 'Más de $800' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => updateField('averageSpend', opt.id)}
                        className={`w-full py-4 px-6 rounded-xl border text-left flex items-center justify-between transition-all ${formData.averageSpend === opt.id ? 'bg-orange-600 border-orange-600' : 'bg-transparent border-white/10 text-zinc-400'}`}
                      >
                        <span>{opt.label}</span>
                        {formData.averageSpend === opt.id && <TrendingUp className="w-5 h-5" />}
                      </button>
                    ))}
                  </div>
                  {formData.averageSpend === '200to400' && (
                    <p className="mt-3 text-[11px] text-orange-400 italic font-medium">
                      🔥 Nuestros clientes más frecuentes aprovechan el descuento desde $400.
                    </p>
                  )}
                </div>

                <button 
                  disabled={!formData.frequency || !formData.favoriteProduct || !formData.averageSpend}
                  onClick={() => nextStep('future')}
                  className="w-full py-5 bg-white text-black font-bold rounded-xl mt-4 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  CONTINUAR <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 'future' && (
            <motion.div 
              key="future"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex-1"
            >
              <div className="mb-8">
                <span className="text-orange-500 font-mono text-sm uppercase tracking-widest">03 / Preferencias Futuras</span>
                <h2 className="text-3xl font-bold mt-2">Dinos cómo quieres que te atendamos.</h2>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <div 
                    onClick={() => updateField('pickupInterest', !formData.pickupInterest)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${formData.pickupInterest ? 'bg-orange-600/20 border-orange-500' : 'bg-zinc-900/50 border-white/10'}`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${formData.pickupInterest ? 'bg-orange-500 text-white' : 'bg-zinc-800 text-zinc-500'}`}>
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold">¿Pedir por WhatsApp y solo recoger?</h3>
                      <p className="text-xs opacity-50">Ahorra tiempo en tus vueltas.</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.pickupInterest ? 'bg-orange-500 border-orange-500' : 'border-white/20'}`}>
                      {formData.pickupInterest && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                  </div>

                  <div 
                    onClick={() => updateField('deliveryInterest', !formData.deliveryInterest)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${formData.deliveryInterest ? 'bg-orange-600/20 border-orange-500' : 'bg-zinc-900/50 border-white/10'}`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${formData.deliveryInterest ? 'bg-orange-500 text-white' : 'bg-zinc-800 text-zinc-500'}`}>
                      <Truck className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold">¿Servicio a domicilio?</h3>
                      <p className="text-xs opacity-50">Llevamos la calidad a tu puerta.</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.deliveryInterest ? 'bg-orange-500 border-orange-500' : 'border-white/20'}`}>
                      {formData.deliveryInterest && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest opacity-50 mb-4 ml-1">¿Qué te haría ser cliente fiel de SuKarNeppo’S?</label>
                  <div className="grid grid-cols-1 gap-2">
                    {['Mejor precio', 'Mejor calidad', 'Servicio rápido', 'Promociones', 'Atención personalizada'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => updateField('switchReason', opt)}
                        className={`py-4 px-6 rounded-xl border text-sm text-left transition-all ${formData.switchReason === opt ? 'bg-white text-black border-white' : 'bg-transparent border-white/10 text-zinc-400'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest opacity-50 mb-4 ml-1">¿Quieres recibir descuentos exclusivos que no publicamos en redes?</label>
                  <div className="flex gap-3">
                    {[
                      { id: 'all', label: 'Sí, mándame todo 🔥' },
                      { id: 'important', label: 'Solo lo importante' },
                      { id: 'none', label: 'No' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => updateField('promoConsent', opt.id)}
                        className={`flex-1 py-3 px-2 rounded-xl border text-[10px] uppercase font-bold tracking-tighter transition-all ${formData.promoConsent === opt.id ? 'bg-orange-600 border-orange-600' : 'bg-transparent border-white/10 text-zinc-400'}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  disabled={!formData.switchReason || !formData.promoConsent || isSubmitting}
                  onClick={handleSubmit}
                  className="w-full py-5 bg-orange-600 font-bold rounded-xl mt-4 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'GUARDANDO...' : 'FINALIZAR Y RECIBIR CUPÓN'} <Bell className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 'final' && (
            <motion.div 
              key="final"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex-1 flex flex-col items-center justify-center text-center"
            >
              <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-8">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
              
              <h2 className="text-4xl font-bold mb-4">¡Gracias por el apoyo, patrón!</h2>
              <p className="text-zinc-400 mb-10">Tu opinión es oro para nosotros. Aquí tienes tu recompensa:</p>

              <div className="w-full bg-zinc-900 border-2 border-dashed border-orange-500/50 rounded-2xl p-8 mb-10 relative overflow-hidden">
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#0a0a0a] rounded-full border-r-2 border-orange-500/50" />
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#0a0a0a] rounded-full border-l-2 border-orange-500/50" />
                
                <span className="text-xs uppercase tracking-[0.3em] opacity-50 mb-2 block">CUPÓN DIGITAL</span>
                <div className="text-4xl font-mono font-black text-orange-500 tracking-tighter mb-2">
                  PRIMERBISTEC
                </div>
                <p className="text-sm font-bold">$50 DE DESCUENTO</p>
                <p className="text-[10px] opacity-40 mt-1">En compras mayores a $400</p>
              </div>

              <div className="space-y-4 w-full">
                <a 
                  href={`https://wa.me/521234567890?text=Hola!%20Acabo%20de%20terminar%20la%20encuesta%20de%20SuKarNeppo'S.%20Mi%20cupón%20es%20PRIMERBISTEC`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-5 bg-[#25D366] text-white font-bold rounded-xl flex items-center justify-center gap-3 transition-transform active:scale-95"
                >
                  <MessageCircle className="w-6 h-6" /> ESCRIBIR POR WHATSAPP
                </a>
                
                <button 
                  onClick={() => window.location.reload()}
                  className="w-full py-4 text-zinc-500 font-bold text-sm uppercase tracking-widest hover:text-white transition-colors"
                >
                  VOLVER AL INICIO
                </button>
              </div>

              <p className="mt-12 text-[10px] opacity-30 uppercase tracking-widest">
                Muy pronto anunciamos reapertura. Mantente atento 👀🔥
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Branding */}
      <footer className="relative z-10 py-8 text-center opacity-20">
        <p className="text-[10px] tracking-widest uppercase">© 2026 SuKarNeppo’S Wolf Cuts</p>
      </footer>
    </div>
  );
}
