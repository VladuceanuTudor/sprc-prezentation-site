export interface TeamMember {
  name: string;
  group: string;
}

export interface ComponentData {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  requirements: string[];
  teamMembers: TeamMember[];
  color: string;
  icon: string;
  subnet: 'workstations' | 'dmz' | 'development' | 'monitoring' | 'internet' | 'infrastructure';
}

export const componentsData: ComponentData[] = [
  {
    id: 'infrastructura',
    title: 'Echipa responsabila de infrastructura',
    shortTitle: 'Infrastructura',
    description: 'Scopul acestei echipe este de a pregăti toate mașinile virtuale necesare realizării proiectului (crearea în OpenStack, configurarea rețelelor din OpenStack, configurarea adreselor IP). De asemenea, tot această echipă se va ocupa de mașina virtuală de tipul router (OpnSense sau VYOS).',
    requirements: [
      'Creați subrețele specificate, toate trebuie să aibă DHCP dezactivat',
      'Creați VM-urile necesare realizării proiectului',
      'Asignați Floating IP router-ului din infrastructură',
      'Asigurați-vă că toate VM-urile din infrastructură au acces la internet',
      'Configurați port forward pe router către serviciile din DMZ',
      'Configurați politici de firewall pentru clienții VPN',
      'Configurați politici de firewall pentru subrețeaua workstations',
      'Setați politici de firewall pentru Domain Controller',
      'Setați politici de firewall pentru serverul VPN',
      'Setați politici de firewall pentru Management UI DNS',
      'Setați politici de firewall pentru Management UI Proxy',
      'Creați un jumpbox pentru acces la VM-uri',
      'Redirectați traficul din subrețele către monitorizare',
      '(Bonus) Realizați un script Terraform pentru creare VM-uri'
    ],
    teamMembers: [
      { name: 'PONTOȘ ALEXANDRU-MIHAI', group: 'C114A' },
      { name: 'AXINESCU VALENTIN-DANIEL', group: 'C114D' },
      { name: 'FILIP LARISA-ALEXIA', group: 'C114C' },
      { name: 'PASCU DARIA', group: 'C114B' }
    ],
    color: '#6366f1',
    icon: 'router',
    subnet: 'infrastructure'
  },
  {
    id: 'workstations-dc',
    title: 'Workstations + Domain Controller',
    shortTitle: 'Active Directory',
    description: 'Rețeaua în care se află calculatoarele angajaților și Domain Controller-ul pentru sprc.mta. Această componentă gestionează autentificarea, politicile de securitate și serviciile de email pentru organizație.',
    requirements: [
      'Configurați Windows Server ca Domain Controller pentru sprc.mta',
      'Înrolați toate stațiile angajaților (Windows 10) în domeniu',
      'Creați conturi de utilizator pentru angajații companiei',
      'Denumiți fiecare stație după formatul [nume utilizator]_ws',
      'Creați un network share Transfer_SPRC',
      'Creați grupul IT_SPRC și adăugați doi utilizatori',
      'Politici de securitate pentru Transfer_SPRC (doar IT_SPRC)',
      'Instalați Exchange Server pe Domain Controller',
      'Instalați Outlook pe fiecare stație din domeniu',
      'Conectați Outlook la Exchange Server',
      'Verificați accesul stațiilor la servicii interne și internet',
      'Conectați serverul DNS din domeniu cu serverul din DMZ',
      'Adăugați password policy (schimbare periodică, complexitate, blocare cont)'
    ],
    teamMembers: [
      { name: 'ȘANDRU MARIA-LAURA', group: 'C114A' },
      { name: 'APAHIDEAN LUCA-TEODOR', group: 'C114B' },
      { name: 'ROȘCA GEORGE-MIHAI', group: 'C114C' }
    ],
    color: '#3b82f6',
    icon: 'monitor',
    subnet: 'workstations'
  },
  {
    id: 'dmz-web-apps',
    title: 'DMZ (Rev Proxy + Moodle + Gitlab + Mail + Chat)',
    shortTitle: 'DMZ Web Apps',
    description: 'Zona demilitarizată în care se regăsesc toate serviciile expuse în internet. Include reverse proxy, platforme de e-learning, repository de cod, email și comunicare.',
    requirements: [
      'Creați un cluster Kubernetes sau Docker Swarm folosind 3 VM-uri',
      'Instalați și configurați reverse proxy (Nginx/Apache/HAProxy)',
      'Instalați și configurați Mailcow',
      'Instalați și configurați o instanță GitLab',
      'Instalați și configurați Moodle',
      'Instalați și configurați Mattermost (team SPRC, canal monitorizare)',
      'Configurați reverse proxy pentru acces prin subdomenii',
      'Autentificare prin LDAP din Domain Controller',
      '(Bonus) Configurați WAF pe reverse proxy'
    ],
    teamMembers: [
      { name: 'IVESCU IONUȚ-MIRCEA', group: 'C114D' },
      { name: 'COSTAN RAREȘ-IONUȚ', group: 'C114C' },
      { name: 'ȚURCANU IULIANA-MARIA', group: 'C114B' }
    ],
    color: '#f59e0b',
    icon: 'globe',
    subnet: 'dmz'
  },
  {
    id: 'dmz-internal-dns-site-management',
    title: 'DMZ + Internal (DNS + Site Prezentare + Management UI)',
    shortTitle: 'DNS & Management',
    description: 'Componentă care gestionează serverul DNS pentru toate subdomeniile infrastructurii, site-ul de prezentare și interfețele de management pentru DNS și reverse proxy.',
    requirements: [
      'Creați un site de prezentare al proiectului',
      'Instalați și configurați un server DNS pentru toate subdomeniile',
      'Creați interfață de management pentru serverul DNS (CRUD operații)',
      'UI-ul de management reverse proxy pentru virtualhosts (CRUD operații)'
    ],
    teamMembers: [
      { name: 'VLĂDUCEANU TUDOR', group: 'C114B' },
      { name: 'RUSU PETRU-CĂLIN', group: 'C114A' },
      { name: 'STANCIU GEORGE-RĂZVAN', group: 'C114C' }
    ],
    color: '#10b981',
    icon: 'server',
    subnet: 'dmz'
  },
  {
    id: 'dmz-internal-vpn-ldap',
    title: 'DMZ + Internal (VPN + LDAP + LDAP Management UI)',
    shortTitle: 'VPN & LDAP',
    description: 'Componentă responsabilă de accesul securizat prin VPN și managementul identităților prin LDAP pentru autentificarea în toate serviciile interne.',
    requirements: [
      'Instalați și configurați server OpenVPN cu autentificare LDAP',
      'Instalați și configurați server LDAP',
      'Realizați interfață grafică pentru managementul LDAP',
      'Permiteți clienților VPN accesul la servicii interne și monitorizare',
      '(Bonus) Monitorizați IP-urile alocate pentru fiecare user'
    ],
    teamMembers: [
      { name: 'ACOSTI CLAUDIU-MIREL', group: 'C114D' },
      { name: 'STOICA CRISTIAN-IONUȚ', group: 'C114B' },
      { name: 'PILIPĂUȚANU TUDOR', group: 'C114A' }
    ],
    color: '#8b5cf6',
    icon: 'shield',
    subnet: 'dmz'
  },
  {
    id: 'internal-services',
    title: 'Internal Services (Rev Proxy + NextCloud + Plane + Wiki)',
    shortTitle: 'Servicii Interne',
    description: 'Zona de Development Environment unde se testează diferite soluții dezvoltate de companie și se regăsesc serviciile accesibile doar de către angajați.',
    requirements: [
      'Creați un cluster Kubernetes sau Docker Swarm folosind 3 VM-uri',
      'Instalați și configurați NextCloud în cluster',
      'Instalați și configurați Plane în cluster',
      'Instalați și configurați WikiJS/DokuWiki în cluster',
      'Instalați și configurați Outline',
      'Instalați și configurați VaultWarden',
      'Instalați reverse proxy pentru trafic către servicii',
      'Realizați interfață de management pentru reverse proxy',
      '(Bonus) Adăugați WAF pe reverse proxy'
    ],
    teamMembers: [
      { name: 'MILEA ALEXANDRU-NICOLAE', group: 'C114B' },
      { name: 'BRĂILA GEORGE-SEBASTIAN', group: 'C114D' },
      { name: 'GĂITAN NICOLAI', group: 'C114A' }
    ],
    color: '#06b6d4',
    icon: 'layers',
    subnet: 'development'
  },
  {
    id: 'monitorizare-wazuh-ansible-grafana',
    title: 'Monitorizare (Wazuh + Ansible + Grafana/Zabbix + Uptime Kuma)',
    shortTitle: 'Wazuh & Ansible',
    description: 'Componentă de monitorizare a securității și automatizare a configurărilor. Include SIEM, management configurații și dashboard-uri pentru vizualizarea metricilor.',
    requirements: [
      'Instalați Wazuh server, indexer și dashboard',
      'Configurați alerte Wazuh către Mattermost (bot)',
      'Instalați Ansible cu playbook-uri pentru update, VS Code, Docker, Wazuh agent, Zabbix agent',
      'Instalați și configurați SemaphoreUI pentru Ansible',
      'Instalați Prometheus + Grafana sau Zabbix pentru colectare metrici',
      'Realizați dashboard-uri în Grafana/Zabbix',
      'Instalați și configurați Uptime Kuma pentru monitorizare aplicații web',
      'Generați alerte pentru VM-uri indisponibile',
      'Configurați alerte prin Mattermost bot',
      '(Bonus) Monitorizați clusterele Kubernetes'
    ],
    teamMembers: [
      { name: 'STAN ȘTEFAN-SABIN', group: 'C114A' },
      { name: 'NEGUȚ DIANA-MIHAELA', group: 'C114B' },
      { name: 'CHIVU BOGDAN-NICOLAE', group: 'C114C' },
      { name: 'BADEA ALEXANDRU-GABRIEL', group: 'C114D' }
    ],
    color: '#ec4899',
    icon: 'activity',
    subnet: 'monitoring'
  },
  {
    id: 'monitorizare-arkime-elk-splunk',
    title: 'Monitorizare (Arkime + ELK + Splunk + ClamAV)',
    shortTitle: 'ELK & Splunk',
    description: 'Componentă de monitorizare și analiză a logurilor și traficului de rețea. Include captura pachetelor, indexarea logurilor și detecția malware.',
    requirements: [
      'Instalați și configurați Arkime pentru captura traficului',
      'Instalați și configurați Elasticsearch/OpenSearch',
      'Instalați și configurați Logstash/Fluentd pentru log-uri reverse proxy și Windows',
      'Instalați și configurați Kibana/OpenSearch Dashboards',
      'Instalați și configurați Splunk cu agent pe toate stațiile',
      'Instalați și configurați ClamAV'
    ],
    teamMembers: [
      { name: 'TĂTAR IOAN-DAN', group: 'C114C' },
      { name: 'GRAURE DARIANA-GABRIELA', group: 'C114D' },
      { name: 'ȘTEOPOAE ANAMARIA-PEREGRINA', group: 'C114A' }
    ],
    color: '#f97316',
    icon: 'database',
    subnet: 'monitoring'
  },
  {
    id: 'monitorizare-pcap-snort',
    title: 'Monitorizare (PCAP Puller + Snort + Websnort + Management UI)',
    shortTitle: 'Snort IDS',
    description: 'Sistem de detecție a intruziunilor bazat pe Snort pentru analiza traficului de rețea și identificarea atacurilor asupra aplicațiilor web.',
    requirements: [
      'Instalați și configurați Snort (fără reguli default)',
      'Adăugați reguli pentru atacuri web (SQL Injection, NOSQL Injection, LFI)',
      'Instalați Websnort',
      'Implementați aplicație pentru preluare PCAP din Arkime către Websnort',
      'Implementați interfață grafică pentru management reguli și alerte Snort'
    ],
    teamMembers: [
      { name: 'LEU CONSTANTIN-CĂTĂLIN', group: 'C114B' },
      { name: 'NEGOESCU ELENA-CAMELIA', group: 'C114A' },
      { name: 'RUS EMANUEL-DANIEL', group: 'C114D' }
    ],
    color: '#ef4444',
    icon: 'alertTriangle',
    subnet: 'monitoring'
  },
  {
    id: 'internet-simulat',
    title: 'Internet Simulat',
    shortTitle: 'Internet Simulat',
    description: 'Componentă pentru verificarea funcționării tuturor aplicațiilor din infrastructură prin implementarea unor scripturi care testează diferite endpoint-uri, DNS-ul, serverul de VPN etc.',
    requirements: [
      'Realizați scripturi pentru generare trafic către toate serviciile',
      'Script pentru trimitere mail către utilizatorii AD',
      'Script pentru cereri DNS',
      'Script pentru testare aplicații web (login, navigare, logout)',
      'Script pentru testare server VPN și acces infrastructură',
      'Realizați interfață de management pentru rulare scripturi',
      'Permiteți încărcarea scripturilor suplimentare',
      'Rulare scripturi la interval de timp',
      'Afișare metrici (număr cereri, timp răspuns mediu)',
      'Transmiteți alerte prin Mattermost când un serviciu nu răspunde'
    ],
    teamMembers: [
      { name: 'SOFIANU GABRIELA', group: 'C114C' },
      { name: 'DINU LIVIU-ANDREI', group: 'C114B' },
      { name: 'ALDEA ALEXANDRA-MARILENA', group: 'C114D' }
    ],
    color: '#14b8a6',
    icon: 'wifi',
    subnet: 'internet'
  }
];

export const getComponentById = (id: string): ComponentData | undefined => {
  return componentsData.find(c => c.id === id);
};

export const getComponentsBySubnet = (subnet: ComponentData['subnet']): ComponentData[] => {
  return componentsData.filter(c => c.subnet === subnet);
};
