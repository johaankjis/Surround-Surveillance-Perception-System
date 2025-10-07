# Surround Surveillance Perception System

A real-time vehicle perimeter threat detection and surveillance system built with Next.js 15, React 19, and TypeScript. This application provides comprehensive monitoring capabilities with multi-camera feeds, object detection, tracking, and intelligent alert management.

## 🎯 Overview

The Surround Surveillance Perception System is a modern web-based surveillance application designed for vehicle perimeter security. It simulates a real-time monitoring system with four-camera surround view, object detection, tracking, and threat assessment capabilities.

## ✨ Features

### Core Functionality

- **🎥 Multi-Camera Live Feed**: Four-camera surround view (Front, Rear, Left, Right) with real-time feeds
- **🎯 Object Detection**: Real-time detection of multiple object classes (person, car, bicycle, motorcycle, dog, cat)
- **📍 Object Tracking**: Persistent tracking of detected objects across frames with unique track IDs
- **🚨 Alert System**: Intelligent alert generation based on detection zones and object behavior
- **📊 System Metrics**: Real-time performance monitoring (FPS, latency, GPU utilization)
- **🗺️ Zone Management**: Configurable detection zones with custom alert triggers
- **📈 Analytics Dashboard**: Visual representation of system performance and detection statistics

### User Interface

- **Dark Theme**: Professional dark interface optimized for surveillance monitoring
- **Responsive Design**: Fully responsive layout that works on desktop and mobile devices
- **Real-time Updates**: Live data streaming with automatic refresh
- **Interactive Controls**: Start/stop system, configure zones, manage alerts
- **Status Indicators**: Visual system status and connection indicators

## 🛠️ Technology Stack

### Frontend Framework
- **Next.js 15.2.4**: React framework with App Router
- **React 19**: Latest React with modern hooks and concurrent features
- **TypeScript 5**: Type-safe development

### UI Components
- **Tailwind CSS 4.1.9**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon library
- **Recharts**: Charting library for analytics
- **Vaul**: Drawer component for mobile interactions

### State Management & Data
- **React Hooks**: useState, useEffect, useCallback for state management
- **Custom Hooks**: useDetectionEngine for detection engine logic
- **Mock Data Generation**: Simulated detection and tracking data

### Development Tools
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing
- **ESLint**: Code linting
- **pnpm**: Fast, disk space efficient package manager

## 📁 Project Structure

```
Surround-Surveillance-Perception-System/
├── app/                          # Next.js App Router pages
│   ├── alerts/                   # Alert management page
│   │   └── page.tsx
│   ├── zones/                    # Zone configuration page
│   │   └── page.tsx
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Home page (Live Feed)
│   └── globals.css               # Global styles
│
├── components/                   # React components
│   ├── ui/                       # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── switch.tsx
│   │   └── ... (50+ components)
│   ├── alert-card.tsx            # Alert display card
│   ├── alert-stats.tsx           # Alert statistics component
│   ├── camera-feed.tsx           # Camera feed display
│   ├── metric-card.tsx           # System metric card
│   ├── sidebar-nav.tsx           # Navigation sidebar
│   ├── status-badge.tsx          # Status indicator badge
│   ├── system-status.tsx         # System status dashboard
│   ├── tracked-objects-list.tsx  # Object tracking list
│   └── zone-editor.tsx           # Zone configuration editor
│
├── lib/                          # Core logic and utilities
│   ├── detection-engine.ts       # Detection engine hook
│   ├── mock-data.ts              # Mock data generators
│   └── utils.ts                  # Utility functions
│
├── hooks/                        # Custom React hooks
│   ├── use-mobile.ts             # Mobile detection hook
│   └── use-toast.ts              # Toast notification hook
│
├── public/                       # Static assets
├── styles/                       # Additional styles
├── components.json               # Component configuration
├── next.config.mjs               # Next.js configuration
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
└── postcss.config.mjs            # PostCSS configuration
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 18.x or higher
- **pnpm**: Version 8.x or higher (recommended) or npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/johaankjis/Surround-Surveillance-Perception-System.git
   cd Surround-Surveillance-Perception-System
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```
   or
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```
   or
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
pnpm build
pnpm start
```

## 📖 Usage Guide

### Navigation

The application has a sidebar navigation with the following sections:

1. **Live Feed** (`/`): Main dashboard with four-camera surround view
2. **Alerts** (`/alerts`): Alert management and filtering
3. **Analytics** (`/analytics`): System analytics and statistics (coming soon)
4. **Zones** (`/zones`): Configure detection zones
5. **System** (`/system`): System information (coming soon)
6. **Settings** (`/settings`): Application settings (coming soon)

### Live Feed Page

- **Start/Stop System**: Toggle the detection engine on/off
- **Camera Feeds**: View all four camera feeds simultaneously
- **System Metrics**: Monitor FPS, latency, GPU usage, and active tracks
- **Active Tracks**: See currently tracked objects with details

### Alerts Page

- **Filter Alerts**: Filter by severity (Critical, High, Medium, Low)
- **Alert Statistics**: View alert distribution by severity
- **Acknowledge/Clear**: Manage individual alerts
- **Export**: Export alert data (UI ready, implementation pending)

### Zones Page

- **Add Zones**: Create new detection zones
- **Configure Zones**: Set zone name, camera, and coordinates
- **Enable/Disable**: Toggle zones on/off
- **Alert Settings**: Configure alert triggers for each zone

## 🏗️ Architecture

### Detection Engine

The detection engine (`lib/detection-engine.ts`) is the core of the application:

