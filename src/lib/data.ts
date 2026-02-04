export interface TeamMember {
  name: string;
  group: string;
}

export interface ComponentData {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  scope: string;
  achievements: string[];
  technologies: string[];
  teamMembers: TeamMember[];
  color: string;
  icon: string;
  subnet: 'workstations' | 'dmz' | 'development' | 'monitoring' | 'internet' | 'infrastructure';
}

export const projectSummary = {
  title: "Infrastructura sprc.mta",
  subtitle: "Proiect SPRC 2025-2026",
  description: `Proiectul constă în crearea unei infrastructuri de rețea complete pentru organizația fictivă sprc.mta.
  Această infrastructură permite angajaților să lucreze atât de la birou cât și remote, oferind acces securizat
  la toate resursele companiei prin VPN, servicii de colaborare, platforme de dezvoltare și un sistem robust de monitorizare.`,
  objectives: [
    "Implementarea unei arhitecturi de rețea segmentate cu multiple subrețele izolate",
    "Configurarea unui sistem centralizat de autentificare și management al identității",
    "Deployarea serviciilor web în clustere Kubernetes/Docker Swarm pentru high availability",
    "Implementarea unui sistem complet de monitorizare, logging și detecție a intruziunilor",
    "Asigurarea accesului remote securizat prin VPN cu autentificare LDAP",
    "Automatizarea configurărilor și deployment-urilor prin Ansible"
  ],
  infrastructure: {
    platform: "OpenStack",
    networking: "Subrețele izolate cu DHCP centralizat pe router",
    firewall: "OpnSense / VYOS cu politici granulare per subrețea",
    orchestration: "Kubernetes / Docker Swarm pentru serviciile containerizate"
  },
  stats: {
    teams: 10,
    members: 32,
    vms: "20+",
    subnets: 5,
    services: "30+"
  }
};

