import React from 'react';
import { X, ShieldAlert, CheckCircle, Info, Zap, CreditCard, Clock, MapPin } from 'lucide-react';

interface RateGuideModalProps {
  onClose: () => void;
}

export const RateGuideModal: React.FC<RateGuideModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white">Singapore Carpark & Rates Guide</h2>
              <p className="text-xs text-slate-400">Official HDB, URA, ERP, and Mall parking rules</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-6 text-xs md:text-sm text-slate-300">
          {/* Section 1: HDB Parking Rules */}
          <div className="space-y-3">
            <h3 className="text-sm md:text-base font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>HDB & URA Public Carpark Charges</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="font-semibold text-emerald-400 text-xs mb-1">Standard / Non-Central Carpark</div>
                <div className="text-base font-mono font-bold text-white tabular-nums mb-1">
                  S$0.60 <span className="text-xs font-normal text-slate-400">per 30 minutes</span>
                </div>
                <p className="text-xs text-slate-400">
                  Applies to all heartland estates (Tampines, Jurong, Woodlands, Bedok, Toa Payoh, Bishan, Clementi, etc.).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="font-semibold text-amber-400 text-xs mb-1">Central Area Public Carpark</div>
                <div className="text-base font-mono font-bold text-white tabular-nums mb-1">
                  S$1.20 <span className="text-xs font-normal text-slate-400">per 30 mins (7am - 5pm)</span>
                </div>
                <p className="text-xs text-slate-400">
                  Covers CBD, Chinatown, Tanjong Pagar, Bras Basah, and Albert Centre (reduced to S$0.60/30m after 5pm).
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Special Schemes (FPS, Night Cap, Grace Period) */}
          <div className="space-y-3">
            <h3 className="text-sm md:text-base font-semibold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-400" />
              <span>Special Parking Schemes & Privileges</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 space-y-1">
                <div className="font-semibold text-sky-400">Sunday / PH Free Parking</div>
                <p className="text-slate-400">
                  Most HDB carparks outside the Central Area offer <strong>Free Parking</strong> on Sundays and Public Holidays from 7:00 AM to 10:30 PM for non-season ticket holders.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 space-y-1">
                <div className="font-semibold text-indigo-400">Night Parking Cap ($5.00)</div>
                <p className="text-slate-400">
                  Public HDB & URA electronic parking charges are strictly capped at a maximum of <strong>S$5.00</strong> between 10:30 PM and 7:00 AM the next morning.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 space-y-1">
                <div className="font-semibold text-emerald-400">Grace Periods</div>
                <p className="text-slate-400">
                  HDB/URA carparks give a <strong>15-minute</strong> grace period for drop-offs. Most shopping malls and commercial office buildings provide a <strong>10-minute</strong> grace period.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Payment & Electronic Parking (EPS) */}
          <div className="space-y-3">
            <h3 className="text-sm md:text-base font-semibold text-white flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-purple-400" />
              <span>EPS In-Vehicle Units (IU) & Payment Cards</span>
            </h3>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-2">
              <p>
                Almost 100% of Singapore public and commercial carparks operate via <strong>Electronic Parking Systems (EPS)</strong> using the ERP In-Vehicle Unit (IU) or new ERP 2.0 On-Board Unit (OBU).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300 pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>NETS Motoring Card / FlashPay</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>EZ-Link Motoring Card</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Credit Card Automatic Top-Up (EZ-Pay)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>NETS vCashCard (Direct Virtual Debit)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: EV Charging Stations */}
          <div className="space-y-3">
            <h3 className="text-sm md:text-base font-semibold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Singapore Electric Vehicle (EV) Charging</span>
            </h3>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-2">
              <p className="text-slate-300">
                Under the Singapore Green Plan, over 12,000 EV charging points are deployed across Singapore HDB multi-storey carparks, shopping centers, and commercial towers.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-400 pt-1">
                <div>
                  <strong className="text-white block">SP Mobility</strong>
                  <span>Fast DC (50-100kW) & AC points in HDB & Malls</span>
                </div>
                <div>
                  <strong className="text-white block">Charge+</strong>
                  <span>Widely available in commercial & heartland hubs</span>
                </div>
                <div>
                  <strong className="text-white block">Shell Recharge</strong>
                  <span>High power DC charging at major shopping destinations</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
