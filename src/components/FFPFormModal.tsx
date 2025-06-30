'use client'

import { useState, useEffect } from 'react'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { CreditCard } from '@/types/card'


import { FFP } from '@/types/ffp'



export type Ratio = {
  id?: number
  creditCardId: number
  ratio: number
  ffpId?: number
}

type FFPFormProps = {
  isOpen: boolean
  onClose: () => void
  onSave: (data: FFP) => void
  initialData?: FFP
  creditCards: CreditCard[]
}

export default function FFPFormModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  creditCards
}: FFPFormProps) {
  const [form, setForm] = useState<FFP>({
    id: '0',
    name: '',
    assetName: '',
    enabled: false,
    archived: false,
    createdAt: '',
    updatedAt: '',
    ratios: [],
  })

  const [newRatio, setNewRatio] = useState<{ creditCardId: string; ratio: number }>({
  creditCardId: '',
  ratio: 1,
  })


  useEffect(() => {
    if (initialData) {
      setForm(initialData)
    } else {
      setForm({
        id: 0,
        name: '',
        assetName: '',
        enabled: false,
        archived: false,
        createdAt: '',
        updatedAt: '',
        ratios: [],
      })
    }
  }, [initialData, isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleAddRatio = () => {
    const ratio = Number(newRatio.ratio)
    if (!newRatio.creditCardId || !ratio || ratio < 0.1 || ratio > 5) return
    const newRatios = [
      ...form.ratios,
      {
        ...newRatio,
        creditCardId: Number(newRatio.creditCardId),
        ratio,
        id: Date.now(),
        ffpId: form.id || 0,
      },
    ]
    setForm((prev) => ({ ...prev, ratios: newRatios }))
    setNewRatio({ creditCardId: '', ratio: 1 })
  }

  const handleDeleteRatio = (id: number) => {
    setForm((prev) => ({
      ...prev,
      ratios: prev.ratios.filter((r) => r.id !== id),
    }))
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      const formData = new FormData()
      formData.append('file', file)

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        const data = await res.json()

        if (!res.ok || !data.url) throw new Error('Upload failed')

        setForm((prev) => ({ ...prev, assetName: data.url }))
      } catch (err) {
        console.error(err)
        alert('Image upload failed. Please try again.')
      }
    }


  const handleSubmit = async () => {
    const isEdit = !!form.id
    const method = isEdit ? 'PUT' : 'POST'
    const url = isEdit ? `/api/ffps/${form.id}` : `/api/ffps`

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      const data = await res.json()
      onSave(data)
      onClose()
    } else {
      alert('Error saving FFP')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {initialData ? 'Update FFP' : 'Add FFP'}
        </h2>


        {/* Name input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Logo upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Logo</label>
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded file:text-sm file:bg-gray-50 hover:file:bg-gray-100"
          />
          {form.assetName && (
            <div className="mt-2">
              <img
                src={form.assetName}
                alt="Logo Preview"
                className="h-16 object-contain border rounded shadow"
              />
            </div>
          )}
        </div>


        {/* Checkboxes */}
        <div className="flex gap-4 mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="enabled"
              checked={form.enabled}
              onChange={handleChange}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-sm text-gray-700">Enabled</span>
          </label>

          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="archived"
              checked={form.archived}
              onChange={handleChange}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-sm text-gray-700">Archived</span>
          </label>
        </div>

        {/* Transfer Ratios */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Add Transfer Ratios</label>
          <div className="flex items-center gap-2">
            <select
              name="creditCardId"
              value={newRatio.creditCardId}
              onChange={(e) =>
                setNewRatio({ ...newRatio, creditCardId: e.target.value })
              }
              className="flex-1 border rounded px-3 py-2 focus:outline-none"
            >
              <option value="">Select Credit Card</option>
              {creditCards.map((card) => (
                <option key={card.id} value={card.id.toString()}>
                  {card.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="ratio"
              value={newRatio.ratio}
              onChange={(e) =>
                setNewRatio({ ...newRatio, ratio: parseFloat(e.target.value) })
              }
              className="w-20 border rounded px-2 py-2"
              min="0"
              step="0.1"
            />
            <button
              type="button"
              onClick={handleAddRatio}
              className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
            >
              +
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>

  )
}
