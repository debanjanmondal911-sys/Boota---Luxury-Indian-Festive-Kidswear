import React, { useState } from 'react';
import { X, Check, Save, RotateCcw, Link2, Settings } from 'lucide-react';
import { Product } from '../types';

interface AdminProductSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  returnDays: number;
  onUpdateReturnDays: (days: number) => void;
  allProducts: Product[];
  currentProduct?: Product | null;
  pairedProductMap: { [productId: string]: string[] };
  onUpdatePairedProducts: (productId: string, pairedIds: string[]) => void;
}

export const AdminProductSettingsModal: React.FC<AdminProductSettingsModalProps> = ({
  isOpen,
  onClose,
  returnDays,
  onUpdateReturnDays,
  allProducts,
  currentProduct,
  pairedProductMap,
  onUpdatePairedProducts,
}) => {
  const [activeTab, setActiveTab] = useState<'returns' | 'paired'>('paired');
  const [selectedProductId, setSelectedProductId] = useState<string>(
    currentProduct?.id || allProducts[0]?.id || ''
  );
  const [inputReturnDays, setInputReturnDays] = useState<number>(returnDays);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Active product being edited
  const editingProduct = allProducts.find((p) => p.id === selectedProductId) || allProducts[0];

  // Currently selected paired IDs for this product
  const currentPairedIds =
    pairedProductMap[selectedProductId] ??
    editingProduct?.pairedProductIds ??
    ['kundan-headband', 'kolhapuri-sandals', 'potli-bag'];

  const [tempPairedIds, setTempPairedIds] = useState<string[]>(currentPairedIds);

  // When changing product in dropdown, reset temp paired IDs
  const handleSelectProductChange = (prodId: string) => {
    setSelectedProductId(prodId);
    const prod = allProducts.find((p) => p.id === prodId);
    const ids =
      pairedProductMap[prodId] ??
      prod?.pairedProductIds ??
      ['kundan-headband', 'kolhapuri-sandals', 'potli-bag'];
    setTempPairedIds(ids);
  };

  const handleTogglePairing = (idToToggle: string) => {
    setTempPairedIds((prev) =>
      prev.includes(idToToggle)
        ? prev.filter((id) => id !== idToToggle)
        : [...prev, idToToggle]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateReturnDays(Number(inputReturnDays) || 7);
    onUpdatePairedProducts(selectedProductId, tempPairedIds);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in"
    >
      <div className="bg-white border border-[#E8DADD] rounded-[8px] max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8DADD]">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#F9D0D6] text-[#962949] flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-[20px] text-[#962949]">
                Store Admin Settings
              </h3>
              <p className="text-[12px] text-[#6F6265]">
                Configure Return Window &amp; &apos;Best paired with&apos; cross-sells
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#6F6265] hover:text-[#2B2224] rounded-[4px] cursor-pointer"
            aria-label="Close admin modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 pt-3 border-b border-[#E8DADD]">
          <button
            type="button"
            onClick={() => setActiveTab('paired')}
            className={`pb-2.5 px-3 text-[13px] font-bold uppercase tracking-[0.04em] border-b-2 transition-colors cursor-pointer ${
              activeTab === 'paired'
                ? 'border-[#962949] text-[#962949]'
                : 'border-transparent text-[#6F6265] hover:text-[#2B2224]'
            }`}
          >
            Best Paired With Tagging
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('returns')}
            className={`pb-2.5 px-3 text-[13px] font-bold uppercase tracking-[0.04em] border-b-2 transition-colors cursor-pointer ${
              activeTab === 'returns'
                ? 'border-[#962949] text-[#962949]'
                : 'border-transparent text-[#6F6265] hover:text-[#2B2224]'
            }`}
          >
            Return / Exchange Window
          </button>
        </div>

        {/* Tab Content Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto py-4 space-y-5">
          {activeTab === 'paired' && (
            <div className="space-y-4">
              <div>
                <label className="block text-[13px] font-bold text-[#2B2224] mb-1.5">
                  Select Product to Configure:
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => handleSelectProductChange(e.target.value)}
                  className="w-full bg-[#FAF6F4] border border-[#E8DADD] rounded-[4px] p-2.5 text-[14px] text-[#2B2224] font-medium focus:outline-none focus:border-[#962949]"
                >
                  {allProducts.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.collection}) - ₹{p.price}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <label className="block text-[13px] font-bold text-[#2B2224] mb-1">
                  Tag Products as &quot;Best paired with&quot; {editingProduct?.name}:
                </label>
                <p className="text-[12px] text-[#6F6265] mb-3">
                  Check all accessories or matching outfits that will be showcased on this product&apos;s page.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto p-1 border border-[#E8DADD] rounded-[6px] bg-[#FAF6F4]/40">
                  {allProducts
                    .filter((p) => p.id !== selectedProductId)
                    .map((item) => {
                      const isPaired = tempPairedIds.includes(item.id);

                      return (
                        <div
                          key={item.id}
                          onClick={() => handleTogglePairing(item.id)}
                          className={`p-2.5 rounded-[4px] border flex items-center space-x-3 cursor-pointer transition-all ${
                            isPaired
                              ? 'bg-white border-[#962949] shadow-xs'
                              : 'bg-white/70 border-[#E8DADD] hover:border-[#962949]/40'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isPaired}
                            onChange={() => handleTogglePairing(item.id)}
                            className="w-4 h-4 text-[#962949] accent-[#962949] rounded-[2px]"
                          />
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 object-cover rounded-[3px] border border-[#E8DADD]"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-[13px] font-semibold text-[#2B2224] truncate">
                              {item.name}
                            </div>
                            <div className="text-[11.5px] text-[#6F6265]">
                              ₹{item.price} · {item.category}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'returns' && (
            <div className="space-y-4">
              <div>
                <label className="block text-[13px] font-bold text-[#2B2224] mb-1">
                  Return &amp; Exchange Policy Window (in Days):
                </label>
                <p className="text-[12px] text-[#6F6265] mb-2">
                  This value dynamically updates the badge on all product pages, shipping accordions, and returns policy.
                </p>
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={inputReturnDays}
                    onChange={(e) => setInputReturnDays(Math.max(1, Number(e.target.value)))}
                    className="w-32 bg-[#FAF6F4] border border-[#E8DADD] rounded-[4px] p-2.5 text-[15px] font-bold text-[#962949] text-center focus:outline-none focus:border-[#962949]"
                  />
                  <span className="text-[14px] text-[#2B2224] font-medium">Days from delivery</span>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div>
                <span className="text-[12px] text-[#6F6265] font-semibold uppercase block mb-1.5">
                  Quick Presets:
                </span>
                <div className="flex items-center space-x-2">
                  {[7, 10, 14, 15, 30].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setInputReturnDays(d)}
                      className={`px-3 py-1.5 rounded-[4px] text-[12px] font-bold border transition-colors cursor-pointer ${
                        inputReturnDays === d
                          ? 'bg-[#962949] text-white border-[#962949]'
                          : 'bg-white text-[#2B2224] border-[#E8DADD] hover:border-[#962949]'
                      }`}
                    >
                      {d} Days
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3.5 bg-[#FFFDF9] border border-[#E8DADD] rounded-[6px] text-[13px] text-[#2B2224]">
                <strong>Preview on Product Page:</strong>
                <p className="mt-1 text-[#962949] font-medium flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4" />
                  <span>Easy <strong>{inputReturnDays}-day</strong> return / exchange</span>
                </p>
              </div>
            </div>
          )}

          {/* Modal Footer with Save Button */}
          <div className="pt-4 border-t border-[#E8DADD] flex items-center justify-between">
            {savedSuccess ? (
              <span className="text-[13px] font-bold text-[#962949] flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                Settings saved successfully!
              </span>
            ) : (
              <span className="text-[12px] text-[#6F6265]">
                Changes persist in local store session
              </span>
            )}

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-[#E8DADD] rounded-[4px] text-[13px] font-semibold text-[#2B2224] hover:bg-[#FAF6F4] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#962949] hover:bg-[#7D213C] text-white rounded-[4px] text-[13px] font-bold uppercase tracking-[0.04em] transition-colors flex items-center space-x-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Settings</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
