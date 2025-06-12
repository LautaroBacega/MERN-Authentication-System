"use client"

import { Shield, Code, Mail, Database, Lock, Users } from "lucide-react"

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Acerca del{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Sistema</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Un sistema de autenticación completo y seguro diseñado para aplicaciones web modernas.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200 mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">¿Qué es este sistema?</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Este es un sistema de autenticación full-stack desarrollado con tecnologías modernas que proporciona todas
            las funcionalidades esenciales para la gestión de usuarios en aplicaciones web. Incluye registro, inicio de
            sesión, autenticación con Google, gestión de perfiles y un sistema completo de restablecimiento de
            contraseñas.
          </p>

          <p className="text-slate-600 leading-relaxed">
            El sistema está diseñado con seguridad como prioridad, implementando las mejores prácticas de la industria
            para proteger los datos de los usuarios y prevenir vulnerabilidades comunes.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">Autenticación Segura</h3>
            </div>
            <ul className="space-y-2 text-slate-600">
              <li>• Encriptación de contraseñas con bcrypt</li>
              <li>• Tokens JWT para sesiones seguras</li>
              <li>• Validación de entrada robusta</li>
              <li>• Protección contra ataques CSRF</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">OAuth Integration</h3>
            </div>
            <ul className="space-y-2 text-slate-600">
              <li>• Inicio de sesión con Google</li>
              <li>• Registro automático de usuarios</li>
              <li>• Sincronización de perfiles</li>
              <li>• Experiencia de usuario fluida</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">Sistema de Email</h3>
            </div>
            <ul className="space-y-2 text-slate-600">
              <li>• Integración con Brevo SMTP</li>
              <li>• Templates HTML responsivos</li>
              <li>• Emails de confirmación</li>
              <li>• Notificaciones de seguridad</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Lock className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">Restablecimiento de Contraseñas</h3>
            </div>
            <ul className="space-y-2 text-slate-600">
              <li>• Tokens seguros con expiración</li>
              <li>• Validación de email</li>
              <li>• Confirmación de cambios</li>
              <li>• Invalidación automática</li>
            </ul>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">Stack Tecnológico</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Code className="h-6 w-6" />
                <h3 className="text-xl font-semibold">Frontend</h3>
              </div>
              <ul className="space-y-2 opacity-90">
                <li>• React 18 con Hooks</li>
                <li>• React Router para navegación</li>
                <li>• Tailwind CSS para estilos</li>
                <li>• Lucide React para iconos</li>
                <li>• Context API para estado global</li>
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Database className="h-6 w-6" />
                <h3 className="text-xl font-semibold">Backend</h3>
              </div>
              <ul className="space-y-2 opacity-90">
                <li>• Node.js con Express</li>
                <li>• MongoDB con Mongoose</li>
                <li>• JWT para autenticación</li>
                <li>• Nodemailer + Brevo SMTP</li>
                <li>• bcryptjs para encriptación</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
