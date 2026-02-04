'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Router,
  Monitor,
  Globe,
  Server,
  Shield,
  Layers,
  Activity,
  Database,
  AlertTriangle,
  Wifi,
  Network
} from 'lucide-react';
import { componentsData, ComponentData } from '@/lib/data';

const iconMap: Record<string, React.ElementType> = {
  router: Router,
  monitor: Monitor,
  globe: Globe,
  server: Server,
  shield: Shield,
  layers: Layers,
  activity: Activity,
  database: Database,
  alertTriangle: AlertTriangle,
  wifi: Wifi,
};

interface ComponentCardProps {
  component: ComponentData;
  index: number;
}

const ComponentCard = ({ component, index }: ComponentCardProps) => {
  const router = useRouter();
  const Icon = iconMap[component.icon] || Server;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => router.push(`/componente/${component.id}`)}
      className="arch-component cursor-pointer group"
      style={{
        '--component-color': component.color,
        borderColor: `${component.color}30`
      } as React.CSSProperties}
    >
      <div className="flex items-center gap-3">
        <div
          className="p-2 rounded-lg transition-all duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${component.color}20` }}
        >
          <Icon
            size={20}
            style={{ color: component.color }}
            className="transition-all duration-300"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-white/90 truncate">
            {component.shortTitle}
          </h3>
          <p className="text-xs text-white/50 truncate">
            {component.teamMembers.length} membri
          </p>
        </div>
        <motion.div
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ x: -5 }}
          whileHover={{ x: 0 }}
        >
          <svg
            className="w-4 h-4 text-white/50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};

interface SubnetZoneProps {
  title: string;
  subtitle: string;
  color: string;
  components: ComponentData[];
  gridArea: string;
  delay?: number;
}

const SubnetZone = ({ title, subtitle, color, components, gridArea, delay = 0 }: SubnetZoneProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="subnet-zone p-4 md:p-5"
      style={{
        gridArea,
        borderColor: `${color}30`,
        background: `linear-gradient(135deg, ${color}08 0%, transparent 100%)`
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-3 h-3 rounded-full animate-pulse"
          style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
        />
        <div>
          <h2 className="text-base md:text-lg font-bold text-white/90">{title}</h2>
          <p className="text-xs text-white/50">{subtitle}</p>
        </div>
      </div>
      <div className="space-y-2">
        {components.map((comp, idx) => (
          <ComponentCard key={comp.id} component={comp} index={idx} />
        ))}
      </div>
    </motion.div>
  );
};

const CentralRouter = () => {
  const router = useRouter();
  const infraComponent = componentsData.find(c => c.id === 'infrastructura');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
      className="flex flex-col items-center justify-center"
      style={{ gridArea: 'router' }}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push('/componente/infrastructura')}
        className="router-central cursor-pointer relative"
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}
          animate={{
            boxShadow: [
              '0 0 30px rgba(99, 102, 241, 0.4)',
              '0 0 60px rgba(99, 102, 241, 0.6)',
              '0 0 30px rgba(99, 102, 241, 0.4)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <Router size={32} className="text-white relative z-10" />
      </motion.div>
      <motion.div
        className="mt-3 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-sm font-semibold text-white/90">Router / Firewall</p>
        <p className="text-xs text-white/50">OpnSense / VYOS</p>
      </motion.div>

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ gridArea: 'router' }}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(99, 102, 241, 0.5)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0.5)" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

const ArchitectureDiagram = () => {
  const workstations = componentsData.filter(c => c.subnet === 'workstations');
  const dmz = componentsData.filter(c => c.subnet === 'dmz');
  const development = componentsData.filter(c => c.subnet === 'development');
  const monitoring = componentsData.filter(c => c.subnet === 'monitoring');
  const internet = componentsData.filter(c => c.subnet === 'internet');

  return (
    <div className="w-full">
      {/* Desktop Layout */}
      <div
        className="hidden lg:grid gap-4 p-4 relative"
        style={{
          gridTemplateColumns: '1fr 1fr 120px 1fr 1fr',
          gridTemplateRows: 'auto auto auto',
          gridTemplateAreas: `
            "workstations workstations router dmz dmz"
            "development development router monitoring monitoring"
            "internet internet router monitoring monitoring"
          `
        }}
      >
        <SubnetZone
          title="Workstations"
          subtitle="Active Directory & Domain Controller"
          color="#3b82f6"
          components={workstations}
          gridArea="workstations"
          delay={0.1}
        />

        <SubnetZone
          title="DMZ"
          subtitle="Servicii Expuse Internet"
          color="#f59e0b"
          components={dmz}
          gridArea="dmz"
          delay={0.2}
        />

        <CentralRouter />

        <SubnetZone
          title="Development Environment"
          subtitle="Servicii Interne"
          color="#06b6d4"
          components={development}
          gridArea="development"
          delay={0.3}
        />

        <SubnetZone
          title="Monitoring"
          subtitle="Securitate & Monitorizare"
          color="#ec4899"
          components={monitoring}
          gridArea="monitoring"
          delay={0.4}
        />

        <SubnetZone
          title="Internet Simulat"
          subtitle="Testare & Validare"
          color="#14b8a6"
          components={internet}
          gridArea="internet"
          delay={0.5}
        />

        {/* Animated connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          <defs>
            <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(99, 102, 241, 0.3)" />
              <stop offset="50%" stopColor="rgba(139, 92, 246, 0.5)" />
              <stop offset="100%" stopColor="rgba(99, 102, 241, 0.3)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden space-y-4 p-4">
        {/* Router Card for Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4 flex items-center justify-center gap-4"
        >
          <div className="router-central p-3">
            <Router size={24} className="text-white" />
          </div>
          <div>
            <h2 className="font-bold text-white/90">Router Central</h2>
            <p className="text-sm text-white/50">OpnSense / VYOS - Infrastructura</p>
          </div>
        </motion.div>

        <SubnetZone
          title="Workstations"
          subtitle="Active Directory & Domain Controller"
          color="#3b82f6"
          components={workstations}
          gridArea=""
          delay={0.1}
        />

        <SubnetZone
          title="DMZ"
          subtitle="Servicii Expuse Internet"
          color="#f59e0b"
          components={dmz}
          gridArea=""
          delay={0.2}
        />

        <SubnetZone
          title="Development Environment"
          subtitle="Servicii Interne"
          color="#06b6d4"
          components={development}
          gridArea=""
          delay={0.3}
        />

        <SubnetZone
          title="Monitoring"
          subtitle="Securitate & Monitorizare"
          color="#ec4899"
          components={monitoring}
          gridArea=""
          delay={0.4}
        />

        <SubnetZone
          title="Internet Simulat"
          subtitle="Testare & Validare"
          color="#14b8a6"
          components={internet}
          gridArea=""
          delay={0.5}
        />
      </div>
    </div>
  );
};

export default ArchitectureDiagram;
