"use client"

import { useUser } from "../hooks/useUser"
import { useRef, useState, useEffect } from "react"
import { Camera, User, Mail, Lock, Trash2, LogOut, CheckCircle, AlertCircle } from "lucide-react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from "../firebase"

export default function Profile() {
  const { currentUser, updateUser, deleteUser, signOut, loading } = useUser()
  const fileRef = useRef(null)
  const [image, setImage] = useState(undefined)
  const [imagePercent, setImagePercent] = useState(0)
  const [imageError, setImageError] = useState(false)
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (image) {
      handleFileUpload(image)
    }
  }, [image])

  const handleFileUpload = async (image) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + image.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, image)
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setImagePercent(Math.round(progress))
      },
      (error) => {
        setImageError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL }),
        )
      },
    )
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setError(null)
      setUpdateSuccess(false)
      await updateUser(currentUser._id, formData)
      setUpdateSuccess(true)
    } catch (error) {
      setError(error.message)
    }
  }

  const handleDeleteAccount = async () => {
    try {
      setError(null)
      await deleteUser(currentUser._id)
    } catch (error) {
      setError(error.message)
    }
  }

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Perfil</h1>
          <p className="text-slate-600">Gestioná la información de tu cuenta y tus preferencias.</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                <input
                  type="file"
                  ref={fileRef}
                  hidden
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <img
                  src={formData.profilePicture || currentUser.profilePicture}
                  alt="profile"
                  className="h-24 w-24 rounded-full object-cover ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all duration-200 cursor-pointer"
                  onClick={() => fileRef.current.click()}
                />
                <div
                  className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                  onClick={() => fileRef.current.click()}
                >
                  <Camera className="h-6 w-6 text-white" />
                </div>
              </div>

              {/* Upload Status */}
              <div className="mt-3 text-center">
                {imageError ? (
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertCircle size={16} />
                    <span className="text-sm">Error cargando imagen (max 2MB)</span>
                  </div>
                ) : imagePercent > 0 && imagePercent < 100 ? (
                  <div className="flex items-center gap-2 text-blue-600">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm">Cargando: {imagePercent}%</span>
                  </div>
                ) : imagePercent === 100 ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle size={16} />
                    <span className="text-sm">Imagen subida correctamente</span>
                  </div>
                ) : (
                  <span className="text-sm text-slate-500">Hacé click para cambiar la foto de perfil.</span>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Username */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <User size={16} />
                  Nombre
                </label>
                <input
                  defaultValue={currentUser.username}
                  type="text"
                  id="username"
                  placeholder="Nombre"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Mail size={16} />
                  Email
                </label>
                <input
                  defaultValue={currentUser.email}
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Lock size={16} />
                  Contraseña Nueva
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Dejá en blanco para mantener la contraseña actual."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Update Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
            >
              {loading ? "Actualizando..." : "Actualizar Perfil"}
            </button>
          </form>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-slate-200">
            <button
              onClick={handleSignOut}
              className="flex items-center justify-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors duration-200"
            >
              <LogOut size={16} />
              Cerrar Sesión
            </button>

            <button
              onClick={handleDeleteAccount}
              className="flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <Trash2 size={16} />
              Eliminar Cuenta
            </button>
          </div>

          {/* Status Messages */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm text-center">{error}</p>
            </div>
          )}

          {updateSuccess && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm text-center flex items-center justify-center gap-2">
                <CheckCircle size={16} />
                Perfil actualizado correctamente!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
