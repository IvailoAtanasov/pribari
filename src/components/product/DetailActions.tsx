"use client"

import { useState } from 'react'
import { ChevronDown, Info, ShieldAlert, Package, Truck } from 'lucide-react'

export type DetailContent = {
  name: string
  price: string
  priceUnit?: string
  description?: string
  additionalDetails?: string
  dropdownDescription?: string
  dropdownAllergens?: string
  dropdownStorage?: string
  dropdownTransport?: string
  imageUrl: string
}

type DetailActionsProps = {
  dropdownDescription?: string
  dropdownAllergens?: string
  dropdownStorage?: string
  dropdownTransport?: string
}

function AccordionRow({
  title,
  body,
  icon: Icon,
}: {
  title: string
  body?: string
  icon: typeof Info
}) {
  const [open, setOpen] = useState(false)

  if (!body) return null

  return (
    <div className="py-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-left"
        style={{ color: '#500050' }}
      >
        <span className="flex items-center gap-2 text-base font-normal">
          <Icon size={18} />
          {title}
        </span>
        <ChevronDown className={`transition-transform ${open ? 'rotate-180' : ''}`} size={18} />
      </button>
      {open ? (
        <p
          className="mt-2 text-base text-gray-700"
          style={{ fontFamily: 'IdealistSans, sans-serif', backgroundColor: '#f6edf6' }}
        >
          {body}
        </p>
      ) : null}
    </div>
  )
}

export default function DetailActions({
  dropdownDescription,
  dropdownAllergens,
  dropdownStorage,
  dropdownTransport,
}: DetailActionsProps) {
  const [quantity, setQuantity] = useState(1)
  const [date, setDate] = useState('')

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-start gap-2">
        <span className="text-base" style={{ color: '#500050' }}>
          Количество
        </span>
        <div className="flex items-center border border-[#500050] w-2/5" style={{ color: '#500050' }}>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex-1 py-2 text-center hover:bg-[#500050] hover:text-white transition"
          >
            -
          </button>
          <span className="flex-1 py-2 text-center font-semibold">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="flex-1 py-2 text-center hover:bg-[#500050] hover:text-white transition"
          >
            +
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-base" style={{ color: '#500050' }}>
          Избери дата за доставка/взимане
        </label>
        <input
          // 1. If no date is selected, show as text to display the placeholder
          //    If a date is selected, keep it as 'date' so the value is visible
          type={date ? "date" : "text"} 
          
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Изберете дата..." 
          
          // 2. When the user clicks/focuses, turn it into a date picker
          onFocus={(e) => (e.target.type = "date")}
          
          // 3. When they click away, if they didn't pick a date, turn it back to text
          onBlur={(e) => {
            if (!e.target.value) e.target.type = "text";
          }}
          
          lang="bg"
          className="w-full border border-[#500050]/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#500050]/50 placeholder:text-gray-500"
          style={{ borderRadius: 0, minHeight: '42px' }} // Added min-height to prevent jumping
          />
      </div>

      <button
        type="button"
        className="w-full bg-[#500050] text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:-translate-y-0.5 hover:brightness-105 transition"
        style={{ fontFamily: 'IdealistSans, sans-serif' }}
      >
        Добави в количка
      </button>

      <div className="divide-y divide-[#500050]/10">
        <AccordionRow title="Описание" body={dropdownDescription} icon={Info} />
        <AccordionRow title="Алергени и съставки" body={dropdownAllergens} icon={ShieldAlert} />
        <AccordionRow title="Съхранение" body={dropdownStorage} icon={Package} />
        <AccordionRow title="Транспортиране" body={dropdownTransport} icon={Truck} />
      </div>
    </div>
  )
}
