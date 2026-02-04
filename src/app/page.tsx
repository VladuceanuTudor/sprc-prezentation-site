'use client';

import { motion } from 'framer-motion';
import { Network, Users, Shield, Server } from 'lucide-react';
import ArchitectureDiagram from '@/components/ArchitectureDiagram';
import { componentsData } from '@/lib/data';

const stats = [
  { icon: Network, label: 'Subrețele', value: '5' },
  { icon: Users, label: 'Membri Echipă', value: '32' },
  { icon: Shield, label: 'Componente', value: '10' },
  { icon: Server, label: 'VM-uri', value: '20+' },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-animated">
      {/* Hero Section */}
      <section className="relative pt-12 pb-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-light mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-white/70">Proiect SPRC 2025-2026</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
              <span className="text-white">Infrastructura </span>
              <span className="text-gradient">sprc.mta</span>
            </h1>

            <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto">
              Platformă completă de rețea organizațională care permite angajaților
              să lucreze atât de la birou cât și de acasă, cu servicii de monitorizare,
              securitate și colaborare.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="glass-card-light p-4 text-center"
              >
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-indigo-400" />
                <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-white/50">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="relative px-4 md:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="glass-card p-2 md:p-4"
          >
            <div className="flex items-center justify-between mb-4 px-4 pt-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white/90">
                  Arhitectura Infrastructurii
                </h2>
                <p className="text-sm text-white/50">
                  Click pe orice componentă pentru detalii
                </p>
              </div>
              <div className="hidden md:flex items-center gap-4 text-sm text-white/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span>Workstations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <span>DMZ</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-500" />
                  <span>Development</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-pink-500" />
                  <span>Monitoring</span>
                </div>
              </div>
            </div>

            <ArchitectureDiagram />
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <section className="relative px-4 md:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-bold text-white/90 mb-4">Despre Proiect</h3>
              <p className="text-white/60 mb-4">
                Scopul proiectului este de a crea o infrastructură de rețea completă pentru
                organizația sprc.mta. Aceasta include:
              </p>
              <ul className="space-y-2 text-white/60">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-1">•</span>
                  <span>Rețea de stații de lucru cu Active Directory</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-1">•</span>
                  <span>Zonă DMZ cu servicii expuse pe internet</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-1">•</span>
                  <span>Mediu de dezvoltare cu servicii interne</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-1">•</span>
                  <span>Sistem complet de monitorizare și securitate</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-bold text-white/90 mb-4">Tehnologii Utilizate</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'OpenStack', 'Kubernetes', 'Docker Swarm', 'OpnSense/VYOS',
                  'Windows Server', 'Active Directory', 'GitLab', 'Moodle',
                  'Wazuh SIEM', 'ELK Stack', 'Grafana', 'Ansible'
                ].map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white/70 text-center"
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-4 md:px-8 py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/40 text-sm">
            Proiect SPRC 2025-2026 • Universitatea Politehnica București
          </p>
        </div>
      </footer>
    </main>
  );
}
