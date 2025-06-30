'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import FFPFormModal from '../components/FFPFormModal'
import { CreditCard } from '@/types/card'
import { FFP } from '@/types/ffp'

export default function FFPListPage() {
  const [ffps, setFfps] = useState<FFP[]>([])
  const [creditCards, setCreditCards] = useState<CreditCard[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedFFP, setSelectedFFP] = useState<FFP | undefined>()
  const [authChecked, setAuthChecked] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/me')
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized')
        return res.json()
      })
      .then(() => setAuthChecked(true))
      .catch(() => router.replace('/login'))
  }, [])

  const fetchFfps = async () => {
    const res = await fetch('/api/ffps')
    const data = await res.json()
    setFfps(data)
  }

  useEffect(() => {
    if (!authChecked) return
    fetchFfps()
    fetch('/api/cards').then(res => res.json()).then(setCreditCards)
  }, [authChecked])

  const handleToggle = async (id: number) => {
    const res = await fetch(`/api/ffps/${id}/toggle`, { method: 'PUT' })
    if (res.ok) {
      const updated = await res.json()
      setFfps(prev => prev.map(ffp => (ffp.id === id ? updated : ffp)))
    }
  }

  const handleSave = async () => {
    await fetchFfps()
    setIsModalOpen(false)
    setSelectedFFP(undefined)
  }

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm('Are you sure you want to delete this FFP?')
    if (!confirmDelete) return

    const res = await fetch(`/api/ffps/${id}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      await fetchFfps()
    } else {
      alert('Failed to delete FFP')
    }
  }

  const handleLogout = async () => {
    await fetch('/api/logout')
    router.push('/login')
  }

  if (!authChecked) return null

  return (
    <div className="p-6 min-h-screen bg-white text-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Frequent Flyer Programs</h1>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setSelectedFFP(undefined)
              setIsModalOpen(true)
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Add New Program
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="overflow-x-auto shadow border border-gray-300 rounded">
        <table className="min-w-full table-fixed">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="w-16 p-3 border">FFP ID</th>
              <th className="w-64 p-3 border">Name</th>
              <th className="w-64 p-3 border">Logo</th>
              <th className="w-32 p-3 border">Enabled</th>
              <th className="w-64 p-3 border">Created / Modified</th>
              <th className="w-40 p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ffps.map((ffp) => (
              <tr key={ffp.id} className="hover:bg-gray-50">
                <td className="p-3 border">{ffp.id}</td>
                <td className="p-3 border">{ffp.name}</td>
                <td className="p-3 border">
                  <img
                      src={ffp.assetName}
                      alt={ffp.name}
                      className="h-6 w-auto object-contain"
                  />

                </td>
                <td className="p-3 border">
                  <button
                    onClick={() => handleToggle(ffp.id)}
                    className={`inline-block px-3 py-1 text-xs font-medium rounded cursor-pointer transition ${
                      ffp.enabled
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                    }`}
                  >
                    {ffp.enabled ? 'Enabled' : 'Disabled'}
                  </button>
                </td>
                <td className="p-3 border">
                  <div>{new Date(ffp.createdAt).toLocaleString()}</div>
                  <div className="text-xs text-gray-500">
                    Updated: {new Date(ffp.updatedAt).toLocaleString()}
                  </div>
                </td>
                <td className="p-3 border space-x-3">
                  <button
                    onClick={() => {
                      setSelectedFFP(ffp)
                      setIsModalOpen(true)
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(ffp.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <FFPFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedFFP(undefined)
        }}
        onSave={handleSave}
        initialData={selectedFFP}
        creditCards={creditCards}
      />
    </div>
  )
}

