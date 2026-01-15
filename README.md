# 🤖 AI Assistant System

Aplicación web construida con **Next.js + Zustand + TailwindCSS** que permite **crear, editar, eliminar, entrenar y simular asistentes conversacionales**, incluyendo reglas personalizadas y un chat de prueba en tiempo real.

---

## 🚀 Características principales

- 🧠 **Gestión de asistentes**
  - Crear, editar y eliminar asistentes
  - Configuración de idioma, tono y longitud de respuestas
  - Asistentes predefinidos por defecto

- 📚 **Entrenamiento por reglas**
  - Definición de instrucciones personalizadas
  - Guardado por asistente

- 💬 **Chat simulado**
  - Conversación independiente por asistente
  - Indicador de escritura
  - Scroll inteligente solo al enviar mensajes
  - Reinicio de conversación

- 🧩 **Arquitectura limpia**
  - Estado global con Zustand
  - Componentes reutilizables
  - Separación clara de lógica y UI

- 📱 **Responsive**
  - Optimizado para desktop y mobile

---

## 🛠️ Tecnologías usadas

- ⚡ **Next.js (App Router)**
- 🧠 **Zustand** (State Management)
- 🎨 **Tailwind CSS**
- 🧩 **TypeScript**
- 🔔 **@pheralb/toast**
- 🎯 **Lucide Icons**

---

## 📦 Requisitos

Asegúrate de tener instalado:

- **Node.js** ≥ 18
- **npm** o **pnpm** o **yarn**

---

## ▶️ Cómo correr el proyecto

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/SamuelCB13/AIAssistantSystem.git
```

### 2️⃣ Instalar dependencias
```bash
npm install
```

### 3️⃣ Ejecutar en desarrollo
```bash
npm run dev
```

El proyecto estará disponible en:

👉 http://localhost:3000

## 🧠 Decisiones técnicas
Tailwind CSS

Se utilizó Tailwind por:
- **Velocidad de desarrollo**
- **Consistencia visual**
- **Fácil adaptación responsive**

## ✨ Características implementadas
- **CRUD completo de asistentes**
- **Asistentes predefinidos**
- **Entrenamiento mediante reglas/instrucciones**
- **Guardado de regla por asistente**
- **Chat simulado por asistente**
- **Indicador de escritura del asistente**
- **Modal paso a paso para creación/edición**
- **Validaciones de formulario**
- **UI responsive (desktop y mobile)**

## ⏱️ Priorización y alcances
Qué se dejó fuera (intencionalmente)

- **React Query**
- **TanStack Query**
- **React Hook Form**

Qué se priorizó:

- **Diseño inicial**
- **Modal de creación y edición**
- **Crud completo de asistentes**
- **Sección de entrenamiento de asistentes**
- **Chat simulado**
- **Complemento de diseño**
- **UI responsive (desktop y mobile)**

## ⏳ Tiempo aproximado de dedicación
- **Diseño inicial y arquitectura: 3h**
- **Implementación de store y lógica: 3h**
- **UI, modales y responsive: 4h**
- **Chat simulado y UX refinements: 2h**
- **Refactorización y limpieza: 1h**
- **Creación del repositorio y archivo README: 1h**
- **👉 Total aproximado: 14 horas**
