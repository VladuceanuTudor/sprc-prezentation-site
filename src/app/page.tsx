'use client';

import { motion } from 'framer-motion';
import { Network, Users, Shield, Server, Target, CheckCircle2, Cpu, Cloud } from 'lucide-react';
import ArchitectureDiagram from '@/components/ArchitectureDiagram';
import { projectSummary, componentsData } from '@/lib/data';

const stats = [
  { icon: Network, label: 'Subrețele', value: projectSummary.stats.subnets.toString() },
  { icon: Users, label: 'Membri Echipă', value: projectSummary.stats.members.toString() },
  { icon: Shield, label: 'Echipe', value: projectSummary.stats.teams.toString() },
  { icon: Server, label: 'Servicii', value: projectSummary.stats.services },
];

export default function Home() {
  // Calculate total achievements
  const totalAchievements = componentsData.reduce((acc, c) => acc + c.achievements.length, 0);
  const totalTechnologies = new Set(componentsData.flatMap(c => c.technologies)).size;

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
              <span className="text-sm text-white/70">{projectSummary.subtitle}</span>
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

      {/* Project Summary Section */}
      <section className="relative px-4 md:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-indigo-500/20">
                <Target className="w-6 h-6 text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Despre Proiect</h2>
            </div>

            <p className="text-white/70 text-lg leading-relaxed mb-8">
              {projectSummary.description}
            </p>

            <h3 className="text-lg font-semibold text-white mb-4">Obiective Principale</h3>
            <div className="grid md:grid-cols-2 gap-3 mb-8">
              {projectSummary.objectives.map((objective, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-white/5"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white/70 text-sm">{objective}</span>
                </motion.div>
              ))}
            </div>

            {/* Infrastructure Details */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <Cloud className="w-8 h-8 text-indigo-400 mb-2" />
                <p className="text-sm text-white/50 mb-1">Platformă Cloud</p>
                <p className="text-white font-semibold">{projectSummary.infrastructure.platform}</p>
              </div>
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <Network className="w-8 h-8 text-blue-400 mb-2" />
                <p className="text-sm text-white/50 mb-1">Networking</p>
                <p className="text-white font-semibold text-sm">{projectSummary.infrastructure.networking}</p>
              </div>
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <Shield className="w-8 h-8 text-amber-400 mb-2" />
                <p className="text-sm text-white/50 mb-1">Firewall</p>
                <p className="text-white font-semibold text-sm">{projectSummary.infrastructure.firewall}</p>
              </div>
              <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <Cpu className="w-8 h-8 text-cyan-400 mb-2" />
                <p className="text-sm text-white/50 mb-1">Orchestrare</p>
                <p className="text-white font-semibold text-sm">{projectSummary.infrastructure.orchestration}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="relative px-4 md:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="glass-card p-2 md:p-4"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 px-4 pt-4 gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white/90">
                  Arhitectura Infrastructurii
                </h2>
                <p className="text-sm text-white/50">
                  Click pe orice componentă pentru detalii complete
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-white/50">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span>Workstations</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span>DMZ</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                  <span>Development</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                  <span>Monitoring</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                  <span>Internet Simulat</span>
                </div>
              </div>
            </div>

            <ArchitectureDiagram />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative px-4 md:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6 text-center"
            >
              <p className="text-4xl md:text-5xl font-bold text-gradient mb-2">{totalAchievements}</p>
              <p className="text-white/60">Realizări Implementate</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6 text-center"
            >
              <p className="text-4xl md:text-5xl font-bold text-gradient mb-2">{totalTechnologies}</p>
              <p className="text-white/60">Tehnologii Utilizate</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 text-center"
            >
              <p className="text-4xl md:text-5xl font-bold text-gradient mb-2">{projectSummary.stats.members}</p>
              <p className="text-white/60">Studenți Implicați</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="relative px-4 md:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-bold text-white/90 mb-6">Stack Tehnologic Principal</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                { name: 'OpenStack', color: '#ED1944' },
                { name: 'Kubernetes', color: '#326CE5' },
                { name: 'Docker', color: '#2496ED' },
                { name: 'OpnSense', color: '#D94F00' },
                { name: 'Windows Server', color: '#0078D4' },
                { name: 'Active Directory', color: '#0078D4' },
                { name: 'GitLab', color: '#FC6D26' },
                { name: 'Moodle', color: '#F7931E' },
                { name: 'Wazuh', color: '#3AABE0' },
                { name: 'Elasticsearch', color: '#00BFB3' },
                { name: 'Grafana', color: '#F46800' },
                { name: 'Ansible', color: '#EE0000' },
                { name: 'Prometheus', color: '#E6522C' },
                { name: 'Nginx', color: '#009639' },
                { name: 'OpenVPN', color: '#EA7E20' },
                { name: 'Snort', color: '#E4002B' },
                { name: 'Splunk', color: '#000000' },
                { name: 'NextCloud', color: '#0082C9' },
              ].map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className="px-3 py-2.5 rounded-lg text-center text-sm font-medium transition-all hover:scale-105"
                  style={{
                    backgroundColor: `${tech.color}15`,
                    color: tech.color,
                    border: `1px solid ${tech.color}30`
                  }}
                >
                  {tech.name}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-4 md:px-8 py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/40 text-sm mb-2">
            Proiect SPRC 2025-2026 • Universitatea Politehnica București
          </p>
          <p className="text-white/30 text-xs">
            Facultatea de Automatică și Calculatoare • Sisteme de Programe pentru Rețele de Calculatoare
          </p>
        </div>
      </footer>
    </main>
  );
}