```typescript
const { detections, trackedObjects, alerts, metrics, isRunning, toggleEngine } = useDetectionEngine()
```

**Features:**
- Simulates real-time object detection at ~10 FPS
- Generates tracked objects with unique IDs
- Automatically creates alerts based on object behavior
- Provides system performance metrics

### Data Types

**Detection**: Individual object detection in a single frame
```typescript
interface Detection {
  id: string
  class: ObjectClass
  confidence: number
  bbox: { x: number; y: number; width: number; height: number }
  camera: CameraView
  timestamp: number
}
```

**TrackedObject**: Persistent object across multiple frames
```typescript
interface TrackedObject {
  trackId: number
  class: ObjectClass
  camera: CameraView
  firstSeen: number
  lastSeen: number
  detectionCount: number
  avgConfidence: number
  velocity: number
  inZone: boolean
}
```

**Alert**: Security alert generated by the system
```typescript
interface Alert {
  id: string
  type: 'zone_intrusion' | 'loitering' | 'rapid_approach' | 'multiple_objects'
  severity: ThreatLevel
  camera: CameraView
  trackId: number
  objectClass: ObjectClass
  timestamp: number
  message: string
  acknowledged?: boolean
}
```

**SystemMetrics**: Real-time system performance
```typescript
interface SystemMetrics {
  fps: number
  latency: number
  gpuUtilization: number
  detectionCount: number
  trackingCount: number
  alertCount: number
}
```

### Component Architecture

The application follows a modular component architecture:

1. **Page Components**: Top-level route components (in `app/`)
2. **Feature Components**: Business logic components (in `components/`)
3. **UI Components**: Reusable primitives (in `components/ui/`)
4. **Custom Hooks**: Shared logic (in `hooks/` and `lib/`)

## 🎨 Styling

The application uses a consistent design system:

- **Color Palette**: Dark theme with zinc grays and accent colors
- **Typography**: Inter font family with consistent sizing
- **Spacing**: Tailwind's spacing scale
- **Components**: Radix UI with custom styling
- **Animations**: Tailwind CSS animations and transitions

### Severity Colors

- **Critical**: Red (#ef4444)
- **High**: Orange (#f97316)
- **Medium**: Yellow (#eab308)
- **Low**: Blue (#3b82f6)

## 🔧 Configuration

### Next.js Configuration

The `next.config.mjs` file includes:
- ESLint bypass during builds
- TypeScript error suppression
- Unoptimized images for development

### TypeScript Configuration

The `tsconfig.json` includes strict type checking with:
- Path aliases (`@/*` → project root)
- Modern ES features
- React JSX support

## 🧪 Development

### Code Style

- **TypeScript**: Use interfaces for object types
- **React**: Functional components with hooks
- **CSS**: Tailwind utility classes
- **Naming**: PascalCase for components, camelCase for functions

### Adding New Features

1. Create component in appropriate directory
2. Add types to `lib/mock-data.ts` if needed
3. Update detection engine in `lib/detection-engine.ts`
4. Add navigation item to `components/sidebar-nav.tsx`
5. Create page in `app/` directory

### Mock Data

The `lib/mock-data.ts` file provides data generators:
- `generateDetection()`: Random detections
- `generateTrackedObjects()`: Tracked object list
- `generateAlert()`: Alert generation
- `generateMetrics()`: System metrics

## 📊 System Requirements

### Minimum Requirements
- Node.js 18.x
- 2GB RAM
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Recommended
- Node.js 20.x
- 4GB RAM
- Chrome/Edge for best performance

## 🚧 Future Enhancements

### Planned Features
- [ ] Real camera integration (RTSP/WebRTC)
- [ ] Actual AI/ML model integration (YOLO, TensorFlow)
- [ ] Analytics dashboard with historical data
- [ ] User authentication and authorization
- [ ] Multi-user support with roles
- [ ] Database integration for persistent storage
- [ ] Settings page for system configuration
- [ ] Export functionality for alerts and analytics
- [ ] Mobile application
- [ ] Email/SMS notifications
- [ ] Advanced zone types (tripwires, counting lines)
- [ ] Object classification refinement
- [ ] Heatmap visualization
- [ ] Timeline playback
- [ ] Integration with physical security systems

### Technical Improvements
- [ ] WebSocket for real-time updates
- [ ] Service workers for offline support
- [ ] Performance optimization
- [ ] Unit and integration tests
- [ ] E2E testing with Playwright/Cypress
- [ ] CI/CD pipeline
- [ ] Docker containerization
- [ ] Kubernetes deployment
- [ ] API documentation (OpenAPI/Swagger)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Add TypeScript types for all new code
- Update documentation for new features
- Test your changes thoroughly
- Keep commits focused and descriptive

## 📝 License

This project is available for educational and demonstration purposes.

## 👥 Authors

- **johaankjis** - Initial work - [GitHub](https://github.com/johaankjis)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Generated with [v0.app](https://v0.dev/)

## 📞 Support

For questions, issues, or suggestions:
- Open an issue on [GitHub Issues](https://github.com/johaankjis/Surround-Surveillance-Perception-System/issues)
- Contact the maintainer through GitHub

## 🔐 Security

This is a demonstration application using mock data. For production use:
- Implement proper authentication and authorization
- Use HTTPS for all communications
- Secure API endpoints
- Implement rate limiting
- Follow security best practices for video streaming
- Regular security audits

## 📱 Browser Support

- Chrome/Edge (recommended): Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Responsive design supported

---

**Note**: This is currently a demonstration/prototype application using simulated data. The detection engine generates mock detections for visualization purposes. For production deployment, integration with actual camera feeds and AI/ML detection models would be required.
