'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft,
  Users,
  Target,
  CheckCircle2,
  Wrench,
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
  Star,
  Sparkles
} from 'lucide-react';
import { getComponentById, componentsData, ComponentData } from '@/lib/data';

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

const subnetLabels: Record<string, string> = {
  workstations: 'Subrețea Workstations',
  dmz: 'Zona DMZ',
  development: 'Development Environment',
  monitoring: 'Subrețea Monitorizare',
  internet: 'Internet Simulat',
  infrastructure: 'Infrastructura Centrală'
};

export default function ComponentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const component = getComponentById(id);

  if (!component) {
    return (
      <main className="min-h-screen bg-gradient-animated flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 text-center max-w-md"
        >
          <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-amber-400" />
          <h1 className="text-2xl font-bold text-white mb-2">Componentă negăsită</h1>
          <p className="text-white/60 mb-6">
            Nu am putut găsi detaliile pentru componenta: {id}
          </p>
          <Link href="/" className="back-button inline-flex">
            <ArrowLeft size={18} />
            Înapoi la Arhitectură
          </Link>
        </motion.div>
      </main>
    );
  }

  const Icon = iconMap[component.icon] || Server;

  // Find related components (same subnet)
  const relatedComponents = componentsData.filter(
    c => c.subnet === component.subnet && c.id !== component.id
  );

  // Count bonus achievements
  const bonusCount = component.achievements.filter(a => a.toLowerCase().includes('bonus')).length;
  const regularCount = component.achievements.length - bonusCount;

  return (
    <main className="min-h-screen bg-gradient-animated">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="back-button">
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Înapoi la Arhitectură</span>
            <span className="sm:hidden">Înapoi</span>
          </Link>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: component.color }}
            />
            <span className="text-sm text-white/60">
              {subnetLabels[component.subnet]}
            </span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-12 pb-8 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex p-5 rounded-2xl mb-6"
              style={{
                backgroundColor: `${component.color}20`,
                boxShadow: `0 0 60px ${component.color}30`
              }}
            >
              <Icon size={48} style={{ color: component.color }} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              {component.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/60 max-w-3xl mx-auto mb-6"
            >
              {component.description}
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <div className="glass-card-light px-4 py-2 flex items-center gap-2">
                <Users size={16} className="text-indigo-400" />
                <span className="text-sm text-white/80">{component.teamMembers.length} membri</span>
              </div>
              <div className="glass-card-light px-4 py-2 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-400" />
                <span className="text-sm text-white/80">{regularCount} realizări</span>
              </div>
              {bonusCount > 0 && (
                <div className="glass-card-light px-4 py-2 flex items-center gap-2">
                  <Star size={16} className="text-amber-400" />
                  <span className="text-sm text-white/80">{bonusCount} bonus</span>
                </div>
              )}
              <div className="glass-card-light px-4 py-2 flex items-center gap-2">
                <Wrench size={16} className="text-cyan-400" />
                <span className="text-sm text-white/80">{component.technologies.length} tehnologii</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Scope Section */}
      <section className="px-4 md:px-8 pb-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${component.color}20` }}>
                <Target className="w-5 h-5" style={{ color: component.color }} />
              </div>
              <h2 className="text-xl font-bold text-white">Scopul Echipei</h2>
            </div>
            <p className="text-white/70 text-lg leading-relaxed">
              {component.scope}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Technologies */}
      <section className="px-4 md:px-8 pb-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-cyan-500/20">
                <Wrench className="w-5 h-5 text-cyan-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Tehnologii Utilizate</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {component.technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.45 + index * 0.03 }}
                  className="px-3 py-1.5 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: `${component.color}15`,
                    color: component.color,
                    border: `1px solid ${component.color}30`
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 md:px-8 pb-12">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-6">
          {/* Team Members */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="glass-card p-6 sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-indigo-500/20">
                  <Users className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Echipa</h2>
                  <p className="text-sm text-white/50">
                    {component.teamMembers.length} membri
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {component.teamMembers.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.55 + index * 0.1 }}
                    className="team-member-card"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{
                          backgroundColor: `${component.color}20`,
                          color: component.color
                        }}
                      >
                        {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-white/90 truncate">
                          {member.name}
                        </p>
                        <p className="text-xs text-white/50">Grupa {member.group}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <Sparkles className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Ce au realizat</h2>
                  <p className="text-sm text-white/50">
                    {component.achievements.length} realizări implementate
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {component.achievements.map((achievement, index) => {
                  const isBonus = achievement.toLowerCase().includes('bonus');
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 + index * 0.03 }}
                      className={`requirement-item flex items-start gap-3 ${
                        isBonus ? 'border-l-amber-500 bg-amber-500/5' : ''
                      }`}
                      style={{
                        borderLeftColor: isBonus ? '#f59e0b' : component.color
                      }}
                    >
                      {isBonus ? (
                        <Star className="w-4 h-4 mt-0.5 text-amber-400 flex-shrink-0" />
                      ) : (
                        <CheckCircle2
                          className="w-4 h-4 mt-0.5 flex-shrink-0"
                          style={{ color: component.color }}
                        />
                      )}
                      <span className={`text-sm ${isBonus ? 'text-amber-200' : 'text-white/70'}`}>
                        {achievement}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Related Components */}
            {relatedComponents.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="glass-card p-6 mt-6"
              >
                <h3 className="text-lg font-bold text-white mb-4">
                  Alte componente din {subnetLabels[component.subnet]}
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {relatedComponents.map((related) => {
                    const RelatedIcon = iconMap[related.icon] || Server;
                    return (
                      <motion.div
                        key={related.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => router.push(`/componente/${related.id}`)}
                        className="arch-component cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="p-2 rounded-lg"
                            style={{ backgroundColor: `${related.color}20` }}
                          >
                            <RelatedIcon size={18} style={{ color: related.color }} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-white/90 truncate">
                              {related.shortTitle}
                            </p>
                            <p className="text-xs text-white/50">
                              {related.teamMembers.length} membri • {related.achievements.length} realizări
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 md:px-8 py-8 border-t border-white/10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-white/40 text-sm">
            Proiect SPRC 2025-2026 • Universitatea Politehnica București
          </p>
        </div>
      </footer>
    </main>
  );
}
