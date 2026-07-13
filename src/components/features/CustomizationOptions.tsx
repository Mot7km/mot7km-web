'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Product, computeTotalPrice } from '@/data/menu';

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
    const labels = option.choices.map(c => c.label.toLowerCase());
    return labels.includes('yes') && labels.includes('no');
  };

  const hasExtras = extraTotal > 0;

  return (
    <div>
      {/* Header: title + extra cost (if any) */}
      <div className="flex items-center justify-between">
        <h3 className="font-montserrat font-semibold text-xl leading-7 text-[var(--color-text-primary)]">
          {t('customization.title')}
        </h3>
        {hasExtras && (
          <span className="text-sm font-medium text-[var(--color-primary)]">
            + ${extraTotal.toFixed(2)}
          </span>
        )}
      </div>

      <div className="space-y-3 mt-4">
        {product.customizationOptions.map((option) => {
          const isYesNo = isYesNoOption(option);
          const currentSelection = selections[option.name];

          if (isYesNo) {
            const isChecked = currentSelection === 'Yes';
            const yesChoice = option.choices.find(c => c.label.toLowerCase() === 'yes');
            const extraPrice = yesChoice ? yesChoice.extraPrice : 0;

            return (
              <label
                key={option.name}
                className="flex items-center justify-between bg-[var(--color-surface)] border border-[var(--color-border-strong)] rounded-xl px-4 py-3 cursor-pointer"
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
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {
                      const newChoice = isChecked ? 'No' : 'Yes';
                      handleSelect(option.name, newChoice);
                    }}
                    className="w-5 h-5 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)] focus:ring-2 focus:ring-offset-2 transition"
                  />
                </div>
              </label>
            );
          }

          // Multi‑choice – pills inside a bordered box
          return (
            <div
              key={option.name}
              className="bg-[var(--color-surface)] border border-[var(--color-border-strong)] rounded-xl px-4 py-3 space-y-1"
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