export const componentsData: ComponentData[] = [
  {
    id: 'infrastructura',
    title: 'Echipa de Deployment Infrastructură',
    shortTitle: 'Infrastructura',
    description: 'Echipa responsabilă de fundația întregii infrastructuri - de la crearea mașinilor virtuale în OpenStack până la configurarea completă a rețelei și politicilor de securitate.',
    scope: 'Pregătirea și configurarea tuturor resurselor de bază necesare celorlalte echipe: mașini virtuale, rețele, router/firewall și politici de acces între subrețele.',
    achievements: [
      'Au creat și configurat toate subrețelele necesare în OpenStack cu DHCP dezactivat',
      'Au configurat serverul DHCP centralizat la nivelul router-ului pentru alocare dinamică de IP-uri',
      'Au implementat adresare statică pentru rețeaua de monitorizare',
      'Au provizionat toate VM-urile necesare pentru întreaga infrastructură',
      'Au configurat accesul SSH prin credențiale și chei SSH pentru toate mașinile',
      'Au asignat Floating IP router-ului și au configurat NAT pentru acces la internet',
      'Au implementat port forwarding pe router către serviciile din DMZ',
      'Au configurat politici de firewall pentru izolarea clienților VPN (acces doar la development și monitoring)',
      'Au restricționat accesul din Workstations către DMZ prin reguli de firewall',
      'Au permis accesul selectiv de la Monitoring către DMZ doar pentru IP-uri specifice',
      'Au configurat reguli speciale pentru comunicarea Domain Controller - DNS DMZ',
      'Au permis comunicarea VPN Server - LDAP pentru autentificare',
      'Au creat un jumpbox pentru accesul echipelor la VM-uri prin port forward SSH',
      'Au implementat redirecționarea traficului din toate subrețelele către monitorizare pentru analiză',
      '(Bonus) Au dezvoltat scripturi Terraform pentru provizionarea automată a infrastructurii'
    ],
    technologies: ['OpenStack', 'OpnSense', 'VYOS', 'Terraform', 'SSH', 'NAT/PAT', 'VLAN', 'Firewall Rules'],
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
    description: 'Echipa care a implementat întreaga infrastructură Windows pentru organizație, incluzând Domain Controller-ul, stațiile de lucru ale angajaților și serviciile de comunicare.',
    scope: 'Configurarea mediului de lucru pentru angajați cu autentificare centralizată, politici de securitate, servicii de email și acces controlat la resurse.',
    achievements: [
      'Au configurat Windows Server ca Domain Controller pentru domeniul sprc.mta',
      'Au înrolat toate stațiile Windows 10 ale angajaților în domeniu',
      'Au creat conturi de utilizator individuale pentru fiecare angajat',
      'Au denumit stațiile conform convenției [nume_utilizator]_ws pentru identificare ușoară',
      'Au creat și configurat network share-ul Transfer_SPRC pentru partajare fișiere',
      'Au creat grupul de securitate IT_SPRC și au adăugat utilizatorii administratori',
      'Au implementat ACL-uri pentru restricționarea accesului la Transfer_SPRC doar pentru IT_SPRC',
      'Au instalat și configurat Microsoft Exchange Server pentru email intern',
      'Au deployat Microsoft Outlook pe toate stațiile din domeniu',
      'Au configurat conectarea Outlook la Exchange Server pentru fiecare utilizator',
      'Au verificat și asigurat conectivitatea stațiilor la serviciile interne și internet',
      'Au integrat DNS-ul din Active Directory cu serverul DNS din DMZ',
      'Au implementat password policy complex: schimbare periodică, complexitate (majuscule, cifre, caractere speciale), blocare cont după 5 încercări eșuate'
    ],
    technologies: ['Windows Server', 'Active Directory', 'Exchange Server', 'Outlook', 'Group Policy', 'DNS', 'NTFS Permissions'],
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
    title: 'DMZ - Aplicații Web Publice',
    shortTitle: 'DMZ Web Apps',
    description: 'Echipa responsabilă de zona demilitarizată care găzduiește toate serviciile web accesibile din internet: platforme de e-learning, repository de cod, email și comunicare.',
    scope: 'Deployarea și configurarea serviciilor web publice într-un cluster containerizat cu reverse proxy pentru rutare și autentificare centralizată prin LDAP.',
    achievements: [
      'Au creat un cluster Kubernetes cu 3 noduri pentru high availability',
      'Au instalat și configurat Nginx ca reverse proxy pentru rutarea traficului',
      'Au deployat Mailcow pentru servicii complete de email (SMTP, IMAP, webmail)',
      'Au instalat și configurat GitLab pentru version control și CI/CD',
      'Au deployat Moodle ca platformă de e-learning pentru training intern',
      'Au configurat Mattermost pentru comunicare în timp real cu team-ul SPRC și canalul dedicat monitorizării',
      'Au configurat reverse proxy pentru acces prin subdomenii (moodle.sprc.mta, gitlab.sprc.mta, etc.)',
      'Au integrat autentificarea LDAP din Domain Controller pentru toate serviciile',
      '(Bonus) Au implementat Web Application Firewall (WAF) pe reverse proxy pentru protecție împotriva atacurilor web'
    ],
    technologies: ['Kubernetes', 'Docker', 'Nginx', 'Mailcow', 'GitLab', 'Moodle', 'Mattermost', 'LDAP', 'WAF'],
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
    title: 'DNS & Interfețe de Management',
    shortTitle: 'DNS & Management',
    description: 'Echipa care a dezvoltat serverul DNS central pentru întreaga infrastructură și interfețele web de management pentru administrarea DNS-ului și reverse proxy-ului.',
    scope: 'Implementarea rezoluției DNS pentru toate serviciile interne și externe, plus dezvoltarea de aplicații web pentru administrarea ușoară a configurărilor.',
    achievements: [
      'Au creat site-ul de prezentare al proiectului (acest site)',
      'Au instalat și configurat serverul DNS autoritativ pentru domeniul sprc.mta',
      'Au configurat zone DNS pentru toate subdomeniile infrastructurii (moodle, gitlab, mail, etc.)',
      'Au dezvoltat o interfață web de management pentru DNS cu funcționalități complete CRUD',
      'Interfața DNS permite adăugarea, modificarea și ștergerea înregistrărilor DNS în timp real',
      'Au dezvoltat UI de management pentru reverse proxy-ul din DMZ',
      'Interfața reverse proxy permite configurarea de virtual hosts și reguli de rutare'
    ],
    technologies: ['BIND9', 'PowerDNS', 'React', 'Node.js', 'Next.js', 'REST API', 'DNS Records'],
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
    title: 'VPN & Identity Management',
    shortTitle: 'VPN & LDAP',
    description: 'Echipa responsabilă de accesul remote securizat și managementul centralizat al identităților pentru autentificarea în toate serviciile organizației.',
    scope: 'Implementarea infrastructurii de acces remote prin VPN și a serviciului LDAP pentru single sign-on în toate aplicațiile interne.',
    achievements: [
      'Au instalat și configurat OpenVPN server pentru acces remote securizat',
      'Au integrat autentificarea VPN cu serverul LDAP pentru credențiale unificate',
      'Au configurat profiluri VPN cu acces controlat la subrețelele interne',
      'Au instalat și configurat OpenLDAP ca director central de utilizatori',
      'Au populat LDAP cu structura organizațională și conturile utilizatorilor',
      'Au dezvoltat o interfață web pentru managementul LDAP (adăugare/modificare/ștergere utilizatori și grupuri)',
      'Au configurat accesul clienților VPN la serviciile interne și monitorizare',
      '(Bonus) Au implementat monitorizarea și logging-ul IP-urilor alocate pentru audit'
    ],
    technologies: ['OpenVPN', 'OpenLDAP', 'LDAP Admin', 'PKI/Certificates', 'React', 'Python'],
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
    title: 'Servicii Interne pentru Angajați',
    shortTitle: 'Servicii Interne',
    description: 'Echipa care a deployat și configurat toate aplicațiile interne accesibile doar angajaților: cloud storage, project management, documentație și password manager.',
    scope: 'Crearea unui ecosistem complet de aplicații pentru productivitatea angajaților, accesibil doar din rețeaua internă sau prin VPN.',
    achievements: [
      'Au creat un cluster Docker Swarm cu 3 noduri pentru serviciile interne',
      'Au deployat NextCloud pentru stocare și sincronizare fișiere în cloud',
      'Au configurat Plane ca platformă de project management și issue tracking',
      'Au instalat WikiJS pentru documentație internă și knowledge base',
      'Au deployat Outline pentru note colaborative și documentație',
      'Au configurat VaultWarden (Bitwarden) pentru managementul parolelor echipei',
      'Au instalat și configurat reverse proxy intern pentru rutarea traficului',
      'Au dezvoltat interfață de management pentru reverse proxy (CRUD virtual hosts)',
      '(Bonus) Au implementat WAF pe reverse proxy pentru protecție suplimentară'
    ],
    technologies: ['Docker Swarm', 'NextCloud', 'Plane', 'WikiJS', 'Outline', 'VaultWarden', 'Nginx', 'Traefik'],
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
    title: 'Security Monitoring & Automation',
    shortTitle: 'Wazuh & Ansible',
    description: 'Echipa responsabilă de monitorizarea securității infrastructurii, automatizarea configurărilor și vizualizarea metricilor de performanță.',
    scope: 'Implementarea unui sistem SIEM complet, automatizarea deployment-urilor cu Ansible și crearea de dashboard-uri pentru monitorizare în timp real.',
    achievements: [
      'Au deployat Wazuh (server, indexer și dashboard) ca SIEM central',
      'Au configurat alertele Wazuh să fie trimise automat în Mattermost prin bot',
      'Au instalat Ansible și au creat playbook pentru update repository-uri pe toate mașinile Linux',
      'Au creat playbook pentru instalarea VS Code pe stațiile angajaților',
      'Au automatizat instalarea Docker și descărcarea imaginilor de bază',
      'Au creat playbook pentru deployment-ul Wazuh agent pe toate stațiile',
      'Au automatizat instalarea Wazuh agent pe toate serverele Linux',
      'Au creat playbook pentru instalarea Zabbix agent / Node Exporter',
      'Au instalat și configurat SemaphoreUI pentru managementul vizual al playbook-urilor Ansible',
      'Au deployat Prometheus + Grafana pentru colectarea și vizualizarea metricilor',
      'Au creat dashboard-uri personalizate în Grafana pentru monitorizarea resurselor',
      'Au configurat Uptime Kuma pentru monitorizarea disponibilității aplicațiilor web',
      'Au implementat alerte ping pentru detectarea VM-urilor indisponibile',
      'Au configurat notificări Mattermost pentru alertele de uptime',
      '(Bonus) Au implementat monitorizarea clusterelor Kubernetes'
    ],
    technologies: ['Wazuh SIEM', 'Ansible', 'SemaphoreUI', 'Prometheus', 'Grafana', 'Zabbix', 'Uptime Kuma', 'Node Exporter'],
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
    title: 'Network & Log Analysis',
    shortTitle: 'ELK & Splunk',
    description: 'Echipa specializată în captura și analiza traficului de rețea, centralizarea log-urilor și detecția malware-ului în infrastructură.',
    scope: 'Implementarea unei platforme complete de network forensics și log management pentru investigații de securitate și compliance.',
    achievements: [
      'Au instalat și configurat Arkime pentru captura full packet (FPC) a întregului trafic',
      'Au deployat Elasticsearch/OpenSearch ca backend pentru indexarea datelor',
      'Au configurat Logstash/Fluentd pentru colectarea log-urilor de la reverse proxy-uri',
      'Au implementat colectarea log-urilor de sistem de pe toate stațiile Windows',
      'Au instalat Kibana/OpenSearch Dashboards pentru vizualizarea și căutarea în log-uri',
      'Au creat dashboard-uri pentru analiza traficului și detectarea anomaliilor',
      'Au deployat Splunk Enterprise pentru analiza avansată a log-urilor',
      'Au instalat Splunk Universal Forwarder pe toate stațiile din infrastructură',
      'Au configurat ClamAV pentru scanarea antimalware a fișierelor'
    ],
    technologies: ['Arkime', 'Elasticsearch', 'OpenSearch', 'Logstash', 'Fluentd', 'Kibana', 'Splunk', 'ClamAV'],
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
    title: 'Intrusion Detection System',
    shortTitle: 'Snort IDS',
    description: 'Echipa care a implementat sistemul de detecție a intruziunilor bazat pe Snort pentru identificarea și alertarea atacurilor asupra infrastructurii.',
    scope: 'Dezvoltarea unui sistem IDS personalizat cu reguli specifice pentru atacuri web și o interfață de management pentru administrarea alertelor.',
    achievements: [
      'Au instalat și configurat Snort ca IDS pentru analiza traficului',
      'Au dezactivat regulile default și au creat un set personalizat de reguli',
      'Au implementat reguli pentru detectarea SQL Injection',
      'Au creat reguli pentru identificarea NoSQL Injection',
      'Au dezvoltat reguli pentru detectarea Local File Inclusion (LFI)',
      'Au instalat și configurat Websnort pentru analiza fișierelor PCAP',
      'Au dezvoltat aplicația PCAP Puller pentru extragerea automată din Arkime',
      'Aplicația încarcă automat fișierele PCAP în Websnort pentru analiză',
      'Au creat o interfață web completă pentru managementul regulilor Snort',
      'Interfața permite adăugarea, modificarea și ștergerea regulilor în timp real',
      'Au implementat vizualizarea alertelor generate în urma analizei PCAP'
    ],
    technologies: ['Snort', 'Websnort', 'Python', 'React', 'PCAP Analysis', 'Regex Rules', 'REST API'],
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
    title: 'Internet Simulat & Testing',
    shortTitle: 'Internet Simulat',
    description: 'Echipa responsabilă de validarea funcționalității întregii infrastructuri prin dezvoltarea de scripturi automate care simulează comportamentul utilizatorilor reali.',
    scope: 'Crearea unei suite complete de teste automate și a unei platforme de management pentru verificarea continuă a disponibilității și funcționalității serviciilor.',
    achievements: [
      'Au dezvoltat o suită completă de scripturi pentru generarea de trafic către toate serviciile',
      'Au creat script pentru trimiterea automată de email-uri către toți utilizatorii AD',
      'Au implementat script pentru testarea rezoluției DNS pentru toate subdomeniile',
      'Au dezvoltat scripturi Selenium pentru testarea aplicațiilor web (login, navigare, logout)',
      'Au creat script pentru testarea conectivității VPN și accesului la resurse interne',
      'Au dezvoltat o interfață web de management pentru rularea centralizată a scripturilor',
      'Interfața permite încărcarea și configurarea de scripturi noi',
      'Au implementat programarea rulării scripturilor la intervale de timp configurabile',
      'Au creat dashboard cu metrici: număr cereri, timp mediu de răspuns, rate de succes',
      'Au configurat alertele Mattermost pentru notificarea când un serviciu nu răspunde corect'
    ],
    technologies: ['Python', 'Selenium', 'Bash', 'React', 'Node.js', 'Cron', 'REST API', 'Mattermost Webhooks'],
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
