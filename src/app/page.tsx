"use client";
import { useState, useEffect, SetStateAction } from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, LabelList } from 'recharts';
import { Search, Download, Bookmark, ExternalLink, BarChart2, TrendingUp, AlertTriangle, Info, Filter, ArrowUpRight, Calendar, User, Building, FileText, Map, Clock, Award, Zap } from 'lucide-react';

// Technology areas for search
const technologyAreas = [
  'AI & Machine Learning',
  'Quantum Computing',
  'Blockchain',
  'IoT',
  'Edge Computing',
  'Cybersecurity',
  'Robotics',
  'Computer Vision',
  'NLP',
  '5G/6G',
  'Autonomous Systems',
  'Augmented Reality'
];

// Generate initial trend data
const generateTrendData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map(month => ({
    month,
    'AI & Machine Learning': Math.floor(Math.random() * 30) + 40,
    'Quantum Computing': Math.floor(Math.random() * 20) + 20,
    'Blockchain': Math.floor(Math.random() * 15) + 10,
    'IoT': Math.floor(Math.random() * 20) + 25,
    'Edge Computing': Math.floor(Math.random() * 15) + 15,
    'Cybersecurity': Math.floor(Math.random() * 25) + 30,
    'Robotics': Math.floor(Math.random() * 20) + 15,
    'Computer Vision': Math.floor(Math.random() * 25) + 20,
    'NLP': Math.floor(Math.random() * 20) + 25,
    '5G/6G': Math.floor(Math.random() * 15) + 10,
    'Autonomous Systems': Math.floor(Math.random() * 18) + 12,
    'Augmented Reality': Math.floor(Math.random() * 15) + 8
  }));
};

// Initial trend data
const initialTrendData = generateTrendData();

