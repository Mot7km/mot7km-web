'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Product, computeTotalPrice } from '@/data/menu';
import { Settings } from 'lucide-react';

interface CustomizationOptionsProps {
  product: Product;
  onPriceChange?: (total: string, extras: number) => void;
}

export function CustomizationOptions({ product, onPriceChange }: CustomizationOptionsProps) {
  const t = useTranslations();

  const getDefaultSelections = (): Record<string, string> => {
    const defaults: Record<string, string> = {};
    if (product.customizationOptions) {
      for (const opt of product.customizationOptions) {
        if (opt.defaultChoice) {
          defaults[opt.name] = opt.defaultChoice;
        } else if (opt.choices.length > 0) {
          defaults[opt.name] = opt.choices[0].label;
        }
      }
    }
    return defaults;
  };

  const [selections, setSelections] = useState<Record<string, string>>(getDefaultSelections);
  const [extraTotal, setExtraTotal] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<string>(computeTotalPrice(product, selections));

  const updateTotals = (newSelections: Record<string, string>) => {
    let extras = 0;
    if (product.customizationOptions) {
      for (const opt of product.customizationOptions) {
        const chosen = newSelections[opt.name];
        if (chosen) {
          const found = opt.choices.find((c) => c.label === chosen);
          if (found) extras += found.extraPrice;
        }
      }
    }
    setExtraTotal(extras);
    const total = computeTotalPrice(product, newSelections);
    setTotalPrice(total);
    if (onPriceChange) onPriceChange(total, extras);
  };

  const handleSelect = (optionName: string, choiceLabel: string) => {
    const newSelections = { ...selections, [optionName]: choiceLabel };
    setSelections(newSelections);
    updateTotals(newSelections);
  };

  useEffect(() => {
    const defaults = getDefaultSelections();
    setSelections(defaults);
    updateTotals(defaults);
  }, [product]);

  if (!product.customizationOptions || product.customizationOptions.length === 0) {
    return null;
  }

  const isYesNoOption = (option: typeof product.customizationOptions[0]) => {
    if (option.choices.length !== 2) return false;
    const labels = option.choices.map(c => c.label.trim().toLowerCase());
    return labels.includes('yes') && labels.includes('no');
  };

  const hasExtras = extraTotal > 0;

  return (
    <div className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)] bg-[var(--color-card-light)] dark:bg-[var(--color-card-dark)]">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-[var(--color-text-muted)]" />
          <h3 className="font-montserrat font-semibold text-lg leading-6 text-[var(--color-text-primary)]">
            {t('customization.title')}
          </h3>
        </div>
        {hasExtras && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--color-primary)]/10 text-sm font-medium text-[var(--color-primary)] border border-[var(--color-primary)]/20">
            +${extraTotal.toFixed(2)}
          </span>
        )}
      </div>

      {/* Options */}
      <div className="p-5 space-y-4">
        {product.customizationOptions.map((option) => {
          const isYesNo = isYesNoOption(option);
          const currentSelection = selections[option.name];

          if (isYesNo) {
            const yesChoice = option.choices.find(c => c.label.trim().toLowerCase() === 'yes')!;
            const noChoice = option.choices.find(c => c.label.trim().toLowerCase() === 'no')!;
            const isChecked = currentSelection?.trim().toLowerCase() === 'yes';
            const extraPrice = isChecked ? yesChoice.extraPrice : 0;

            const toggleYesNo = () => {
              const newLabel = isChecked ? noChoice.label : yesChoice.label;
              handleSelect(option.name, newLabel);
            };

            return (
              <label
                key={option.name}
                className="flex items-center justify-between bg-[var(--color-card-light)] dark:bg-[var(--color-card-dark)] rounded-xl px-4 py-3 transition-colors hover:bg-[var(--color-border)]/30 cursor-pointer"
                onClick={toggleYesNo}
              >
                <span className="text-sm font-medium text-[var(--color-text-primary)]">
                  {option.name}
                </span>
                <div className="flex items-center gap-3">
                  {extraPrice > 0 && isChecked && (
                    <span className="text-xs font-medium text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-0.5 rounded-full">
                      +${extraPrice.toFixed(2)}
                    </span>
                  )}
                  {/* Styled Checkbox */}
                  <div className="relative flex items-center justify-center w-6 h-6">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}} // handled by label onClick
                      className="w-5 h-5 rounded border-2 border-[var(--color-border)] 
                        checked:border-[var(--color-primary)] 
                        checked:bg-[var(--color-primary)]
                        focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:ring-offset-2
                        transition-all duration-200
                        cursor-pointer
                        [appearance:none] relative
                        checked:after:content-['✓'] checked:after:text-white checked:after:absolute 
                        checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2
                        checked:after:text-sm checked:after:font-bold
                      "
                    />
                  </div>
                </div>
              </label>
            );
          }

          // Multi‑choice – pills inside a bordered box
          return (
            <div
              key={option.name}
              className="bg-[var(--color-card-light)] dark:bg-[var(--color-card-dark)] rounded-xl px-4 py-3 space-y-1"
            >
              <span className="text-sm font-medium text-[var(--color-text-primary)]">
                {option.name}
              </span>
              <div className="flex flex-wrap gap-2 mt-1">
                {option.choices.map((choice) => {
                  const isSelected = selections[option.name] === choice.label;
                  return (
                    <button
                      key={choice.label}
                      onClick={() => handleSelect(option.name, choice.label)}
                      className={`
                        text-sm px-3 py-1 rounded-full border transition-all duration-200
                        hover:scale-105 active:scale-95 cursor-pointer
                        ${isSelected
                          ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-text-on-primary)] shadow-md shadow-[var(--color-primary)]/20'
                          : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-text-primary)]'
                        }
                      `}
                    >
                      {choice.label}
                      {choice.extraPrice > 0 && (
                        <span className="ml-1 text-xs opacity-80">
                          (+${choice.extraPrice.toFixed(2)})
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}