// Create research papers database
const createPapersDatabase = () => {
  const papers: { id: string; title: string; authors: string; organization: string; date: string; citations: number; abstract: string; technologies: string[]; }[] = [];
  const titles = [
    'Advancing Machine Learning Models for Resource-Constrained Environments',
    'Quantum-Inspired Algorithms for Pattern Recognition in Large Datasets',
    'Competitive Intelligence Systems: A Framework for Real-time Technology Monitoring',
    'Secure Blockchain Solutions for Cross-Domain Intelligence Sharing',
    'Edge Computing Architecture for Real-Time IoT Data Processing',
    'Neural Network Approaches to Cybersecurity Vulnerability Detection',
    'Robotic Process Automation for Competitive Intelligence Gathering',
    'Computer Vision Techniques for Market Analysis and Positioning',
    'NLP Methods for Extracting Technical Insights from Patent Documents',
    'Applications of 5G Technology in Industrial Automation',
    'Autonomous Decision-Making Systems for Strategic Planning',
    'Augmented Reality Interfaces for Competitive Landscape Visualization',
    'Federated Learning for Privacy-Preserving Market Analysis',
    'Transformer-Based Models for Technical Document Classification',
    'Deep Learning Approaches for Trend Forecasting in Technology Markets',
    'Explainable AI for Strategic Decision Support Systems',
    'Quantum Machine Learning for Complex Pattern Recognition',
    'Zero-Knowledge Proof Systems for Secure Enterprise Intelligence',
    'IoT Sensor Networks for Competitive Monitoring Applications',
    'Edge AI Solutions for Real-Time Market Intelligence',
    // Additional papers to reach ~50 total
    'Multi-modal Deep Learning for Cross-Domain Technology Analysis',
    'Graph Neural Networks for Competitor Relationship Mapping',
    'Adversarial Machine Learning in Cybersecurity Applications',
    'Quantum Cryptography for Secure Technology Intelligence Exchange',
    'Self-Supervised Learning in Computer Vision for Market Trend Analysis',
    'Edge-Cloud Collaborative Architectures for IoT-Based Monitoring',
    'Reinforcement Learning for Adaptive Competitive Strategy',
    'Blockchain-Based Verification Systems for Research Integrity',
    'Temporal Graph Networks for Technology Evolution Mapping',
    'Transfer Learning Approaches for Low-Resource Technical Domains',
    'Generative Adversarial Networks for Synthetic Market Data',
    '6G Network Architectures: Next Generation Intelligence Systems',
    'Natural Language Processing for Multilingual Patent Analytics',
    'Autonomous Robotics for Competitive Environment Sensing',
    'Quantum Computing Applications in Optimization Problems',
    'Embedded AI Solutions for Real-time Competitor Monitoring',
    'Attention Mechanisms in Document Intelligence Systems',
    'Distributed Ledger Technologies for Secure Data Exchange',
    'Computer Vision in Augmented Reality Business Intelligence',
    'Federated IoT Systems for Decentralized Data Processing',
    'Neuromorphic Computing for Energy-Efficient AI Applications',
    'Privacy-Preserving Machine Learning for Sensitive Intelligence',
    'Geometric Deep Learning for 3D Market Visualization',
    'Edge Intelligence for Smart Manufacturing Systems',
    'Quantum Algorithms for Complex Decision Support Systems',
    'Multimodal Sentiment Analysis for Market Research',
    'AI-Driven Cybersecurity for Critical Infrastructure Protection',
    'Human-AI Collaboration in Strategic Decision Making',
    'Blockchain Solutions for Intellectual Property Protection',
    'Advanced NLP Methods for Competitive Intelligence Extraction'
  ];
  
  const organizations = [
    'IEEE Research Lab',
    'MIT Technology Center',
    'Stanford AI Group',
    'IBM Research',
    'Microsoft Research',
    'Google DeepMind',
    'Tesla AI',
    'Meta AI Research',
    'NVIDIA Research',
    'Qualcomm Institute',
    'Samsung Research',
    'Baidu Research',
    'Alibaba DAMO Academy',
    'Toyota Research Institute',
    'Samsung Advanced Institute of Technology',
    'Apple Machine Learning Research',
    'Tencent AI Lab',
    'Intel Labs',
    'Amazon Science',
    'Huawei Noah Ark Lab'
  ];

  const technologies = {
    'AI & Machine Learning': [0, 8, 12, 13, 14, 15, 20, 21, 26, 29, 30, 35, 36, 41, 42, 47],
    'Quantum Computing': [1, 11, 16, 23, 34, 44],
    'Blockchain': [3, 17, 27, 37, 49],
    'IoT': [4, 18, 25, 39],
    'Edge Computing': [4, 19, 25, 35, 43],
    'Cybersecurity': [3, 5, 17, 22, 23, 46],
    'Robotics': [6, 33],
    'Computer Vision': [7, 24, 38, 42],
    'NLP': [8, 13, 32, 45, 49],
    '5G/6G': [9, 31],
    'Autonomous Systems': [10, 26, 33],
    'Augmented Reality': [11, 38]
  };

  titles.forEach((title, index) => {
    // Create 3-5 author names
    const authorCount = Math.floor(Math.random() * 3) + 3;
    const firstInitials = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Lewis', 'Robinson', 'Walker', 'Chen', 'Zhang', 'Wang', 'Liu', 'Singh', 'Kumar', 'Patel', 'Gupta', 'Kim', 'Park', 'Suzuki', 'Sato', 'Takahashi', 'Schmidt', 'Weber', 'Fischer', 'Muller', 'Schneider', 'Dubois', 'Lefebvre'];
    
    let authors = [];
    for (let i = 0; i < authorCount; i++) {
      const firstInitial = firstInitials[Math.floor(Math.random() * firstInitials.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      authors.push(`${firstInitial}. ${lastName}`);
    }
    
    // Find which technologies this paper is associated with
    const paperTechnologies = [];
    for (const [tech, paperIndices] of Object.entries(technologies)) {
      if (paperIndices.includes(index)) {
        paperTechnologies.push(tech);
      }
    }
    
    // If no explicit associations, assign 1-2 random technologies
    if (paperTechnologies.length === 0) {
      const techKeys = Object.keys(technologies);
      paperTechnologies.push(techKeys[Math.floor(Math.random() * techKeys.length)]);
      if (Math.random() > 0.5) {
        let secondTech;
        do {
          secondTech = techKeys[Math.floor(Math.random() * techKeys.length)];
        } while (secondTech === paperTechnologies[0]);
        paperTechnologies.push(secondTech);
      }
    }
    
    // Generate publication date (within the last 6 months)
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);
    const randomDate = new Date(sixMonthsAgo.getTime() + Math.random() * (today.getTime() - sixMonthsAgo.getTime()));
    const dateString = randomDate.toISOString().split('T')[0];
    
    // Generate random citation count (0-50)
    const citations = Math.floor(Math.random() * 50);
    
    // Choose a random organization
    const organization = organizations[Math.floor(Math.random() * organizations.length)];
    
    // Generate IEEE-style DOI
    const doiPrefix = '10.1109/';
    const doiSuffixes = ['TNNLS', 'TPAMI', 'TSE', 'TETC', 'TCC', 'TAI', 'TITS', 'TMC', 'TII', 'TCSVT'];
    const doiSuffix = doiSuffixes[Math.floor(Math.random() * doiSuffixes.length)];
    const doiYear = '.2024.';
    const doiNumber = Math.floor(Math.random() * 9000000) + 1000000;
    const doi = `${doiPrefix}${doiSuffix}${doiYear}${doiNumber}`;
    
    // Abstract text templates
    const abstracts = [
      `This paper explores novel approaches to ${title.toLowerCase()} with a focus on practical implementation and performance optimization. We present experimental results demonstrating significant improvements over existing methods.`,
      `We introduce a new framework for ${title.toLowerCase()} that addresses key limitations in current approaches. Our evaluation demonstrates superior performance across multiple benchmark datasets.`,
      `This research presents a comprehensive analysis of ${title.toLowerCase()}, identifying critical challenges and proposing innovative solutions. The experimental results validate the effectiveness of our approach.`,
      `We propose a novel architecture for ${title.toLowerCase()} that significantly outperforms state-of-the-art methods. Extensive experiments on real-world data demonstrate the practical utility of our approach.`,
      `This paper presents a systematic investigation of ${title.toLowerCase()}, revealing important insights and practical implications. We discuss both theoretical foundations and empirical evaluations.`
    ];
    
    papers.push({
      id: doi,
      title,
      authors: authors.join(', '),
      organization,
      date: dateString,
      citations,
      abstract: abstracts[Math.floor(Math.random() * abstracts.length)],
      technologies: paperTechnologies
    });
  });
  
  return papers;
};

// Create organizations database
const createOrganizationsDatabase = () => {
  const organizations = [
    { name: 'IEEE Research Lab', focus: ['AI & Machine Learning', 'Quantum Computing'] },
    { name: 'MIT Technology Center', focus: ['Robotics', 'Autonomous Systems'] },
    { name: 'Stanford AI Group', focus: ['Computer Vision', 'NLP'] },
    { name: 'IBM Research', focus: ['Quantum Computing', 'Blockchain'] },
    { name: 'Microsoft Research', focus: ['AI & Machine Learning', 'Edge Computing'] },
    { name: 'Google DeepMind', focus: ['AI & Machine Learning', 'Quantum Computing'] },
    { name: 'Tesla AI', focus: ['Computer Vision', 'Autonomous Systems'] },
    { name: 'Meta AI Research', focus: ['NLP', 'Augmented Reality'] },
    { name: 'NVIDIA Research', focus: ['Computer Vision', 'AI & Machine Learning'] },
    { name: 'Qualcomm Institute', focus: ['5G/6G', 'IoT'] },
    { name: 'Samsung Research', focus: ['IoT', 'Edge Computing'] },
    { name: 'Baidu Research', focus: ['NLP', 'AI & Machine Learning'] },
    { name: 'Alibaba DAMO Academy', focus: ['AI & Machine Learning', 'Blockchain'] },
    { name: 'Toyota Research Institute', focus: ['Robotics', 'Autonomous Systems'] },
    { name: 'Samsung Advanced Institute of Technology', focus: ['IoT', '5G/6G'] },
    { name: 'Apple Machine Learning Research', focus: ['AI & Machine Learning', 'Computer Vision'] },
    { name: 'Tencent AI Lab', focus: ['AI & Machine Learning', 'Computer Vision'] },
    { name: 'Intel Labs', focus: ['Edge Computing', 'IoT'] },
    { name: 'Amazon Science', focus: ['NLP', 'AI & Machine Learning'] },
    { name: 'Huawei Noah\'s Ark Lab', focus: ['5G/6G', 'Edge Computing'] }
  ];
  
  return organizations.map((org, index) => {
    // Generate random paper count (30-200)
    const papers = Math.floor(Math.random() * 170) + 30;
    
    // Generate random YoY growth (-5 to 30%)
    const growth = Math.floor(Math.random() * 35) - 5;
    
    return {
      id: index + 1,
      name: org.name,
      papers,
      topics: org.focus,
      growth
    };
  });
};

// Initialize databases
const papersDatabase = createPapersDatabase();
const organizationsDatabase = createOrganizationsDatabase();

// Create tech distribution data
const createTechDistribution = () => {
  return [
    { name: 'AI & Machine Learning', value: 45, color: '#0054A6' },
    { name: 'Quantum Computing', value: 20, color: '#007CB7' },
    { name: 'Blockchain', value: 15, color: '#00A3E0' },
    { name: 'IoT', value: 12, color: '#1E4A8F' },
    { name: 'Edge Computing', value: 8, color: '#4686C6' }
  ];
};

// No results message component
const NoResultsMessage = () => (
  <div className="text-center py-10">
    <Search size={48} className="mx-auto text-gray-300 mb-3" />
    <h3 className="text-lg font-medium text-gray-700 mb-2">No results found</h3>
    <p className="text-gray-500">We couldn't find any matches for your search query.</p>
    <p className="text-gray-500">Try adjusting your search terms or filters.</p>
  </div>
);

// Component for competitive intelligence dashboard
export default function CompetitiveIntelligence() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('trends');
  const [selectedTech, setSelectedTech] = useState('AI & Machine Learning');
  const [filteredPapers, setFilteredPapers] = useState(papersDatabase);
  const [filteredOrganizations, setFilteredOrganizations] = useState(organizationsDatabase);
  const [trendData, setTrendData] = useState(initialTrendData);
  const [techDistribution, setTechDistribution] = useState(createTechDistribution());
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [filteredTechnologies, setFilteredTechnologies] = useState(technologyAreas);
  const [noResultsFound, setNoResultsFound] = useState(false);
  // Handle search submission
  const handleSearchSubmit = (e: { preventDefault: () => any; } | undefined) => {
    e && e.preventDefault();
    
    if (!searchQuery.trim()) {
      // Reset to default if search is cleared
      setFilteredPapers(papersDatabase);
      setFilteredOrganizations(organizationsDatabase);
      setTrendData(initialTrendData);
      setTechDistribution(createTechDistribution());
      setFilteredTechnologies(technologyAreas);
      setSearchSubmitted(false);
      setNoResultsFound(false);
      return;
    }
    
    // Filter papers based on search query
    const papers = papersDatabase.filter(paper => 
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredPapers(papers);
    
    // Filter organizations based on search query
    const orgs = organizationsDatabase.filter(org => 
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredOrganizations(orgs);
    
    // Filter technologies based on search query
    const techs = technologyAreas.filter(tech => 
      tech.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTechnologies(techs.length > 0 ? techs : technologyAreas);
    
    // If a technology is found in the search, set it as selected
    if (techs.length > 0) {
      setSelectedTech(techs[0]);
    }else if (selectedTech && !technologyAreas.includes(selectedTech)) {
      // If no technology is found and current selected isn't valid, reset to default
      setSelectedTech('AI & Machine Learning');
    }

    const hasNoResults = papers.length === 0 && orgs.length === 0 && techs.length === 0;
    setNoResultsFound(hasNoResults);
    
    // Update trend data to emphasize searched technology
    if (techs.length > 0) {
    const newTrendData = [...initialTrendData];
    newTrendData.forEach(data => {
      // Boost the value for the searched technology by 10-30%
      techs.forEach(tech => {
        if (tech in data) {
          // Use a proper type assertion for the data object
          (data as Record<string, any>)[tech] = Math.floor((data as Record<string, any>)[tech] * (1 + (Math.random() * 0.2 + 0.1)));
        }
      });
    });
    setTrendData(newTrendData);
      
      // Update tech distribution to emphasize searched technology
      const newDistribution = createTechDistribution();
      techs.forEach(tech => {
        const techItem = newDistribution.find(item => item.name === tech);
        if (techItem) {
          techItem.value = Math.floor(techItem.value * 1.2);
        }
      });
      setTechDistribution(newDistribution);
    }
    
    setSearchSubmitted(true);
  };

  // Handle technology selection
  const handleTechSelect = (tech: SetStateAction<string>) => {
    setSelectedTech(tech);
  };

  // Update filters when search query changes
  useEffect(() => {
    if (searchSubmitted && !searchQuery) {
      handleSearchSubmit(undefined);
    }
  }, [searchQuery]);

  // Generate insights based on selected technology and search query
  const generateInsights = () => {

    if (noResultsFound) {
      return [];
    }
    // Base insights that are always shown
    const baseInsights = [
      {
        icon: <TrendingUp className="text-blue-700 mr-2 mt-1 flex-shrink-0" size={16} />,
        text: `${selectedTech} publications have increased by <strong>${Math.floor(Math.random() * 30) + 50}%</strong> in the last 6 months`
      },
      {
        icon: <AlertTriangle className="text-amber-500 mr-2 mt-1 flex-shrink-0" size={16} />,
        text: `Emerging focus on <strong>practical applications</strong> and <strong>industry integration</strong> in ${selectedTech}`
      }
    ];
    
    // Technology-specific insights
    const techInsights = {
      'AI & Machine Learning': [
        {
          icon: <Info className="text-blue-700 mr-2 mt-1 flex-shrink-0" size={16} />,
          text: 'Growing trend in ethical AI frameworks and responsible AI development'
        },
        {
          icon: <TrendingUp className="text-green-600 mr-2 mt-1 flex-shrink-0" size={16} />,
          text: 'Cross-disciplinary research combining AI with domain expertise shows 38% annual growth'
        }
      ],
      'Quantum Computing': [
        {
          icon: <Info className="text-blue-700 mr-2 mt-1 flex-shrink-0" size={16} />,
          text: 'Quantum machine learning models showing promising results for specialized applications'
        },
        {
          icon: <TrendingUp className="text-green-600 mr-2 mt-1 flex-shrink-0" size={16} />,
          text: 'Error correction techniques improving quantum algorithm robustness by 27%'
        }
      ],
      'Blockchain': [
        {
          icon: <Info className="text-blue-700 mr-2 mt-1 flex-shrink-0" size={16} />,
          text: 'Enterprise blockchain solutions shifting toward interoperability frameworks'
        },
        {
          icon: <TrendingUp className="text-green-600 mr-2 mt-1 flex-shrink-0" size={16} />,
          text: 'Smart contract security research showing 42% annual growth'
        }
      ],
      'IoT': [
        {
          icon: <Info className="text-blue-700 mr-2 mt-1 flex-shrink-0" size={16} />,
          text: 'Edge-IoT integration creating new opportunities for real-time data processing'
        },
        {
          icon: <TrendingUp className="text-green-600 mr-2 mt-1 flex-shrink-0" size={16} />,
          text: 'IoT security publications increased by 53% in critical infrastructure applications'
        }
      ]
    };
    
    // Get insights for the selected technology, or default insights if not found
    const specificInsights = techInsights[selectedTech as keyof typeof techInsights] || [
      {
        icon: <Info className="text-blue-700 mr-2 mt-1 flex-shrink-0" size={16} />,
        text: `${selectedTech} research is increasingly focused on practical industry applications`
      },
      {
        icon: <TrendingUp className="text-green-600 mr-2 mt-1 flex-shrink-0" size={16} />,
        text: `Cross-domain research involving ${selectedTech} has grown by ${Math.floor(Math.random() * 20) + 20}% annually`
      }
    ];
    
    return [...baseInsights, ...specificInsights];
  };

  // Generate top collaborators for the selected technology
  const generateTopCollaborators = () => {

    if (noResultsFound) {
      return [];
    }
    // Get organizations with the highest paper counts in the selected technology
    return filteredOrganizations
      .filter(org => org.topics.includes(selectedTech))
      .sort((a, b) => b.papers - a.papers)
      .slice(0, 5)
      .map((org, index) => ({
        rank: index + 1,
        name: org.name,
        papers: org.papers,
        growth: org.growth
      }));
  };
  
  // Generate citation impact score for metrics
  const generateCitationImpact = () => {
    if (noResultsFound) {
      return 0;
    }
    // Average citations per paper for the selected technology
    const techPapers = filteredPapers.filter(paper => 
      paper.technologies.includes(selectedTech)
    );
    
    if (techPapers.length === 0) return 0;
    
    const totalCitations = techPapers.reduce((sum, paper) => sum + paper.citations, 0);
    return (totalCitations / techPapers.length).toFixed(1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* IEEE-like header */}
      <header className="bg-gradient-to-b from-blue-900 to-blue-800 text-white border-b-4 border-blue-600">
        <div className="container mx-auto py-4 px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold mr-4">IEEE Xplore</h1>
              <span className="text-sm border-l pl-4 border-gray-400">Digital Library</span>
            </div>
            <div className="flex space-x-6">
              <button className="text-sm hover:underline flex items-center">
                <User size={14} className="mr-1" />
                Sign In
              </button>
              <button className="text-sm hover:underline flex items-center">
                <FileText size={14} className="mr-1" />
                Subscribe
              </button>
              <button className="text-sm hover:underline flex items-center">
                <Info size={14} className="mr-1" />
                Help
              </button>
            </div>
          </div>
          <div className="mt-6 pb-4">
            <form onSubmit={handleSearchSubmit}>
              <div className="flex items-center bg-white rounded-md overflow-hidden shadow-lg">
                <input 
                  type="text" 
                  placeholder="Search technologies, papers, organizations..." 
                  className="flex-grow px-4 py-3 focus:outline-none text-gray-800"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="bg-blue-700 hover:bg-blue-800 px-6 py-3 flex items-center transition-colors"
                >
                  <Search size={18} className="mr-2" />
                  <span>Search</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
          <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Competitive Intelligence & Landscape Analysis</h2>
              <p className="text-gray-600 mt-2">
                Monitor research trends, track emerging technologies, and analyze the competitive landscape
              </p>
            </div>
            
            {searchSubmitted && searchQuery && (
              <div className={`px-4 py-2 rounded-md border flex items-center ${noResultsFound ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-blue-50 text-blue-800 border-blue-200'}`}>
                {noResultsFound ? 
                  <AlertTriangle size={16} className="mr-2" /> : 
                  <Info size={16} className="mr-2" />
                }
                <span>
                  {noResultsFound ? 
                    'No results found for: ' : 
                    'Showing results for: '
                  }
                  <strong>{searchQuery}</strong>
                </span>
              </div>
            )}
          </div>
          
          {/* Quick stats section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-center">
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <FileText size={20} className="text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-blue-700">Publications</p>
                <p className="text-2xl font-bold text-blue-900">{filteredPapers.length}</p>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-100 flex items-center">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <Building size={20} className="text-green-700" />
              </div>
              <div>
                <p className="text-sm text-green-700">Organizations</p>
                <p className="text-2xl font-bold text-green-900">{filteredOrganizations.length}</p>
              </div>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 flex items-center">
              <div className="rounded-full bg-amber-100 p-3 mr-4">
                <Zap size={20} className="text-amber-700" />
              </div>
              <div>
                <p className="text-sm text-amber-700">Citation Impact</p>
                <p className="text-2xl font-bold text-amber-900">{generateCitationImpact()}</p>
              </div>
            </div>
          </div>
          
          {/* Navigation tabs */}
          <div className="flex mb-6 border-b border-gray-200">
            <button 
              className={`cursor-pointer px-4 py-3 font-medium ${activeTab === 'trends' ? 'text-blue-700 border-b-2 border-blue-700 -mb-px' : 'text-gray-500 hover:text-blue-600'}`}
              onClick={() => setActiveTab('trends')}
            >
              <TrendingUp size={18} className="inline mr-2" />
              Technology Trends
            </button>
            <button 
              className={`cursor-pointer px-4 py-3 font-medium ${activeTab === 'papers' ? 'text-blue-700 border-b-2 border-blue-700 -mb-px' : 'text-gray-500 hover:text-blue-600'}`}
              onClick={() => setActiveTab('papers')}
            >
              <ExternalLink size={18} className="inline mr-2" />
              Research Papers
            </button>
            <button 
              className={`cursor-pointer px-4 py-3 font-medium ${activeTab === 'organizations' ? 'text-blue-700 border-b-2 border-blue-700 -mb-px' : 'text-gray-500 hover:text-blue-600'}`}
              onClick={() => setActiveTab('organizations')}
            >
              <Building size={18} className="inline mr-2" />
              Organizations
            </button>
          </div>
          
          {/* Content based on active tab */}
          {activeTab === 'trends' && (
            <div>
              {noResultsFound ? (
                <NoResultsMessage />
              ) : (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Publication Trends by Technology</h3>
                  <div className="flex items-center">
                    <Clock size={16} className="text-gray-500 mr-2" />
                    <span className="text-sm text-gray-500">Last 6 months</span>
                  </div>
                </div>
                
                <div className="mb-6 flex flex-wrap gap-2">
                  {filteredTechnologies.map(tech => (
                    <button 
                      key={tech}
                      className={`cursor-pointer px-3 py-1 rounded-full text-sm transition-colors ${selectedTech === tech ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      onClick={() => handleTechSelect(tech)}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey={selectedTech} 
                        stroke="#0054A6" 
                        strokeWidth={3} 
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <h4 className="text-gray-800 font-medium mb-4">Technology Distribution</h4>
                    <ResponsiveContainer width="100%" height={280}>
                      <PieChart>
                        <Pie
                          data={techDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {techDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <h4 className="text-gray-800 font-medium mb-4">Key Research Insights</h4>
                    <ul className="space-y-3">
                      {generateInsights().map((insight, index) => (
                        <li key={index} className="flex items-start">
                          {insight.icon}
                          <span dangerouslySetInnerHTML={{ __html: insight.text }}></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Top collaborators section */}
                <div className="mt-6 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="text-gray-800 font-medium mb-4 flex items-center">
                    <Award className="text-blue-700 mr-2" size={18} />
                    Top Contributors in {selectedTech}
                  </h4>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Rank
                          </th>
                          <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Organization
                          </th>
                          <th scope="col" className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Publications
                          </th>
                          <th scope="col" className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            YoY Growth
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {generateTopCollaborators().map((org) => (
                          <tr key={org.rank} className="hover:bg-blue-50">
                            <td className="px-3 py-2 whitespace-nowrap">
                              <div className="text-sm font-medium text-blue-900">{org.rank}</div>
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap">
                              <div className="text-sm font-medium text-blue-700 hover:underline cursor-pointer">{org.name}</div>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-center">
                              <div className="text-sm text-gray-700">{org.papers}</div>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-center">
                              <div className={`flex items-center justify-center ${org.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {org.growth >= 0 ? 
                                  <TrendingUp size={14} className="mr-1" /> : 
                                  <TrendingUp size={14} className="mr-1 transform rotate-180" />
                                }
                                <span className="text-sm">{org.growth}%</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              )}
            </div>
          )}
          
          {activeTab === 'papers' && (
            <div>
              {noResultsFound ? (
                <NoResultsMessage />
              ) : (
                <>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Research Papers</h3>
                <div className="flex">
                  <div className="mr-2 relative w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Filter size={16} className="text-gray-400" />
                    </div>
                    <select 
                      className="pl-10 pr-10 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                      onChange={(e) => handleTechSelect(e.target.value)}
                      value={selectedTech}
                    >
                      <option value="">All Technologies</option>
                      {filteredTechnologies.map(tech => (
                        <option key={tech} value={tech}>{tech}</option>
                      ))}
                    </select>
                  </div>
                  <button className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-2 rounded-md border border-blue-200 text-sm hover:bg-blue-100">
                    <Download size={16} />
                    Export
                  </button>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                {filteredPapers
                  .filter(paper => selectedTech ? paper.technologies.includes(selectedTech) : true)
                  .map(paper => (
                    <div key={paper.id} className="border-b last:border-b-0 p-4 hover:bg-blue-50">
                      <div className="flex justify-between">
                        <h4 className="text-blue-700 font-medium hover:underline cursor-pointer">{paper.title}</h4>
                        <div className="flex space-x-3">
                          <button className="text-gray-500 hover:text-blue-700" title="Save to library">
                            <Bookmark size={16} />
                          </button>
                          <button className="text-gray-500 hover:text-blue-700" title="Download PDF">
                            <Download size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mt-1 space-x-3">
                        <span className="flex items-center">
                          <User size={14} className="mr-1" /> 
                          {paper.authors}
                        </span>
                        <span className="flex items-center">
                          <Building size={14} className="mr-1" /> 
                          {paper.organization}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar size={14} className="mr-1" />
                        Published: {paper.date}
                        <span className="mx-2">|</span>
                        <span className="flex items-center">
                          <ArrowUpRight size={14} className="mr-1" />
                          Citations: {paper.citations}
                        </span>
                        <span className="mx-2">|</span>
                        <span className="flex flex-wrap gap-1 items-center">
                          {paper.technologies.map(tech => (
                            <span 
                              key={tech} 
                              className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mt-2">{paper.abstract}</p>
                      <div className="mt-2">
                        <span className="text-xs text-blue-700 hover:underline cursor-pointer flex items-center">
                          <ExternalLink size={12} className="mr-1" />
                          IEEE Xplore Document: {paper.id}
                        </span>
                      </div>
                    </div>
                  ))}
                {filteredPapers
                  .filter(paper => selectedTech ? paper.technologies.includes(selectedTech) : true)
                  .length === 0 && (
                  <div className="text-center py-10 text-gray-500">
                    <FileText size={48} className="mx-auto text-gray-300 mb-3" />
                    <p>No research papers match your search criteria.</p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-center mt-4">
                <button className="text-blue-700 hover:text-blue-800 border border-blue-200 rounded-md px-4 py-2 text-sm flex items-center">
                  Load more papers
                </button>
              </div>
              </>
              )}
            </div>
          )}
          
          {activeTab === 'organizations' && (
            <div>
              {noResultsFound ? (
                <NoResultsMessage />
              ) : (
                <>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Leading Organizations</h3>
                <div className="flex items-center gap-2">
                  <div className="relative w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Filter size={16} className="text-gray-400" />
                    </div>
                    <select 
                      className="pl-10 pr-10 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                      onChange={(e) => handleTechSelect(e.target.value)}
                      value={selectedTech}
                    >
                      <option value="">All Technologies</option>
                      {filteredTechnologies.map(tech => (
                        <option key={tech} value={tech}>{tech}</option>
                      ))}
                    </select>
                  </div>
                  <button className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-2 rounded-md border border-blue-200 text-sm hover:bg-blue-100">
                    <Map size={16} />
                    View Map
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="text-gray-700 font-medium mb-4">Top Organizations by Publication Count</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart 
                      data={filteredOrganizations
                        .filter(org => selectedTech ? org.topics.includes(selectedTech) : true)
                        .sort((a, b) => b.papers - a.papers)
                        .slice(0, 10)}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" />
                      <YAxis 
                        type="category" 
                        dataKey="name" 
                        width={100}
                        interval={0}
                        tick={(props) => {
                          const { x, y, payload } = props;
                          const value = payload.value as string;
                          const truncatedValue = value.length > 15 ? `${value.substring(0, 15)}...` : value;
                          
                          return (
                            <text x={x} y={y} dy={4} textAnchor="end" fill="#666" fontSize={12}>
                              {truncatedValue}
                            </text>
                          );
                        }}
                      />
                      <Tooltip />
                      <Bar dataKey="papers" fill="#0054A6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="text-gray-700 font-medium mb-4">Growth Rate Comparison</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart 
                      data={filteredOrganizations
                        .filter(org => selectedTech ? org.topics.includes(selectedTech) : true)
                        .sort((a, b) => b.growth - a.growth)
                        .slice(0, 10)}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" />
                      <YAxis 
                        type="category" 
                        dataKey="name" 
                        width={100}
                        interval={0}
                        tick={(props) => {
                          const { x, y, payload } = props;
                          const value = payload.value as string;
                          const truncatedValue = value.length > 15 ? `${value.substring(0, 15)}...` : value;
                          
                          return (
                            <text x={x} y={y} dy={4} textAnchor="end" fill="#666" fontSize={12}>
                              {truncatedValue}
                            </text>
                          );
                        }}
                      />
                      <Tooltip />
                      <Bar dataKey="growth">
                        {filteredOrganizations
                          .filter(org => selectedTech ? org.topics.includes(selectedTech) : true)
                          .sort((a, b) => b.growth - a.growth)
                          .slice(0, 10)
                          .map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.growth >= 0 ? "#10B981" : "#EF4444"} />
                          ))}
                        <LabelList position="right" formatter={(value: any) => `${value}%`} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Organization
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Research Focus
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Publications
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          YoY Growth
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredOrganizations
                        .filter(org => selectedTech ? org.topics.includes(selectedTech) : true)
                        .map((org) => (
                          <tr key={org.id} className="hover:bg-blue-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-blue-700 hover:underline cursor-pointer">{org.name}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-wrap gap-1">
                                {org.topics.map(topic => (
                                  <span 
                                    key={topic} 
                                    className={`px-2 py-0.5 text-xs rounded-full ${topic === selectedTech ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                                  >
                                    {topic}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              <div className="text-sm text-gray-700">{org.papers}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              <div className={`flex items-center justify-center ${org.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {org.growth >= 0 ? 
                                  <TrendingUp size={16} className="mr-1" /> : 
                                  <TrendingUp size={16} className="mr-1 transform rotate-180" />
                                }
                                <span className="text-sm">{org.growth}%</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                
                {filteredOrganizations
                  .filter(org => selectedTech ? org.topics.includes(selectedTech) : true)
                  .length === 0 && (
                  <div className="text-center py-10 text-gray-500">
                    <Building size={48} className="mx-auto text-gray-300 mb-3" />
                    <p>No organizations match your search criteria.</p>
                  </div>
                )}
              </div>
              </>
              )}
            </div>
          )}
        </div>
        
        {/* Bottom information panel */}
        {!noResultsFound && (
          <>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center mb-3">
              <Info size={20} className="text-blue-700 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">
                  {selectedTech ? `Summary : ${selectedTech}` : 'Overall Summary'}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <div className="rounded-full bg-blue-100 p-1 mr-2 mt-0.5">
                    <TrendingUp size={14} className="text-blue-700" />
                  </div>
                    <span>
                    <strong>Track {selectedTech || 'Technology'} Trends:</strong> Monitor{' '}
                    {selectedTech 
                      ? filteredPapers.filter(paper => paper.technologies.includes(selectedTech)).length 
                      : filteredPapers.length} publications across{' '}
                    {selectedTech 
                      ? filteredOrganizations.filter(org => org.topics.includes(selectedTech)).length 
                      : filteredOrganizations.length} research organizations{' '}
                    </span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-blue-100 p-1 mr-2 mt-0.5">
                    <Building size={14} className="text-blue-700" />
                  </div>
                  <span>
                    <strong>Leading Organizations:</strong>{' '}
                    {filteredOrganizations
                      .filter(org => selectedTech ? org.topics.includes(selectedTech) : true)
                      .sort((a, b) => b.papers - a.papers)
                      .slice(0, 3)
                      .map(org => org.name)
                      .join(', ')}
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-blue-100 p-1 mr-2 mt-0.5">
                    <Zap size={14} className="text-blue-700" />
                  </div>
                  <span>
                    <strong>Citation Impact:</strong> Average of {generateCitationImpact()} citations per paper
                    in {selectedTech || 'selected technologies'}
                  </span>
                </li>
              </ul>
              
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <div className="rounded-full bg-blue-100 p-1 mr-2 mt-0.5">
                    <FileText size={14} className="text-blue-700" />
                  </div>
                  <span>
                    <strong>Latest Research:</strong>{' '}
                    {filteredPapers
                      .filter(p => selectedTech ? p.technologies.includes(selectedTech) : true)
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .slice(0, 1)
                      .map(p => p.title)[0] || 'No papers found'}
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-blue-100 p-1 mr-2 mt-0.5">
                    <Map size={14} className="text-blue-700" />
                  </div>
                  <span>
                    <strong>Geographic Distribution:</strong>{' '}
                    {selectedTech ? 
                      `${Math.floor(Math.random() * 15) + 30}% North America, 
                      ${Math.floor(Math.random() * 15) + 25}% Europe, 
                      ${Math.floor(Math.random() * 15) + 20}% Asia` : 
                      'Set filters to view distribution'}
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-blue-100 p-1 mr-2 mt-0.5">
                    <AlertTriangle size={14} className="text-blue-700" />
                  </div>
                  <span>
                    <strong>Key Insight:</strong>{' '}
                    {selectedTech ? 
                      `${selectedTech} research is growing ${Math.floor(Math.random() * 20) + 10}% faster than the field average` : 
                      'Select a technology to see key insights'}
                  </span>
                </li>
              </ul>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <Clock size={14} className="inline-block mr-1" />
                Data updated: {new Date().toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})} | © IEEE
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-md text-sm flex items-center hover:bg-gray-50">
                  <Info size={14} className="mr-1" />
                  API Access
                </button>
                <button className="px-3 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-md text-sm flex items-center transition-colors">
                  <Download size={14} className="mr-1" />
                  {searchSubmitted ? 'Export Results' : 'Export Report'}
                </button>
              </div>
            </div>
          </div>
          </>
        )}
      </main>
      
      {/* IEEE-like footer */}
      <footer className="bg-gray-800 text-white py-8 mt-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-4 text-blue-300">IEEE Xplore</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline text-gray-300">About IEEE Xplore</a></li>
                <li><a href="#" className="hover:underline text-gray-300">What Can I Access?</a></li>
                <li><a href="#" className="hover:underline text-gray-300">Accessibility</a></li>
                <li><a href="#" className="hover:underline text-gray-300">Terms of Use</a></li>
                <li><a href="#" className="hover:underline text-gray-300">Privacy & Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-blue-300">Products & Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline text-gray-300">Journals & Magazines</a></li>
                <li><a href="#" className="hover:underline text-gray-300">Conference Collections</a></li>
                <li><a href="#" className="hover:underline text-gray-300">Standards</a></li>
                <li><a href="#" className="hover:underline text-gray-300">eLearning</a></li>
                <li><a href="#" className="hover:underline text-gray-300">IEEE Xplore API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-blue-300">More from IEEE</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline text-gray-300">IEEE Spectrum</a></li>
                <li><a href="#" className="hover:underline text-gray-300">IEEE Membership</a></li>
                <li><a href="#" className="hover:underline text-gray-300">IEEE Future Directions</a></li>
                <li><a href="#" className="hover:underline text-gray-300">Standards Association</a></li>
                <li><a href="#" className="hover:underline text-gray-300">IEEE Foundation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-blue-300">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline text-gray-300">Contact & Support</a></li>
                <li><a href="#" className="hover:underline text-gray-300">FAQs</a></li>
                <li><a href="#" className="hover:underline text-gray-300">Product Recommendations</a></li>
                <li><a href="#" className="hover:underline text-gray-300">Cookies Settings</a></li>
                <li><a href="#" className="hover:underline text-gray-300">Site Map</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-700 text-sm text-gray-400">
            <p>© 2025 IEEE – All rights reserved. A not-for-profit organization, IEEE is the world's largest technical professional organization dedicated to advancing technology for the benefit of humanity.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}